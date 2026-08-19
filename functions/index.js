
const {onRequest} = require("firebase-functions/v2/https");
const {defineSecret} = require("firebase-functions/params");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

const PAYPAL_CLIENT_ID = defineSecret("PAYPAL_CLIENT_ID");
const PAYPAL_CLIENT_SECRET = defineSecret("PAYPAL_CLIENT_SECRET");
const PAYPAL_WEBHOOK_ID = defineSecret("PAYPAL_WEBHOOK_ID");
const SMTP_PASSWORD = defineSecret("SMTP_PASSWORD");

const EXPECTED_PRICE = "799.00";
const INCLUDED_SEATS = 5;
const SMTP_USER = "jessica@cuethecrowdlive.com";
const APP_URL = "https://jjrunyon30-star.github.io/cue-the-crowd/";
const GUIDE_URL = "https://jjrunyon30-star.github.io/cue-the-crowd/instructions.html";

async function paypalToken() {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID.value()}:${PAYPAL_CLIENT_SECRET.value()}`).toString("base64");
  const r = await fetch("https://api-m.paypal.com/v1/oauth2/token", {
    method: "POST",
    headers: {Authorization: `Basic ${auth}`, "Content-Type": "application/x-www-form-urlencoded"},
    body: "grant_type=client_credentials"
  });
  if (!r.ok) throw new Error(`PayPal auth failed: ${r.status}`);
  return (await r.json()).access_token;
}

async function verifyWebhook(req, event) {
  const token = await paypalToken();
  const body = {
    auth_algo: req.get("paypal-auth-algo"),
    cert_url: req.get("paypal-cert-url"),
    transmission_id: req.get("paypal-transmission-id"),
    transmission_sig: req.get("paypal-transmission-sig"),
    transmission_time: req.get("paypal-transmission-time"),
    webhook_id: PAYPAL_WEBHOOK_ID.value(),
    webhook_event: event
  };
  if (!body.auth_algo || !body.cert_url || !body.transmission_id || !body.transmission_sig || !body.transmission_time)
    return false;

  const r = await fetch("https://api-m.paypal.com/v1/notifications/verify-webhook-signature", {
    method: "POST",
    headers: {Authorization: `Bearer ${token}`, "Content-Type": "application/json"},
    body: JSON.stringify(body)
  });
  if (!r.ok) return false;
  const result = await r.json();
  return result.verification_status === "SUCCESS";
}

async function getCapture(captureId) {
  const token = await paypalToken();
  const r = await fetch(`https://api-m.paypal.com/v2/payments/captures/${captureId}`, {
    headers: {Authorization: `Bearer ${token}`}
  });
  if (!r.ok) throw new Error(`PayPal capture verification failed: ${r.status}`);
  return r.json();
}

async function getOrder(orderId) {
  const token = await paypalToken();
  const r = await fetch(`https://api-m.paypal.com/v2/checkout/orders/${orderId}`, {
    headers: {Authorization: `Bearer ${token}`}
  });
  if (!r.ok) throw new Error(`PayPal order lookup failed: ${r.status}`);
  return r.json();
}

function renderWelcomeEmail(email, resetUrl) {
  return `<!doctype html><html><body style="margin:0;padding:0;background:#07080b;font-family:Arial,Helvetica,sans-serif;color:#f7f7f4;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#07080b;"><tr><td align="center" style="padding:34px 14px;">
  <table role="presentation" width="620" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:620px;background:#10131a;border:1px solid #2b2d35;border-radius:18px;overflow:hidden;">
  <tr><td style="padding:32px 36px 18px;text-align:center;"><div style="font-size:12px;font-weight:800;letter-spacing:2px;color:#ddb960;">CUE THE CROWD</div>
  <h1 style="font-size:38px;line-height:1.06;margin:14px 0 12px;color:#ffffff;">Your Cue the Crowd access is ready.</h1>
  <p style="margin:0;color:#c6c8cf;font-size:17px;line-height:1.55;">Welcome. Your company license has been activated and there is nothing to download or install.</p></td></tr>
  <tr><td style="padding:12px 36px 10px;text-align:center;"><a href="${resetUrl}" style="display:inline-block;background:#ddb960;color:#080808;text-decoration:none;font-size:15px;font-weight:900;padding:15px 24px;border-radius:10px;">CREATE MY PASSWORD</a></td></tr>
  <tr><td style="padding:22px 36px;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr>
  <td width="33%" valign="top" style="padding:12px;border-top:1px solid #2c2e36;"><div style="color:#ddb960;font-weight:900;font-size:12px;">01</div><div style="font-weight:800;margin-top:5px;">Set Password</div><div style="color:#aeb1ba;font-size:13px;margin-top:4px;">Use the secure button above.</div></td>
  <td width="33%" valign="top" style="padding:12px;border-top:1px solid #2c2e36;"><div style="color:#ddb960;font-weight:900;font-size:12px;">02</div><div style="font-weight:800;margin-top:5px;">Sign In</div><div style="color:#aeb1ba;font-size:13px;margin-top:4px;">Use the email you purchased with.</div></td>
  <td width="33%" valign="top" style="padding:12px;border-top:1px solid #2c2e36;"><div style="color:#ddb960;font-weight:900;font-size:12px;">03</div><div style="font-weight:800;margin-top:5px;">Start Here</div><div style="color:#aeb1ba;font-size:13px;margin-top:4px;">Follow the Operator Guide.</div></td>
  </tr></table></td></tr>
  <tr><td style="padding:4px 36px 20px;"><div style="background:#0b0d12;border:1px solid #292c34;border-radius:13px;padding:20px;">
  <div style="color:#ddb960;font-size:12px;font-weight:900;letter-spacing:1.5px;">YOUR ACCOUNT</div>
  <p style="margin:10px 0 0;color:#d8d9de;font-size:15px;"><strong>Login email:</strong> ${email}</p>
  <p style="margin:7px 0 0;color:#aeb1ba;font-size:14px;">Your company license is web-based. Authorized DJs sign in to the hosted platform; guests never use your DJ login.</p></div></td></tr>
  <tr><td style="padding:4px 36px 16px;"><h2 style="font-size:21px;margin:0 0 10px;color:#ffffff;">What you can do inside Cue the Crowd</h2>
  <p style="margin:0;color:#b9bbc4;font-size:14px;line-height:1.7;">Create events and Event DNA · Build and run shows · Connect guests with one QR/link · Live voting and predictions · Song and Priority Requests · Guest photos · Shoutouts · Fastest Finger buzzer · Tipping · Prize Draw · Event announcements · Audience Display · Word Cloud · Crowd Light Show · Live games and scoring · My Events · Operator Guide</p></td></tr>
  <tr><td style="padding:18px 36px;text-align:center;">
  <a href="${APP_URL}" style="display:inline-block;background:#ffffff;color:#0a0a0a;text-decoration:none;font-size:14px;font-weight:900;padding:14px 21px;border-radius:10px;margin:4px;">OPEN CUE THE CROWD</a>
  <a href="${GUIDE_URL}" style="display:inline-block;border:1px solid #ddb960;color:#f1d88c;text-decoration:none;font-size:14px;font-weight:900;padding:13px 20px;border-radius:10px;margin:4px;">OPEN OPERATOR GUIDE</a></td></tr>
  <tr><td style="padding:20px 36px 32px;border-top:1px solid #292c34;text-align:center;">
  <p style="margin:0;color:#9da0a9;font-size:13px;line-height:1.55;">Need help? Reply to this email or contact <strong style="color:#d9dbe0;">${SMTP_USER}</strong>.</p>
  <p style="margin:12px 0 0;color:#ddb960;font-size:13px;font-weight:800;">You run the show. We cue the crowd.</p></td></tr>
  </table></td></tr></table></body></html>`;
}

async function sendWelcomeEmail(email, resetUrl) {
  const transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    secure: true,
    auth: {user: SMTP_USER, pass: SMTP_PASSWORD.value()}
  });
  await transporter.sendMail({
    from: `"Cue the Crowd" <${SMTP_USER}>`,
    to: email,
    replyTo: SMTP_USER,
    subject: "Your Cue the Crowd access is ready",
    html: renderWelcomeEmail(email, resetUrl),
    text: `Welcome to Cue the Crowd.

Your company license is active. There is nothing to download or install.

Set your password:
${resetUrl}

Open Cue the Crowd:
${APP_URL}

Operator Guide:
${GUIDE_URL}

Support:
${SMTP_USER}

You run the show. We cue the crowd.`
  });
}

exports.paypalWebhook = onRequest({
  secrets: [PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PAYPAL_WEBHOOK_ID, SMTP_PASSWORD]
}, async (req, res) => {
  try {
    const event = req.body;
    const authentic = await verifyWebhook(req, event);
    if (!authentic) return res.status(401).send("invalid signature");

    if (event?.event_type !== "PAYMENT.CAPTURE.COMPLETED") return res.status(200).send("ignored");
    const captureId = event?.resource?.id;
    if (!captureId) return res.status(400).send("missing capture");

    const cap = await getCapture(captureId);
    if (cap.status !== "COMPLETED" || cap.amount?.currency_code !== "USD" || cap.amount?.value !== EXPECTED_PRICE)
      return res.status(400).send("payment mismatch");

    const orderId = cap?.supplementary_data?.related_ids?.order_id;
    let order = null;
    if (orderId) order = await getOrder(orderId);

    const email = String(
      order?.payer?.email_address ||
      event?.resource?.payer?.email_address ||
      ""
    ).trim().toLowerCase();

    if (!email) {
      await admin.database().ref(`unmatchedPayments/${captureId}`).set({
        captureId, orderId: orderId || null, eventType: event.event_type, verifiedAt: Date.now()
      });
      return res.status(202).send("verified; payer email requires review");
    }

    let user;
    try { user = await admin.auth().getUserByEmail(email); }
    catch { user = await admin.auth().createUser({email}); }

    await admin.database().ref(`licenses/${user.uid}`).set({
      active: true,
      companyEmail: email,
      ownerUid: user.uid,
      seats: INCLUDED_SEATS,
      plan: "lifetime",
      purchaseAmount: EXPECTED_PRICE,
      captureId,
      orderId: orderId || null,
      activatedAt: Date.now()
    });

    const resetUrl = await admin.auth().generatePasswordResetLink(email);
    await sendWelcomeEmail(email, resetUrl);

    await admin.database().ref(`deliveries/${captureId}`).set({
      email,
      sentAt: Date.now(),
      type: "owner-welcome"
    });

    res.status(200).send("licensed and delivered");
  } catch (e) {
    console.error(e);
    res.status(500).send("error");
  }
});
