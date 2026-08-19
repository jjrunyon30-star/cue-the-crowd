
(function () {
  const isGuest = new URLSearchParams(location.search).has("join");
  if (isGuest) return;

  const licensingConfig = {
    apiKey: "AIzaSyAJg2HlC1cNsBHaszmbdcU10zjDI3EMu6I",
    authDomain: "event-platform-pro.firebaseapp.com",
    databaseURL: "https://event-platform-pro-default-rtdb.firebaseio.com/",
    projectId: "event-platform-pro",
    storageBucket: "event-platform-pro.firebasestorage.app",
    messagingSenderId: "186954878239",
    appId: "1:186954878239:web:42bb686aaf273c5b92f42a"
  };

  let licensingApp;
  try {
    licensingApp = firebase.app("cueLicensing");
  } catch (_) {
    licensingApp = firebase.initializeApp(licensingConfig, "cueLicensing");
  }

  const licenseAuth = licensingApp.auth();
  const licenseDb = licensingApp.database();

  const style = document.createElement("style");
  style.textContent = `
    #ctcLicenseGate{position:fixed;inset:0;z-index:999999;background:#08090d;color:#fff;display:grid;place-items:center;font-family:Arial,sans-serif;padding:24px}
    #ctcLicenseGate .box{width:min(520px,94vw);background:#11131a;border:1px solid #343744;border-radius:20px;padding:30px;box-shadow:0 24px 70px #0008}
    #ctcLicenseGate h1{margin:0 0 8px;font-size:34px}
    #ctcLicenseGate p{color:#c7c9d1;line-height:1.5}
    #ctcLicenseGate input{width:100%;box-sizing:border-box;padding:14px;margin:7px 0;border-radius:10px;border:1px solid #3b3e49;background:#090a0f;color:white;font-size:16px}
    #ctcLicenseGate button{width:100%;padding:14px;margin-top:10px;border:0;border-radius:10px;font-weight:900;cursor:pointer;background:#d8b75d;color:#090909}
    #ctcLicenseGate .secondary{background:#222530;color:white}
    #ctcLicenseGate .msg{min-height:22px;color:#f1d88c;margin-top:12px}
    #ctcLicenseGate .small{font-size:13px;color:#9296a3}
  `;
  document.head.appendChild(style);

  const gate = document.createElement("div");
  gate.id = "ctcLicenseGate";
  gate.innerHTML = `<div class="box">
    <div style="font-weight:900;color:#d8b75d;letter-spacing:.12em">CUE THE CROWD</div>
    <h1>DJ Sign In</h1>
    <p>Sign in with an authorized Cue the Crowd company account.</p>
    <input id="ctcEmail" type="email" placeholder="Email address" autocomplete="email">
    <input id="ctcPassword" type="password" placeholder="Password" autocomplete="current-password">
    <button id="ctcSignIn">SIGN IN</button>
    <button id="ctcReset" class="secondary">SET / RESET PASSWORD</button>
    <div id="ctcGateMsg" class="msg"></div>
    <p class="small">Guest event links do not require a DJ login.</p>
  </div>`;
  document.body.prepend(gate);

  const msg = (t) => {
    const el = document.getElementById("ctcGateMsg");
    if (el) el.textContent = t || "";
  };

  async function licenseFor(user) {
    let snap = await licenseDb.ref("licenses/" + user.uid).once("value");
    if (snap.exists() && snap.val().active === true) {
      return {...snap.val(), ownerUid: user.uid, role: "owner"};
    }

    const member = await licenseDb.ref("teamMembers/" + user.uid).once("value");
    if (!member.exists()) return null;

    const memberData = member.val() || {};
    const ownerUid = memberData.ownerUid;
    if (!ownerUid) return null;

    snap = await licenseDb.ref("licenses/" + ownerUid).once("value");
    const lic = snap.val();
    if (!lic || lic.active !== true) return null;

    return {...lic, ownerUid, role: memberData.role || "dj"};
  }

  licenseAuth.onAuthStateChanged(async (user) => {
    if (!user) {
      gate.style.display = "grid";
      return;
    }
    try {
      const lic = await licenseFor(user);
      if (!lic) {
        await licenseAuth.signOut();
        msg("This email is not attached to an active Cue the Crowd license.");
        return;
      }
      window.CueTheCrowdLicense = lic;
      window.CueTheCrowdLicenseUser = user;
      gate.remove();
    } catch (e) {
      console.error(e);
      msg("Could not verify your license. Please try again.");
    }
  });

  gate.addEventListener("click", async (e) => {
    if (e.target.id === "ctcSignIn") {
      msg("Signing in...");
      try {
        await licenseAuth.signInWithEmailAndPassword(
          document.getElementById("ctcEmail").value.trim(),
          document.getElementById("ctcPassword").value
        );
      } catch (err) {
        msg(err.message);
      }
    }

    if (e.target.id === "ctcReset") {
      const email = document.getElementById("ctcEmail").value.trim();
      if (!email) return msg("Enter your email address first.");
      try {
        await licenseAuth.sendPasswordResetEmail(email);
        msg("Password email sent. Check your inbox.");
      } catch (err) {
        msg(err.message);
      }
    }
  });
})();
