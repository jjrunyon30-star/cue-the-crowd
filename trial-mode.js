// ======================================================
// CUE THE CROWD — TWO-EVENT FREE TRIAL MODE
// Load this file BEFORE app.js, only from trial.html.
// ======================================================
(function () {
  "use strict";

  const STORAGE_KEY = "ctcTrialState_v1";
  const MAX_TRIAL_EVENTS = 2;
  const PURCHASE_URL = "https://cuethecrowdlive.com/founding.html";
  const WEBSITE_URL = "https://cuethecrowdlive.com/";
  const isGuestJoin = new URLSearchParams(window.location.search).has("join");

  function blankState() {
    return {
      version: 1,
      startedAt: new Date().toISOString(),
      createdEventIds: [],
      completedEventIds: [],
      locked: false
    };
  }

  function getState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!parsed || typeof parsed !== "object") return blankState();
      parsed.createdEventIds = Array.isArray(parsed.createdEventIds) ? parsed.createdEventIds : [];
      parsed.completedEventIds = Array.isArray(parsed.completedEventIds) ? parsed.completedEventIds : [];
      parsed.locked = !!parsed.locked;
      return parsed;
    } catch (e) {
      return blankState();
    }
  }

  function saveState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function currentEvent() {
    try {
      return JSON.parse(localStorage.getItem("currentEvent")) || {};
    } catch (e) {
      return {};
    }
  }

  function unique(list) {
    return Array.from(new Set(list.filter(Boolean)));
  }

  function registerCurrentEventIfNew() {
    if (isGuestJoin) return;
    const event = currentEvent();
    if (!event || !event.id) return;

    const state = getState();
    if (state.createdEventIds.includes(event.id)) return;

    // Do not register more than the two trial events.
    if (state.createdEventIds.length >= MAX_TRIAL_EVENTS) return;

    state.createdEventIds.push(event.id);
    state.createdEventIds = unique(state.createdEventIds);
    saveState(state);

    // Mark the saved event itself as a trial event for clarity.
    try {
      event.trialMode = true;
      event.trialNumber = state.createdEventIds.indexOf(event.id) + 1;
      localStorage.setItem("currentEvent", JSON.stringify(event));

      const saved = JSON.parse(localStorage.getItem("savedEvents")) || [];
      const index = saved.findIndex(function (item) { return item && item.id === event.id; });
      if (index >= 0) saved[index] = Object.assign({}, saved[index], {
        trialMode: true,
        trialNumber: event.trialNumber
      });
      localStorage.setItem("savedEvents", JSON.stringify(saved));
    } catch (e) {}

    refreshTrialUI();
  }

  function remainingCreates() {
    return Math.max(0, MAX_TRIAL_EVENTS - getState().createdEventIds.length);
  }

  function createStyles() {
    if (document.getElementById("ctcTrialStyles")) return;
    const style = document.createElement("style");
    style.id = "ctcTrialStyles";
    style.textContent = `
      #ctcTrialBar{position:sticky;top:0;z-index:9998;background:#17120a;border-bottom:1px solid #d8b56a;padding:10px 16px;color:#fff;font-family:inherit;display:flex;gap:12px;align-items:center;justify-content:center;flex-wrap:wrap;text-align:center}
      #ctcTrialBar strong{color:#f2d89a;letter-spacing:.08em}
      #ctcTrialBar .ctc-trial-count{font-size:13px;color:#e9e1d0}
      #ctcTrialBar button,#ctcTrialBar a,.ctc-trial-card button,.ctc-trial-card a,.ctc-lock-card a{border:0;border-radius:9px;padding:10px 14px;font-weight:800;cursor:pointer;text-decoration:none;display:inline-block}
      #ctcTrialBar button,.ctc-trial-card button{background:#d8b56a;color:#111}
      #ctcTrialBar a,.ctc-trial-card a{background:#fff;color:#111}
      .ctc-trial-card{border:1px solid rgba(216,181,106,.55);background:linear-gradient(180deg,rgba(216,181,106,.10),rgba(255,255,255,.03));border-radius:16px;padding:22px;margin:22px 0;color:#fff}
      .ctc-trial-card h3{margin:0 0 10px;color:#f2d89a}
      .ctc-trial-card p{line-height:1.55;color:#d7d7db}
      .ctc-trial-steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;margin:16px 0}
      .ctc-trial-step{border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:14px;background:rgba(0,0,0,.18)}
      .ctc-trial-step b{display:block;color:#fff;margin-bottom:5px}
      .ctc-trial-step span{color:#bfc1c8;font-size:14px;line-height:1.45}
      #ctcTrialLock{position:fixed;inset:0;background:rgba(4,5,8,.96);z-index:100000;display:flex;align-items:center;justify-content:center;padding:24px}
      .ctc-lock-card{max-width:680px;width:100%;background:#11151d;border:1px solid #d8b56a;border-radius:20px;padding:34px;text-align:center;color:#fff;box-shadow:0 30px 80px rgba(0,0,0,.5)}
      .ctc-lock-card h2{font-size:34px;margin:8px 0 14px;color:#f2d89a}
      .ctc-lock-card p{color:#c7cad1;line-height:1.6}
      .ctc-lock-card a.primary{background:#d8b56a;color:#111;margin:12px 6px 0}
      .ctc-lock-card a.secondary{background:#fff;color:#111;margin:12px 6px 0}
      .ctc-trial-badge{display:inline-block;margin:8px 0;padding:7px 10px;border-radius:999px;background:#d8b56a;color:#111;font-weight:900;font-size:12px;letter-spacing:.06em}
      #ctcGuestTrialNote{position:sticky;top:0;z-index:9999;background:#17120a;color:#f2d89a;text-align:center;padding:9px 12px;border-bottom:1px solid #d8b56a;font-weight:700}
    `;
    document.head.appendChild(style);
  }

  function makeTrialBar() {
    if (isGuestJoin || document.getElementById("ctcTrialBar")) return;
    const bar = document.createElement("div");
    bar.id = "ctcTrialBar";
    bar.innerHTML = `
      <strong>FREE TRIAL MODE</strong>
      <span class="ctc-trial-count" id="ctcTrialCount"></span>
      <button type="button" id="ctcTrialGuideButton">TRIAL INSTRUCTIONS</button>
      <button type="button" id="ctcCompleteTrialEventButton">COMPLETE THIS TRIAL EVENT</button>
      <a href="${PURCHASE_URL}" target="_blank" rel="noopener">UNLOCK FULL PLATFORM</a>
    `;
    document.body.insertBefore(bar, document.body.firstChild);

    document.getElementById("ctcTrialGuideButton").addEventListener("click", function () {
      const card = document.getElementById("ctcTrialGuide");
      if (card) card.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    document.getElementById("ctcCompleteTrialEventButton").addEventListener("click", completeCurrentTrialEvent);
  }

  function makeGuestNote() {
    if (!isGuestJoin || document.getElementById("ctcGuestTrialNote")) return;
    const note = document.createElement("div");
    note.id = "ctcGuestTrialNote";
    note.textContent = "TRIAL GUEST VIEW — This is what guests see on their phones after scanning the event QR code.";
    document.body.insertBefore(note, document.body.firstChild);
  }

  function makeGuide() {
    if (isGuestJoin || document.getElementById("ctcTrialGuide")) return;
    const home = document.getElementById("homeScreen");
    if (!home) return;

    const guide = document.createElement("div");
    guide.id = "ctcTrialGuide";
    guide.className = "ctc-trial-card";
    guide.innerHTML = `
      <div class="ctc-trial-badge">2-EVENT FREE TRIAL</div>
      <h3>Try Cue the Crowd exactly the way a DJ would run it.</h3>
      <p>You can create and run <strong>two complete practice events</strong>. Make them fake — the goal is to see the DJ controls, guest phone experience and audience display working together. When you finish the second trial event, Trial Mode ends and Cue the Crowd must be unlocked to continue.</p>
      <div class="ctc-trial-steps">
        <div class="ctc-trial-step"><b>1. Create a fake event</b><span>Click Create New Event. Try a wedding first and enter any fake names/details.</span></div>
        <div class="ctc-trial-step"><b>2. Connect as a guest</b><span>Open Guest Hub. Scan the QR with your phone. The guest screen is what attendees would use at the event.</span></div>
        <div class="ctc-trial-step"><b>3. Try a live guest feature</b><span>From the DJ side, open Voting, Buzzer, Song Requests or another Guest Tool. Then use it from the guest phone and watch the response return to the host.</span></div>
        <div class="ctc-trial-step"><b>4. Build or rescue the show</b><span>Try Show Builder or Show Director. Launch an activity such as Table Takeover and change scores/rounds.</span></div>
        <div class="ctc-trial-step"><b>5. Send it to the room</b><span>Use Audience Display to see what would appear on the venue TV or projector while DJ controls remain private.</span></div>
        <div class="ctc-trial-step"><b>6. Complete the trial event</b><span>When you have explored it, click COMPLETE THIS TRIAL EVENT in the gold Trial bar. Then repeat once with a second fake event.</span></div>
      </div>
      <p><strong>Important:</strong> Trial Mode is for evaluation only and is not licensed for client events.</p>
    `;

    const hero = home.querySelector(".hero");
    if (hero) hero.insertAdjacentElement("afterend", guide);
    else home.insertBefore(guide, home.firstChild);
  }

  function showLocked() {
    if (isGuestJoin) return;
    let lock = document.getElementById("ctcTrialLock");
    if (lock) return;

    lock = document.createElement("div");
    lock.id = "ctcTrialLock";
    lock.innerHTML = `
      <div class="ctc-lock-card">
        <div class="ctc-trial-badge">TRIAL COMPLETE</div>
        <h2>You’ve run both Cue the Crowd trial events.</h2>
        <p>You’ve had access to the real Host controls, Guest phone experience, Show Builder, Show Director, live activities and Audience Display. Trial Mode is now finished.</p>
        <p><strong>Unlock Cue the Crowd to create and run additional events.</strong></p>
        <a class="primary" href="${PURCHASE_URL}" target="_blank" rel="noopener">UNLOCK CUE THE CROWD</a>
        <a class="secondary" href="${WEBSITE_URL}" target="_blank" rel="noopener">RETURN TO WEBSITE</a>
      </div>
    `;
    document.body.appendChild(lock);
  }

  function blockNewEvent(message) {
    alert(message || "Your two trial events have already been created. Finish your current trial event or unlock Cue the Crowd to continue.");
  }

  function completeCurrentTrialEvent() {
    if (isGuestJoin) return;
    const event = currentEvent();
    if (!event || !event.id) {
      alert("Open one of your trial events first, then click COMPLETE THIS TRIAL EVENT after you have tested it.");
      return;
    }

    const state = getState();
    if (!state.createdEventIds.includes(event.id)) {
      alert("This is not one of the two trial events.");
      return;
    }

    if (!state.completedEventIds.includes(event.id)) {
      state.completedEventIds.push(event.id);
      state.completedEventIds = unique(state.completedEventIds);
    }

    if (state.completedEventIds.length >= MAX_TRIAL_EVENTS) {
      state.locked = true;
      saveState(state);
      refreshTrialUI();
      showLocked();
      return;
    }

    saveState(state);
    alert("Trial Event 1 complete. Create one more fake event and run through the platform again. After Trial Event 2, Trial Mode will end.");

    try { localStorage.removeItem("currentEvent"); } catch (e) {}
    if (typeof window.hideAllScreens === "function") {
      try {
        window.hideAllScreens();
        const home = document.getElementById("homeScreen");
        if (home) home.classList.add("active");
      } catch (e) {}
    }
    refreshTrialUI();
  }

  function refreshTrialUI() {
    if (isGuestJoin) return;
    const state = getState();
    const count = document.getElementById("ctcTrialCount");
    const complete = document.getElementById("ctcCompleteTrialEventButton");

    if (count) {
      count.textContent = `${state.createdEventIds.length} of ${MAX_TRIAL_EVENTS} trial events created • ${state.completedEventIds.length} completed`;
    }

    if (complete) {
      const event = currentEvent();
      const isTrialEvent = event && state.createdEventIds.includes(event.id);
      complete.style.display = isTrialEvent && !state.locked ? "inline-block" : "none";
    }

    const title = document.getElementById("eventHQTitle");
    if (title) {
      const old = document.getElementById("ctcEventTrialBadge");
      const event = currentEvent();
      if (event && state.createdEventIds.includes(event.id)) {
        if (!old) {
          const badge = document.createElement("div");
          badge.id = "ctcEventTrialBadge";
          badge.className = "ctc-trial-badge";
          badge.textContent = `TRIAL EVENT ${state.createdEventIds.indexOf(event.id) + 1} OF ${MAX_TRIAL_EVENTS} — NOT LICENSED FOR CLIENT USE`;
          title.insertAdjacentElement("afterend", badge);
        }
      } else if (old) {
        old.remove();
      }
    }

    if (state.locked) showLocked();
  }

  // Capture BEFORE app.js listeners execute.
  document.addEventListener("click", function (e) {
    if (isGuestJoin) return;

    const state = getState();
    if (state.locked) {
      const safeLink = e.target.closest && e.target.closest("#ctcTrialLock a");
      if (!safeLink) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        showLocked();
      }
      return;
    }

    const createButton = e.target.closest && e.target.closest("#createEventButton");
    if (createButton && state.createdEventIds.length >= MAX_TRIAL_EVENTS) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      blockNewEvent();
      return;
    }

    const eventType = e.target.closest && e.target.closest(".event-type:not(.quick-activity)");
    if (eventType && state.createdEventIds.length >= MAX_TRIAL_EVENTS) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      blockNewEvent();
      return;
    }

    // Generic events are created immediately by the app's event-type handler.
    if (eventType && eventType.dataset && eventType.dataset.event !== "Wedding") {
      setTimeout(registerCurrentEventIfNew, 80);
    }

    // Wedding is created when the wedding DNA form is saved.
    const saveWedding = e.target.closest && e.target.closest("#saveWeddingButton");
    if (saveWedding) {
      setTimeout(registerCurrentEventIfNew, 80);
    }

    // Keep banner/badge in sync when navigating through the app.
    setTimeout(refreshTrialUI, 120);
  }, true);

  document.addEventListener("DOMContentLoaded", function () {
    createStyles();

    if (isGuestJoin) {
      makeGuestNote();
      return;
    }

    const state = getState();
    saveState(state);
    makeTrialBar();
    makeGuide();
    refreshTrialUI();

   
})();
