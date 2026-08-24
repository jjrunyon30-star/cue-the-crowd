(function () {
  const MAX_TRIAL_EVENTS = 2;
  const COUNT_KEY = "ctcTrialEventCount";
  const COMPLETE_KEY = "ctcTrialComplete";

  function getTrialCount() {
    return parseInt(localStorage.getItem(COUNT_KEY) || "0", 10);
  }

  function setTrialCount(count) {
    localStorage.setItem(COUNT_KEY, String(count));
  }

  function isTrialComplete() {
    return localStorage.getItem(COMPLETE_KEY) === "yes";
  }

  function markTrialComplete() {
    localStorage.setItem(COMPLETE_KEY, "yes");
  }

  function showLockedScreen() {
    document.body.innerHTML = `
      <div style="
        min-height:100vh;
        background:#070707;
        color:white;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:30px;
        font-family:Arial,sans-serif;
        text-align:center;
      ">
        <div style="max-width:700px;">
          <div style="
            font-size:13px;
            letter-spacing:2px;
            margin-bottom:18px;
            opacity:.75;
          ">
            CUE THE CROWD FREE TRIAL
          </div>

          <h1 style="font-size:46px;margin:0 0 20px;">
            Trial Complete
          </h1>

          <p style="
            font-size:21px;
            line-height:1.6;
            color:#d6d6d6;
            margin-bottom:28px;
          ">
            You've now created and explored two Cue the Crowd trial events.
            To create additional events and use Cue the Crowd for client events,
            unlock the full platform.
          </p>

          <a
            href="https://cuethecrowdlive.com/founding.html"
            style="
              display:inline-block;
              padding:16px 26px;
              background:#ffffff;
              color:#000000;
              text-decoration:none;
              border-radius:10px;
              font-weight:700;
            "
          >
            UNLOCK CUE THE CROWD
          </a>
        </div>
      </div>
    `;
  }

  function addTrialBanner() {
    if (document.getElementById("ctcTrialBanner")) return;

    const count = getTrialCount();
    const remaining = Math.max(0, MAX_TRIAL_EVENTS - count);

    const banner = document.createElement("div");
    banner.id = "ctcTrialBanner";
    banner.style.cssText = `
      position:fixed;
      top:0;
      left:0;
      right:0;
      z-index:99999;
      background:#ffffff;
      color:#000000;
      padding:10px 18px;
      text-align:center;
      font-family:Arial,sans-serif;
      font-size:14px;
      font-weight:700;
      border-bottom:1px solid #ccc;
    `;

    banner.innerHTML =
      "FREE TRIAL MODE — " +
      remaining +
      " OF 2 TRIAL EVENTS REMAINING";

    document.body.appendChild(banner);
    document.body.style.paddingTop = "42px";
  }

  function addInstructions() {
    if (document.getElementById("ctcTrialInstructions")) return;

    const box = document.createElement("div");
    box.id = "ctcTrialInstructions";
    box.style.cssText = `
      position:fixed;
      right:18px;
      bottom:18px;
      width:320px;
      max-height:70vh;
      overflow:auto;
      z-index:99998;
      background:#111;
      color:white;
      border:1px solid #444;
      border-radius:14px;
      padding:18px;
      font-family:Arial,sans-serif;
      box-shadow:0 10px 35px rgba(0,0,0,.45);
    `;

    box.innerHTML = `
      <div style="font-weight:700;font-size:17px;margin-bottom:12px;">
        Free Trial — How to Test It
      </div>

      <div style="font-size:14px;line-height:1.55;color:#ddd;">
        <strong>1.</strong> Click <strong>Create New Event</strong>.<br><br>

        <strong>2.</strong> Make up a fake event.
        You can use a fake wedding, corporate event, birthday or anything else.<br><br>

        <strong>3.</strong> Open <strong>Event HQ</strong> and explore
        Show Builder, Show Director, Host Control and the other DJ tools.<br><br>

        <strong>4.</strong> Open <strong>Guest Hub</strong>.
        The guest link and QR show what your guests would open on their phones.<br><br>

        <strong>5.</strong> Try an interactive feature.
        For example, open the buzzer as the host,
        then open the guest link in another tab or on your phone and buzz in.<br><br>

        <strong>6.</strong> Repeat with one second fake event.
        After two trial events, Cue the Crowd will require an unlock to continue.
      </div>

      <button
        id="ctcCloseTrialHelp"
        style="
          margin-top:14px;
          width:100%;
          padding:10px;
          border:0;
          border-radius:8px;
          cursor:pointer;
          font-weight:700;
        "
      >
        GOT IT
      </button>
    `;

    document.body.appendChild(box);

    document
      .getElementById("ctcCloseTrialHelp")
      .addEventListener("click", function () {
        box.style.display = "none";
      });
  }

  function interceptCreateEvent() {
    document.addEventListener(
      "click",
      function (event) {
        const button =
          event.target.closest &&
          event.target.closest("#createEventButton");

        if (!button) return;

        const count = getTrialCount();

        if (count >= MAX_TRIAL_EVENTS || isTrialComplete()) {
          event.preventDefault();
          event.stopPropagation();
          event.stopImmediatePropagation();
          showLockedScreen();
          return;
        }

        setTrialCount(count + 1);

        if (count + 1 >= MAX_TRIAL_EVENTS) {
          markTrialComplete();
        }

        const banner = document.getElementById("ctcTrialBanner");
        if (banner) {
          const remaining = Math.max(
            0,
            MAX_TRIAL_EVENTS - (count + 1)
          );

          banner.innerHTML =
            "FREE TRIAL MODE — " +
            remaining +
            " OF 2 TRIAL EVENTS REMAINING";
        }
      },
      true
    );
  }

  function startTrialMode() {
    if (isTrialComplete() && getTrialCount() >= MAX_TRIAL_EVENTS) {
      // Let the DJ reopen and explore the second event already created.
      // Only block when they try to create another event.
    }

    addTrialBanner();
    addInstructions();
    interceptCreateEvent();
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      startTrialMode,
      { once: true }
    );
  } else {
    startTrialMode();
  }
})();
