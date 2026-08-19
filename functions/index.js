
const {onRequest} = require("firebase-functions/v2/https");
const {defineSecret} = require("firebase-functions/params");
const admin = require("firebase-admin");
admin.initializeApp();

const PAYPAL_CLIENT_ID = defineSecret("PAYPAL_CLIENT_ID");
const PAYPAL_CLIENT_SECRET = defineSecret("PAYPAL_CLIENT_SECRET");
const EXPECTED_PRICE = "799.00";
const INCLUDED_SEATS = 5;

async function paypalToken() {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID.value()}:${PAYPAL_CLIENT_SECRET.value()}`).toString("base64");
  const r = await fetch("https://api-m.paypal.com/v1/oauth2/token", {
    method:"POST", headers:{Authorization:`Basic ${auth}`,"Content-Type":"application/x-www-form-urlencoded"},
    body:"grant_type=client_credentials"
  });
  if(!r.ok) throw new Error("PayPal auth failed");
  return (await r.json()).access_token;
}

async function getCapture(captureId) {
  const token = await paypalToken();
  const r = await fetch(`https://api-m.paypal.com/v2/payments/captures/${captureId}`, {
    headers:{Authorization:`Bearer ${token}`}
  });
  if(!r.ok) throw new Error("PayPal capture verification failed");
  return r.json();
}

exports.paypalWebhook = onRequest({secrets:[PAYPAL_CLIENT_ID,PAYPAL_CLIENT_SECRET]}, async (req,res)=>{
  try{
    // IMPORTANT: Before production, configure PayPal webhook signature verification.
    const event=req.body;
    if(event?.event_type!=="PAYMENT.CAPTURE.COMPLETED") return res.status(200).send("ignored");
    const captureId=event?.resource?.id;
    if(!captureId) return res.status(400).send("missing capture");
    const cap=await getCapture(captureId);
    if(cap.status!=="COMPLETED" || cap.amount?.currency_code!=="USD" || cap.amount?.value!==EXPECTED_PRICE)
      return res.status(400).send("payment mismatch");

    const email=(event?.resource?.payer?.email_address || event?.resource?.payee?.email_address || "").toLowerCase();
    // PayPal webhook payloads vary by integration. If payer email is absent, store for manual review.
    if(!email){
      await admin.database().ref(`unmatchedPayments/${captureId}`).set({event,verifiedAt:Date.now()});
      return res.status(202).send("verified; payer email requires review");
    }

    let user;
    try { user=await admin.auth().getUserByEmail(email); }
    catch { user=await admin.auth().createUser({email}); }

    await admin.database().ref(`licenses/${user.uid}`).set({
      active:true, companyEmail:email, ownerUid:user.uid, seats:INCLUDED_SEATS,
      plan:"lifetime", purchaseAmount:EXPECTED_PRICE, captureId, activatedAt:Date.now()
    });
    res.status(200).send("licensed");
  }catch(e){ console.error(e); res.status(500).send("error"); }
});
