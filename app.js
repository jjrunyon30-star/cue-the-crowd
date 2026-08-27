

function cleanDuplicateEventWord(name) {

  if (!name) {
    return name;
  }

  return name.replace(
    /\bEvent Event\b/g,
    "Event"
  );
}

// ======================================================
// EVENT PLATFORM PRO
// CLEAN CONSOLIDATED APPLICATION
// ======================================================


// ======================================================
// SCREENS
// ======================================================

const homeScreen = document.getElementById("homeScreen");
const eventSetupScreen = document.getElementById("eventSetupScreen");
const weddingFormScreen = document.getElementById("weddingFormScreen");
const eventHQScreen = document.getElementById("eventHQScreen");
const showBuilderScreen = document.getElementById("showBuilderScreen");
const generatedShowScreen = document.getElementById("generatedShowScreen");
const hostControlScreen = document.getElementById("hostControlScreen");
const audienceScreen = document.getElementById("audienceScreen");
const quickLaunchScreen = document.getElementById("quickLaunchScreen");
const myEventsScreen = document.getElementById("myEventsScreen");
const templatesScreen = document.getElementById("templatesScreen");
const showDirectorScreen = document.getElementById("showDirectorScreen");
const liveActivityHostScreen =
  document.getElementById("liveActivityHostScreen");


// ======================================================
// GENERAL HELPERS
// ======================================================

function hideAllScreens() {
  document.querySelectorAll(".screen").forEach(function (screen) {
    screen.classList.remove("active");
  });
}


function getCurrentEvent() {
  return JSON.parse(localStorage.getItem("currentEvent")) || {};
}


function getSavedEvents() {
  return JSON.parse(localStorage.getItem("savedEvents")) || [];
}


function saveEvents(events) {
  localStorage.setItem(
    "savedEvents",
    JSON.stringify(events)
  );
}


function saveCurrentEvent(event) {
  localStorage.setItem(
    "currentEvent",
    JSON.stringify(event)
  );
}


function updateEventInLibrary(event) {

  const savedEvents = getSavedEvents();

  const index =
    savedEvents.findIndex(function (item) {
      return item.id === event.id;
    });

  if (index >= 0) {
    savedEvents[index] = event;
  } else {
    savedEvents.push(event);
  }

  saveEvents(savedEvents);
}


// ======================================================
// HOME / BASIC NAVIGATION
// ======================================================

const createEventButton =
  document.getElementById("createEventButton");

const backHomeButton =
  document.getElementById("backHomeButton");

const backToEventTypesButton =
  document.getElementById("backToEventTypesButton");


createEventButton.addEventListener("click", function () {

  localStorage.removeItem("currentEvent");

  clearWeddingForm();

  hideAllScreens();

  eventSetupScreen.classList.add("active");
});


backHomeButton.addEventListener("click", function () {

  hideAllScreens();

  homeScreen.classList.add("active");
});


backToEventTypesButton.addEventListener("click", function () {

  hideAllScreens();

  eventSetupScreen.classList.add("active");
});


// ======================================================
// EVENT TYPE SELECTION
// ======================================================

document.querySelectorAll(".event-type").forEach(function (button) {

  if (button.classList.contains("quick-activity")) {
    return;
  }

  button.addEventListener("click", function () {

    const eventType =
      this.dataset.event;

    // Wedding keeps the detailed wedding DNA form
    if (eventType === "Wedding") {

      clearWeddingForm();

      localStorage.setItem(
        "pendingEventType",
        "Wedding"
      );

      hideAllScreens();
      weddingFormScreen.classList.add("active");

      return;
    }

    // All other event types start with the Event DNA form.
    // The event is not added to My Events until SAVE EVENT is clicked.
    const newEvent = {

      id:
        "event-" + Date.now(),

      createdAt:
        new Date().toISOString(),

      updatedAt:
        new Date().toISOString(),

      type:
        eventType,

      eventName:
        eventType.endsWith("Event")
          ? eventType
          : (eventType.endsWith("Event") ? eventType : eventType + " Event"),

      eventDate:
        "",

      birthdayPerson:
        "",

      birthdayAge:
        "",

      guestCount:
        "",

      guestAgeRange:
        "",

      eventMusic:
        "",

      eventStory:
        "",

      avoidTopics:
        "",

      show:
        [],

      isNewEventSetup:
        true
    };

    saveCurrentEvent(newEvent);

    loadGenericEventDNA(newEvent);

    hideAllScreens();
    genericEventDNAScreen.classList.add("active");

  });

});

// ======================================================
// WEDDING EVENT DNA
// ======================================================

const saveWeddingButton =
  document.getElementById("saveWeddingButton");


function clearWeddingForm() {

  const ids = [
    "weddingEventName",
    "partnerOne",
    "partnerTwo",
    "weddingDate",
    "guestCount",
    "guestAgeRange",
    "weddingMusic",
    "coupleStory",
    "avoidTopics"
  ];

  ids.forEach(function (id) {

    const field = document.getElementById(id);

    if (field) {
      field.value = "";
    }

  });
}


function loadWeddingForm(event) {

  if (!event) {
    return;
  }

  document.getElementById("weddingEventName").value =
    event.eventName || "";

  document.getElementById("partnerOne").value =
    event.partnerOne || "";

  document.getElementById("partnerTwo").value =
    event.partnerTwo || "";

  document.getElementById("weddingDate").value =
    event.weddingDate || "";

  document.getElementById("guestCount").value =
    event.guestCount || "";

  document.getElementById("guestAgeRange").value =
    event.guestAgeRange || "";

  document.getElementById("weddingMusic").value =
    event.weddingMusic || "";

  document.getElementById("coupleStory").value =
    event.coupleStory || "";

  document.getElementById("avoidTopics").value =
    event.avoidTopics || "";
}


saveWeddingButton.addEventListener("click", function () {

  const existing =
    getCurrentEvent();


  const weddingEvent = {

    id:
      existing.id ||
      "event-" + Date.now(),

    createdAt:
      existing.createdAt ||
      new Date().toISOString(),

    updatedAt:
      new Date().toISOString(),

    type:
      "Wedding",

    eventName:
      document
        .getElementById("weddingEventName")
        .value
        .trim() ||
      "Wedding Event",

    partnerOne:
      document
        .getElementById("partnerOne")
        .value
        .trim(),

    partnerTwo:
      document
        .getElementById("partnerTwo")
        .value
        .trim(),

    weddingDate:
      document
        .getElementById("weddingDate")
        .value,

    guestCount:
      document
        .getElementById("guestCount")
        .value,

    guestAgeRange:
      document
        .getElementById("guestAgeRange")
        .value
        .trim(),

    weddingMusic:
      document
        .getElementById("weddingMusic")
        .value
        .trim(),

    coupleStory:
      document
        .getElementById("coupleStory")
        .value
        .trim(),

    avoidTopics:
      document
        .getElementById("avoidTopics")
        .value
        .trim(),

    show:
      existing.show || []

  };


  saveCurrentEvent(weddingEvent);

  updateEventInLibrary(weddingEvent);

  updateEventHQ(weddingEvent);

  hideAllScreens();

  eventHQScreen.classList.add("active");
});


// ======================================================
// EVENT HQ
// ======================================================

const buildShowButton =
  document.getElementById("buildShowButton");

const hostControlButton =
  document.getElementById("hostControlButton");

const quickLaunchButton =
  document.getElementById("quickLaunchButton");

const eventDNAButton =
  document.getElementById("eventDNAButton");

const showDirectorButton =
  document.getElementById("showDirectorButton");

const eventHQHomeButton =
  document.getElementById("eventHQHomeButton");

const backToHQButton =
  document.getElementById("backToHQButton");


function updateEventHQ(event) {

  document.getElementById("eventHQTitle").textContent =
    event.eventName || "Event";


  let subtitle = "";


  if (event.partnerOne || event.partnerTwo) {

    subtitle =
      `${event.partnerOne || ""}` +
      `${event.partnerOne && event.partnerTwo ? " & " : ""}` +
      `${event.partnerTwo || ""}`;
  }


  if (event.show && event.show.length > 0) {

    subtitle +=
      `${subtitle ? " • " : ""}Show Ready`;

  } else {

    subtitle +=
      `${subtitle ? " • " : ""}Event Saved`;
  }


  document.getElementById("eventHQSubtitle").textContent =
    subtitle;
}


buildShowButton.addEventListener("click", function () {

  selectedShowLength = null;
  selectedCompetitionLevel = null;

  selectedExperiences.clear();
  selectedParticipation.clear();
  selectedOptions.clear();

  document.querySelectorAll(
    ".show-length, .experience-choice, .competition-level, .participation-choice, .optional-choice"
  ).forEach(function (button) {

    button.classList.remove(
      "selected-choice"
    );
  });

  updateShowBuilderForEvent();

  hideAllScreens();

  showBuilderScreen.classList.add("active");
});


// ======================================================
// MULTI-EVENT EVENT DNA
// ======================================================

const genericEventDNAScreen =
  document.getElementById("genericEventDNAScreen");

const genericDNATypeLabel =
  document.getElementById("genericDNATypeLabel");

const genericDNATitle =
  document.getElementById("genericDNATitle");

const saveGenericDNAButton =
  document.getElementById("saveGenericDNAButton");

const genericDNABackButton =
  document.getElementById("genericDNABackButton");


function loadGenericEventDNA(event) {

  genericDNATypeLabel.textContent =
    (event.type || "EVENT").toUpperCase() +
    " • EVENT DNA";

  genericDNATitle.textContent =
    "Build the " +
    (event.type || "Event") +
    " profile.";

  document.getElementById(
    "genericEventName"
  ).value =
    event.eventName || "";

  const birthdayPersonField =
    document.getElementById(
      "genericBirthdayPersonField"
    );

  const birthdayAgeField =
    document.getElementById(
      "genericBirthdayAgeField"
    );

  const isBirthday =
    event.type === "Birthday";

  if (birthdayPersonField) {
    birthdayPersonField.style.display =
      isBirthday ? "" : "none";
  }

  if (birthdayAgeField) {
    birthdayAgeField.style.display =
      isBirthday ? "" : "none";
  }

  document.getElementById(
    "genericBirthdayPerson"
  ).value =
    event.birthdayPerson || "";

  document.getElementById(
    "genericBirthdayAge"
  ).value =
    event.birthdayAge || "";

  document.getElementById(
    "genericEventDate"
  ).value =
    event.eventDate || "";

  document.getElementById(
    "genericGuestCount"
  ).value =
    event.guestCount || "";

  document.getElementById(
    "genericGuestAgeRange"
  ).value =
    event.guestAgeRange || "";

  document.getElementById(
    "genericEventMusic"
  ).value =
    event.eventMusic ||
    event.weddingMusic ||
    "";

  document.getElementById(
    "genericEventStory"
  ).value =
    event.eventStory ||
    event.coupleStory ||
    "";

  document.getElementById(
    "genericAvoidTopics"
  ).value =
    event.avoidTopics || "";
}


function openEventDNA(event) {

  if (!event || !event.id) {

    alert(
      "Open or create an event first."
    );

    return;
  }

  hideAllScreens();

  if (event.type === "Wedding") {

    loadWeddingForm(event);

    weddingFormScreen.classList.add(
      "active"
    );

    return;
  }

  loadGenericEventDNA(event);

  genericEventDNAScreen.classList.add(
    "active"
  );
}


saveGenericDNAButton.addEventListener(
  "click",
  function () {

    const current =
      getCurrentEvent();

    current.eventName =
      document
        .getElementById(
          "genericEventName"
        )
        .value
        .trim() ||
      (current.type || "Event") +
        " Event";

    current.birthdayPerson =
      document
        .getElementById(
          "genericBirthdayPerson"
        )
        .value
        .trim();

    current.birthdayAge =
      document
        .getElementById(
          "genericBirthdayAge"
        )
        .value;

    current.eventDate =
      document
        .getElementById(
          "genericEventDate"
        )
        .value;

    current.guestCount =
      document
        .getElementById(
          "genericGuestCount"
        )
        .value;

    current.guestAgeRange =
      document
        .getElementById(
          "genericGuestAgeRange"
        )
        .value
        .trim();

    current.eventMusic =
      document
        .getElementById(
          "genericEventMusic"
        )
        .value
        .trim();

    current.eventStory =
      document
        .getElementById(
          "genericEventStory"
        )
        .value
        .trim();

    current.avoidTopics =
      document
        .getElementById(
          "genericAvoidTopics"
        )
        .value
        .trim();

    current.updatedAt =
      new Date().toISOString();

    delete current.isNewEventSetup;

    saveCurrentEvent(current);

    updateEventInLibrary(
      current
    );

    updateEventHQ(
      current
    );

    hideAllScreens();

    eventHQScreen.classList.add(
      "active"
    );
  }
);


genericDNABackButton.addEventListener(
  "click",
  function () {

    const current =
      getCurrentEvent();

    if (current && current.isNewEventSetup) {
      localStorage.removeItem("currentEvent");

      hideAllScreens();

      eventSetupScreen.classList.add(
        "active"
      );

      return;
    }

    hideAllScreens();

    eventHQScreen.classList.add(
      "active"
    );
  }
);


eventDNAButton.addEventListener(
  "click",
  function () {

    openEventDNA(
      getCurrentEvent()
    );
  }
);


eventHQHomeButton.addEventListener("click", function () {

  hideAllScreens();

  homeScreen.classList.add("active");
});


backToHQButton.addEventListener("click", function () {

  hideAllScreens();

  eventHQScreen.classList.add("active");
});




function updateShowBuilderForEvent() {

  const event =
    getCurrentEvent();

  const storyButton =
    document.getElementById(
      "eventStoryOptionButton"
    );

  if (!storyButton) {
    return;
  }

  const labels = {
    "Wedding":
      "Couple Story",

    "Birthday":
      "Guest of Honor Story",

    "Class Reunion":
      "Class Memories",

    "Corporate Event":
      "Company / Team Story",

    "Holiday Party":
      "Holiday Traditions",

    "School Event":
      "School / Group Story",

    "Bar / Venue":
      "Venue / Crowd Details",

    "General Event":
      "Event Story"
  };

  storyButton.textContent =
    labels[event.type] ||
    "Event Story";
}


function getSignatureShowSegment(
  event
) {

  const signatureSegments = {

    "Wedding": {
      title:
        "Couple Spotlight",

      type:
        "Personalized",

      time:
        5,

      activityId:
        "crowd-pulse-01",

      description:
        "A personalized wedding moment built around the couple and their guests."
    },


    "Birthday": {
      title:
        "Birthday Bash",

      type:
        "Birthday Experience",

      time:
        5,

      activityId:
        "birthday-bash-01",

      description:
        "A fast birthday-centered experience that puts the guest of honor at the center of the room."
    },


    "Class Reunion": {
      title:
        "Then vs. Now",

      type:
        "Reunion Experience",

      time:
        5,

      activityId:
        "reunion-then-now-01",

      description:
        "A nostalgia-driven reunion experience comparing school days with life now."
    },


    "Corporate Event": {
      title:
        "Office Showdown",

      type:
        "Corporate Competition",

      time:
        6,

      activityId:
        "corporate-office-showdown-01",

      description:
        "A workplace-friendly team competition designed specifically for corporate crowds."
    },


    "Holiday Party": {
      title:
        "Holiday Hot Takes",

      type:
        "Holiday Experience",

      time:
        5,

      activityId:
        "holiday-hot-takes-01",

      description:
        "Fast holiday debates and crowd participation built specifically for a holiday party."
    },


    "School Event": {
      title:
        "School Spirit Showdown",

      type:
        "School Competition",

      time:
        6,

      activityId:
        "school-spirit-01",

      description:
        "A fast team competition built around school spirit and participation."
    },


    "Bar / Venue": {
      title:
        "Bar Crowd Chaos",

      type:
        "Venue Experience",

      time:
        5,

      activityId:
        "venue-crowd-chaos-01",

      description:
        "Fast, low-pressure crowd participation designed for bars and live venues."
    },


    "General Event": {
      title:
        "Room Rally",

      type:
        "Crowd Experience",

      time:
        5,

      activityId:
        "general-room-rally-01",

      description:
        "A flexible whole-room experience designed to reveal connections and raise the energy."
    }

  };

  return (
    signatureSegments[event.type] ||
    signatureSegments["General Event"]
  );
}


// ======================================================
// SHOW BUILDER SELECTIONS
// ======================================================

let selectedShowLength = null;
let selectedCompetitionLevel = null;

const selectedExperiences = new Set();
const selectedParticipation = new Set();
const selectedOptions = new Set();


document.querySelectorAll(".show-length").forEach(function (button) {

  button.addEventListener("click", function () {

    document.querySelectorAll(".show-length").forEach(function (item) {
      item.classList.remove("selected-choice");
    });

    this.classList.add("selected-choice");

    selectedShowLength =
      this.dataset.length;
  });

});


document.querySelectorAll(".experience-choice").forEach(function (button) {

  button.addEventListener("click", function () {

    const value =
      this.dataset.experience;

    if (selectedExperiences.has(value)) {

      selectedExperiences.delete(value);

      this.classList.remove("selected-choice");

    } else {

      selectedExperiences.add(value);

      this.classList.add("selected-choice");
    }

  });

});


document.querySelectorAll(".competition-level").forEach(function (button) {

  button.addEventListener("click", function () {

    document.querySelectorAll(".competition-level").forEach(function (item) {
      item.classList.remove("selected-choice");
    });

    this.classList.add("selected-choice");

    selectedCompetitionLevel =
      this.dataset.level;
  });

});


document.querySelectorAll(".participation-choice").forEach(function (button) {

  button.addEventListener("click", function () {

    const value =
      this.dataset.participation;

    if (selectedParticipation.has(value)) {

      selectedParticipation.delete(value);

      this.classList.remove("selected-choice");

    } else {

      selectedParticipation.add(value);

      this.classList.add("selected-choice");
    }

  });

});


document.querySelectorAll(".optional-choice").forEach(function (button) {

  button.addEventListener("click", function () {

    const value =
      this.dataset.option;

    if (selectedOptions.has(value)) {

      selectedOptions.delete(value);

      this.classList.remove("selected-choice");

    } else {

      selectedOptions.add(value);

      this.classList.add("selected-choice");
    }

  });

});


// ======================================================
// BUILD GENERATED SHOW
// ======================================================

const generateShowButton =
  document.getElementById("generateShowButton");

const generatedShowList =
  document.getElementById("generatedShowList");

const generatedShowTitle =
  document.getElementById("generatedShowTitle");

const generatedShowSummary =
  document.getElementById("generatedShowSummary");

const backToShowBuilderButton =
  document.getElementById("backToShowBuilderButton");

const rebuildShowButton =
  document.getElementById("rebuildShowButton");

const acceptShowButton =
  document.getElementById("acceptShowButton");


generateShowButton.addEventListener("click", function () {

  if (!selectedShowLength) {

    alert(
      "Choose a show length first."
    );

    return;
  }


  const eventData =
    getCurrentEvent();


  const targetMinutes =
    Number(
      selectedShowLength
    );


  const showSegments = [];


  // ----------------------------------------------
  // OPENING
  // ----------------------------------------------

  showSegments.push({

    title:
      "Crowd Warm-Up",

    type:
      "Crowd Participation",

    time:
      2,

    activityId:
      "crowd-pulse-universal-01",

    description:
      "A quick whole-room participation moment that gets guests responding immediately."
  });


  // ----------------------------------------------
  // EVENT-SPECIFIC SIGNATURE EXPERIENCE
  // ----------------------------------------------

  const signatureSegment =
    getSignatureShowSegment(
      eventData
    );


  showSegments.push(
    signatureSegment
  );


  // ----------------------------------------------
  // OPTIONAL SEGMENTS
  // ----------------------------------------------

  const optionalSegments = [];


  if (
    selectedParticipation.has(
      "Tables"
    )
  ) {

    optionalSegments.push({

      title:
        "Battle of the Tables",

      type:
        "Competition",

      time:
        7,

      description:
        "Tables compete through fast challenges with live scoring."
    });
  }


  if (
    selectedParticipation.has(
      "Sides"
    )
  ) {

    optionalSegments.push({

      title:
        "Side vs. Side Showdown",

      type:
        "Competition",

      time:
        6,

      description:
        "Split the room into two teams for a fast head-to-head challenge."
    });
  }


  if (
    selectedExperiences.has(
      "Music"
    ) ||
    selectedOptions.has(
      "Music Challenges"
    )
  ) {

    optionalSegments.push({

      title:
        "Music Showdown",

      type:
        "Music",

      time:
        7,

      activityId:
        "generation-01",

      description:
        "A music-driven audience challenge using the entertainer's own music source."
    });


    if (
      selectedParticipation.has(
        "Individuals"
      )
    ) {

      optionalSegments.push({

        title:
          "Music Spotlight",

        type:
          "Music • Individual Players",

        time:
          8,

        activityId:
          "music-spotlight-01",

        description:
          "Individual guests compete through fast music challenges using the entertainer's own music source."
      });
    }
  }


  if (
    selectedExperiences.has(
      "Personalized"
    ) ||
    selectedOptions.has(
      "Event Story"
    )
  ) {

    const personalizedTitles = {

      "Wedding":
        "Couple Story Moment",

      "Birthday":
        "Guest of Honor Spotlight",

      "Class Reunion":
        "Memory Lane",

      "Corporate Event":
        "Company Spotlight",

      "Holiday Party":
        "Holiday Tradition Spotlight",

      "School Event":
        "School Spotlight",

      "Bar / Venue":
        "Crowd Spotlight",

      "General Event":
        "Event Spotlight"
    };


    optionalSegments.push({

      title:
        personalizedTitles[
          eventData.type
        ] ||
        "Event Spotlight",

      type:
        "Personalized",

      time:
        5,

      description:
        "A personalized interactive moment built from this event's Event DNA."
    });
  }


  if (
    selectedExperiences.has(
      "Memories"
    ) ||
    selectedOptions.has(
      "Photos"
    )
  ) {

    optionalSegments.push({

      title:
        "Memory Moment",

      type:
        "Experience",

      time:
        5,

      description:
        "A photo, story or reveal moment tied directly to this event and its guests."
    });
  }


  if (
    selectedExperiences.has(
      "Movement"
    ) ||
    selectedOptions.has(
      "Physical Challenges"
    )
  ) {

    optionalSegments.push({

      title:
        "Get the Room Moving",

      type:
        "Movement",

      time:
        5,

      description:
        "A high-energy activity designed to get guests out of their seats and involved."
    });
  }


  if (
    selectedExperiences.has(
      "Funny"
    )
  ) {

    optionalSegments.push({

      title:
        "Quick Laugh",

      type:
        "Comedy / Participation",

      time:
        4,

      description:
        "A low-pressure comedy moment built around relatable crowd prompts."
    });
  }


  if (
    selectedParticipation.has(
      "Individuals"
    )
  ) {

    optionalSegments.push({

      title:
        "Individual Spotlight",

      type:
        "Individual Players",

      time:
        5,

      activityId:
        "individual-spotlight-01",

      description:
        "Fast volunteer-based challenges built for individual players instead of teams."
    });
  }


  if (
    selectedExperiences.has(
      "Competition"
    ) &&
    !selectedParticipation.has(
      "Tables"
    ) &&
    !selectedParticipation.has(
      "Sides"
    ) &&
    !selectedParticipation.has(
      "Individuals"
    )
  ) {

    optionalSegments.push({

      title:
        "Fast Crowd Challenge",

      type:
        "Competition",

      time:
        5,

      description:
        "A quick competitive experience built to raise the room's energy."
    });
  }


  // ----------------------------------------------
  // FINALE
  // ----------------------------------------------

  const finale = {

    title:
      "Finale",

    type:
      "Finale",

    time:
      2,

    description:
      "A strong closing moment that transitions smoothly back into the event."
  };


  // ----------------------------------------------
  // FIT OPTIONAL SEGMENTS INTO AVAILABLE TIME
  // ----------------------------------------------

  let usedMinutes =
    showSegments.reduce(
      function (
        total,
        segment
      ) {

        return (
          total +
          segment.time
        );
      },
      0
    );


  const finaleMinutes =
    finale.time;


  optionalSegments.forEach(
    function (
      segment
    ) {

      if (
        usedMinutes +
        segment.time +
        finaleMinutes <=
        targetMinutes
      ) {

        showSegments.push(
          segment
        );

        usedMinutes +=
          segment.time;
      }
    }
  );


  // ----------------------------------------------
  // SMART RUNTIME FILL
  // Longer shows get additional REAL activities
  // instead of giant filler blocks.
  // ----------------------------------------------

  const usedActivityIds =
    new Set(
      showSegments
        .map(function (segment) {
          return segment.activityId;
        })
        .filter(Boolean)
    );


  function addFillSegment(segment) {

    if (
      segment.activityId &&
      usedActivityIds.has(
        segment.activityId
      )
    ) {
      return false;
    }

    if (
      usedMinutes +
      segment.time +
      finaleMinutes >
      targetMinutes
    ) {
      return false;
    }

    showSegments.push(segment);

    usedMinutes +=
      segment.time;

    if (segment.activityId) {
      usedActivityIds.add(
        segment.activityId
      );
    }

    return true;
  }


  const fillCandidates = [];


  if (
    !selectedExperiences.has("Funny")
  ) {

    fillCandidates.push({

      title:
        "Quick Laugh",

      type:
        "Comedy / Participation",

      time:
        4,

      activityId:
        "quick-laugh-universal-01",

      description:
        "A low-pressure comedy moment built around relatable crowd prompts."
    });
  }


  if (
    !selectedParticipation.has("Sides")
  ) {

    fillCandidates.push({

      title:
        "Room vs. Room",

      type:
        "Competition",

      time:
        6,

      activityId:
        "side-showdown-universal-01",

      description:
        "Split the room into two teams for a fast head-to-head room challenge."
    });
  }


  if (
    !selectedExperiences.has("Movement")
  ) {

    fillCandidates.push({

      title:
        "Find Your People",

      type:
        "Movement / Participation",

      time:
        5,

      activityId:
        "movement-01",

      description:
        "A fast whole-room movement activity that reveals connections between guests."
    });
  }


  fillCandidates.push({

    title:
      "Crowd Connection",

    type:
      "Crowd Participation",

    time:
      5,

    activityId:
      "crowd-connection-01",

    description:
      "Fast whole-room prompts that reveal unexpected things guests have in common."
  });


  fillCandidates.forEach(
    function (segment) {

      addFillSegment(segment);
    }
  );


  showSegments.push(
    finale
  );


  // ----------------------------------------------
  // ONLY USE CROWD RESET FOR A SMALL FINAL GAP
  // ----------------------------------------------

  let finalMinutes =
    showSegments.reduce(
      function (
        total,
        segment
      ) {

        return (
          total +
          segment.time
        );
      },
      0
    );


  const remaining =
    targetMinutes -
    finalMinutes;


  if (
    remaining >= 3
  ) {

    showSegments.splice(
      showSegments.length - 1,
      0,
      {

        title:
          "Crowd Reset",

        type:
          "Flexible Experience",

        time:
          Math.min(
            remaining,
            5
          ),

        description:
          "Flexible time for a quick crowd prompt, transition, bonus round or room reset."
      }
    );
  }


  // ----------------------------------------------
  // DISPLAY GENERATED SHOW
  // ----------------------------------------------

  generatedShowTitle.textContent =
    eventData.eventName ||
    "Your Event Experience";


  const summaryParts = [];

  selectedExperiences.forEach(
    function (item) {
      summaryParts.push(item);
    }
  );

  selectedParticipation.forEach(
    function (item) {
      summaryParts.push(item);
    }
  );

  if (selectedCompetitionLevel) {

    summaryParts.push(
      selectedCompetitionLevel
    );
  }

  generatedShowSummary.textContent =
    selectedShowLength +
    "-minute " +
    (eventData.type ||
      "event") +
    " experience" +
    (
      summaryParts.length
        ? " • " +
          summaryParts.join(" • ")
        : ""
    );


  generatedShowList.innerHTML =
    "";


  showSegments.forEach(
    function (
      segment,
      index
    ) {

      const card =
        document.createElement(
          "div"
        );


      card.className =
        "feature-panel";


      card.style.marginBottom =
        "14px";


      card.innerHTML = `

        <span class="small-label">
          SEGMENT ${index + 1}
          •
          ${segment.time} MIN
        </span>

        <h3>
          ${segment.title}
        </h3>

        <p>
          ${segment.description}
        </p>

        <p style="
          color:var(--gold-light);
          margin-top:14px;
        ">
          ${segment.type}
        </p>

      `;


      generatedShowList.appendChild(
        card
      );
    }
  );


  localStorage.setItem(
    "currentShow",
    JSON.stringify(
      showSegments
    )
  );


  hideAllScreens();

  generatedShowScreen.classList.add(
    "active"
  );
});
backToShowBuilderButton.addEventListener("click", function () {

  hideAllScreens();

  showBuilderScreen.classList.add("active");
});


rebuildShowButton.addEventListener("click", function () {

  hideAllScreens();

  showBuilderScreen.classList.add("active");
});


acceptShowButton.addEventListener("click", function () {

  const event =
    getCurrentEvent();

  const show =
    JSON.parse(localStorage.getItem("currentShow")) || [];


  event.show =
    show;

  event.updatedAt =
    new Date().toISOString();


  saveCurrentEvent(event);

  updateEventInLibrary(event);

  updateEventHQ(event);


  currentHostSegmentIndex = 0;

  loadHostControl();

  hideAllScreens();

  hostControlScreen.classList.add("active");
});


// ======================================================
// PLANNED SHOW HOST CONTROL
// ======================================================

const hostControlTitle =
  document.getElementById("hostControlTitle");

const hostCurrentSegment =
  document.getElementById("hostCurrentSegment");

const hostCurrentDescription =
  document.getElementById("hostCurrentDescription");

const hostSegmentPosition =
  document.getElementById("hostSegmentPosition");

const hostNextSegment =
  document.getElementById("hostNextSegment");

const previousSegmentButton =
  document.getElementById("previousSegmentButton");

const nextSegmentButton =
  document.getElementById("nextSegmentButton");

const launchSegmentButton =
  document.getElementById("launchSegmentButton");

const hostBackToHQButton =
  document.getElementById("hostBackToHQButton");

const hostQuickLaunchButton =
  document.getElementById("hostQuickLaunchButton");


let currentHostSegmentIndex = 0;


function loadHostControl() {

  const event =
    getCurrentEvent();

  const show =
    event.show || [];


  hostControlTitle.textContent =
    event.eventName ||
    "Live Show";


  if (show.length === 0) {

    hostCurrentSegment.textContent =
      "No show loaded";

    hostCurrentDescription.textContent =
      "Build and save a show first.";

    hostSegmentPosition.textContent =
      "0 of 0";

    hostNextSegment.textContent =
      "—";

    return;
  }


  if (currentHostSegmentIndex < 0) {
    currentHostSegmentIndex = 0;
  }


  if (currentHostSegmentIndex >= show.length) {
    currentHostSegmentIndex = show.length - 1;
  }


  const current =
    show[currentHostSegmentIndex];

  const next =
    show[currentHostSegmentIndex + 1];


  hostCurrentSegment.textContent =
    current.title;


  hostCurrentDescription.textContent =
    current.description;


  hostSegmentPosition.textContent =
    `${currentHostSegmentIndex + 1} of ${show.length}`;


  hostNextSegment.textContent =
    next
      ? next.title
      : "Show Finale";
}


hostControlButton.addEventListener("click", function () {

  currentHostSegmentIndex = 0;

  loadHostControl();

  hideAllScreens();

  hostControlScreen.classList.add("active");
});


nextSegmentButton.addEventListener("click", function () {

  const show =
    getCurrentEvent().show || [];


  if (currentHostSegmentIndex < show.length - 1) {

    currentHostSegmentIndex++;

    loadHostControl();
  }
});


previousSegmentButton.addEventListener("click", function () {

  if (currentHostSegmentIndex > 0) {

    currentHostSegmentIndex--;

    loadHostControl();
  }
});


hostBackToHQButton.addEventListener("click", function () {

  hideAllScreens();

  eventHQScreen.classList.add("active");
});




function findActivityForShowSegment(
  segment,
  event
) {

  if (!segment) {
    return null;
  }

  const eventType =
    event.type ||
    "General Event";


  // Exact activity stored by Show Builder
  if (segment.activityId) {

    const exact =
      activityLibrary.find(
        function (activity) {

          return (
            activity.id ===
            segment.activityId
          );
        }
      );

    if (exact) {
      return exact;
    }
  }


  // Planned-show segments should launch
  // a specific activity, not merely any
  // activity using the same engine.
  const plannedActivityMap = {

    "Crowd Warm-Up":
      ({
        "Wedding":
          "crowd-pulse-universal-01",

        "Birthday":
          "birthday-bash-01",

        "Class Reunion":
          "reunion-then-now-01",

        "Corporate Event":
          "crowd-pulse-universal-01",

        "Holiday Party":
          "holiday-hot-takes-01",

        "School Event":
          "school-spirit-01",

        "Bar / Venue":
          "venue-crowd-chaos-01",

        "General Event":
          "general-room-rally-01"

      }[eventType] ||
        "crowd-pulse-universal-01"),

    "Side vs. Side Showdown":
      "side-showdown-universal-01",

    "Music Showdown":
      "generation-01",

    "Quick Laugh":
      "quick-laugh-universal-01",

    "Get the Room Moving":
      "movement-01",

    "Birthday Bash":
      "birthday-bash-01",

    "Then vs. Now":
      "reunion-then-now-01",

    "Office Showdown":
      "corporate-office-showdown-01",

    "Holiday Hot Takes":
      "holiday-hot-takes-01",

    "School Spirit Showdown":
      "school-spirit-01",

    "Bar Crowd Chaos":
      "venue-crowd-chaos-01",

    "Room Rally":
      "general-room-rally-01"
  };


  const wantedId =
    plannedActivityMap[
      segment.title
    ];


  if (wantedId) {

    const mapped =
      activityLibrary.find(
        function (activity) {

          return (
            activity.id ===
            wantedId
          );
        }
      );

    if (mapped) {
      return mapped;
    }
  }


  // Last fallback:
  // exact activity name
  return (
    activityLibrary.find(
      function (activity) {

        return (
          activity.name ===
            segment.title &&
          (
            activity.eventTypes.includes(
              eventType
            ) ||
            activity.eventTypes.includes(
              "All"
            )
          )
        );
      }
    ) ||
    null
  );
}


// ======================================================
// AUDIENCE DISPLAY
// ======================================================

const audienceEventName =
  document.getElementById("audienceEventName");

const audienceSegmentTitle =
  document.getElementById("audienceSegmentTitle");

const audienceSegmentMessage =
  document.getElementById("audienceSegmentMessage");

const audienceBackButton =
  document.getElementById("audienceBackButton");


const audienceScoreboard =
  document.getElementById("audienceScoreboard");

const audienceTeamAName =
  document.getElementById("audienceTeamAName");

const audienceTeamBName =
  document.getElementById("audienceTeamBName");

const audienceTeamAScore =
  document.getElementById("audienceTeamAScore");

const audienceTeamBScore =
  document.getElementById("audienceTeamBScore");


const audienceMultiTeamScoreboard =
  document.getElementById("audienceMultiTeamScoreboard");

const audienceMultiTeamScoreList =
  document.getElementById("audienceMultiTeamScoreList");


let audienceReturnScreen =
  "hostControl";


function hideAudienceScores() {

  audienceScoreboard.style.display =
    "none";

  audienceMultiTeamScoreboard.style.display =
    "none";
}


function openAudience() {

  hideAllScreens();

  audienceScreen.classList.add("active");
}


launchSegmentButton.addEventListener("click", function () {

  const event =
    getCurrentEvent();

  const show =
    event.show || [];


  if (show.length === 0) {

    alert(
      "No show is loaded."
    );

    return;
  }


  const segment =
    show[
      currentHostSegmentIndex
    ];


  const activity =
    findActivityForShowSegment(
      segment,
      event
    );


  // ----------------------------------------------
  // REAL INTERACTIVE ACTIVITY
  // ----------------------------------------------

  if (activity) {

    startLiveActivity(
      activity,
      "hostControl"
    );

    return;
  }


  // ----------------------------------------------
  // NON-INTERACTIVE SHOW MOMENT
  // ----------------------------------------------

  audienceReturnScreen =
    "hostControl";


  audienceEventName.textContent =
    event.eventName ||
    "Live Event";


  audienceSegmentTitle.textContent =
    segment.title;


  audienceSegmentMessage.textContent =
    segment.description;


  hideAudienceScores();


  audienceBackButton.textContent =
    "← HOST CONTROL";


  openAudience();
});


// ======================================================
// QUICK LAUNCH
// ======================================================

const quickLaunchBackButton =
  document.getElementById("quickLaunchBackButton");


let quickLaunchReturnScreen =
  "eventHQ";


quickLaunchButton.addEventListener("click", function () {

  quickLaunchReturnScreen =
    "eventHQ";

  quickLaunchBackButton.textContent =
    "← EVENT HQ";


  hideAllScreens();

  quickLaunchScreen.classList.add("active");
});


hostQuickLaunchButton.addEventListener("click", function () {

  quickLaunchReturnScreen =
    "hostControl";

  quickLaunchBackButton.textContent =
    "← HOST CONTROL";


  hideAllScreens();

  quickLaunchScreen.classList.add("active");
});


quickLaunchBackButton.addEventListener("click", function () {

  hideAllScreens();


  if (quickLaunchReturnScreen === "hostControl") {

    hostControlScreen.classList.add("active");

  } else {

    eventHQScreen.classList.add("active");
  }
});


document.querySelectorAll(".quick-activity").forEach(function (button) {

  button.addEventListener("click", function () {

    const activityName =
      this.dataset.activity;


    const quickAliases = {
      "Generation Battle":
        "Generation Showdown",
      "Battle of the Tables":
        "Table Takeover"
    };


    const requestedName =
      quickAliases[activityName] ||
      activityName;


    const liveActivity =
      activityLibrary.find(function (item) {

        const itemName =
          String(item.name || "")
            .toLowerCase();

        const targetName =
          String(requestedName)
            .toLowerCase();

        return (
          itemName === targetName ||
          itemName.includes(targetName) ||
          targetName.includes(itemName)
        );
      });


    const quickPrompts = {
      "Crowd Pulse":
        "Who is more likely to control the thermostat for the rest of their lives?",
      "Battle of the Tables":
        "Every table is officially a team. Get ready for a fast challenge and some serious bragging rights.",
      "Side vs. Side":
        "Pick your side. The room is splitting into two teams for a quick head-to-head showdown.",
      "Music Showdown":
        "Get ready for a fast music challenge. Listen closely and be ready to answer.",
      "Generation Battle":
        "Which generation owns the room tonight? Get ready to defend yours.",
      "Couple Spotlight":
        "All eyes on the couple. Let’s see how well this room really knows them.",
      "Quick Laugh":
        "Time for a quick reset. Get ready for something fast, ridiculous and easy to play.",
      "Room Rescue":
        "Energy check. We’re turning this room around with one fast challenge."
    };


    const activityToRun =
      liveActivity || {
        id:
          "quick-" +
          String(activityName)
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-"),
        name:
          activityName,
        description:
          quickPrompts[activityName] ||
          "A fast live activity for the entire room.",
        hostIntro:
          "Get your phones ready. The next activity is going live now.",
        rounds: [
          {
            title:
              "ROUND 1",
            prompt:
              quickPrompts[activityName] ||
              "Get ready. Your host is starting the next experience."
          }
        ],
        scoreType:
          "none",
        transition:
          "Give yourselves a hand."
      };


    startLiveActivity(
      activityToRun,
      "quickLaunch"
    );

    return;


    const event =
      getCurrentEvent();


    audienceReturnScreen =
      "quickLaunch";


    audienceEventName.textContent =
      event.eventName ||
      "Live Event";


    audienceSegmentTitle.textContent =
      activityName;

if (activityName === "Crowd Pulse") {

  audienceSegmentMessage.textContent =
    "Who is more likely to control the thermostat for the rest of their lives?";

} else if (activityName === "Battle of the Tables") {

  audienceSegmentMessage.textContent =
    "Every table is officially a team. Get ready for a fast challenge and some serious bragging rights.";

} else if (activityName === "Side vs. Side") {

  audienceSegmentMessage.textContent =
    "Pick your side. The room is splitting into two teams for a quick head-to-head showdown.";

} else if (activityName === "Music Showdown") {

  audienceSegmentMessage.textContent =
    "Get ready for a fast music challenge. Listen closely and be ready to answer.";

} else if (activityName === "Generation Battle") {

  audienceSegmentMessage.textContent =
    "Which generation owns the room tonight? Get ready to defend yours.";

} else if (activityName === "Couple Spotlight") {

  audienceSegmentMessage.textContent =
    "All eyes on the couple. Let’s see how well this room really knows them.";

} else if (activityName === "Quick Laugh") {

  audienceSegmentMessage.textContent =
    "Time for a quick reset. Get ready for something fast, ridiculous and easy to play.";

} else if (activityName === "Room Rescue") {

  audienceSegmentMessage.textContent =
    "Energy check. We’re turning this room around with one fast challenge.";

} else {

  audienceSegmentMessage.textContent =
    "Get ready. Your host is starting the next experience.";
}

    hideAudienceScores();


    audienceBackButton.textContent =
      "← QUICK LAUNCH";


    openAudience();
  });

});




const homeQuickLaunchButton =
  document.getElementById(
    "homeQuickLaunchButton"
  );

const homeEventDNACard =
  document.getElementById(
    "homeEventDNACard"
  );

const homeShowBuilderCard =
  document.getElementById(
    "homeShowBuilderCard"
  );

const homeHostControlCard =
  document.getElementById(
    "homeHostControlCard"
  );


function requireCurrentEventFromHome(
  action
) {

  const event =
    getCurrentEvent();

  if (!event || !event.id) {

    alert(
      "Open or create an event first."
    );

    return null;
  }

  action(event);

  return event;
}


homeQuickLaunchButton
  ?.addEventListener(
    "click",
    function () {

      requireCurrentEventFromHome(
        function () {

          quickLaunchReturnScreen =
            "eventHQ";

          quickLaunchBackButton.textContent =
            "← EVENT HQ";

          hideAllScreens();

          quickLaunchScreen.classList.add(
            "active"
          );
        }
      );
    }
  );


homeEventDNACard
  ?.addEventListener(
    "click",
    function () {

      requireCurrentEventFromHome(
        function (event) {

          openEventDNA(event);
        }
      );
    }
  );


homeShowBuilderCard
  ?.addEventListener(
    "click",
    function () {

      requireCurrentEventFromHome(
        function () {

          hideAllScreens();

          showBuilderScreen.classList.add(
            "active"
          );
        }
      );
    }
  );


homeHostControlCard
  ?.addEventListener(
    "click",
    function () {

      requireCurrentEventFromHome(
        function () {

          currentHostSegmentIndex =
            0;

          loadHostControl();

          hideAllScreens();

          hostControlScreen.classList.add(
            "active"
          );
        }
      );
    }
  );


// ======================================================
// MY EVENTS
// ======================================================

const eventsLibrary =
  document.getElementById("eventsLibrary");

const topMyEventsButton =
  document.getElementById(
    "topMyEventsButton"
  );

const homeMyEventsButton =
  document.getElementById(
    "homeMyEventsButton"
  );

const myEventsCreateButton =
  document.getElementById("myEventsCreateButton");

const myEventsHomeButton =
  document.getElementById("myEventsHomeButton");

const templatesButton =
  document.getElementById("templatesButton");


function renderSavedEvents() {

  const savedEvents =
    getSavedEvents();


  if (savedEvents.length === 0) {

    eventsLibrary.innerHTML = `

      <div class="feature-panel">

        <span class="small-label">
          YOUR EVENT LIBRARY
        </span>

        <h3>
          No saved events yet.
        </h3>

        <p>
          Create an event and it will appear here.
        </p>

      </div>

    `;

    return;
  }


  eventsLibrary.innerHTML = "";


  savedEvents.forEach(function (event) {

    const card =
      document.createElement("div");


    card.className =
      "feature-panel";


    card.style.marginBottom =
      "14px";


    const status =
      event.show &&
      event.show.length > 0
        ? "SHOW READY"
        : "EVENT SAVED";


    card.innerHTML = `

      <span class="small-label">
        ${event.type || "EVENT"} • ${status}
      </span>

      <h3>
        ${event.eventName || "Untitled Event"}
      </h3>

      <p>
        ${
          event.type === "Wedding"
            ? [event.partnerOne, event.partnerTwo]
                .filter(Boolean)
                .join(" & ")
            : (
                event.eventStory ||
                event.guestAgeRange ||
                "Ready to build"
              )
        }
      </p>

      <div
        class="main-actions"
        style="margin-top:16px;"
      >

        <button
          class="primary-button open-saved-event"
          data-event-id="${event.id}">
          OPEN EVENT
        </button>

        <button
          class="secondary-button edit-saved-event"
          data-event-id="${event.id}">
          EDIT
        </button>

        <button
          class="secondary-button duplicate-saved-event"
          data-event-id="${event.id}">
          DUPLICATE
        </button>

        <button
          class="secondary-button save-template-event"
          data-event-id="${event.id}">
          SAVE AS TEMPLATE
        </button>

        <button
          class="secondary-button delete-saved-event"
          data-event-id="${event.id}">
          DELETE
        </button>

      </div>

    `;


    eventsLibrary.appendChild(card);
  });

}


eventsLibrary.addEventListener("click", function (event) {

  const button =
    event.target.closest("button");


  if (!button) {
    return;
  }


  const eventId =
    button.dataset.eventId;


  if (!eventId) {
    return;
  }


  const savedEvents =
    getSavedEvents();


  const selectedEvent =
    savedEvents.find(function (item) {
      return item.id === eventId;
    });


  if (!selectedEvent) {
    return;
  }


  // OPEN

  if (button.classList.contains("open-saved-event")) {

    saveCurrentEvent(selectedEvent);

    updateEventHQ(selectedEvent);

    hideAllScreens();

    eventHQScreen.classList.add("active");

    return;
  }


  // EDIT

  if (button.classList.contains("edit-saved-event")) {

    saveCurrentEvent(selectedEvent);

    openEventDNA(selectedEvent);

    return;
  }


  // DUPLICATE

  if (button.classList.contains("duplicate-saved-event")) {

    const copy = {

      ...selectedEvent,

      id:
        "event-" + Date.now(),

      createdAt:
        new Date().toISOString(),

      updatedAt:
        new Date().toISOString(),

      eventName:
        (selectedEvent.eventName || "Event") +
        " COPY"
    };


    savedEvents.push(copy);

    saveEvents(savedEvents);

    renderSavedEvents();

    return;
  }


  // SAVE AS TEMPLATE

  if (button.classList.contains("save-template-event")) {

    const templates =
      JSON.parse(localStorage.getItem("savedTemplates")) || [];


    templates.push({

      ...selectedEvent,

      id:
        "template-" + Date.now(),

      templateName:
        (selectedEvent.eventName || "Event") +
        " Template",

      createdAt:
        new Date().toISOString()

    });


    localStorage.setItem(
      "savedTemplates",
      JSON.stringify(templates)
    );


    alert("Template saved.");

    return;
  }


  // DELETE

  if (button.classList.contains("delete-saved-event")) {

    const confirmed =
      confirm(
        `Delete "${selectedEvent.eventName || "this event"}"?`
      );


    if (!confirmed) {
      return;
    }


    const updated =
      savedEvents.filter(function (item) {
        return item.id !== eventId;
      });


    saveEvents(updated);

    renderSavedEvents();
  }

});


homeMyEventsButton.addEventListener("click", function () {

  renderSavedEvents();

  hideAllScreens();

  myEventsScreen.classList.add("active");
});


topMyEventsButton.addEventListener("click", function () {

  renderSavedEvents();

  hideAllScreens();

  myEventsScreen.classList.add("active");
});


myEventsCreateButton.addEventListener("click", function () {

  localStorage.removeItem("currentEvent");

  clearWeddingForm();

  hideAllScreens();

  eventSetupScreen.classList.add("active");
});


myEventsHomeButton.addEventListener("click", function () {

  hideAllScreens();

  homeScreen.classList.add("active");
});


// ======================================================
// TEMPLATES
// ======================================================

const templatesScreenButton =
  document.getElementById("templatesButton");

const templatesBackButton =
  document.getElementById("templatesBackButton");

const templatesLibrary =
  document.getElementById("templatesLibrary");


function renderTemplates() {

  const templates =
    JSON.parse(localStorage.getItem("savedTemplates")) || [];


  if (templates.length === 0) {

    templatesLibrary.innerHTML = `

      <div class="feature-panel">

        <span class="small-label">
          YOUR TEMPLATE LIBRARY
        </span>

        <h3>
          No templates saved yet.
        </h3>

        <p>
          Save an event as a template and it will appear here.
        </p>

      </div>

    `;

    return;
  }


  templatesLibrary.innerHTML = "";


  templates.forEach(function (template) {

    const card =
      document.createElement("div");


    card.className =
      "feature-panel";


    card.style.marginBottom =
      "14px";


    card.innerHTML = `

      <span class="small-label">
        ${template.type || "EVENT"} TEMPLATE
      </span>

      <h3>
        ${template.templateName || "Saved Template"}
      </h3>

      <p>
        Reuse this setup as the starting point for a new event.
      </p>

      <div
        class="main-actions"
        style="margin-top:16px;"
      >

        <button
          class="primary-button use-template"
          data-template-id="${template.id}">
          USE TEMPLATE
        </button>

        <button
          class="secondary-button delete-template"
          data-template-id="${template.id}">
          DELETE TEMPLATE
        </button>

      </div>

    `;


    templatesLibrary.appendChild(card);
  });
}


templatesScreenButton.addEventListener("click", function () {

  renderTemplates();

  hideAllScreens();

  templatesScreen.classList.add("active");
});


templatesBackButton.addEventListener("click", function () {

  renderSavedEvents();

  hideAllScreens();

  myEventsScreen.classList.add("active");
});


templatesLibrary.addEventListener("click", function (event) {

  const button =
    event.target.closest("button");


  if (!button) {
    return;
  }


  const id =
    button.dataset.templateId;


  if (!id) {
    return;
  }


  const templates =
    JSON.parse(localStorage.getItem("savedTemplates")) || [];


  const template =
    templates.find(function (item) {
      return item.id === id;
    });


  if (!template) {
    return;
  }


  if (button.classList.contains("use-template")) {

    const newEvent = {

      ...template,

      id:
        "event-" + Date.now(),

      createdAt:
        new Date().toISOString(),

      updatedAt:
        new Date().toISOString(),

      eventName:
        "New Event from " +
        (template.templateName || "Template")
    };


    delete newEvent.templateName;


    saveCurrentEvent(newEvent);

    updateEventInLibrary(newEvent);

    openEventDNA(newEvent);

    return;
  }


  if (button.classList.contains("delete-template")) {

    const confirmed =
      confirm(
        `Delete "${template.templateName || "this template"}"?`
      );


    if (!confirmed) {
      return;
    }


    const updated =
      templates.filter(function (item) {
        return item.id !== id;
      });


    localStorage.setItem(
      "savedTemplates",
      JSON.stringify(updated)
    );


    renderTemplates();
  }

});


// ======================================================
// SHOW DIRECTOR
// ======================================================

const directorBackButton =
  document.getElementById("directorBackButton");

const directorRecommendButton =
  document.getElementById("directorRecommendButton");

const directorResult =
  document.getElementById("directorResult");


let directorTime = null;
let directorMoment = null;
let directorCrowd = null;


showDirectorButton.addEventListener("click", function () {

  directorTime = null;
  directorMoment = null;
  directorCrowd = null;

  directorResult.innerHTML = "";


  document.querySelectorAll(
    ".director-time, .director-moment, .director-crowd"
  ).forEach(function (button) {

    button.classList.remove("selected-choice");

  });


  hideAllScreens();

  showDirectorScreen.classList.add("active");
});


directorBackButton.addEventListener("click", function () {

  hideAllScreens();

  eventHQScreen.classList.add("active");
});


document.querySelectorAll(".director-time").forEach(function (button) {

  button.addEventListener("click", function () {

    document.querySelectorAll(".director-time").forEach(function (item) {
      item.classList.remove("selected-choice");
    });

    this.classList.add("selected-choice");

    directorTime =
      Number(this.dataset.time);
  });

});


document.querySelectorAll(".director-moment").forEach(function (button) {

  button.addEventListener("click", function () {

    document.querySelectorAll(".director-moment").forEach(function (item) {
      item.classList.remove("selected-choice");
    });

    this.classList.add("selected-choice");

    directorMoment =
      this.dataset.moment;
  });

});


document.querySelectorAll(".director-crowd").forEach(function (button) {

  button.addEventListener("click", function () {

    document.querySelectorAll(".director-crowd").forEach(function (item) {
      item.classList.remove("selected-choice");
    });

    this.classList.add("selected-choice");

    directorCrowd =
      this.dataset.crowd;
  });

});


function findDirectorActivities() {

  const currentEvent =
    getCurrentEvent();

  const eventType =
    currentEvent.type ||
    "Wedding";

  const scored =
    activityLibrary
      .filter(function (activity) {

        return (
          activity.eventTypes.includes(eventType) ||
          activity.eventTypes.includes("All")
        );

      })
      .map(function (activity) {

        let score = 0;

        if (
          activity.minutes.includes(directorTime)
        ) {
          score += 4;
        }

        if (
          activity.energy.includes(directorMoment)
        ) {
          score += 5;
        }

        if (
          activity.crowds.includes(directorCrowd)
        ) {
          score += 3;
        }

        // Strong preference for activities built
        // specifically for this exact event type.
        if (
          activity.eventTypes.includes(eventType) &&
          activity.eventTypes.length === 1
        ) {
          score += 8;
        }

        return {
          activity: activity,
          score: score
        };

      })
      .sort(function (a, b) {

        return b.score - a.score;

      });

  return scored
    .slice(0, 3)
    .map(function (item) {
      return item.activity;
    });
}


directorRecommendButton.addEventListener("click", function () {

  if (!directorTime) {

    alert("Choose how much time you need.");

    return;
  }


  if (!directorMoment) {

    alert("Choose what is happening in the room.");

    return;
  }


  if (!directorCrowd) {

    alert("Choose what the crowd is like.");

    return;
  }


  const recommendations =
    findDirectorActivities();


  directorResult.innerHTML = `

    <div style="margin-bottom:18px;">

      <span class="small-label">
        SHOW DIRECTOR • BEST FITS
      </span>

      <h2 style="
        font-family:Georgia,'Times New Roman',serif;
        font-size:46px;
        margin:10px 0;
      ">
        Here are your best options.
      </h2>

      <p style="color:var(--muted);">
        ${directorTime} minutes •
        ${directorMoment} •
        ${directorCrowd}
      </p>

    </div>

  `;


  recommendations.forEach(function (activity, index) {

    const card =
      document.createElement("div");


    card.className =
      "feature-panel";


    card.style.marginBottom =
      "16px";


    card.innerHTML = `

      <span class="small-label">
        ${index === 0 ? "BEST FIT" : "OPTION " + (index + 1)}
        •
        ${activity.engine.toUpperCase()}
      </span>

      <h3>
        ${activity.name}
      </h3>

      <p>
        ${activity.description}
      </p>

      <div style="margin-top:16px;">

        <span class="small-label">
          HOST OPENING
        </span>

        <p>
          "${activity.hostIntro}"
        </p>

      </div>

      ${
        activity.requiresMusic
          ? `
            <p style="
              color:var(--gold-light);
              margin-top:14px;
            ">
              🎵 Uses the entertainer's music source
            </p>
          `
          : ""
      }

      <div
        class="main-actions"
        style="margin-top:20px;"
      >

        <button
          class="primary-button director-run-activity"
          data-activity-id="${activity.id}">
          RUN THIS NOW
        </button>

        <button
          class="secondary-button director-preview-activity"
          data-activity-id="${activity.id}">
          SEE FULL PLAN
        </button>

      </div>

    `;


    directorResult.appendChild(card);
  });
});


function showActivityPlan(activity) {

  directorResult.innerHTML = `

    <div class="feature-panel">

      <span class="small-label">
        ${activity.engine.toUpperCase()}
      </span>

      <h2 style="
        font-family:Georgia,'Times New Roman',serif;
        font-size:48px;
        margin:12px 0;
      ">
        ${activity.name}
      </h2>

      <p>
        ${activity.description}
      </p>


      <div style="margin-top:24px;">

        <span class="small-label">
          WHAT THE HOST SAYS
        </span>

        <p style="font-size:18px;">
          "${activity.hostIntro}"
        </p>

      </div>


      ${activity.rounds.map(function (round, index) {

        return `

          <div
            class="feature-panel"
            style="margin-top:12px;"
          >

            <span class="small-label">
              ROUND ${index + 1}
            </span>

            ${
              round.title
                ? `<h3>${round.title}</h3>`
                : ""
            }

            <p>
              ${round.prompt}
            </p>

          </div>

        `;

      }).join("")}


      ${
        activity.scoring
          ? `
            <div style="margin-top:24px;">

              <span class="small-label">
                SCORING
              </span>

              <p>
                ${activity.scoring}
              </p>

            </div>
          `
          : ""
      }


      <div style="margin-top:24px;">

        <span class="small-label">
          TRANSITION OUT
        </span>

        <p>
          "${activity.transition}"
        </p>

      </div>


      <div
        class="main-actions"
        style="margin-top:26px;"
      >

        <button
          class="primary-button director-run-activity"
          data-activity-id="${activity.id}">
          RUN THIS NOW
        </button>

        <button
          class="secondary-button"
          id="directorMoreIdeasButton">
          ← BACK TO IDEAS
        </button>

      </div>

    </div>

  `;
}


directorResult.addEventListener("click", function (event) {

  const previewButton =
    event.target.closest(".director-preview-activity");


  if (previewButton) {

    const activity =
      activityLibrary.find(function (item) {
        return item.id === previewButton.dataset.activityId;
      });


    if (activity) {
      showActivityPlan(activity);
    }

    return;
  }


  if (event.target.id === "directorMoreIdeasButton") {

    directorRecommendButton.click();

    return;
  }


  const runButton =
    event.target.closest(".director-run-activity");


  if (runButton) {

    const activity =
      activityLibrary.find(function (item) {
        return item.id === runButton.dataset.activityId;
      });


    if (activity) {
      startLiveActivity(activity);
    }

  }

});


// ======================================================
// LIVE ACTIVITY HOST
// ======================================================

const liveActivityTitle =
  document.getElementById("liveActivityTitle");

const liveActivityDescription =
  document.getElementById("liveActivityDescription");

const liveActivityHostIntro =
  document.getElementById("liveActivityHostIntro");

const liveRoundTitle =
  document.getElementById("liveRoundTitle");

const liveRoundPrompt =
  document.getElementById("liveRoundPrompt");

const liveRoundRule =
  document.getElementById("liveRoundRule");

const liveRoundTime =
  document.getElementById("liveRoundTime");

const liveRoundPosition =
  document.getElementById("liveRoundPosition");

const liveNextRound =
  document.getElementById("liveNextRound");

const livePreviousRoundButton =
  document.getElementById("livePreviousRoundButton");

const liveNextRoundButton =
  document.getElementById("liveNextRoundButton");

const sendRoundToAudienceButton =
  document.getElementById("sendRoundToAudienceButton");

const finishLiveActivityButton =
  document.getElementById("finishLiveActivityButton");

const liveActivityBackButton =
  document.getElementById("liveActivityBackButton");


let activeLiveActivity = null;
let activeLiveRoundIndex = 0;


// ======================================================
// TWO-TEAM SCOREBOARD
// ======================================================

const twoTeamScorePanel =
  document.getElementById("twoTeamScorePanel");

const liveTeamAScore =
  document.getElementById("liveTeamAScore");

const liveTeamBScore =
  document.getElementById("liveTeamBScore");

const teamANameInput =
  document.getElementById("teamANameInput");

const teamBNameInput =
  document.getElementById("teamBNameInput");

const teamAPlusButton =
  document.getElementById("teamAPlusButton");

const teamAMinusButton =
  document.getElementById("teamAMinusButton");

const teamBPlusButton =
  document.getElementById("teamBPlusButton");

const teamBMinusButton =
  document.getElementById("teamBMinusButton");

const resetLiveScoreButton =
  document.getElementById("resetLiveScoreButton");


let teamAScore = 0;
let teamBScore = 0;


function updateTwoTeamHostScore() {

  liveTeamAScore.textContent =
    teamAScore;

  liveTeamBScore.textContent =
    teamBScore;
}


function updateAudienceTwoTeamScore() {

  audienceTeamAName.textContent =
    teamANameInput.value.trim() ||
    "TEAM A";

  audienceTeamBName.textContent =
    teamBNameInput.value.trim() ||
    "TEAM B";

  audienceTeamAScore.textContent =
    teamAScore;

  audienceTeamBScore.textContent =
    teamBScore;
}


teamAPlusButton.addEventListener("click", function () {

  teamAScore++;

  updateTwoTeamHostScore();
});


teamAMinusButton.addEventListener("click", function () {

  if (teamAScore > 0) {
    teamAScore--;
  }

  updateTwoTeamHostScore();
});


teamBPlusButton.addEventListener("click", function () {

  teamBScore++;

  updateTwoTeamHostScore();
});


teamBMinusButton.addEventListener("click", function () {

  if (teamBScore > 0) {
    teamBScore--;
  }

  updateTwoTeamHostScore();
});


resetLiveScoreButton.addEventListener("click", function () {

  teamAScore = 0;
  teamBScore = 0;

  updateTwoTeamHostScore();
});


// ======================================================
// MULTI-TEAM SCOREBOARD
// ======================================================

const multiTeamScorePanel =
  document.getElementById("multiTeamScorePanel");

const multiTeamScoreList =
  document.getElementById("multiTeamScoreList");

const addMultiTeamButton =
  document.getElementById("addMultiTeamButton");

const resetMultiTeamScoreButton =
  document.getElementById("resetMultiTeamScoreButton");


let multiTeams = [];


function createDefaultMultiTeams(activity) {

  if (activity.id === "generation-01") {

    multiTeams = [
      { name: "BOOMERS", score: 0 },
      { name: "GEN X", score: 0 },
      { name: "MILLENNIALS", score: 0 },
      { name: "GEN Z", score: 0 }
    ];

    return;
  }


  if (
  activity.id === "tables-01" ||
  activity.teamMode === "tables"
) {

  createTableTeamsFromEvent();

  return;
}


  multiTeams = [
    { name: "TEAM 1", score: 0 },
    { name: "TEAM 2", score: 0 }
  ];
}


function renderMultiTeamHostScore() {

  multiTeamScoreList.innerHTML = "";


  multiTeams.forEach(function (team, index) {

    const row =
      document.createElement("div");


    row.className =
      "feature-panel";


    row.style.marginBottom =
      "12px";


    row.innerHTML = `

      <div
        style="
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:18px;
          flex-wrap:wrap;
        "
      >

        <input
          type="text"
          class="multi-team-name"
          data-team-index="${index}"
          value="${team.name}"
          style="
            min-width:180px;
            background:transparent;
            border:none;
            color:var(--gold);
            font-weight:bold;
            font-size:15px;
          "
        >

        <h3 style="
          margin:0;
          font-size:36px;
        ">
          ${team.score}
        </h3>

        <div class="main-actions">

          <button
            class="secondary-button multi-team-minus"
            data-team-index="${index}">
            − 1
          </button>

          <button
            class="primary-button multi-team-plus"
            data-team-index="${index}">
            + 1
          </button>

          <button
            class="secondary-button multi-team-remove"
            data-team-index="${index}">
            REMOVE
          </button>

        </div>

      </div>

    `;


    multiTeamScoreList.appendChild(row);
  });
}


multiTeamScoreList.addEventListener("click", function (event) {

  const button =
    event.target.closest("button");


  if (!button) {
    return;
  }


  const index =
    Number(button.dataset.teamIndex);


  if (!multiTeams[index]) {
    return;
  }


  if (button.classList.contains("multi-team-plus")) {
    multiTeams[index].score++;
  }


  if (
    button.classList.contains("multi-team-minus") &&
    multiTeams[index].score > 0
  ) {
    multiTeams[index].score--;
  }


  if (button.classList.contains("multi-team-remove")) {
    multiTeams.splice(index, 1);
  }


  renderMultiTeamHostScore();
});


multiTeamScoreList.addEventListener("input", function (event) {

  if (!event.target.classList.contains("multi-team-name")) {
    return;
  }


  const index =
    Number(event.target.dataset.teamIndex);


  if (!multiTeams[index]) {
    return;
  }


  multiTeams[index].name =
    event.target.value;
});


addMultiTeamButton.addEventListener("click", function () {

  multiTeams.push({

    name:
      "TEAM " + (multiTeams.length + 1),

    score:
      0

  });


  renderMultiTeamHostScore();
});


resetMultiTeamScoreButton.addEventListener("click", function () {

  multiTeams.forEach(function (team) {
    team.score = 0;
  });


  renderMultiTeamHostScore();
});


function renderAudienceMultiTeamScore() {

  audienceMultiTeamScoreList.innerHTML =
    "";


  multiTeams.forEach(function (team) {

    const card =
      document.createElement("div");


    card.className =
      "feature-panel";


    card.style.minWidth =
      "180px";


    card.style.textAlign =
      "center";


    card.innerHTML = `

      <span class="small-label">
        ${team.name || "TEAM"}
      </span>

      <h3 style="
        font-size:54px;
        margin:12px 0 0;
      ">
        ${team.score}
      </h3>

    `;


    audienceMultiTeamScoreList.appendChild(card);
  });
}


// ======================================================
// START / LOAD LIVE ACTIVITY
// ======================================================

let liveActivityReturnScreen =
  "showDirector";


function startLiveActivity(
  activity,
  returnScreen = "showDirector"
) {

  liveActivityReturnScreen =
    returnScreen;

  liveActivityBackButton.textContent =
    returnScreen === "hostControl"
      ? "← HOST CONTROL"
      : returnScreen === "quickLaunch"
        ? "← QUICK LAUNCH"
        : "← SHOW DIRECTOR";

  activeLiveActivity =
    activity;

  activeLiveRoundIndex =
    0;


  localStorage.setItem(
    "activeActivity",
    JSON.stringify(activity)
  );


  teamAScore =
    0;

  teamBScore =
    0;


  updateTwoTeamHostScore();


  if (
    activity.scoreType === "two-team" &&
    Array.isArray(activity.teamNames)
  ) {

    teamANameInput.value =
      activity.teamNames[0] ||
      "TEAM A";

    teamBNameInput.value =
      activity.teamNames[1] ||
      "TEAM B";

  } else {

    teamANameInput.value =
      "TEAM A";

    teamBNameInput.value =
      "TEAM B";
  }


  if (activity.scoreType === "multi-team") {

    createDefaultMultiTeams(activity);

    renderMultiTeamHostScore();
  }


  loadLiveActivityHost();


  hideAllScreens();

  const activityParent =
    liveActivityHostScreen.parentElement;

  if (
    activityParent &&
    activityParent.firstElementChild !==
      liveActivityHostScreen
  ) {
    activityParent.insertBefore(
      liveActivityHostScreen,
      activityParent.firstElementChild
    );
  }

  liveActivityHostScreen.classList.add("active");

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "auto"
  });

  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  requestAnimationFrame(function () {
    liveActivityHostScreen.scrollIntoView({
      behavior: "auto",
      block: "start"
    });
  });
}


function updateLiveScorePanels() {

  if (!activeLiveActivity) {
    return;
  }


  if (activeLiveActivity.scoreType === "none") {

    twoTeamScorePanel.style.display =
      "none";

    multiTeamScorePanel.style.display =
      "none";

    return;
  }


  if (activeLiveActivity.scoreType === "two-team") {

    twoTeamScorePanel.style.display =
      "block";

    multiTeamScorePanel.style.display =
      "none";

    return;
  }


  if (activeLiveActivity.scoreType === "multi-team") {

    twoTeamScorePanel.style.display =
      "none";

    multiTeamScorePanel.style.display =
      "block";
  }
}


function loadLiveActivityHost() {

  if (!activeLiveActivity) {
    return;
  }


  const rounds =
    activeLiveActivity.rounds || [];


  liveActivityTitle.textContent =
    activeLiveActivity.name;


  liveActivityDescription.textContent =
    activeLiveActivity.description;


  liveActivityHostIntro.textContent =
    activeLiveActivity.hostIntro ||
    "—";


  if (rounds.length === 0) {

    liveRoundTitle.textContent =
      "No rounds";

    liveRoundPrompt.textContent =
      "No round content yet.";

    liveRoundPosition.textContent =
      "0 of 0";

    liveNextRound.textContent =
      "—";


    updateLiveScorePanels();

    return;
  }


  if (activeLiveRoundIndex < 0) {
    activeLiveRoundIndex = 0;
  }


  if (activeLiveRoundIndex >= rounds.length) {
    activeLiveRoundIndex = rounds.length - 1;
  }


  const current =
    rounds[activeLiveRoundIndex];

  const next =
    rounds[activeLiveRoundIndex + 1];


  liveRoundTitle.textContent =
    current.title ||
    `Round ${activeLiveRoundIndex + 1}`;


  liveRoundPrompt.textContent =
    current.prompt ||
    "—";
    liveRoundRule.textContent =
  current.rule
    ? "RULE: " + current.rule
    : "";

liveRoundTime.textContent =
  current.timeLimit
    ? "TIME LIMIT: " + current.timeLimit + " SECONDS"
    : "";


  liveRoundPosition.textContent =
    `${activeLiveRoundIndex + 1} of ${rounds.length}`;


  liveNextRound.textContent =
    next
      ? (
          next.title ||
          `Round ${activeLiveRoundIndex + 2}`
        )
      : "Final Round";

  const responseMessage =
    document.getElementById(
      "livePhoneResponseMessage"
    );

  if (responseMessage) {
    responseMessage.textContent =
      "Click Show Live on All Screens to open voting or the buzzer.";
  }


  updateLiveScorePanels();
}


liveNextRoundButton.addEventListener("click", function () {

  if (!activeLiveActivity) {
    return;
  }


  const rounds =
    activeLiveActivity.rounds || [];


  if (activeLiveRoundIndex < rounds.length - 1) {

    activeLiveRoundIndex++;

    loadLiveActivityHost();
  }
});


livePreviousRoundButton.addEventListener("click", function () {

  if (activeLiveRoundIndex > 0) {

    activeLiveRoundIndex--;

    loadLiveActivityHost();
  }
});


// ======================================================
// SEND LIVE ACTIVITY ROUND TO AUDIENCE
// ======================================================

let liveActivityPollListenerRef = null;


function startLiveActivityPollResponseListener(eventCode) {

  if (liveActivityPollListenerRef) {
    liveActivityPollListenerRef.off();
  }

  liveActivityPollListenerRef =
    eventDatabase.ref(
      "events/" + eventCode + "/poll"
    );

  liveActivityPollListenerRef.on(
    "value",
    function (snapshot) {

      const poll = snapshot.val();
      const message =
        document.getElementById(
          "livePhoneResponseMessage"
        );

      if (!message || !poll) return;

      message.textContent =
        poll.choiceOne +
        ": " +
        Number(poll.votesOne || 0) +
        " votes • " +
        poll.choiceTwo +
        ": " +
        Number(poll.votesTwo || 0) +
        " votes";
    }
  );
}

function syncLiveResultToAllScreens(result) {

  const event =
    getCurrentEvent();

  if (
    !event ||
    !event.id ||
    typeof eventDatabase === "undefined"
  ) {
    return Promise.resolve();
  }

  const eventCode =
    getGuestEventCode(event);

  const prompt =
    String(result.detail || "").trim();

  let choiceText = prompt;

  [":", " - ", " — "]
    .forEach(function (separator) {
      if (choiceText.includes(separator)) {
        choiceText = choiceText.split(separator).pop();
      }
    });

  choiceText = choiceText
    .replace(/[?.!]+$/g, "")
    .trim();

  const choiceParts = choiceText
    .split(/\s+or\s+/i)
    .map(function (choice) {
      return choice.trim();
    })
    .filter(Boolean);

  const hasTwoChoices =
    choiceParts.length === 2 &&
    choiceParts[0].length <= 80 &&
    choiceParts[1].length <= 80;

  const resultWrite = eventDatabase
    .ref(
      "events/" +
      eventCode +
      "/guestResults"
    )
    .set({
      active: true,
      title:
        result.title ||
        "LIVE NOW",
      value:
        result.value ||
        "GET READY",
      detail:
        result.detail ||
        "",
      updatedAt:
        firebase.database.ServerValue.TIMESTAMP
    });

  if (hasTwoChoices) {

    const activeFeatures =
      getActiveGuestFeatures();

    if (!activeFeatures.includes("Voting")) {
      activeFeatures.push("Voting");
      saveActiveGuestFeatures(activeFeatures);
    }

    const poll = {
      question: prompt || result.title || "Choose one",
      choiceOne: choiceParts[0],
      choiceTwo: choiceParts[1],
      votesOne: 0,
      votesTwo: 0,
      launchedAt: new Date().toISOString()
    };

    localStorage.setItem(
      "liveGuestPoll-" + event.id,
      JSON.stringify(poll)
    );

    eventDatabase
      .ref("events/" + eventCode + "/poll")
      .set(poll);

    const responseMessage =
      document.getElementById(
        "livePhoneResponseMessage"
      );

    if (responseMessage) {
      responseMessage.textContent =
        "Voting is open on guest phones: " +
        choiceParts[0] +
        " or " +
        choiceParts[1];
    }

    startLiveActivityPollResponseListener(
      eventCode
    );

    eventDatabase
      .ref("events/" + eventCode + "/buzzer")
      .remove();

  } else if (prompt) {

    eventDatabase
      .ref("events/" + eventCode + "/poll")
      .remove();

    eventDatabase
      .ref("events/" + eventCode + "/buzzer")
      .set({
        open: true,
        prompt: prompt,
        winner: null,
        openedAt:
          firebase.database.ServerValue.TIMESTAMP
      });

    const responseMessage =
      document.getElementById(
        "livePhoneResponseMessage"
      );

    if (responseMessage) {
      responseMessage.textContent =
        "The buzzer is open on every guest phone. Waiting for the first response.";
    }

    startFirebaseBuzzerListener();
  }

  return resultWrite;
}

sendRoundToAudienceButton.addEventListener("click", function () {

  if (!activeLiveActivity) {
    return;
  }


  const rounds =
    activeLiveActivity.rounds || [];


  if (rounds.length === 0) {
    return;
  }


  const round =
    rounds[activeLiveRoundIndex];


  const event =
    getCurrentEvent();


  audienceReturnScreen =
    "liveActivity";


  audienceEventName.textContent =
    event.eventName ||
    "Live Event";


  // ----------------------------------------------------
  // GENERATION SHOWDOWN SPECIAL PRESENTATION
  // ----------------------------------------------------

  if (activeLiveActivity.id === "generation-01") {

  const generationAudienceMessages = {
    "Boomers":
      "Boomers, this round belongs to you. Get ready to show the room what your generation brought to the dance floor.",
    "Gen X":
      "Gen X, you're up. Time to prove the MTV generation still knows how to take over a dance floor.",
    "Millennials":
      "Millennials, this is your round. Get ready to represent your generation.",
    "Gen Z":
      "Gen Z, you're up. Show the rest of the room what you've got."
  };

  audienceSegmentTitle.textContent =
    "GENERATION SHOWDOWN";

  audienceSegmentMessage.textContent =
    generationAudienceMessages[round.title] ||
    round.title ||
    "Get ready for the next generation.";

} else {

    audienceSegmentTitle.textContent =
      activeLiveActivity.name;


    audienceSegmentMessage.textContent =
      `${round.title ? round.title + " — " : ""}${round.prompt || ""}`;
  }


  hideAudienceScores();


  // TWO TEAM

  if (activeLiveActivity.scoreType === "two-team") {

    updateAudienceTwoTeamScore();

    audienceScoreboard.style.display =
      "flex";
  }


  // MULTI TEAM

  if (activeLiveActivity.scoreType === "multi-team") {

    renderAudienceMultiTeamScore();

    audienceMultiTeamScoreboard.style.display =
      "block";
  }


  audienceBackButton.textContent =
    "← LIVE ACTIVITY CONTROL";


  openAudience();
});


// ======================================================
// FINISH LIVE ACTIVITY
// ======================================================

finishLiveActivityButton.addEventListener("click", function () {

  if (!activeLiveActivity) {
    return;
  }


  const event =
    getCurrentEvent();


  audienceReturnScreen =
    liveActivityReturnScreen === "hostControl"
      ? "liveActivityFinishedHostControl"
      : "liveActivityFinished";


  audienceEventName.textContent =
    event.eventName ||
    "Live Event";


  audienceSegmentTitle.textContent =
    "ACTIVITY COMPLETE";


  audienceSegmentMessage.textContent =
    activeLiveActivity.transition ||
    "Give yourselves a hand.";


  hideAudienceScores();


  audienceBackButton.textContent =
    "← EVENT HQ";


  let finishValue =
    "THANK YOU FOR PLAYING";

  let finishDetail =
    activeLiveActivity.transition ||
    "Give yourselves a hand.";


  if (
    activeLiveActivity.scoreType ===
    "two-team"
  ) {

    const teamAName =
      teamANameInput.value.trim() ||
      "TEAM A";

    const teamBName =
      teamBNameInput.value.trim() ||
      "TEAM B";

    finishValue =
      teamAScore === teamBScore
        ? "TIE GAME"
        : teamAScore > teamBScore
          ? teamAName + " WINS!"
          : teamBName + " WINS!";

    finishDetail =
      teamAName +
      " " +
      teamAScore +
      " • " +
      teamBName +
      " " +
      teamBScore;
  }


  if (
    activeLiveActivity.scoreType ===
    "multi-team" &&
    multiTeams.length
  ) {

    const highestScore =
      Math.max.apply(
        null,
        multiTeams.map(function (team) {
          return team.score;
        })
      );

    const winners =
      multiTeams.filter(function (team) {
        return team.score === highestScore;
      });

    finishValue =
      winners.length === 1
        ? winners[0].name + " WINS!"
        : "TIE GAME";

    finishDetail =
      winners
        .map(function (team) {
          return team.name;
        })
        .join(" • ") +
      " — " +
      highestScore +
      " points";
  }


  const finishReturnScreen =
    liveActivityReturnScreen;


  syncLiveResultToAllScreens({
    title: "ACTIVITY COMPLETE",
    value: finishValue,
    detail: finishDetail
  })
    .then(function () {

      activeLiveActivity = null;

      localStorage.removeItem(
        "activeActivity"
      );

      hideAllScreens();

      if (
        finishReturnScreen ===
        "hostControl"
      ) {

        loadHostControl();

        hostControlScreen.classList.add(
          "active"
        );

      } else if (
        finishReturnScreen ===
        "quickLaunch"
      ) {

        quickLaunchScreen.classList.add(
          "active"
        );

      } else {

        updateEventHQ(
          getCurrentEvent()
        );

        eventHQScreen.classList.add(
          "active"
        );
      }
    })
    .catch(function (error) {

      console.error(
        "Finish activity sync failed:",
        error
      );

      alert(
        "The final result could not be sent. Please try again."
      );
    });
});


liveActivityBackButton.addEventListener("click", function () {

  activeLiveActivity =
    null;

  localStorage.removeItem(
    "activeActivity"
  );

  hideAllScreens();

  if (
    liveActivityReturnScreen ===
    "hostControl"
  ) {

    loadHostControl();

    hostControlScreen.classList.add(
      "active"
    );

    return;
  }


  if (
    liveActivityReturnScreen ===
    "quickLaunch"
  ) {

    quickLaunchScreen.classList.add(
      "active"
    );

    return;
  }

  showDirectorScreen.classList.add(
    "active"
  );
});


// ======================================================
// AUDIENCE BACK BUTTON — ONE CLEAN ROUTER
// ======================================================

audienceBackButton.addEventListener("click", function () {

  hideAllScreens();


  if (audienceReturnScreen === "liveActivity") {

    liveActivityHostScreen.classList.add("active");

    return;
  }


  if (
    audienceReturnScreen ===
    "liveActivityFinishedHostControl"
  ) {

    activeLiveActivity =
      null;

    localStorage.removeItem(
      "activeActivity"
    );

    const show =
      getCurrentEvent().show || [];

    // The activity on the current planned segment
    // is complete, so move the host to the next segment.
    if (
      currentHostSegmentIndex <
      show.length - 1
    ) {

      currentHostSegmentIndex++;
    }

    loadHostControl();

    hostControlScreen.classList.add(
      "active"
    );

    return;
  }


  if (audienceReturnScreen === "liveActivityFinished") {

    activeLiveActivity =
      null;

    localStorage.removeItem("activeActivity");

    updateEventHQ(getCurrentEvent());

    eventHQScreen.classList.add("active");

    return;
  }


  if (audienceReturnScreen === "quickLaunch") {

    quickLaunchScreen.classList.add("active");

    return;
  }


  hostControlScreen.classList.add("active");
});
// ======================================================
// SMART TABLE TEAM CREATION
// ======================================================

function createTableTeamsFromEvent() {

  const event =
    getCurrentEvent();

  const guestCount =
    Number(event.guestCount) || 0;

  let tableCount = 4;


  if (guestCount > 0) {

    // Estimate roughly 8 guests per table
    tableCount =
      Math.ceil(guestCount / 8);

  }


  // Keep it reasonable for the host screen

  if (tableCount < 2) {
    tableCount = 2;
  }

  if (tableCount > 30) {
    tableCount = 30;
  }


  multiTeams = [];


  for (let i = 1; i <= tableCount; i++) {

    multiTeams.push({
      name: "TABLE " + i,
      score: 0
    });

  }

}
// ======================================================
// MULTI-TEAM CURRENT LEADER
// ======================================================

const multiTeamLeaderName =
  document.getElementById("multiTeamLeaderName");

const multiTeamLeaderScore =
  document.getElementById("multiTeamLeaderScore");


function updateMultiTeamLeader() {

  if (!multiTeams.length) {

    multiTeamLeaderName.textContent =
      "No leader yet";

    multiTeamLeaderScore.textContent =
      "No teams loaded.";

    return;
  }


  const highestScore =
    Math.max(
      ...multiTeams.map(function (team) {
        return team.score;
      })
    );


  const leaders =
    multiTeams.filter(function (team) {
      return team.score === highestScore;
    });


  if (highestScore === 0) {

    multiTeamLeaderName.textContent =
      "No leader yet";

    multiTeamLeaderScore.textContent =
      "Scores are tied at 0.";

    return;
  }


  if (leaders.length > 1) {

    multiTeamLeaderName.textContent =
      "TIE";

    multiTeamLeaderScore.textContent =
      leaders
        .map(function (team) {
          return team.name;
        })
        .join(" • ") +
      ` — ${highestScore} points`;

    return;
  }


  multiTeamLeaderName.textContent =
    leaders[0].name;


  multiTeamLeaderScore.textContent =
    `${highestScore} points`;
}
// ======================================================
// AUDIENCE MULTI-TEAM LEADER
// ======================================================

const audienceLeaderName =
  document.getElementById("audienceLeaderName");

const audienceLeaderScore =
  document.getElementById("audienceLeaderScore");


function updateAudienceLeader() {

  if (!multiTeams.length) {

    audienceLeaderName.textContent =
      "No leader yet";

    audienceLeaderScore.textContent =
      "No teams loaded.";

    return;
  }


  const highestScore =
    Math.max(
      ...multiTeams.map(function (team) {
        return team.score;
      })
    );


  const leaders =
    multiTeams.filter(function (team) {
      return team.score === highestScore;
    });


  if (highestScore === 0) {

    audienceLeaderName.textContent =
      "No leader yet";

    audienceLeaderScore.textContent =
      "Scores are tied at 0.";

    return;
  }


  if (leaders.length > 1) {

    audienceLeaderName.textContent =
      "TIE";

    audienceLeaderScore.textContent =
      leaders
        .map(function (team) {
          return team.name;
        })
        .join(" • ") +
      ` — ${highestScore} points`;

    return;
  }


  audienceLeaderName.textContent =
    leaders[0].name;


  audienceLeaderScore.textContent =
    `${highestScore} points`;
}
// ======================================================
// SAVED EVENT LIBRARY RECOVERY
// ======================================================

function recoverEventLibrary() {

  const savedEvents =
    JSON.parse(localStorage.getItem("savedEvents")) || [];

  // Library already exists — leave it alone
  if (savedEvents.length > 0) {
    return;
  }

  const currentEvent =
    JSON.parse(localStorage.getItem("currentEvent")) || null;

  // If the active event still exists, restore it to My Events
  if (
    currentEvent &&
    currentEvent.id &&
    currentEvent.eventName
  ) {

    localStorage.setItem(
      "savedEvents",
      JSON.stringify([currentEvent])
    );

  }
}


// Run recovery when the app opens
recoverEventLibrary();
// ======================================================
// CLEAN LIVE ACTIVITY → AUDIENCE SEND
// ======================================================

sendRoundToAudienceButton.addEventListener(
  "click",
  function (event) {

    // Stop any older conflicting send handlers
    event.stopImmediatePropagation();

    if (!activeLiveActivity) {
      return;
    }

    const rounds =
      activeLiveActivity.rounds || [];

    if (!rounds.length) {
      return;
    }

    const round =
      rounds[activeLiveRoundIndex];

    const currentEvent =
      getCurrentEvent();


    // Tell the back button where to return
    audienceReturnScreen =
      "liveActivity";


    // Event name
    audienceEventName.textContent =
      currentEvent.eventName ||
      "Live Event";


    // Main audience heading
    if (activeLiveActivity.id === "generation-01") {

      audienceSegmentTitle.textContent =
        "GENERATION SHOWDOWN";

    } else {

      audienceSegmentTitle.textContent =
        activeLiveActivity.name;
    }


    // Current round
   if (activeLiveActivity.id === "generation-01") {

  const generationAudienceMessages = {
    "Boomers":
      "Boomers, this round belongs to you. Get ready to show the room what your generation brought to the dance floor.",
    "Gen X":
      "Gen X, you're up. Time to prove the MTV generation still knows how to take over a dance floor.",
    "Millennials":
      "Millennials, this is your round. Get ready to represent your generation.",
    "Gen Z":
      "Gen Z, you're up. Show the rest of the room what you've got."
  };

  audienceSegmentMessage.textContent =
    generationAudienceMessages[round.title] ||
    round.title ||
    "Get ready for the next generation.";

} else {

  audienceSegmentMessage.textContent =
    `${round.title ? round.title + " — " : ""}${round.prompt || ""}`;
}


    // Hide both scoreboards first
    audienceScoreboard.style.display =
      "none";

    audienceMultiTeamScoreboard.style.display =
      "none";


    // TWO-TEAM ACTIVITY
    if (activeLiveActivity.scoreType === "two-team") {

      updateAudienceTwoTeamScore();

      audienceScoreboard.style.display =
        "flex";
    }


    // MULTI-TEAM ACTIVITY
    if (activeLiveActivity.scoreType === "multi-team") {

      renderAudienceMultiTeamScore();

      if (typeof updateAudienceLeader === "function") {
        updateAudienceLeader();
      }

      audienceMultiTeamScoreboard.style.display =
        "block";
    }


    audienceBackButton.textContent =
      "← LIVE ACTIVITY CONTROL";


    const liveValue =
      round.title ||
      "LIVE NOW";

    const liveDetail =
      round.prompt ||
      "";


    syncLiveResultToAllScreens({
      title:
        activeLiveActivity.name,
      value:
        liveValue,
      detail:
        liveDetail
    })
      .then(function () {

        sendRoundToAudienceButton.textContent =
          "✓ LIVE ON GUEST PHONES + VENUE SCREEN";

        setTimeout(function () {
          sendRoundToAudienceButton.textContent =
            "SHOW LIVE ON ALL SCREENS";
        }, 2200);
      })
      .catch(function (error) {

        console.error(
          "Live screen sync failed:",
          error
        );

        alert(
          "The live activity could not be sent. Please try again."
        );
      });

  },
  true
);
// ======================================================
// GUEST HUB / GUEST VIEW — CLEAN CONSOLIDATED SECTION
// ======================================================

const guestHubScreen =
  document.getElementById("guestHubScreen");

const guestHubButton =
  document.getElementById("guestHubButton");

const guestHubBackButton =
  document.getElementById("guestHubBackButton");

const guestHubEventName =
  document.getElementById("guestHubEventName");

const guestEventCode =
  document.getElementById("guestEventCode");

const guestConnectedCount =
  document.getElementById("guestConnectedCount");

const guestFeatureButtons =
  document.querySelectorAll(".guest-feature-button");

const guestHubLiveStatus =
  document.getElementById("guestHubLiveStatus");

const guestHubLiveMessage =
  document.getElementById("guestHubLiveMessage");

const guestHubPreviewButton =
  document.getElementById("guestHubPreviewButton");

const guestViewScreen =
  document.getElementById("guestViewScreen");

const guestViewBackButton =
  document.getElementById("guestViewBackButton");

const guestViewEventName =
  document.getElementById("guestViewEventName");

const guestViewEventCode =
  document.getElementById("guestViewEventCode");

const guestViewStatus =
  document.getElementById("guestViewStatus");

const guestViewLiveTitle =
  document.getElementById("guestViewLiveTitle");

const guestViewLiveMessage =
  document.getElementById("guestViewLiveMessage");

const guestVotingPanel =
  document.getElementById("guestVotingPanel");

const guestVoteQuestion =
  document.getElementById("guestVoteQuestion");

const guestVoteChoices =
  document.querySelectorAll(".guest-vote-choice");

const guestVoteConfirmation =
  document.getElementById("guestVoteConfirmation");

const hostPollQuestion =
  document.getElementById("hostPollQuestion");

const hostPollChoiceOne =
  document.getElementById("hostPollChoiceOne");

const hostPollChoiceTwo =
  document.getElementById("hostPollChoiceTwo");

const launchGuestPollButton =
  document.getElementById("launchGuestPollButton");

const clearGuestPollButton =
  document.getElementById("clearGuestPollButton");

const hostPollStatus =
  document.getElementById("hostPollStatus");

const hostPollLiveQuestion =
  document.getElementById("hostPollLiveQuestion");

const hostPollLiveChoices =
  document.getElementById("hostPollLiveChoices");


function getGuestFeatureStorageKey(event) {
  return event && event.id
    ? "activeGuestFeatures-" + event.id
    : "activeGuestFeatures";
}


function getActiveGuestFeatures() {
  const event = getCurrentEvent();

  return JSON.parse(
    localStorage.getItem(getGuestFeatureStorageKey(event))
  ) || [];
}

function saveActiveGuestFeatures(features) {

  const event =
    getCurrentEvent();

  localStorage.setItem(
    getGuestFeatureStorageKey(event),
    JSON.stringify(features)
  );

  if (event) {

    const eventCode =
      getGuestEventCode(event);

    eventDatabase
      .ref("events/" + eventCode + "/activeFeatures")
      .set(features)
      .then(function () {
        console.log("Active guest features synced to Firebase.");
      })
      .catch(function (error) {
        console.error(
          "Active feature sync failed:",
          error
        );
      });

  }

}


function getGuestEventCode(event) {

  if (!event || !event.id) {
    return "EVENT CODE";
  }

  if (event.guestCode) {
    return event.guestCode;
  }

  const namePart =
    (event.eventName || "EVENT")
      .replace(/[^a-zA-Z]/g, "")
      .substring(0, 4)
      .toUpperCase();

  const numberPart =
    event.id
      .replace(/\D/g, "")
      .slice(-4);

  const code =
    namePart + "-" + numberPart;

  event.guestCode = code;

  saveCurrentEvent(event);
  updateEventInLibrary(event);

  return code;
}


function updateGuestFeatureButtons() {

  const activeGuestFeatures =
    getActiveGuestFeatures();

  guestFeatureButtons.forEach(function (button) {

    const feature =
      button.dataset.feature;

    if (activeGuestFeatures.includes(feature)) {
      button.classList.add("selected-choice");
    } else {
      button.classList.remove("selected-choice");
    }
  });

  if (activeGuestFeatures.length === 0) {

    guestHubLiveStatus.textContent =
      "Waiting for the host.";

    guestHubLiveMessage.textContent =
      "No guest features are active right now.";

  } else {

    guestHubLiveStatus.textContent =
      activeGuestFeatures.length +
      " guest feature" +
      (activeGuestFeatures.length === 1 ? "" : "s") +
      " active";

    guestHubLiveMessage.textContent =
      activeGuestFeatures.join(" • ");
  }
}


function loadGuestHubEventInfo() {

  const event =
    getCurrentEvent();

  guestHubEventName.textContent =
    event.eventName || "Current Event";

  guestEventCode.textContent =
    getGuestEventCode(event);

  if (guestConnectedCount) {
    guestConnectedCount.textContent =
      localStorage.getItem("guestConnectedCount-" + event.id) || "0";
  }

  updateGuestFeatureButtons();
  loadHostPollStatus();
}


guestHubButton.addEventListener("click", function () {
  loadGuestHubEventInfo();
  startFirebaseSongRequestInboxListener();
  startFirebasePhotoInboxListener();
  hideAllScreens();
  guestHubScreen.classList.add("active");
});


guestHubBackButton.addEventListener("click", function () {
  hideAllScreens();
  eventHQScreen.classList.add("active");
});


guestFeatureButtons.forEach(function (button) {

  button.addEventListener("click", function () {

    const feature =
      this.dataset.feature;

    let activeGuestFeatures =
      getActiveGuestFeatures();

    if (activeGuestFeatures.includes(feature)) {

      activeGuestFeatures =
        activeGuestFeatures.filter(function (item) {
          return item !== feature;
        });

    } else {

      activeGuestFeatures.push(feature);
    }

    saveActiveGuestFeatures(activeGuestFeatures);
    updateGuestFeatureButtons();
  });
});


function loadGuestViewPreview() {

  const event =
    getCurrentEvent();

  guestViewEventName.textContent =
    event.eventName || "Live Event";

  guestViewEventCode.textContent =
    getGuestEventCode(event);

  guestViewStatus.textContent =
    "You are connected to this event.";
}


function updateGuestViewFeatures() {

  const enabledFeatures =
    getActiveGuestFeatures();

  const guestViewButtons =
   document.querySelectorAll(".guest-view-action");

  guestViewButtons.forEach(function (button) {

    const feature =
      button.dataset.feature;

    button.style.display =
      enabledFeatures.includes(feature)
        ? ""
        : "none";
  });

  if (enabledFeatures.length === 0) {

    guestViewLiveTitle.textContent =
      "Waiting for the host";

    guestViewLiveMessage.textContent =
      "Nothing is available right now. Stay connected — the host will activate the next experience.";

  } else {

    guestViewLiveTitle.textContent =
      "You're connected";

    guestViewLiveMessage.textContent =
      "Choose an available option above or wait for the next live activity.";
  }
}


function prepareGuestVoting() {

  const event =
    getCurrentEvent();

  const enabledFeatures =
    getActiveGuestFeatures();

  const livePoll =
    JSON.parse(
      localStorage.getItem("liveGuestPoll-" + event.id)
    );

  if (
    !enabledFeatures.includes("Voting") ||
    !livePoll
  ) {

    guestVotingPanel.style.display =
      "none";

    return;
  }

  guestVotingPanel.style.display =
    "block";

  guestVoteQuestion.textContent =
    livePoll.question;

  const voteSessionKey =
    "guestVotedPoll-" +
    event.id +
    "-" +
    String(
      livePoll.launchedAt ||
      livePoll.question
    );

  const alreadyVoted =
    localStorage.getItem(voteSessionKey) ===
    "true";

  guestVoteChoices.forEach(function (button, index) {

    if (index === 0) {
      button.textContent = livePoll.choiceOne;
      button.dataset.choice = "choiceOne";
    }

    if (index === 1) {
      button.textContent = livePoll.choiceTwo;
      button.dataset.choice = "choiceTwo";
    }

    button.disabled = alreadyVoted;
    button.classList.remove("selected-choice");
  });

  guestVoteConfirmation.textContent =
    alreadyVoted
      ? "Vote submitted!"
      : "";

  guestVoteConfirmation.style.display =
    alreadyVoted
      ? "block"
      : "none";

  setTimeout(function () {
    guestVotingPanel.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 100);
}


guestVoteChoices.forEach(function (button) {

  button.addEventListener("click", function () {

    const event =
      getCurrentEvent();

    const pollKey =
      "liveGuestPoll-" + event.id;

    const livePoll =
      JSON.parse(localStorage.getItem(pollKey));

    if (!livePoll) {
      return;
    }

    const voteSessionKey =
      "guestVotedPoll-" +
      event.id +
      "-" +
      String(
        livePoll.launchedAt ||
        livePoll.question
      );

    if (
      localStorage.getItem(voteSessionKey) ===
      "true"
    ) {
      return;
    }

    const choice =
      this.dataset.choice;

    if (choice === "choiceOne") {
      livePoll.votesOne = (livePoll.votesOne || 0) + 1;
    }

    if (choice === "choiceTwo") {
      livePoll.votesTwo = (livePoll.votesTwo || 0) + 1;
    }

    localStorage.setItem(
      pollKey,
      JSON.stringify(livePoll)
    );

    localStorage.setItem(
      voteSessionKey,
      "true"
    );

    guestVoteChoices.forEach(function (voteButton) {
      voteButton.disabled = true;
      voteButton.classList.remove("selected-choice");
    });

    this.classList.add("selected-choice");

    guestVoteConfirmation.textContent =
      "Vote submitted!";

    guestVoteConfirmation.style.display =
      "block";

    loadHostPollStatus();
  });
});


guestHubPreviewButton.addEventListener("click", function () {
  loadGuestViewPreview();
  updateGuestViewFeatures();
  prepareGuestVoting();
  hideAllScreens();
  guestViewScreen.classList.add("active");
});


guestViewBackButton.addEventListener("click", function () {
  hideAllScreens();
  guestHubScreen.classList.add("active");
  loadGuestHubEventInfo();
});
document
  .querySelectorAll('.guest-view-action[data-feature="Voting"]')
  .forEach(function (button) {

    button.onclick = function () {

      prepareGuestVoting();

      if (guestVotingPanel) {
        guestVotingPanel.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }

    };

  });

function loadHostPollStatus() {

  const event =
    getCurrentEvent();

  const livePoll =
    event && event.id
      ? JSON.parse(localStorage.getItem("liveGuestPoll-" + event.id))
      : null;

  if (!livePoll) {
    hostPollStatus.style.display = "none";
    return;
  }

  hostPollStatus.style.display = "block";

  hostPollLiveQuestion.textContent =
    livePoll.question;

  hostPollLiveChoices.textContent =
    livePoll.choiceOne +
    " — " + (livePoll.votesOne || 0) +
    " votes • " +
    livePoll.choiceTwo +
    " — " + (livePoll.votesTwo || 0) +
    " votes";
}


launchGuestPollButton.addEventListener("click", function () {

  const event =
    getCurrentEvent();

  const question =
    hostPollQuestion.value.trim();

  const choiceOne =
    hostPollChoiceOne.value.trim();

  const choiceTwo =
    hostPollChoiceTwo.value.trim();

  if (!question || !choiceOne || !choiceTwo) {
    alert("Enter a question and both answer choices.");
    return;
  }

  const poll = {
    question: question,
    choiceOne: choiceOne,
    choiceTwo: choiceTwo,
    votesOne: 0,
    votesTwo: 0,
    launchedAt: new Date().toISOString()
  };

  localStorage.setItem(
    "liveGuestPoll-" + event.id,
    JSON.stringify(poll)
  );

  let activeGuestFeatures =
    getActiveGuestFeatures();

  if (!activeGuestFeatures.includes("Voting")) {
    activeGuestFeatures.push("Voting");
    saveActiveGuestFeatures(activeGuestFeatures);
  }

  updateGuestFeatureButtons();
  loadHostPollStatus();
});


clearGuestPollButton.addEventListener("click", function () {

  const event =
    getCurrentEvent();
const eventCode =
  getGuestEventCode(event);

eventDatabase
  .ref("events/" + eventCode + "/poll")
  .remove();
  localStorage.removeItem(
    "liveGuestPoll-" + event.id
  );

  hostPollQuestion.value = "";
  hostPollChoiceOne.value = "";
  hostPollChoiceTwo.value = "";

  hostPollStatus.style.display = "none";

  guestVotingPanel.style.display = "none";
});
// ======================================================
// GUEST TIPPING
// ======================================================

const hostTipBusinessName =
  document.getElementById("hostTipBusinessName");

const hostTipPaymentLink =
  document.getElementById("hostTipPaymentLink");

const enableGuestTipsButton =
  document.getElementById("enableGuestTipsButton");

const disableGuestTipsButton =
  document.getElementById("disableGuestTipsButton");

const hostTipStatus =
  document.getElementById("hostTipStatus");

const hostTipBusinessDisplay =
  document.getElementById("hostTipBusinessDisplay");


if (enableGuestTipsButton) {

  enableGuestTipsButton.addEventListener("click", function () {

    const event =
      getCurrentEvent();

    const businessName =
      hostTipBusinessName.value.trim();

    let paymentLink =
      hostTipPaymentLink.value.trim();

    if (
      paymentLink &&
      !/^https?:\/\//i.test(paymentLink)
    ) {
      paymentLink =
        "https://" + paymentLink;

      hostTipPaymentLink.value =
        paymentLink;
    }

    if (!businessName || !paymentLink) {

      alert("Enter the business name and payment link.");

      return;
    }

    localStorage.setItem(
      "guestTipping-" + event.id,
      JSON.stringify({
        enabled: true,
        businessName: businessName,
        paymentLink: paymentLink
      })
    );

    hostTipStatus.style.display =
      "block";

    hostTipBusinessDisplay.textContent =
      businessName;

  });

}


if (disableGuestTipsButton) {

  disableGuestTipsButton.addEventListener("click", function () {

    const event =
      getCurrentEvent();

    localStorage.setItem(
      "guestTipping-" + event.id,
      JSON.stringify({
        enabled: false,
        businessName: hostTipBusinessName.value.trim(),
        paymentLink: hostTipPaymentLink.value.trim()
      })
    );

    hostTipStatus.style.display =
      "none";

  });

}
// ======================================================
// GUEST TIP BUTTON
// ======================================================

document
  .querySelectorAll('.guest-view-action[data-feature="Tips"]')
  .forEach(function (button) {

    button.addEventListener("click", function () {

      const event =
        getCurrentEvent();

      const tipping =
        JSON.parse(
          localStorage.getItem("guestTipping-" + event.id)
        );

      if (!tipping || !tipping.enabled) {
        alert("Tipping is not enabled for this event.");
        return;
      }

      if (!tipping.paymentLink) {
        alert("No payment link has been added.");
        return;
      }

      let guestPaymentLink =
        tipping.paymentLink.trim();

      if (
        guestPaymentLink &&
        !/^https?:\/\//i.test(
          guestPaymentLink
        )
      ) {
        guestPaymentLink =
          "https://" +
          guestPaymentLink;
      }

      window.open(
        guestPaymentLink,
        "_blank"
      );

    });

  });
  // ======================================================
// GUEST SONG REQUESTS
// ======================================================

const hostSongRequestPrompt =
  document.getElementById("hostSongRequestPrompt");

const enableSongRequestsButton =
  document.getElementById("enableSongRequestsButton");

const disableSongRequestsButton =
  document.getElementById("disableSongRequestsButton");

const hostSongRequestStatus =
  document.getElementById("hostSongRequestStatus");

const hostSongRequestLivePrompt =
  document.getElementById("hostSongRequestLivePrompt");

const hostSongRequestInbox =
  document.getElementById("hostSongRequestInbox");


if (enableSongRequestsButton) {

  enableSongRequestsButton.addEventListener("click", function () {

    const event =
      getCurrentEvent();

    const prompt =
      hostSongRequestPrompt.value.trim() ||
      "What song do you want to hear?";

    localStorage.setItem(
      "liveSongRequests-" + event.id,
      JSON.stringify({
        open: true,
        prompt: prompt
      })
    );

    hostSongRequestStatus.style.display =
      "block";

    hostSongRequestLivePrompt.textContent =
      prompt;

  });

}


if (disableSongRequestsButton) {

  disableSongRequestsButton.addEventListener("click", function () {

    const event =
      getCurrentEvent();

    localStorage.setItem(
      "liveSongRequests-" + event.id,
      JSON.stringify({
        open: false,
        prompt: hostSongRequestPrompt.value.trim()
      })
    );

    hostSongRequestStatus.style.display =
      "none";

  });

}
// ======================================================
// GUEST SONG REQUEST SUBMISSION
// ======================================================

const guestSongRequestPanel =
  document.getElementById("guestSongRequestPanel");

const guestSongRequestPrompt =
  document.getElementById("guestSongRequestPrompt");

const guestSongRequestTitle =
  document.getElementById("guestSongRequestTitle");

const guestSongRequestArtist =
  document.getElementById("guestSongRequestArtist");

const submitGuestSongRequestButton =
  document.getElementById("submitGuestSongRequestButton");

const guestSongRequestConfirmation =
  document.getElementById("guestSongRequestConfirmation");


function prepareGuestSongRequests() {

  const event =
    getCurrentEvent();

  const requestState =
    JSON.parse(
      localStorage.getItem("liveSongRequests-" + event.id)
    );

  if (
    !getActiveGuestFeatures().includes("Song Requests") ||
    !requestState ||
    !requestState.open
  ) {
    guestSongRequestPanel.style.display = "none";
    return;
  }

  guestSongRequestPanel.style.display =
    "block";

  guestSongRequestPrompt.textContent =
    requestState.prompt || "What song do you want to hear?";

  guestSongRequestTitle.value =
    "";

  guestSongRequestArtist.value =
    "";

  guestSongRequestConfirmation.style.display =
    "none";
}


if (submitGuestSongRequestButton) {

  submitGuestSongRequestButton.onclick = function () {

    const event =
      getCurrentEvent();

    const title =
      guestSongRequestTitle.value.trim();

    const artist =
      guestSongRequestArtist.value.trim();

    if (!title) {
      alert("Enter a song title.");
      return;
    }

    const inboxKey =
      "songRequestInbox-" + event.id;

    const inbox =
      JSON.parse(localStorage.getItem(inboxKey)) || [];

    inbox.push({
      id: "song-" + Date.now(),
      title: title,
      artist: artist,
      submittedAt: new Date().toISOString()
    });
    const joinCode =
  new URLSearchParams(window.location.search).get("join") ||
  getGuestEventCode(event);

eventDatabase
  .ref("events/" + joinCode + "/songRequests")
  .push({
    title: title,
    artist: artist,
    submittedAt: new Date().toISOString()
  })
  .then(function () {
    console.log("Guest song request synced to Firebase.");
  })
  .catch(function (error) {
    console.error(
      "Guest song request Firebase sync failed:",
      error
    );
  });

    localStorage.setItem(
      inboxKey,
      JSON.stringify(inbox)
    );

    guestSongRequestTitle.value = "";
    guestSongRequestArtist.value = "";

    guestSongRequestConfirmation.textContent =
      "Request sent!";

    guestSongRequestConfirmation.style.display =
      "block";
  };
}


document
  .querySelectorAll('.guest-view-action[data-feature="Song Requests"]')
  .forEach(function (button) {

    button.onclick = function () {

      prepareGuestSongRequests();

      if (guestSongRequestPanel) {
        guestSongRequestPanel.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }
    };

  });
  // ======================================================
// HOST SONG REQUEST INBOX
// ======================================================

function renderSongRequestInbox() {

  const event =
    getCurrentEvent();

  const inbox =
    JSON.parse(
      localStorage.getItem("songRequestInbox-" + event.id)
    ) || [];

  const container =
    document.getElementById("hostSongRequestInbox");

  if (!container) {
    return;
  }

  container.innerHTML = "";

  if (inbox.length === 0) {

    container.innerHTML =
      "<p style='margin-top:14px;'>No requests yet.</p>";

    return;
  }

  inbox.forEach(function (request) {

    const card =
      document.createElement("div");

    card.className =
      "feature-panel";

    card.style.marginTop =
      "12px";

    card.innerHTML =
      `
        <span class="small-label">
          SONG REQUEST
        </span>

        <h3>
          ${request.title}
        </h3>

        <p>
          ${request.artist || "Artist not provided"}
        </p>
      `;

    container.appendChild(card);

  });
}


const songRequestBackButton =
  document.getElementById("guestViewBackButton");

if (songRequestBackButton) {

  songRequestBackButton.addEventListener("click", function () {

    renderSongRequestInbox();

  });

}
function startFirebaseSongRequestInboxListener() {

  const event = getCurrentEvent();

  if (!event) return;

  const eventCode =
    getGuestEventCode(event);

  eventDatabase
    .ref("events/" + eventCode + "/songRequests")
    .on("value", function (snapshot) {

      const firebaseRequests =
        snapshot.val() || {};

      const inbox =
        Object.keys(firebaseRequests).map(function (key) {
          return {
            id: key,
            ...firebaseRequests[key]
          };
        });

      localStorage.setItem(
        "songRequestInbox-" + event.id,
        JSON.stringify(inbox)
      );

      renderSongRequestInbox();
    });
}
// ======================================================
// GUEST PHOTO SUBMISSIONS
// ======================================================

const hostPhotoPrompt =
  document.getElementById("hostPhotoPrompt");

const openPhotoSubmissionsButton =
  document.getElementById("openPhotoSubmissionsButton");

const closePhotoSubmissionsButton =
  document.getElementById("closePhotoSubmissionsButton");

const hostPhotoStatus =
  document.getElementById("hostPhotoStatus");

const hostPhotoLivePrompt =
  document.getElementById("hostPhotoLivePrompt");

const hostPhotoInbox =
  document.getElementById("hostPhotoInbox");


 if (openPhotoSubmissionsButton) {

  openPhotoSubmissionsButton.addEventListener("click", function () {

    const event =
      getCurrentEvent();

    const prompt =
      hostPhotoPrompt.value.trim() ||
      "Share your favorite photo from tonight!";

    localStorage.setItem(
      "livePhotoSubmissions-" + event.id,
      JSON.stringify({
        open: true,
        prompt: prompt
      })
    );

    hostPhotoStatus.style.display =
      "block";

    hostPhotoLivePrompt.textContent =
      prompt;

    const eventCode =
      getGuestEventCode(event);

    eventDatabase
      .ref("events/" + eventCode + "/photoSubmissionsState")
      .set({
        open: true,
        prompt: prompt
      });
  });

}

   


if (closePhotoSubmissionsButton) {

  closePhotoSubmissionsButton.addEventListener("click", function () {

    const event =
      getCurrentEvent();

    localStorage.setItem(
      "livePhotoSubmissions-" + event.id,
      JSON.stringify({
        open: false,
        prompt: hostPhotoPrompt.value.trim()
      })
    );

    hostPhotoStatus.style.display =
      "none";

    const eventCode =
      getGuestEventCode(event);

    eventDatabase
      .ref("events/" + eventCode + "/photoSubmissionsState")
      .set({
        open: false,
        prompt: hostPhotoPrompt.value.trim()
      });

  });

}

    
// ======================================================
// GUEST PHOTO SUBMISSION
// ======================================================

const guestPhotoPanel =
  document.getElementById("guestPhotoPanel");

const guestPhotoPrompt =
  document.getElementById("guestPhotoPrompt");

const guestPhotoInput =
  document.getElementById("guestPhotoInput");

const submitGuestPhotoButton =
  document.getElementById("submitGuestPhotoButton");

const guestPhotoConfirmation =
  document.getElementById("guestPhotoConfirmation");


function prepareGuestPhotos() {

  const event =
    getCurrentEvent();

  const photoState =
    JSON.parse(
      localStorage.getItem("livePhotoSubmissions-" + event.id)
    );

  if (
    !getActiveGuestFeatures().includes("Photos") ||
    !photoState ||
    !photoState.open
  ) {
    guestPhotoPanel.style.display = "none";
    return;
  }

  guestPhotoPanel.style.display =
    "block";

  guestPhotoPrompt.textContent =
    photoState.prompt ||
    "Share your favorite photo from tonight!";

  guestPhotoInput.value =
    "";

  guestPhotoConfirmation.style.display =
    "none";
}


document
  .querySelectorAll('.guest-view-action[data-feature="Photos"]')
  .forEach(function (button) {

    button.onclick = function () {

      prepareGuestPhotos();

      guestPhotoPanel.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

    };

  });


if (submitGuestPhotoButton) {

  submitGuestPhotoButton.onclick = function () {

    const event =
      getCurrentEvent();

    const file =
      guestPhotoInput.files[0];

    if (!file) {
      alert("Choose a photo first.");
      return;
    }

    const reader =
      new FileReader();

    reader.onload = function () {

      const inboxKey =
        "photoInbox-" + event.id;

      const inbox =
        JSON.parse(localStorage.getItem(inboxKey)) || [];

      inbox.push({
        id: "photo-" + Date.now(),
        image: reader.result,
        submittedAt: new Date().toISOString()
      });

      localStorage.setItem(
        inboxKey,
        JSON.stringify(inbox)
      );
const joinCode =
  new URLSearchParams(window.location.search).get("join") ||
  getGuestEventCode(event);

eventDatabase
  .ref("events/" + joinCode + "/photoInbox")
  .push({
    image: reader.result,
    submittedAt: new Date().toISOString(),
    status: "pending"
  })
  .then(function () {
    console.log("Guest photo synced to Firebase.");
  })
  .catch(function (error) {
    console.error(
      "Guest photo Firebase sync failed:",
      error
    );
  });
      guestPhotoInput.value = "";

      guestPhotoConfirmation.textContent =
        "Photo submitted!";

      guestPhotoConfirmation.style.display =
        "block";
    };

    reader.readAsDataURL(file);

  };

}
// ======================================================
// HOST PHOTO INBOX
// ======================================================

function renderPhotoInbox() {

  const event = getCurrentEvent();

  const inboxKey =
    "photoInbox-" + event.id;

  const inbox =
    JSON.parse(localStorage.getItem(inboxKey)) || [];

  const container =
    document.getElementById("hostPhotoInbox");

  if (!container) return;

  container.innerHTML = "";

  if (inbox.length === 0) {
    container.innerHTML =
      "<p style='margin-top:14px;'>No photos yet.</p>";
    return;
  }

  inbox.forEach(function (photo) {

    const card =
      document.createElement("div");

    card.className = "feature-panel";
    card.style.marginTop = "14px";

    const image =
      document.createElement("img");

    image.src = photo.image;
    image.style.width = "100%";
    image.style.maxWidth = "400px";
    image.style.borderRadius = "12px";
    image.style.display = "block";
    image.style.margin = "10px auto";

    const status =
      document.createElement("p");

    status.style.fontWeight = "bold";
    status.style.textAlign = "center";

    if (photo.status === "approved") {
      status.textContent = "✓ APPROVED";
    } else {
      status.textContent = "AWAITING REVIEW";
    }

    const actions =
      document.createElement("div");

    actions.className = "main-actions";
    actions.style.marginTop = "12px";
    actions.style.justifyContent = "center";

    const approveButton =
      document.createElement("button");

    approveButton.className = "primary-button";
    approveButton.textContent = "APPROVE";

    approveButton.onclick = function () {

      photo.status = "approved";

      localStorage.setItem(
        inboxKey,
        JSON.stringify(inbox)
      );

      renderPhotoInbox();
    };


    const rejectButton =
      document.createElement("button");

    rejectButton.className = "secondary-button";
    rejectButton.textContent = "REJECT";

    rejectButton.onclick = function () {

      const updatedInbox =
        inbox.filter(function (item) {
          return item.id !== photo.id;
        });

      localStorage.setItem(
        inboxKey,
        JSON.stringify(updatedInbox)
      );

      renderPhotoInbox();
    };


    actions.appendChild(approveButton);
    actions.appendChild(rejectButton);

    card.appendChild(image);
    card.appendChild(status);
    card.appendChild(actions);

    container.appendChild(card);

  });

}
// Refresh host photo inbox when returning from Guest View

const photoGuestBackButton =
  document.getElementById("guestViewBackButton");

if (photoGuestBackButton) {

  photoGuestBackButton.addEventListener(
    "click",
    function () {
      renderPhotoInbox();
    }
  );

}
// ======================================================
// FIREBASE LIVE LISTENER — HOST PHOTO INBOX
// ======================================================

let firebasePhotoInboxListenerRef = null;

function startFirebasePhotoInboxListener() {

  const event =
    getCurrentEvent();

  if (!event) return;

  const eventCode =
    getGuestEventCode(event);

  if (firebasePhotoInboxListenerRef) {
    firebasePhotoInboxListenerRef.off();
  }

  firebasePhotoInboxListenerRef =
    eventDatabase.ref(
      "events/" + eventCode + "/photoInbox"
    );

  firebasePhotoInboxListenerRef.on(
    "value",
    function (snapshot) {

      const firebasePhotos =
        snapshot.val() || {};

      const inbox =
        Object.keys(firebasePhotos).map(function (key) {

          return {
            id: key,
            ...firebasePhotos[key]
          };

        });

      localStorage.setItem(
        "photoInbox-" + event.id,
        JSON.stringify(inbox)
      );

      renderPhotoInbox();
    }
  );
}
// ======================================================
// APPROVED PHOTO GALLERY
// ======================================================

const openApprovedGalleryButton =
  document.getElementById("openApprovedGalleryButton");

const closeApprovedGalleryButton =
  document.getElementById("closeApprovedGalleryButton");

const approvedPhotoGallery =
  document.getElementById("approvedPhotoGallery");

const approvedPhotoGalleryGrid =
  document.getElementById("approvedPhotoGalleryGrid");


function renderApprovedPhotoGallery() {

  const event =
    getCurrentEvent();

  const inbox =
    JSON.parse(
      localStorage.getItem("photoInbox-" + event.id)
    ) || [];

  const approved =
    inbox.filter(function (photo) {
      return photo.status === "approved";
    });

  approvedPhotoGalleryGrid.innerHTML = "";

  if (approved.length === 0) {

    approvedPhotoGalleryGrid.innerHTML =
      "<p>No approved photos yet.</p>";

    return;
  }

  approved.forEach(function (photo) {

    const image =
      document.createElement("img");

    image.src =
      photo.image;

    image.style.width =
      "100%";

    image.style.borderRadius =
      "12px";

    image.style.display =
      "block";

    approvedPhotoGalleryGrid.appendChild(image);

  });

}


if (openApprovedGalleryButton) {

  openApprovedGalleryButton.onclick = function () {

    renderApprovedPhotoGallery();

    approvedPhotoGallery.style.display =
      "block";

    approvedPhotoGallery.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  };

}


if (closeApprovedGalleryButton) {

  closeApprovedGalleryButton.onclick = function () {

    approvedPhotoGallery.style.display =
      "none";

  };

}

// ======================================================
// SEND APPROVED PHOTOS TO AUDIENCE DISPLAY
// ======================================================

const showGalleryToAudienceButton =
  document.createElement("button");

showGalleryToAudienceButton.className =
  "primary-button";

showGalleryToAudienceButton.textContent =
  "SHOW GALLERY ON AUDIENCE DISPLAY";


if (
  approvedPhotoGallery &&
  closeApprovedGalleryButton
) {

  closeApprovedGalleryButton
    .parentElement
    .insertBefore(
      showGalleryToAudienceButton,
      closeApprovedGalleryButton
    );

}


showGalleryToAudienceButton.onclick = function () {

  const event =
    getCurrentEvent();

  const inbox =
    JSON.parse(
      localStorage.getItem("photoInbox-" + event.id)
    ) || [];

  const approved =
    inbox.filter(function (photo) {
      return photo.status === "approved";
    });


  if (approved.length === 0) {

    alert("Approve at least one photo first.");

    return;
  }


  audienceEventName.textContent =
    event.eventName || "Live Event";


  audienceSegmentTitle.textContent =
    "Guest Photo Gallery";


  audienceSegmentMessage.innerHTML =
    "";


  const gallery =
    document.createElement("div");

  gallery.style.display =
    "grid";

  gallery.style.gridTemplateColumns =
    "repeat(auto-fit, minmax(220px, 1fr))";

  gallery.style.gap =
    "18px";

  gallery.style.marginTop =
    "24px";


  approved.forEach(function (photo) {

    const image =
      document.createElement("img");

    image.src =
      photo.image;

    image.style.width =
      "100%";

    image.style.maxHeight =
      "420px";

    image.style.objectFit =
      "contain";

    image.style.borderRadius =
      "14px";


    gallery.appendChild(image);

  });


  audienceSegmentMessage.appendChild(
    gallery
  );


  hideAudienceScores();


  audienceBackButton.textContent =
    "← GUEST HUB";


  hideAllScreens();


  audienceScreen.classList.add(
    "active"
  );

};

// ======================================================
// LIVE GUEST FEATURES DASHBOARD
// ======================================================

function updateGuestFeaturesDashboard() {

  const event =
    getCurrentEvent();

  const activeFeatures =
    getActiveGuestFeatures();

  const poll =
    JSON.parse(
      localStorage.getItem("liveGuestPoll-" + event.id)
    );

  const prediction =
    JSON.parse(
      localStorage.getItem("liveGuestPrediction-" + event.id)
    );

  const songRequests =
    JSON.parse(
      localStorage.getItem("liveSongRequests-" + event.id)
    );

  const photos =
    JSON.parse(
      localStorage.getItem("livePhotoSubmissions-" + event.id)
    );

  const tipping =
    JSON.parse(
      localStorage.getItem("guestTipping-" + event.id)
    );


  document.getElementById("dashboardVotingStatus").textContent =
    activeFeatures.includes("Voting") && poll
      ? "ON"
      : "OFF";


  document.getElementById("dashboardPredictionsStatus").textContent =
    activeFeatures.includes("Predictions") && prediction
      ? "ON"
      : "OFF";


  document.getElementById("dashboardSongRequestsStatus").textContent =
    activeFeatures.includes("Song Requests") &&
    songRequests &&
    songRequests.open
      ? "OPEN"
      : "CLOSED";


  document.getElementById("dashboardPhotosStatus").textContent =
    activeFeatures.includes("Photos") &&
    photos &&
    photos.open
      ? "OPEN"
      : "CLOSED";


  document.getElementById("dashboardTippingStatus").textContent =
    activeFeatures.includes("Tips") &&
    tipping &&
    tipping.enabled
      ? "ENABLED"
      : "DISABLED";

}

// ======================================================
// GUEST JOIN ACCESS
// ======================================================

function updateGuestJoinAccess() {

  const event =
    getCurrentEvent();

  if (!event) return;

  const code =
    getGuestEventCode(event);

  const joinCode =
    document.getElementById("guestJoinEventCode");

  const joinURL =
    document.getElementById("guestJoinURL");

  if (joinCode) {
    joinCode.textContent = code;
  }

  const baseURL =
    window.location.href.split("?")[0];

  const guestURL =
    baseURL + "?join=" + encodeURIComponent(code);

  if (joinURL) {
    joinURL.textContent = guestURL;
  }

  const copyButton =
    document.getElementById("copyGuestJoinLinkButton");

  if (copyButton) {

    copyButton.onclick = function () {

      navigator.clipboard
        .writeText(guestURL)
        .then(function () {
          copyButton.textContent = "COPIED!";
        })
        .catch(function () {
          alert("Could not copy the link.");
        });

    };

  }

}

// ======================================================
// GENERATE GUEST JOIN QR CODE
// ======================================================

function renderGuestJoinQRCode() {

  const event = getCurrentEvent();

  if (!event) return;

  const code = getGuestEventCode(event);
  const guestURL =
    "https://app.cuethecrowdlive.com/?join=" +
    encodeURIComponent(code);
  const qrContainer = document.getElementById("guestJoinQRCode");

  if (!qrContainer) return;

  qrContainer.innerHTML = "";

  if (typeof QRCode === "undefined") {
    qrContainer.innerHTML =
      '<div style="color:#111;text-align:center;padding:20px;">' +
      '<strong>QR code could not load.</strong><br><br>' +
      'Use the guest link below instead.' +
      '</div>';
    return;
  }

  try {

    new QRCode(qrContainer, {
      text: guestURL,
      width: 200,
      height: 200,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.L
    });

  } catch (error) {

    console.error("QR CODE ERROR:", error);

    qrContainer.innerHTML =
      '<div style="color:#111;text-align:center;padding:20px;">' +
      '<strong>QR code could not load.</strong><br><br>' +
      'Use the guest link below instead.' +
      '</div>';
  }
}

const originalUpdateGuestJoinAccess = updateGuestJoinAccess;

updateGuestJoinAccess = function () {
  originalUpdateGuestJoinAccess();
  renderGuestJoinQRCode();
};

// ======================================================
// AUTO-OPEN GUEST VIEW FROM JOIN LINK
// ======================================================

(function openGuestViewFromJoinLink() {

  const params =
    new URLSearchParams(window.location.search);

  const joinCode =
    params.get("join");

  if (!joinCode) return;

  const event =
    getCurrentEvent();

  if (!event) return;

  const eventCode =
    getGuestEventCode(event);

  if (joinCode !== eventCode) return;

  loadGuestViewPreview();
  updateGuestViewFeatures();
  prepareGuestVoting();

  if (typeof prepareGuestSongRequests === "function") {
    prepareGuestSongRequests();
  }

  if (typeof prepareGuestPhotos === "function") {
    prepareGuestPhotos();
  }

  hideAllScreens();

  guestViewScreen.classList.add("active");

})();

// ======================================================
// REFRESH JOIN ACCESS WHEN GUEST HUB OPENS
// ======================================================

document
  .getElementById("guestHubButton")
  ?.addEventListener("click", function () {

    setTimeout(function () {

      updateGuestJoinAccess();

    }, 50);

  });

  // ======================================================
// FIREBASE BRIDGE — HOST LIVE POLL
// ======================================================

const firebasePollLaunchButton =
  document.getElementById("launchGuestPollButton");

if (firebasePollLaunchButton) {

  firebasePollLaunchButton.addEventListener("click", function () {

    setTimeout(function () {

      const event =
        getCurrentEvent();

      if (!event) return;

      const poll =
        JSON.parse(
          localStorage.getItem("liveGuestPoll-" + event.id)
        );

      if (!poll) return;

      const eventCode =
        getGuestEventCode(event);

      eventDatabase
        .ref("events/" + eventCode + "/poll")
        .set(poll)
        .then(function () {
          console.log("Live poll synced to Firebase.");
        })
        .catch(function (error) {
          console.error("Poll Firebase sync failed:", error);
        });

    }, 50);

  });

}

// ======================================================
// SCROLL TO LIVE POLL AFTER LAUNCH
// ======================================================

document
  .getElementById("launchGuestPollButton")
  ?.addEventListener("click", function () {

    setTimeout(function () {

      const livePollBox =
        document.getElementById("hostPollStatus");

      if (livePollBox) {

        livePollBox.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });

      }

    }, 100);

  });

  // ======================================================
// FIREBASE BRIDGE — LOAD LIVE POLL FOR GUESTS
// ======================================================

function loadFirebaseGuestPoll() {

  const event =
    getCurrentEvent();

  if (!event) return;

  const eventCode =
    getGuestEventCode(event);

  eventDatabase
    .ref("events/" + eventCode + "/poll")
    .once("value")
    .then(function (snapshot) {

      const poll =
        snapshot.val();

      if (!poll) {
        return;
      }

      localStorage.setItem(
        "liveGuestPoll-" + event.id,
        JSON.stringify(poll)
      );

      prepareGuestVoting();

    })
    .catch(function (error) {

      console.error(
        "Could not load guest poll from Firebase:",
        error
      );

    });

}
document
  .getElementById("guestHubPreviewButton")
  ?.addEventListener("click", function () {

    loadFirebaseGuestPoll();

  });
function loadFirebaseGuestPoll() {

  const event =
    getCurrentEvent();

  if (!event) return;

  const eventCode =
    getGuestEventCode(event);

  eventDatabase
    .ref("events/" + eventCode + "/poll")
    .on("value", function (snapshot) {

      const poll =
        snapshot.val();

      if (!poll) {

        localStorage.removeItem(
          "liveGuestPoll-" + event.id
        );

        if (guestVotingPanel) {
          guestVotingPanel.style.display = "none";
        }

        return;
      }

      localStorage.setItem(
        "liveGuestPoll-" + event.id,
        JSON.stringify(poll)
      );

      prepareGuestVoting();
    });
}
  // ======================================================
// FIREBASE BRIDGE — SYNC EVENT FOR GUEST JOIN
// ======================================================

function syncEventToFirebase() {

  const event =
    getCurrentEvent();

  if (!event) return;

  const eventCode =
    getGuestEventCode(event);

  const activeFeatures =
    getActiveGuestFeatures();

  eventDatabase
    .ref("events/" + eventCode + "/eventInfo")
    .set({
      id: event.id,
      eventName: event.eventName || "Live Event",
      type: event.type || "General Event",
      partnerOne: event.partnerOne || "",
      partnerTwo: event.partnerTwo || "",
      eventStory: event.eventStory || "",
      guestCode: eventCode
    });

  eventDatabase
    .ref("events/" + eventCode + "/activeFeatures")
    .set(activeFeatures);

}
document
  .getElementById("guestHubButton")
  ?.addEventListener("click", function () {

    setTimeout(function () {
      syncEventToFirebase();
    }, 100);

  });

  // ======================================================
// FIREBASE GUEST JOIN — LOAD EVENT BY CODE
// ======================================================


// ======================================================
// AUTO JOIN FROM URL
// ======================================================



// ======================================================
// FIREBASE GUEST JOIN — LOAD EVENT BY CODE
// ======================================================

function loadGuestEventFromFirebase(joinCode) {

  if (!joinCode) return;

  const eventRef =
    eventDatabase.ref("events/" + joinCode);

  eventRef
    .once("value")
    .then(function (snapshot) {

      const firebaseEvent =
        snapshot.val();

      if (!firebaseEvent || !firebaseEvent.eventInfo) {
        alert("Event not found.");
        return;
      }

      const eventInfo =
        firebaseEvent.eventInfo;

      const activeFeatures =
        firebaseEvent.activeFeatures || [];

      const poll =
        firebaseEvent.poll || null;


      localStorage.setItem(
        "currentEvent",
        JSON.stringify(eventInfo)
      );

      localStorage.setItem(
        getGuestFeatureStorageKey(eventInfo),
        JSON.stringify(activeFeatures)
      );

      if (poll) {

        localStorage.setItem(
          "liveGuestPoll-" + eventInfo.id,
          JSON.stringify(poll)
        );

      }


      loadGuestViewPreview();

      updateGuestViewFeatures();

      prepareGuestVoting();
if (typeof loadFirebaseSongRequestState === "function") {
  loadFirebaseSongRequestState(joinCode);
}

if (typeof startFirebaseSongRequestListener === "function") {
  startFirebaseSongRequestListener(joinCode);
}

if (typeof startFirebaseActiveFeaturesListener === "function") {
  startFirebaseActiveFeaturesListener(joinCode);
}
if (typeof startFirebasePhotoSubmissionsListener === "function") {
  startFirebasePhotoSubmissionsListener(joinCode);
}
if (typeof startUniversalGuestBuzzerListener === "function") {
  startUniversalGuestBuzzerListener(joinCode);
}
if (typeof loadFirebaseGuestPoll === "function") {
  loadFirebaseGuestPoll();
}
      if (typeof prepareGuestSongRequests === "function") {
        prepareGuestSongRequests();
      }


      if (typeof prepareGuestPhotos === "function") {
        prepareGuestPhotos();
      }


      hideAllScreens();

      guestViewScreen.classList.add("active");

    })
    .catch(function (error) {

      console.error(
        "Guest Firebase join failed:",
        error
      );

    });

}
// ======================================================
// AUTO JOIN FROM URL
// ======================================================

(function handleFirebaseGuestJoin() {

  const params =
    new URLSearchParams(window.location.search);

  const joinCode =
    params.get("join");

  if (!joinCode) return;

  loadGuestEventFromFirebase(joinCode);

})();

// ======================================================
// FIREBASE BRIDGE — GUEST VOTES
// ======================================================

guestVoteChoices.forEach(function (button) {

  button.addEventListener("click", function () {

    setTimeout(function () {

      const params =
        new URLSearchParams(window.location.search);

      const joinCode =
        params.get("join");

      if (!joinCode) return;

      const choice =
        button.dataset.choice;

      const voteField =
        choice === "choiceOne"
          ? "votesOne"
          : choice === "choiceTwo"
            ? "votesTwo"
            : null;

      if (!voteField) return;


      const voteRef =
        eventDatabase.ref(
          "events/" +
          joinCode +
          "/poll/" +
          voteField
        );


      voteRef.transaction(function (currentVotes) {

        return (currentVotes || 0) + 1;

      }).then(function () {

        console.log(
          "Guest vote synced to Firebase."
        );

      }).catch(function (error) {

        console.error(
          "Guest vote sync failed:",
          error
        );

      });

    }, 50);

  });

});

// ======================================================
// FIREBASE LIVE LISTENER — HOST POLL RESULTS
// ======================================================

let firebasePollListenerRef = null;

function startFirebasePollListener() {

  const event =
    getCurrentEvent();

  if (!event) return;

  const eventCode =
    getGuestEventCode(event);

  if (firebasePollListenerRef) {
    firebasePollListenerRef.off();
  }

  firebasePollListenerRef =
    eventDatabase.ref(
      "events/" + eventCode + "/poll"
    );

  firebasePollListenerRef.on(
    "value",
    function (snapshot) {

      const poll =
        snapshot.val();

      if (!poll) return;

      const votesOne =
        poll.votesOne || 0;

      const votesTwo =
        poll.votesTwo || 0;

      const totalVotes =
        votesOne + votesTwo;

      const hostPollStatus =
        document.getElementById("hostPollStatus");

      const hostPollLiveQuestion =
        document.getElementById("hostPollLiveQuestion");

      const hostPollLiveChoices =
        document.getElementById("hostPollLiveChoices");

      if (hostPollStatus) {
        hostPollStatus.style.display = "block";
      }

      if (hostPollLiveQuestion) {
        hostPollLiveQuestion.textContent =
          poll.question;
      }

      if (hostPollLiveChoices) {
        hostPollLiveChoices.textContent =
          poll.choiceOne +
          " — " +
          votesOne +
          " vote" +
          (votesOne === 1 ? "" : "s") +
          " • " +
          poll.choiceTwo +
          " — " +
          votesTwo +
          " vote" +
          (votesTwo === 1 ? "" : "s") +
          " • " +
          totalVotes +
          " total";
      }

    }
  );

}
document
  .getElementById("guestHubButton")
  ?.addEventListener("click", function () {

    setTimeout(function () {
      startFirebasePollListener();
    }, 100);

  });

  // ======================================================
// FIREBASE BRIDGE — HOST SONG REQUESTS
// ======================================================

const firebaseSongRequestOpenButton =
  document.getElementById("enableSongRequestsButton");

if (firebaseSongRequestOpenButton) {

  firebaseSongRequestOpenButton.addEventListener("click", function () {

    setTimeout(function () {

      const event =
        getCurrentEvent();

      if (!event) return;

      const requestState =
        JSON.parse(
          localStorage.getItem("liveSongRequests-" + event.id)
        );

      if (!requestState) return;

      const eventCode =
        getGuestEventCode(event);

      eventDatabase
        .ref("events/" + eventCode + "/songRequestsState")
        .set(requestState)
        .then(function () {
          console.log("Song requests synced to Firebase.");
        })
        .catch(function (error) {
          console.error(
            "Song request Firebase sync failed:",
            error
          );
        });

    }, 50);

  });

}
const firebaseSongRequestCloseButton =
  document.getElementById("disableSongRequestsButton");

if (firebaseSongRequestCloseButton) {

  firebaseSongRequestCloseButton.addEventListener("click", function () {

    setTimeout(function () {

      const event =
        getCurrentEvent();

      if (!event) return;

      const requestState =
        JSON.parse(
          localStorage.getItem("liveSongRequests-" + event.id)
        );

      if (!requestState) return;

      const eventCode =
        getGuestEventCode(event);

      eventDatabase
        .ref("events/" + eventCode + "/songRequestsState")
        .set(requestState);

    }, 50);

  });

}

// ======================================================
// FIREBASE BRIDGE — LOAD SONG REQUEST STATE FOR GUESTS
// ======================================================

function loadFirebaseSongRequestState(joinCode) {

  if (!joinCode) return;

  eventDatabase
    .ref("events/" + joinCode + "/songRequestsState")
    .once("value")
    .then(function (snapshot) {

      const requestState =
        snapshot.val();

      if (!requestState) return;

      const event =
        getCurrentEvent();

      if (!event) return;

      localStorage.setItem(
        "liveSongRequests-" + event.id,
        JSON.stringify(requestState)
      );

      prepareGuestSongRequests();

    })
    .catch(function (error) {

      console.error(
        "Could not load song request state from Firebase:",
        error
      );

    });

}
function startFirebaseSongRequestListener(joinCode) {

  if (!joinCode) return;

  eventDatabase
    .ref("events/" + joinCode + "/songRequestsState")
    .on("value", function (snapshot) {

      const requestState = snapshot.val();

      const event = getCurrentEvent();

      if (!event) return;

      if (!requestState) {
        localStorage.removeItem(
          "liveSongRequests-" + event.id
        );

        if (guestSongRequestPanel) {
          guestSongRequestPanel.style.display = "none";
        }

        return;
      }

      localStorage.setItem(
        "liveSongRequests-" + event.id,
        JSON.stringify(requestState)
      );

      prepareGuestSongRequests();
    });
}
// ======================================================
// FIREBASE LIVE ACTIVE FEATURES LISTENER
// ======================================================

function startFirebaseActiveFeaturesListener(joinCode) {

  if (!joinCode) return;

  eventDatabase
    .ref("events/" + joinCode + "/activeFeatures")
    .on("value", function (snapshot) {

      const features =
        snapshot.val() || [];

      const event =
        getCurrentEvent();

      if (!event) return;

      localStorage.setItem(
        getGuestFeatureStorageKey(event),
        JSON.stringify(features)
      );

      updateGuestViewFeatures();

      if (typeof prepareGuestSongRequests === "function") {
        prepareGuestSongRequests();
      }

      if (typeof prepareGuestPhotos === "function") {
        prepareGuestPhotos();
      }

      if (typeof prepareGuestVoting === "function") {
        prepareGuestVoting();
      }
    });
}
function startFirebaseSongRequestListener(joinCode) {

  if (!joinCode) return;

  eventDatabase
    .ref("events/" + joinCode + "/songRequestsState")
    .on("value", function (snapshot) {

      const requestState = snapshot.val();

      const event = getCurrentEvent();

      if (!event) return;

      if (!requestState) {
        localStorage.removeItem(
          "liveSongRequests-" + event.id
        );

        if (guestSongRequestPanel) {
          guestSongRequestPanel.style.display = "none";
        }

        return;
      }

      localStorage.setItem(
        "liveSongRequests-" + event.id,
        JSON.stringify(requestState)
      );

      prepareGuestSongRequests();
    });
}

// ======================================================
// FIREBASE SONG REQUEST SUBMISSION — FINAL BRIDGE
// ======================================================

const firebaseGuestSongRequestButton =
  document.getElementById("submitGuestSongRequestButton");

if (firebaseGuestSongRequestButton) {

  firebaseGuestSongRequestButton.addEventListener("click", function () {

    setTimeout(function () {

      const title =
        document
          .getElementById("guestSongRequestTitle")
          .value
          .trim();

      const artist =
        document
          .getElementById("guestSongRequestArtist")
          .value
          .trim();

      if (!title) return;

      const joinCode =
        new URLSearchParams(window.location.search).get("join");

      if (!joinCode) return;

      eventDatabase
        .ref("events/" + joinCode + "/songRequests")
        .push({
          title: title,
          artist: artist,
          submittedAt: new Date().toISOString()
        })
        .then(function () {
          console.log("Guest song request synced to Firebase.");
        })
        .catch(function (error) {
          console.error(
            "Guest song request Firebase sync failed:",
            error
          );
        });

    }, 25);

  });

}
// ======================================================
// FIREBASE LIVE PHOTO SUBMISSIONS LISTENER
// ======================================================

function startFirebasePhotoSubmissionsListener(joinCode) {

  if (!joinCode) return;

  eventDatabase
    .ref("events/" + joinCode + "/photoSubmissionsState")
    .on("value", function (snapshot) {

      const photoState =
        snapshot.val();

      const event =
        getCurrentEvent();

      if (!event) return;

      if (!photoState) {
        localStorage.removeItem(
          "livePhotoSubmissions-" + event.id
        );

        if (guestPhotoPanel) {
          guestPhotoPanel.style.display = "none";
        }

        return;
      }

      localStorage.setItem(
        "livePhotoSubmissions-" + event.id,
        JSON.stringify(photoState)
      );

      prepareGuestPhotos();
    });
}
// ======================================================
// FIREBASE LIVE LISTENER — HOST SONG REQUESTS
// ======================================================

let firebaseSongRequestsListenerRef = null;

function startFirebaseSongRequestsListener() {

  const event =
    getCurrentEvent();

  if (!event) return;

  const eventCode =
    getGuestEventCode(event);

  if (firebaseSongRequestsListenerRef) {
    firebaseSongRequestsListenerRef.off();
  }

  firebaseSongRequestsListenerRef =
    eventDatabase.ref(
      "events/" + eventCode + "/songRequests"
    );

  firebaseSongRequestsListenerRef.on(
    "value",
    function (snapshot) {

      const requestsObject =
        snapshot.val() || {};

      const requests =
        Object.keys(requestsObject).map(function (key) {

          return {
            firebaseId: key,
            ...requestsObject[key]
          };

        });

      const container =
        document.getElementById("hostSongRequestInbox");

      if (!container) return;

      container.innerHTML = "";

      if (requests.length === 0) {

        container.innerHTML =
          "<p style='margin-top:14px;'>No requests yet.</p>";

        return;
      }

      requests.forEach(function (request) {

        const card =
          document.createElement("div");

        card.className =
          "feature-panel";

        card.style.marginTop =
          "12px";

        card.innerHTML =
          `
            <span class="small-label">
              SONG REQUEST
            </span>

            <h3>
              ${request.title || "Untitled"}
            </h3>

            <p>
              ${request.artist || "Artist not provided"}
            </p>
          `;

        container.appendChild(card);

      });

    }
  );

}
document
  .getElementById("guestHubButton")
  ?.addEventListener("click", function () {

    setTimeout(function () {
      startFirebaseSongRequestsListener();
    }, 100);

  });

  // ======================================================
// LIVE PREDICTIONS — HOST + FIREBASE
// ======================================================

const hostPredictionQuestion =
  document.getElementById("hostPredictionQuestion");

const hostPredictionChoiceOne =
  document.getElementById("hostPredictionChoiceOne");

const hostPredictionChoiceTwo =
  document.getElementById("hostPredictionChoiceTwo");

const launchPredictionButton =
  document.getElementById("launchPredictionButton");

const hostPredictionStatus =
  document.getElementById("hostPredictionStatus");

const hostPredictionLiveQuestion =
  document.getElementById("hostPredictionLiveQuestion");

const hostPredictionLiveChoices =
  document.getElementById("hostPredictionLiveChoices");


if (launchPredictionButton) {

  launchPredictionButton.onclick = function () {

    const event =
      getCurrentEvent();

    if (!event) return;

    const question =
      hostPredictionQuestion.value.trim();

    const choiceOne =
      hostPredictionChoiceOne.value.trim();

    const choiceTwo =
      hostPredictionChoiceTwo.value.trim();

    if (!question || !choiceOne || !choiceTwo) {
      alert("Enter a prediction question and both choices.");
      return;
    }

    const prediction = {
      question: question,
      choiceOne: choiceOne,
      choiceTwo: choiceTwo,
      votesOne: 0,
      votesTwo: 0,
      open: true,
      launchedAt: new Date().toISOString()
    };

    localStorage.setItem(
      "liveGuestPrediction-" + event.id,
      JSON.stringify(prediction)
    );

    hostPredictionStatus.style.display =
      "block";

    hostPredictionLiveQuestion.textContent =
      question;

    hostPredictionLiveChoices.textContent =
      choiceOne + " — 0 predictions • " +
      choiceTwo + " — 0 predictions";

    const eventCode =
      getGuestEventCode(event);

    eventDatabase
      .ref("events/" + eventCode + "/prediction")
      .set(prediction)
      .then(function () {
        console.log("Prediction synced to Firebase.");
      })
      .catch(function (error) {
        console.error(
          "Prediction Firebase sync failed:",
          error
        );
      });

    hostPredictionStatus.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

  };

}

// ======================================================
// GUEST PREDICTIONS — FIREBASE
// ======================================================

const guestPredictionPanel =
  document.getElementById("guestPredictionPanel");

const guestPredictionQuestion =
  document.getElementById("guestPredictionQuestion");

const guestPredictionChoiceOne =
  document.getElementById("guestPredictionChoiceOne");

const guestPredictionChoiceTwo =
  document.getElementById("guestPredictionChoiceTwo");

const guestPredictionConfirmation =
  document.getElementById("guestPredictionConfirmation");


function loadFirebasePrediction(joinCode) {

  if (!joinCode) return;

  eventDatabase
    .ref("events/" + joinCode + "/prediction")
    .once("value")
    .then(function (snapshot) {

      const prediction =
        snapshot.val();

      if (!prediction || !prediction.open) {
        guestPredictionPanel.style.display = "none";
        return;
      }

      guestPredictionPanel.style.display = "block";

      guestPredictionQuestion.textContent =
        prediction.question;

      guestPredictionChoiceOne.textContent =
        prediction.choiceOne;

      guestPredictionChoiceTwo.textContent =
        prediction.choiceTwo;

      guestPredictionChoiceOne.dataset.choice =
        "votesOne";

      guestPredictionChoiceTwo.dataset.choice =
        "votesTwo";

      guestPredictionConfirmation.style.display =
        "none";

    })
    .catch(function (error) {

      console.error(
        "Could not load prediction from Firebase:",
        error
      );

    });

}


function submitFirebasePredictionVote(button) {

  const joinCode =
    new URLSearchParams(window.location.search).get("join");

  if (!joinCode) return;

  const voteField =
    button.dataset.choice;

  if (!voteField) return;

  const voteRef =
    eventDatabase.ref(
      "events/" +
      joinCode +
      "/prediction/" +
      voteField
    );

  voteRef
    .transaction(function (currentVotes) {
      return (currentVotes || 0) + 1;
    })
    .then(function () {

      guestPredictionConfirmation.textContent =
        "Prediction submitted!";

      guestPredictionConfirmation.style.display =
        "block";

      guestPredictionChoiceOne.disabled = true;
      guestPredictionChoiceTwo.disabled = true;

    })
    .catch(function (error) {

      console.error(
        "Prediction vote failed:",
        error
      );

    });

}


guestPredictionChoiceOne.onclick = function () {
  submitFirebasePredictionVote(guestPredictionChoiceOne);
};

guestPredictionChoiceTwo.onclick = function () {
  submitFirebasePredictionVote(guestPredictionChoiceTwo);
};


document
  .querySelectorAll('.guest-view-action[data-feature="Predictions"]')
  .forEach(function (button) {

    button.onclick = function () {

      const joinCode =
        new URLSearchParams(window.location.search).get("join");

      loadFirebasePrediction(joinCode);

      guestPredictionPanel.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

    };

  });

  // ======================================================
// FIREBASE LIVE LISTENER — HOST PREDICTION RESULTS
// ======================================================

let firebasePredictionListenerRef = null;

function startFirebasePredictionListener() {

  const event =
    getCurrentEvent();

  if (!event) return;

  const eventCode =
    getGuestEventCode(event);

  if (firebasePredictionListenerRef) {
    firebasePredictionListenerRef.off();
  }

  firebasePredictionListenerRef =
    eventDatabase.ref(
      "events/" + eventCode + "/prediction"
    );

  firebasePredictionListenerRef.on(
    "value",
    function (snapshot) {

      const prediction =
        snapshot.val();

      if (!prediction) return;

      const votesOne =
        prediction.votesOne || 0;

      const votesTwo =
        prediction.votesTwo || 0;

      const total =
        votesOne + votesTwo;

      if (hostPredictionStatus) {
        hostPredictionStatus.style.display = "block";
      }

      if (hostPredictionLiveQuestion) {
        hostPredictionLiveQuestion.textContent =
          prediction.question;
      }

      if (hostPredictionLiveChoices) {
        hostPredictionLiveChoices.textContent =
          prediction.choiceOne +
          " — " +
          votesOne +
          " prediction" +
          (votesOne === 1 ? "" : "s") +
          " • " +
          prediction.choiceTwo +
          " — " +
          votesTwo +
          " prediction" +
          (votesTwo === 1 ? "" : "s") +
          " • " +
          total +
          " total";
      }

    }
  );

}
document
  .getElementById("guestHubButton")
  ?.addEventListener("click", function () {

    setTimeout(function () {
      startFirebasePredictionListener();
    }, 100);

  });

  // ======================================================
// FIREBASE BRIDGE — HOST TIPPING
// ======================================================

const firebaseEnableTipsButton =
  document.getElementById("enableGuestTipsButton");

const firebaseDisableTipsButton =
  document.getElementById("disableGuestTipsButton");


if (firebaseEnableTipsButton) {

  firebaseEnableTipsButton.addEventListener("click", function () {

    setTimeout(function () {

      const event =
        getCurrentEvent();

      if (!event) return;

      const tipping =
        JSON.parse(
          localStorage.getItem("guestTipping-" + event.id)
        );

      if (!tipping) return;

      const eventCode =
        getGuestEventCode(event);

      eventDatabase
        .ref("events/" + eventCode + "/tipping")
        .set(tipping)
        .then(function () {
          console.log("Tipping synced to Firebase.");
        })
        .catch(function (error) {
          console.error(
            "Tipping Firebase sync failed:",
            error
          );
        });

    }, 50);

  });

}


if (firebaseDisableTipsButton) {

  firebaseDisableTipsButton.addEventListener("click", function () {

    setTimeout(function () {

      const event =
        getCurrentEvent();

      if (!event) return;

      const tipping =
        JSON.parse(
          localStorage.getItem("guestTipping-" + event.id)
        );

      if (!tipping) return;

      const eventCode =
        getGuestEventCode(event);

      eventDatabase
        .ref("events/" + eventCode + "/tipping")
        .set(tipping);

    }, 50);

  });

}
// ======================================================
// FIREBASE LIVE LISTENER — GUEST TIPPING
// ======================================================

function startFirebaseGuestTippingListener(joinCode) {

  if (!joinCode) return;

  eventDatabase
    .ref("events/" + joinCode + "/tipping")
    .on("value", function (snapshot) {

      const tipping =
        snapshot.val();

      const event =
        getCurrentEvent();

      if (!event) return;

      if (!tipping) {
        localStorage.removeItem(
          "guestTipping-" + event.id
        );
        return;
      }

      localStorage.setItem(
        "guestTipping-" + event.id,
        JSON.stringify(tipping)
      );
    });
}

const firebaseGuestTippingJoinCode =
  new URLSearchParams(window.location.search).get("join");

function startGuestTippingWhenEventReady(
  joinCode,
  attempts
) {

  if (!joinCode) return;

  attempts =
    attempts || 0;

  const event =
    getCurrentEvent();

  if (
    event &&
    event.id
  ) {

    startFirebaseGuestTippingListener(
      joinCode
    );

    return;
  }

  if (attempts >= 20) {
    return;
  }

  setTimeout(function () {

    startGuestTippingWhenEventReady(
      joinCode,
      attempts + 1
    );

  }, 100);
}

if (firebaseGuestTippingJoinCode) {

  startGuestTippingWhenEventReady(
    firebaseGuestTippingJoinCode,
    0
  );
}
// ======================================================
// FIREBASE GUEST PRESENCE
// ======================================================

let firebaseGuestPresenceRef = null;
let firebaseGuestCountRef = null;

function startFirebaseGuestPresence(joinCode) {

  if (!joinCode) return;

  // Only register presence from an actual guest join URL.
  const urlJoinCode =
    new URLSearchParams(window.location.search).get("join");

  if (!urlJoinCode) return;

  const connectedRef =
    eventDatabase.ref(".info/connected");

  connectedRef.on("value", function (snapshot) {

    if (snapshot.val() !== true) return;

    if (firebaseGuestPresenceRef) return;

    firebaseGuestPresenceRef =
      eventDatabase
        .ref("events/" + joinCode + "/presence")
        .push();

    firebaseGuestPresenceRef
      .onDisconnect()
      .remove();

    firebaseGuestPresenceRef.set({
      connectedAt:
        firebase.database.ServerValue.TIMESTAMP
    });

  });

}


function startFirebaseGuestCountListener() {

  const event =
    getCurrentEvent();

  if (!event) return;

  const eventCode =
    getGuestEventCode(event);

  if (firebaseGuestCountRef) {
    firebaseGuestCountRef.off();
  }

  firebaseGuestCountRef =
    eventDatabase.ref(
      "events/" + eventCode + "/presence"
    );

  firebaseGuestCountRef.on(
    "value",
    function (snapshot) {

      const count =
        snapshot.numChildren();

      const liveDisplay =
        document.getElementById(
          "connectedGuestCount"
        );

      const hubDisplay =
        document.getElementById(
          "guestConnectedCount"
        );

      if (liveDisplay) {
        liveDisplay.textContent = count;
      }

      if (hubDisplay) {
        hubDisplay.textContent = count;
      }

    }
  );

}
const firebasePresenceJoinCode =
  new URLSearchParams(window.location.search).get("join");

if (firebasePresenceJoinCode) {
  startFirebaseGuestPresence(
    firebasePresenceJoinCode
  );
}

document
  .getElementById("guestHubButton")
  ?.addEventListener("click", function () {

    setTimeout(function () {
      startFirebaseGuestCountListener();
    }, 100);

  });

  // ======================================================
// GUEST SHOUTOUTS — FIREBASE
// ======================================================

const guestShoutoutPanel =
  document.getElementById("guestShoutoutPanel");

const guestShoutoutName =
  document.getElementById("guestShoutoutName");

const guestShoutoutMessage =
  document.getElementById("guestShoutoutMessage");

const submitGuestShoutoutButton =
  document.getElementById("submitGuestShoutoutButton");

const guestShoutoutConfirmation =
  document.getElementById("guestShoutoutConfirmation");


document
  .querySelectorAll('.guest-view-action[data-feature="Shoutouts"]')
  .forEach(function (button) {

    button.onclick = function () {

      guestShoutoutPanel.style.display = "block";

      guestShoutoutConfirmation.style.display = "none";

      guestShoutoutPanel.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

    };

  });


if (submitGuestShoutoutButton) {

  submitGuestShoutoutButton.onclick = function () {

    const message =
      guestShoutoutMessage.value.trim();

    const name =
      guestShoutoutName.value.trim();

    if (!message) {
      alert("Type a shoutout first.");
      return;
    }

    const joinCode =
      new URLSearchParams(window.location.search).get("join");

    if (!joinCode) return;

    eventDatabase
      .ref("events/" + joinCode + "/shoutouts")
      .push({
        name: name,
        message: message,
        approved: false,
        submittedAt: new Date().toISOString()
      })
      .then(function () {

        guestShoutoutMessage.value = "";
        guestShoutoutName.value = "";

        guestShoutoutConfirmation.textContent =
          "Shoutout sent!";

        guestShoutoutConfirmation.style.display =
          "block";

      })
      .catch(function (error) {

        console.error(
          "Shoutout Firebase sync failed:",
          error
        );

      });

  };

}

// ======================================================
// FIREBASE LIVE LISTENER — HOST SHOUTOUT INBOX
// ======================================================

let firebaseShoutoutListenerRef = null;

function startFirebaseShoutoutListener() {

  const event =
    getCurrentEvent();

  if (!event) return;

  const eventCode =
    getGuestEventCode(event);

  if (firebaseShoutoutListenerRef) {
    firebaseShoutoutListenerRef.off();
  }

  firebaseShoutoutListenerRef =
    eventDatabase.ref(
      "events/" + eventCode + "/shoutouts"
    );

  firebaseShoutoutListenerRef.on(
    "value",
    function (snapshot) {

      const shoutoutsObject =
        snapshot.val() || {};

      const shoutouts =
        Object.keys(shoutoutsObject).map(function (key) {
          return {
            firebaseId: key,
            ...shoutoutsObject[key]
          };
        });

      const container =
        document.getElementById("hostShoutoutInbox");

      if (!container) return;

      container.innerHTML = "";

      if (shoutouts.length === 0) {
        container.innerHTML =
          "<p>No shoutouts yet.</p>";
        return;
      }

      shoutouts.forEach(function (shoutout) {

        const card =
          document.createElement("div");

        card.className =
          "feature-panel";

        card.style.marginTop =
          "12px";

        const name =
          shoutout.name || "Anonymous";

        const statusText =
          shoutout.approved
            ? "✓ APPROVED"
            : "AWAITING REVIEW";

        card.innerHTML =
          `
            <span class="small-label">
              ${statusText}
            </span>

            <h3>
              ${name}
            </h3>

            <p>
              ${shoutout.message || ""}
            </p>

            <div class="main-actions" style="margin-top:12px;">
              <button
                class="primary-button"
                data-action="approve">
                APPROVE
              </button>

              <button
                class="secondary-button"
                data-action="reject">
                REJECT
              </button>
            </div>
          `;

        const approveButton =
          card.querySelector(
            '[data-action="approve"]'
          );

        const rejectButton =
          card.querySelector(
            '[data-action="reject"]'
          );

        approveButton.onclick = function () {

          eventDatabase
            .ref(
              "events/" +
              eventCode +
              "/shoutouts/" +
              shoutout.firebaseId +
              "/approved"
            )
            .set(true);

        };

        rejectButton.onclick = function () {

          eventDatabase
            .ref(
              "events/" +
              eventCode +
              "/shoutouts/" +
              shoutout.firebaseId
            )
            .remove();

        };

        container.appendChild(card);

      });

    }
  );

}
document
  .getElementById("guestHubButton")
  ?.addEventListener("click", function () {

    setTimeout(function () {
      startFirebaseShoutoutListener();
    }, 100);

  });

  // ======================================================
// LIVE BUZZER — HOST + GUEST + FIREBASE
// ======================================================

const hostBuzzerPrompt =
  document.getElementById("hostBuzzerPrompt");

const openBuzzerButton =
  document.getElementById("openBuzzerButton");

const resetBuzzerButton =
  document.getElementById("resetBuzzerButton");

const hostBuzzerWinner =
  document.getElementById("hostBuzzerWinner");

const hostBuzzerStatusMessage =
  document.getElementById("hostBuzzerStatusMessage");

const guestBuzzerPanel =
  document.getElementById("guestBuzzerPanel");

const guestBuzzerPrompt =
  document.getElementById("guestBuzzerPrompt");

const guestBuzzerName =
  document.getElementById("guestBuzzerName");

const guestBuzzButton =
  document.getElementById("guestBuzzButton");

const guestBuzzerStatus =
  document.getElementById("guestBuzzerStatus");

let firebaseBuzzerListenerRef = null;


// ------------------------------------------------------
// HOST — OPEN BUZZER
// ------------------------------------------------------

if (openBuzzerButton) {

  openBuzzerButton.onclick = function () {

    const event =
      getCurrentEvent();

    if (!event) return;

    const eventCode =
      getGuestEventCode(event);

    const prompt =
      hostBuzzerPrompt.value.trim() ||
      "Ready to buzz in?";

    eventDatabase
      .ref("events/" + eventCode + "/buzzer")
      .set({
        open: true,
        prompt: prompt,
        winner: null,
        openedAt: firebase.database.ServerValue.TIMESTAMP
      });

    hostBuzzerWinner.textContent =
      "Buzzer is OPEN";

    hostBuzzerStatusMessage.textContent =
      "Waiting for the first guest to buzz in.";

  };

}


// ------------------------------------------------------
// HOST — RESET BUZZER
// ------------------------------------------------------

if (resetBuzzerButton) {

  resetBuzzerButton.onclick = function () {

    const event =
      getCurrentEvent();

    if (!event) return;

    const eventCode =
      getGuestEventCode(event);

    const prompt =
      hostBuzzerPrompt.value.trim() ||
      "Ready to buzz in?";

    eventDatabase
      .ref("events/" + eventCode + "/buzzer")
      .set({
        open: true,
        prompt: prompt,
        winner: null,
        openedAt: firebase.database.ServerValue.TIMESTAMP
      });

    hostBuzzerWinner.textContent =
      "Buzzer reset — OPEN";

    hostBuzzerStatusMessage.textContent =
      "Waiting for the first guest to buzz in.";

  };

}


// ------------------------------------------------------
// GUEST — OPEN BUZZER PANEL
// ------------------------------------------------------

document
  .querySelectorAll('.guest-view-action[data-feature="Buzzer"]')
  .forEach(function (button) {

    button.onclick = function () {

      const joinCode =
        new URLSearchParams(window.location.search).get("join");

      if (!joinCode) return;

      eventDatabase
        .ref("events/" + joinCode + "/buzzer")
        .once("value")
        .then(function (snapshot) {

          const buzzer =
            snapshot.val();

          guestBuzzerPanel.style.display =
            "block";

          if (!buzzer || !buzzer.open) {

            guestBuzzerPrompt.textContent =
              "Buzzer is currently closed.";

            guestBuzzButton.disabled =
              true;

          } else {

            guestBuzzerPrompt.textContent =
              buzzer.prompt || "Ready to buzz in?";

            guestBuzzButton.disabled =
              false;

          }

          guestBuzzerStatus.style.display =
            "none";

          guestBuzzerPanel.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });

        });

    };

  });


// ------------------------------------------------------
// GUEST — BUZZ
// ------------------------------------------------------

if (guestBuzzButton) {

  guestBuzzButton.onclick = function () {

    const name =
      guestBuzzerName.value.trim();

    if (!name) {
      alert("Enter your name first.");
      return;
    }

    const joinCode =
      new URLSearchParams(window.location.search).get("join");

    if (!joinCode) return;

    const buzzerRef =
      eventDatabase.ref(
        "events/" + joinCode + "/buzzer"
      );

    // First make sure the buzzer is actually open.
    buzzerRef
      .once("value")
      .then(function (snapshot) {

        const buzzer =
          snapshot.val();

        if (!buzzer || !buzzer.open) {

          guestBuzzerStatus.style.display =
            "block";

          guestBuzzerStatus.textContent =
            "The buzzer is closed.";

          guestBuzzButton.disabled =
            true;

          return;
        }

        // Only the FIRST guest is allowed to claim /winner.
        const winnerRef =
          buzzerRef.child("winner");

        return winnerRef
          .transaction(function (currentWinner) {

            if (currentWinner !== null) {
              return;
            }

            return {
              name: name,
              buzzedAt: Date.now()
            };

          })
          .then(function (result) {

            if (!result) return;

            guestBuzzerStatus.style.display =
              "block";

            if (result.committed) {

              guestBuzzerStatus.textContent =
                "⚡ YOU BUZZED FIRST!";

              // Lock the round after a winner is established.
              buzzerRef
                .child("open")
                .set(false);

            } else {

              const winner =
                result.snapshot.val();

              guestBuzzerStatus.textContent =
                winner && winner.name
                  ? "Too late — " +
                    winner.name +
                    " buzzed first."
                  : "Someone else got there first.";

            }

            guestBuzzButton.disabled =
              true;

          });

      })
      .catch(function (error) {

        console.error(
          "Guest buzzer failed:",
          error
        );

        guestBuzzerStatus.style.display =
          "block";

        guestBuzzerStatus.textContent =
          "Buzzer error. Please try again.";

      });

  };

}
// ------------------------------------------------------
// HOST — LIVE WINNER LISTENER
// ------------------------------------------------------

function startFirebaseBuzzerListener() {

  const event =
    getCurrentEvent();

  if (!event) return;

  const eventCode =
    getGuestEventCode(event);

  if (firebaseBuzzerListenerRef) {
    firebaseBuzzerListenerRef.off();
  }

  firebaseBuzzerListenerRef =
    eventDatabase.ref(
      "events/" + eventCode + "/buzzer"
    );

  firebaseBuzzerListenerRef.on(
    "value",
    function (snapshot) {

      const buzzer =
        snapshot.val();

      if (!buzzer) return;

      if (buzzer.winner) {

        hostBuzzerWinner.textContent =
          "⚡ " + buzzer.winner.name + " BUZZED FIRST!";

        hostBuzzerStatusMessage.textContent =
          "Buzzer locked. Reset when you're ready for the next round.";

        const liveResponseMessage =
          document.getElementById(
            "livePhoneResponseMessage"
          );

        if (liveResponseMessage) {
          liveResponseMessage.textContent =
            "⚡ " +
            buzzer.winner.name +
            " buzzed first!";
        }

        syncLiveResultToAllScreens({
          title: "BUZZER WINNER",
          value:
            "⚡ " +
            buzzer.winner.name +
            " BUZZED FIRST!",
          detail:
            buzzer.prompt ||
            "Fastest response wins."
        });

      } else if (buzzer.open) {

        hostBuzzerWinner.textContent =
          "Buzzer is OPEN";

        hostBuzzerStatusMessage.textContent =
          "Waiting for the first guest to buzz in.";

        const liveResponseMessage =
          document.getElementById(
            "livePhoneResponseMessage"
          );

        if (liveResponseMessage) {
          liveResponseMessage.textContent =
            "The buzzer is open on every guest phone. Waiting for the first response.";
        }

      }

    }
  );

}


let firebaseGuestBuzzerListenerRef = null;


function startUniversalGuestBuzzerListener(joinCode) {

  if (!joinCode) return;

  if (firebaseGuestBuzzerListenerRef) {
    firebaseGuestBuzzerListenerRef.off();
  }

  firebaseGuestBuzzerListenerRef =
    eventDatabase.ref(
      "events/" + joinCode + "/buzzer"
    );

  firebaseGuestBuzzerListenerRef.on(
    "value",
    function (snapshot) {

      const buzzer = snapshot.val();

      if (!buzzer) {
        return;
      }

      if (buzzer.open) {

        guestBuzzerPrompt.textContent =
          buzzer.prompt ||
          "Ready to buzz in?";

        guestBuzzerPanel.style.display =
          "block";

        guestBuzzButton.disabled =
          false;

        guestBuzzerStatus.style.display =
          "none";

        setTimeout(function () {
          guestBuzzerPanel.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }, 80);

        return;
      }

      if (buzzer.winner) {

        guestBuzzerPanel.style.display =
          "block";

        guestBuzzButton.disabled =
          true;

        guestBuzzerStatus.style.display =
          "block";

        guestBuzzerStatus.textContent =
          "⚡ " +
          buzzer.winner.name +
          " buzzed first!";
      }
    }
  );
}


document
  .getElementById("guestHubButton")
  ?.addEventListener("click", function () {

    setTimeout(function () {
      startFirebaseBuzzerListener();
    }, 100);

  });

  // ======================================================
// LIVE ACTIVITY FEED — FIREBASE
// ======================================================

let firebaseActivityListenersStarted = false;

function addHostActivityItem(text) {

  const feed =
    document.getElementById("hostLiveActivityFeed");

  if (!feed) return;

  if (
    feed.children.length === 1 &&
    feed.textContent.includes("No recent guest activity.")
  ) {
    feed.innerHTML = "";
  }

  const item =
    document.createElement("div");

  item.className = "feature-panel";
  item.style.marginTop = "10px";

  item.textContent = text;

  feed.prepend(item);

  while (feed.children.length > 8) {
    feed.removeChild(feed.lastChild);
  }

}


function startFirebaseActivityFeed() {

  if (firebaseActivityListenersStarted) return;

  const event =
    getCurrentEvent();

  if (!event) return;

  const eventCode =
    getGuestEventCode(event);

  firebaseActivityListenersStarted = true;


  // SONG REQUESTS
  eventDatabase
    .ref("events/" + eventCode + "/songRequests")
    .on("child_added", function (snapshot) {

      const request = snapshot.val();

      addHostActivityItem(
        "🎵 New song request: " +
        (request.title || "Untitled") +
        (request.artist
          ? " — " + request.artist
          : "")
      );

    });


  // SHOUTOUTS
  eventDatabase
    .ref("events/" + eventCode + "/shoutouts")
    .on("child_added", function (snapshot) {

      const shoutout = snapshot.val();

      addHostActivityItem(
        "💬 New shoutout" +
        (shoutout.name
          ? " from " + shoutout.name
          : "") +
        ": " +
        (shoutout.message || "")
      );

    });


  // POLL VOTES
  eventDatabase
    .ref("events/" + eventCode + "/poll")
    .on("value", function (snapshot) {

      const poll = snapshot.val();

      if (!poll) return;

      const total =
        (poll.votesOne || 0) +
        (poll.votesTwo || 0);

      addHostActivityItem(
        "🗳️ Live poll activity: " +
        total +
        " total vote" +
        (total === 1 ? "" : "s")
      );

    });


  // PREDICTIONS
  eventDatabase
    .ref("events/" + eventCode + "/prediction")
    .on("value", function (snapshot) {

      const prediction = snapshot.val();

      if (!prediction) return;

      const total =
        (prediction.votesOne || 0) +
        (prediction.votesTwo || 0);

      addHostActivityItem(
        "🔮 Prediction activity: " +
        total +
        " response" +
        (total === 1 ? "" : "s")
      );

    });


  // BUZZER WINNER
  eventDatabase
    .ref("events/" + eventCode + "/buzzer/winner")
    .on("value", function (snapshot) {

      const winner = snapshot.val();

      if (!winner) return;

      addHostActivityItem(
        "⚡ " +
        winner.name +
        " buzzed first."
      );

    });


  // GUEST COUNT
  eventDatabase
    .ref("events/" + eventCode + "/presence")
    .on("value", function (snapshot) {

      const count =
        snapshot.numChildren();

      addHostActivityItem(
        "👥 " +
        count +
        " guest" +
        (count === 1 ? "" : "s") +
        " connected."
      );

    });

}


document
  .getElementById("guestHubButton")
  ?.addEventListener("click", function () {

    setTimeout(function () {
      startFirebaseActivityFeed();
    }, 150);

  });


// ======================================================
// CLEAN HOST CONTROL LAUNCH BUTTON
// Removes any older duplicate click listeners
// ======================================================

(function cleanHostLaunchButton() {

  const oldButton =
    document.getElementById(
      "launchSegmentButton"
    );

  if (!oldButton) {
    return;
  }

  const cleanButton =
    oldButton.cloneNode(true);

  oldButton.replaceWith(
    cleanButton
  );


  cleanButton.addEventListener(
    "click",
    function () {

      const event =
        getCurrentEvent();

      const show =
        event.show || [];


      if (!show.length) {

        alert(
          "No show is loaded."
        );

        return;
      }


      const segment =
        show[
          currentHostSegmentIndex
        ];


      const activity =
        findActivityForShowSegment(
          segment,
          event
        );


      if (activity) {

        startLiveActivity(
          activity,
          "hostControl"
        );

        return;
      }


      audienceReturnScreen =
        "hostControl";

      audienceEventName.textContent =
        event.eventName ||
        "Live Event";

      audienceSegmentTitle.textContent =
        segment.title;

      audienceSegmentMessage.textContent =
        segment.description;

      hideAudienceScores();

      audienceBackButton.textContent =
        "← HOST CONTROL";

      openAudience();
    }
  );

})();


// EPP EXPERIENCE LAYER V1
(function(){
if(window.__eppXL)return;window.__eppXL=true;
const $=id=>document.getElementById(id), ev=()=>{try{return getCurrentEvent()||{}}catch(e){return{}}}, code=()=>{const e=ev();try{return e&&e.id?getGuestEventCode(e):''}catch(x){return''}}, join=()=>new URLSearchParams(location.search).get('join')||'';

function theme(t){
  t=t||{};
  const r=document.documentElement;

  const savedPrimary=
    String(t.primary||'')
      .toLowerCase();

  const oldGoldColors=[
    '#d4af37',
    '#d8b56a',
    '#d8b75d',
    '#e8bd69'
  ];

  const primary=
    oldGoldColors.includes(savedPrimary)
      ? '#f45bd2'
      : t.primary||'#f45bd2';

  r.style.setProperty('--eppP',primary);
  r.style.setProperty('--eppA',t.accent||'#77d7ff');
  r.style.setProperty('--eppB',t.mode==='light'?'#f7f7f7':'#0f0f12');
  r.style.setProperty('--eppT',t.mode==='light'?'#161616':'#ffffff');
  document.body.classList.add('eppTheme');
}

const st=document.createElement('style');
st.textContent=':root{--eppP:#d4af37;--eppA:#fff;--eppB:#0f0f12;--eppT:#fff}.eppBox{border:1px solid var(--eppP);border-radius:16px;padding:18px;margin-top:18px;background:var(--eppB);color:var(--eppT)}.eppBox h2,.eppBox h3{color:var(--eppP)}.eppGrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px}.eppGrid input,.eppGrid select{width:100%;box-sizing:border-box;padding:10px;margin-top:6px}.eppBtns{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}.eppBtns button{border:0;border-radius:999px;padding:10px 13px;font-weight:700;cursor:pointer;background:var(--eppP);color:#111}.eppBtns .ghost{background:rgba(255,255,255,.12);color:var(--eppT)}#eppResults{display:none;text-align:center;border:2px solid var(--eppP);border-radius:18px;padding:20px;margin-top:18px;background:var(--eppB);color:var(--eppT)}#eppResultValue{font-size:clamp(34px,9vw,70px);font-weight:900;color:var(--eppP);margin:10px 0}.eppCloud{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:10px 14px;min-height:100px;padding:16px}.eppCloud span{font-weight:800;color:var(--eppP)}#eppGuestCloud{display:none}#eppAudienceCloud{display:none;margin:20px;padding:22px;border:2px solid var(--eppP);border-radius:18px;background:var(--eppB);color:var(--eppT)}#eppGlow{position:fixed;inset:0;display:none;z-index:2147483646;align-items:center;justify-content:center;font-size:clamp(36px,12vw,90px);font-weight:900;color:white;text-shadow:0 2px 16px #000;pointer-events:none}.eppTheme #guestViewScreen.active,.eppTheme #audienceScreen.active{background:var(--eppB);color:var(--eppT)}';
document.head.appendChild(st);

function hostUI(){
  const h=$('guestHubScreen');
  if(!h||$('eppHostXL'))return;

  const d=document.createElement('div');
  d.id='eppHostXL';
  d.className='eppBox';

  d.innerHTML='<span class="small-label">EXPERIENCE LAYER</span><h2>Guest Phones + Live Room Effects</h2><div class="eppBox"><h3>Event Colors</h3><div class="eppGrid"><label>Primary<input id="eppPrimary" type="color" value="#d4af37"></label><label>Accent<input id="eppAccent" type="color" value="#ffffff"></label><label>Style<select id="eppMode"><option value="dark">Dark</option><option value="light">Light</option></select></label></div><div class="eppBtns"><button id="eppSaveTheme">SAVE EVENT COLORS</button></div></div><div class="eppBox"><h3>Guest Live Results</h3><div class="eppBtns"><button id="eppVoteResults">SEND VOTING RESULTS</button><button id="eppPredResults">SEND PREDICTION RESULTS</button><button id="eppClearResults" class="ghost">CLEAR</button></div><div class="eppGrid" style="margin-top:12px"><input id="eppCT" placeholder="Result title"><input id="eppCV" placeholder="Big result"><input id="eppCD" placeholder="Detail"></div><div class="eppBtns"><button id="eppCustomResult">SEND CUSTOM RESULT</button></div></div><div class="eppBox"><h3>Live Word Cloud</h3><div class="eppBtns"><button id="eppOpenCloud">OPEN</button><button id="eppShowCloud">SHOW ON AUDIENCE</button><button id="eppHideCloud" class="ghost">HIDE AUDIENCE</button><button id="eppCloseCloud" class="ghost">CLOSE</button><button id="eppClearCloud" class="ghost">CLEAR WORDS</button></div><div id="eppHostWords" class="eppCloud"></div></div><div class="eppBox"><h3>Glowstick Mode</h3><div class="eppGrid"><label>Glow color<input id="eppGlowColor" type="color" value="#3b82f6"></label></div><div class="eppBtns"><button data-glow="#ef4444">RED</button><button data-glow="#3b82f6">BLUE</button><button data-glow="#a855f7">PURPLE</button><button data-glow="#22c55e">GREEN</button><button data-glow="#ffffff">WHITE</button><button id="eppGlowStart">START</button><button id="eppGlowStop" class="ghost">STOP</button></div></div>';

  h.appendChild(d);
  wireHost();
  loadTheme();
  startHostCloud();
}

function guestUI(){
  const g=$('guestViewScreen');

  if(g&&!$('eppResults')){
    const r=document.createElement('div');
    r.id='eppResults';
    r.innerHTML='<div id="eppResultTitle">LIVE RESULT</div><div id="eppResultValue">—</div><div id="eppResultDetail"></div>';
    const firstGuestPanel=
      g.querySelector('.feature-panel');

    if(firstGuestPanel){
      g.insertBefore(r,firstGuestPanel);
    }else{
      g.appendChild(r);
    }
  }

  if(g&&!$('eppGuestCloud')){
    const c=document.createElement('div');
    c.id='eppGuestCloud';
    c.className='eppBox';
    c.innerHTML='<h3>Live Word Cloud</h3><p>Submit one word.</p><input id="eppWord" maxlength="30" placeholder="Type one word" style="width:100%;box-sizing:border-box;padding:10px"><div class="eppBtns"><button id="eppWordSend">SUBMIT WORD</button></div><p id="eppWordStatus" style="display:none">Word submitted!</p><div id="eppGuestWords" class="eppCloud"></div>';
    g.appendChild(c);
    $('eppWordSend').onclick=sendWord;
  }

  const a=$('audienceScreen');

  if(a&&!$('eppAudienceCloud')){
    const c=document.createElement('div');
    c.id='eppAudienceCloud';
    c.innerHTML='<h2 style="text-align:center">What The Room Is Saying</h2><div id="eppAudienceWords" class="eppCloud"></div>';
    a.appendChild(c);
  }

  if(!$('eppGlow')){
    const z=document.createElement('div');
    z.id='eppGlow';
    z.textContent='HOLD IT UP';
    document.body.appendChild(z);
  }
}

function loadTheme(){
  const e=ev();
  if(!e.id)return;

  const t=e.theme||{
    primary:'#f45bd2',
    accent:'#77d7ff',
    mode:'dark'
  };

  theme(t);

  if($('eppPrimary'))$('eppPrimary').value=(t.primary==='#d4af37'?'#f45bd2':t.primary)||'#f45bd2';
  if($('eppAccent'))$('eppAccent').value=t.accent||'#77d7ff';
  if($('eppMode'))$('eppMode').value=t.mode||'dark';
}

function wireHost(){

  if($('eppSaveTheme')){
    $('eppSaveTheme').onclick=()=>{
      const e=ev();

      if(!e.id){
        alert('Open an event first.');
        return;
      }

      const t={
        primary:$('eppPrimary').value,
        accent:$('eppAccent').value,
        mode:$('eppMode').value
      };

      e.theme=t;
      saveCurrentEvent(e);
      updateEventInLibrary(e);
      theme(t);

      eventDatabase
        .ref('events/'+code()+'/theme')
        .set(t);
    };
  }

  if($('eppVoteResults')){
    $('eppVoteResults').onclick=voteResults;
  }

  if($('eppPredResults')){
    $('eppPredResults').onclick=predResults;
  }

  if($('eppClearResults')){
    $('eppClearResults').onclick=()=>publish({
      active:false
    });
  }

  if($('eppCustomResult')){
    $('eppCustomResult').onclick=()=>{
      const v=$('eppCV').value.trim();

      if(!v){
        alert('Enter the main result first.');
        return;
      }

      publish({
        active:true,
        title:$('eppCT').value.trim()||'LIVE RESULT',
        value:v,
        detail:$('eppCD').value.trim()
      });
    };
  }

  if($('eppOpenCloud')){
    $('eppOpenCloud').onclick=()=>cloudState({
      open:true
    });
  }

  if($('eppCloseCloud')){
    $('eppCloseCloud').onclick=()=>cloudState({
      open:false
    });
  }

  if($('eppShowCloud')){
    $('eppShowCloud').onclick=()=>cloudState({
      showAudience:true
    });
  }

  if($('eppHideCloud')){
    $('eppHideCloud').onclick=()=>cloudState({
      showAudience:false
    });
  }

  if($('eppClearCloud')){
    $('eppClearCloud').onclick=()=>{
      eventDatabase
        .ref('events/'+code()+'/wordCloud/words')
        .remove();
    };
  }

  document
    .querySelectorAll('[data-glow]')
    .forEach(b=>{
      b.onclick=()=>glow(
        true,
        b.dataset.glow
      );
    });

  if($('eppGlowStart')){
    $('eppGlowStart').onclick=()=>glow(
      true,
      $('eppGlowColor').value
    );
  }

  if($('eppGlowStop')){
    $('eppGlowStop').onclick=()=>glow(
      false,
      '#000000'
    );
  }
}

function publish(o){
  const c=code();
  if(!c)return;

  eventDatabase
    .ref('events/'+c+'/guestResults')
    .set(
      Object.assign(
        {
          updatedAt:
            firebase.database.ServerValue.TIMESTAMP
        },
        o
      )
    );
}

function pct(n,t){
  return t
    ? Math.round(n/t*100)
    : 0;
}

function voteResults(){
  const c=code();

  eventDatabase
    .ref('events/'+c+'/poll')
    .once('value')
    .then(s=>{
      const p=s.val();

      if(!p){
        alert('No live voting results found.');
        return;
      }

      const a=Number(p.votesOne||0);
      const b=Number(p.votesTwo||0);
      const t=a+b;

      const A=
        p.choiceOne||
        p.optionOne||
        'Choice 1';

      const B=
        p.choiceTwo||
        p.optionTwo||
        'Choice 2';

      publish({
        active:true,
        title:p.question||'VOTING RESULTS',
        value:
          a===b
            ? 'TIED'
            : a>b
              ? A
              : B,
        detail:
          A+' '+pct(a,t)+'% • '+
          B+' '+pct(b,t)+'%'
      });
    });
}

function predResults(){
  const c=code();

  eventDatabase
    .ref('events/'+c+'/prediction')
    .once('value')
    .then(s=>{
      const p=s.val();

      if(!p){
        alert('No prediction results found.');
        return;
      }

      const ar=
        Object.keys(p)
          .filter(k=>typeof p[k]==='number')
          .map(k=>({
            k,
            v:Number(p[k])
          }))
          .sort((a,b)=>b.v-a.v);

      if(!ar.length){
        alert('No prediction votes found.');
        return;
      }

      const t=
        ar.reduce(
          (q,i)=>q+i.v,
          0
        );

      const w=ar[0];

      publish({
        active:true,
        title:
          p.question||
          'PREDICTION RESULTS',
        value:
          p[w.k+'Label']||
          w.k,
        detail:
          pct(w.v,t)+
          '% of responses'
      });
    });
}

function showResult(r){
  const p=$('eppResults');

  if(!p)return;

  if(!r||!r.active){
    p.style.display='none';
    return;
  }

  $('eppResultTitle').textContent=
    r.title||'LIVE RESULT';

  $('eppResultValue').textContent=
    r.value||'—';

  $('eppResultDetail').textContent=
    r.detail||'';

  p.style.display='block';

  setTimeout(function(){
    p.scrollIntoView({
      behavior:'smooth',
      block:'start'
    });
  },50);
}

function cloudState(part){
  const c=code();

  const r=
    eventDatabase.ref(
      'events/'+c+'/wordCloud/state'
    );

  r.once('value')
    .then(s=>{
      const q=s.val()||{};

      r.set({
        open:
          part.open!==undefined
            ? part.open
            : !!q.open,

        showAudience:
          part.showAudience!==undefined
            ? part.showAudience
            : !!q.showAudience,

        updatedAt:
          firebase.database.ServerValue.TIMESTAMP
      });
    });
}

function sendWord(){
  const c=join();
  const i=$('eppWord');

  const w=
    (i.value||'')
      .trim()
      .replace(/s+/g,' ')
      .slice(0,30);

  if(!w){
    alert('Type one word first.');
    return;
  }

  eventDatabase
    .ref(
      'events/'+
      c+
      '/wordCloud/words'
    )
    .push({
      word:w,
      submittedAt:
        firebase.database.ServerValue.TIMESTAMP
    })
    .then(()=>{
      i.value='';
      $('eppWordStatus').style.display='block';
    });
}

function cloud(el,obj){
  if(!el)return;

  const m={};

  Object
    .values(obj||{})
    .forEach(x=>{
      const w=
        ((x&&x.word)||'')
          .trim();

      if(!w)return;

      const k=w.toLowerCase();

      if(!m[k]){
        m[k]={
          w,
          c:0
        };
      }

      m[k].c++;
    });

  const ar=
    Object.values(m)
      .sort((a,b)=>b.c-a.c);

  el.innerHTML='';

  if(!ar.length){
    el.textContent=
      'Waiting for the first word…';
    return;
  }

  const mx=
    Math.max(
      ...ar.map(x=>x.c)
    );

  ar.forEach(x=>{
    const z=
      document.createElement('span');

    const r=x.c/mx;

    z.style.fontSize=
      (20+Math.round(r*30))+
      'px';

    z.textContent=x.w;

    el.appendChild(z);
  });
}

function cloudView(s){
  if($('eppGuestCloud')){
    $('eppGuestCloud').style.display=
      s&&s.open
        ? 'block'
        : 'none';
  }

  if($('eppAudienceCloud')){
    $('eppAudienceCloud').style.display=
      s&&s.showAudience
        ? 'block'
        : 'none';
  }
}

function glow(active,color){
  const c=code();

  if(!c)return;

  eventDatabase
    .ref(
      'events/'+
      c+
      '/glowstick'
    )
    .set({
      active,
      color,
      updatedAt:
        firebase.database.ServerValue.TIMESTAMP
    });
}

function glowView(s){
  const z=$('eppGlow');

  if(!z)return;

  if(!s||!s.active){
    z.style.display='none';
    return;
  }

  z.style.background=
    s.color||
    '#3b82f6';

  z.style.display='flex';
}

let hc='';

function startHostCloud(){
  const c=code();

  if(!c||hc===c)return;

  hc=c;

  eventDatabase
    .ref(
      'events/'+
      c+
      '/wordCloud/words'
    )
    .on(
      'value',
      s=>{
        cloud(
          $('eppHostWords'),
          s.val()
        );

        cloud(
          $('eppAudienceWords'),
          s.val()
        );
      }
    );

  eventDatabase
    .ref(
      'events/'+
      c+
      '/wordCloud/state'
    )
    .on(
      'value',
      s=>cloudView(
        s.val()||{}
      )
    );
}

function guestListeners(){
  const c=join();

  if(!c)return;

  eventDatabase
    .ref('events/'+c+'/theme')
    .on(
      'value',
      s=>{
        if(s.val()){
          theme(s.val());
        }
      }
    );

  eventDatabase
    .ref('events/'+c+'/guestResults')
    .on(
      'value',
      s=>showResult(
        s.val()
      )
    );

  eventDatabase
    .ref('events/'+c+'/wordCloud/state')
    .on(
      'value',
      s=>cloudView(
        s.val()||{}
      )
    );

  eventDatabase
    .ref('events/'+c+'/wordCloud/words')
    .on(
      'value',
      s=>cloud(
        $('eppGuestWords'),
        s.val()
      )
    );

  eventDatabase
    .ref('events/'+c+'/glowstick')
    .on(
      'value',
      s=>glowView(
        s.val()
      )
    );
}

hostUI();
guestUI();

const hb=$('guestHubButton');

if(hb){
  hb.addEventListener(
    'click',
    ()=>setTimeout(
      ()=>{
        hostUI();
        guestUI();
        loadTheme();
        startHostCloud();
      },
      120
    )
  );
}

guestListeners();

})();


// EPP THEME SYNC FIX V1
(function () {

  function applyFullGuestTheme(theme) {

    if (!theme) return;

    const primary =
      theme.primary || "#d4af37";

    const accent =
      theme.accent || "#ffffff";

    const light =
      theme.mode === "light";

    const background =
      light ? "#f7f7f7" : "#0f0f12";

    const text =
      light ? "#161616" : "#ffffff";


    document.documentElement.style.setProperty(
      "--eppP",
      primary
    );

    document.documentElement.style.setProperty(
      "--eppA",
      accent
    );

    document.documentElement.style.setProperty(
      "--eppB",
      background
    );

    document.documentElement.style.setProperty(
      "--eppT",
      text
    );


    const guestScreen =
      document.getElementById(
        "guestViewScreen"
      );

    if (guestScreen) {

      guestScreen.style.background =
        background;

      guestScreen.style.color =
        text;
    }


    document
      .querySelectorAll(
        "#guestViewScreen .guest-view-action"
      )
      .forEach(function (button) {

        button.style.background =
          primary;

        button.style.color =
          light ? "#111111" : "#111111";

        button.style.border =
          "2px solid " + accent;

        button.style.boxShadow =
          "0 0 0 1px " +
          accent +
          "33";
      });


    document
      .querySelectorAll(
        "#guestViewScreen h1, #guestViewScreen h2, #guestViewScreen h3"
      )
      .forEach(function (heading) {

        heading.style.color =
          primary;
      });


    const liveResults =
      document.getElementById(
        "eppResults"
      );

    if (liveResults) {

      liveResults.style.borderColor =
        accent;

      liveResults.style.background =
        background;

      liveResults.style.color =
        text;
    }


    const guestCloud =
      document.getElementById(
        "eppGuestCloud"
      );

    if (guestCloud) {

      guestCloud.style.borderColor =
        accent;

      guestCloud.style.background =
        background;
    }


    const audience =
      document.getElementById(
        "audienceScreen"
      );

    if (audience) {

      audience.style.background =
        background;

      audience.style.color =
        text;
    }
  }


  // HOST — immediately preview chosen colors.
  const saveButton =
    document.getElementById(
      "eppSaveTheme"
    );

  if (saveButton) {

    saveButton.addEventListener(
      "click",
      function () {

        setTimeout(function () {

          const primary =
            document.getElementById(
              "eppPrimary"
            );

          const accent =
            document.getElementById(
              "eppAccent"
            );

          const mode =
            document.getElementById(
              "eppMode"
            );

          if (
            primary &&
            accent &&
            mode
          ) {

            applyFullGuestTheme({
              primary:
                primary.value,

              accent:
                accent.value,

              mode:
                mode.value
            });
          }

        }, 50);
      }
    );
  }


  // GUEST — listen directly to Firebase theme changes.
  const joinCode =
    new URLSearchParams(
      window.location.search
    ).get("join");


  if (joinCode) {

    eventDatabase
      .ref(
        "events/" +
        joinCode +
        "/theme"
      )
      .on(
        "value",
        function (snapshot) {

          const theme =
            snapshot.val();

          if (theme) {

            applyFullGuestTheme(
              theme
            );
          }
        }
      );
  }

})();


// EPP ACCENT VISIBILITY FIX V1
(function () {

  function applyVisibleAccent(theme) {

    if (!theme) return;

    const primary =
      theme.primary || "#d4af37";

    const accent =
      theme.accent || "#ffffff";

    const light =
      theme.mode === "light";

    const background =
      light ? "#f7f7f7" : "#0f0f12";

    const text =
      light ? "#161616" : "#ffffff";


    const guest =
      document.getElementById(
        "guestViewScreen"
      );

    if (guest) {

      guest.style.background =
        background;

      guest.style.color =
        text;

      guest.style.borderTop =
        "8px solid " + accent;
    }


    document
      .querySelectorAll(
        "#guestViewScreen .guest-view-action"
      )
      .forEach(function (button) {

        button.style.setProperty(
          "background",
          primary,
          "important"
        );

        button.style.setProperty(
          "border",
          "3px solid " + accent,
          "important"
        );

        button.style.setProperty(
          "box-shadow",
          "0 0 0 2px " +
            accent +
            ", 0 0 18px " +
            accent +
            "88",
          "important"
        );

        button.style.setProperty(
          "color",
          "#111111",
          "important"
        );
      });


    document
      .querySelectorAll(
        "#guestViewScreen h1, #guestViewScreen h2, #guestViewScreen h3"
      )
      .forEach(function (heading) {

        heading.style.setProperty(
          "color",
          primary,
          "important"
        );
      });


    const results =
      document.getElementById(
        "eppResults"
      );

    if (results) {

      results.style.setProperty(
        "border",
        "4px solid " + accent,
        "important"
      );
    }


    const cloud =
      document.getElementById(
        "eppGuestCloud"
      );

    if (cloud) {

      cloud.style.setProperty(
        "border",
        "4px solid " + accent,
        "important"
      );
    }
  }


  const joinCode =
    new URLSearchParams(
      window.location.search
    ).get("join");


  if (joinCode) {

    eventDatabase
      .ref(
        "events/" +
        joinCode +
        "/theme"
      )
      .on(
        "value",
        function (snapshot) {

          const theme =
            snapshot.val();

          if (theme) {

            applyVisibleAccent(
              theme
            );
          }
        }
      );
  }


  const saveButton =
    document.getElementById(
      "eppSaveTheme"
    );

  if (saveButton) {

    saveButton.addEventListener(
      "click",
      function () {

        setTimeout(function () {

          const primary =
            document.getElementById(
              "eppPrimary"
            );

          const accent =
            document.getElementById(
              "eppAccent"
            );

          const mode =
            document.getElementById(
              "eppMode"
            );

          if (
            primary &&
            accent &&
            mode
          ) {

            applyVisibleAccent({
              primary:
                primary.value,

              accent:
                accent.value,

              mode:
                mode.value
            });
          }

        }, 75);
      }
    );
  }

})();


// EPP FULL GUEST BUTTON THEME V1
(function () {

  function applyAllGuestButtons(
    primary,
    accent
  ) {

    const guest =
      document.getElementById(
        "guestViewScreen"
      );

    if (!guest) return;


    guest
      .querySelectorAll(
        ".guest-view-action, .primary-button"
      )
      .forEach(function (button) {

        button.style.setProperty(
          "background",
          primary,
          "important"
        );

        button.style.setProperty(
          "background-color",
          primary,
          "important"
        );

        button.style.setProperty(
          "border",
          "3px solid " + accent,
          "important"
        );

        button.style.setProperty(
          "box-shadow",
          "0 0 0 1px " +
            accent +
            ", 0 0 14px " +
            accent +
            "66",
          "important"
        );

        button.style.setProperty(
          "color",
          "#111111",
          "important"
        );
      });
  }


  function applyFromTheme(theme) {

    if (!theme) return;

    applyAllGuestButtons(
      theme.primary || "#d4af37",
      theme.accent || "#ffffff"
    );
  }


  const joinCode =
    new URLSearchParams(
      window.location.search
    ).get("join");


  if (joinCode) {

    eventDatabase
      .ref(
        "events/" +
        joinCode +
        "/theme"
      )
      .on(
        "value",
        function (snapshot) {

          applyFromTheme(
            snapshot.val()
          );

          // Some guest panels prepare after
          // the Firebase theme arrives.
          setTimeout(function () {

            applyFromTheme(
              snapshot.val()
            );

          }, 300);
        }
      );
  }


  // Reapply when a guest opens a feature panel.
  document.addEventListener(
    "click",
    function (event) {

      if (
        !event.target.closest(
          "#guestViewScreen"
        )
      ) {
        return;
      }

      setTimeout(function () {

        if (!joinCode) return;

        eventDatabase
          .ref(
            "events/" +
            joinCode +
            "/theme"
          )
          .once(
            "value"
          )
          .then(
            function (snapshot) {

              applyFromTheme(
                snapshot.val()
              );
            }
          );

      }, 50);
    }
  );

})();


// EPP GUEST PANEL HEADING THEME V1
(function () {

  function applyGuestPanelHeadings(theme) {

    if (!theme) return;

    const accent =
      theme.accent || "#ffffff";

    const primary =
      theme.primary || "#d4af37";


    const guest =
      document.getElementById(
        "guestViewScreen"
      );

    if (!guest) return;


    // Small panel labels such as:
    // EVENT CODE, AVAILABLE NOW, LIVE NOW,
    // LIVE VOTE, SHARE A PHOTO, SONG REQUEST
    guest
      .querySelectorAll(
        ".small-label"
      )
      .forEach(function (label) {

        label.style.setProperty(
          "color",
          accent,
          "important"
        );
      });


    // Panel titles / section headings.
    guest
      .querySelectorAll(
        ".feature-panel h3, .feature-panel h2"
      )
      .forEach(function (heading) {

        heading.style.setProperty(
          "color",
          primary,
          "important"
        );
      });


    // Give feature panels an accent outline too.
    guest
      .querySelectorAll(
        ".feature-panel"
      )
      .forEach(function (panel) {

        panel.style.setProperty(
          "border-color",
          accent,
          "important"
        );
      });
  }


  const joinCode =
    new URLSearchParams(
      window.location.search
    ).get("join");


  if (joinCode) {

    eventDatabase
      .ref(
        "events/" +
        joinCode +
        "/theme"
      )
      .on(
        "value",
        function (snapshot) {

          const theme =
            snapshot.val();

          applyGuestPanelHeadings(
            theme
          );

          setTimeout(function () {

            applyGuestPanelHeadings(
              theme
            );

          }, 300);
        }
      );
  }


  document.addEventListener(
    "click",
    function (event) {

      if (
        !event.target.closest(
          "#guestViewScreen"
        )
      ) {
        return;
      }

      setTimeout(function () {

        if (!joinCode) return;

        eventDatabase
          .ref(
            "events/" +
            joinCode +
            "/theme"
          )
          .once("value")
          .then(function (snapshot) {

            applyGuestPanelHeadings(
              snapshot.val()
            );
          });

      }, 50);
    }
  );

})();


// EPP LIVE RESULTS UX POLISH V1
(function () {

  // ====================================================
  // GUEST VOTING CONFIRMATION
  // Keep confirmation visible even when Firebase
  // immediately refreshes the poll.
  // ====================================================

  document
    .querySelectorAll(
      "#guestViewScreen .guest-vote-choice"
    )
    .forEach(function (button) {

      button.addEventListener(
        "click",
        function () {

          setTimeout(function () {

            const confirmation =
              document.getElementById(
                "guestVoteConfirmation"
              );

            if (!confirmation) return;

            confirmation.textContent =
              "✓ Vote submitted!";

            confirmation.style.setProperty(
              "display",
              "block",
              "important"
            );

            confirmation.style.setProperty(
              "font-weight",
              "800",
              "important"
            );

            confirmation.style.setProperty(
              "padding",
              "12px",
              "important"
            );

            confirmation.style.setProperty(
              "text-align",
              "center",
              "important"
            );

            confirmation.style.setProperty(
              "border-radius",
              "12px",
              "important"
            );

            confirmation.style.setProperty(
              "border",
              "2px solid var(--eppA)",
              "important"
            );

            confirmation.style.setProperty(
              "color",
              "var(--eppA)",
              "important"
            );


            // Leave it visible long enough for the
            // guest to clearly see their vote registered.
            setTimeout(function () {

              confirmation.style.display =
                "none";

            }, 3000);

          }, 175);

        }
      );
    });


  // ====================================================
  // HOST RESULTS FEEDBACK
  // ====================================================

  function addHostResultStatus() {

    if (
      document.getElementById(
        "eppResultSendStatus"
      )
    ) {
      return;
    }

    const customButton =
      document.getElementById(
        "eppCustomResult"
      );

    if (!customButton) return;

    const status =
      document.createElement(
        "div"
      );

    status.id =
      "eppResultSendStatus";

    status.style.display =
      "none";

    status.style.marginTop =
      "14px";

    status.style.padding =
      "12px 14px";

    status.style.borderRadius =
      "12px";

    status.style.fontWeight =
      "800";

    status.style.textAlign =
      "center";

    status.style.border =
      "2px solid var(--eppA)";

    status.style.color =
      "var(--eppA)";

    status.textContent =
      "✓ Results sent to guest phones";

    customButton
      .parentElement
      .after(
        status
      );
  }


  function showSentFeedback(
    button,
    successText
  ) {

    if (!button) return;

    const original =
      button.dataset.eppOriginalText ||
      button.textContent;

    button.dataset.eppOriginalText =
      original;

    button.textContent =
      "SENDING…";

    button.disabled =
      true;


    setTimeout(function () {

      button.textContent =
        successText;

      const status =
        document.getElementById(
          "eppResultSendStatus"
        );

      if (status) {

        status.textContent =
          "✓ Sent to connected guest phones";

        status.style.display =
          "block";
      }


      setTimeout(function () {

        button.textContent =
          original;

        button.disabled =
          false;

        if (status) {
          status.style.display =
            "none";
        }

      }, 2200);

    }, 350);
  }


  function wireResultButton(
    id,
    successText
  ) {

    const button =
      document.getElementById(
        id
      );

    if (!button) return;


    button.addEventListener(
      "click",
      function () {

        showSentFeedback(
          button,
          successText
        );

      }
    );
  }


  addHostResultStatus();


  wireResultButton(
    "eppVoteResults",
    "✓ VOTING RESULTS SENT"
  );


  wireResultButton(
    "eppPredResults",
    "✓ PREDICTION RESULTS SENT"
  );


  wireResultButton(
    "eppCustomResult",
    "✓ RESULT SENT"
  );


  // CLEAR should also give obvious feedback.
  const clearButton =
    document.getElementById(
      "eppClearResults"
    );

  if (clearButton) {

    clearButton.addEventListener(
      "click",
      function () {

        const original =
          clearButton.textContent;

        clearButton.textContent =
          "✓ CLEARED";

        setTimeout(function () {

          clearButton.textContent =
            original;

        }, 1500);

      }
    );
  }

})();


// EPP AUTHORITATIVE LIVE VOTING V1
(function () {

  let eppHostPollRef =
    null;


  function eppJoinCode() {

    return new URLSearchParams(
      window.location.search
    ).get("join") || "";
  }


  function eppCurrentCode() {

    const event =
      getCurrentEvent();

    if (
      !event ||
      !event.id
    ) {
      return "";
    }

    return getGuestEventCode(
      event
    );
  }


  // ====================================================
  // GUEST VOTE
  // Capture the click BEFORE the old local vote handlers.
  // Firebase becomes the single source of truth.
  // ====================================================

  document.addEventListener(
    "click",
    function (event) {

      const button =
        event.target.closest(
          "#guestViewScreen .guest-vote-choice"
        );

      if (!button) {
        return;
      }


      const joinCode =
        eppJoinCode();

      // Host preview keeps the older local behavior.
      // Actual joined guests use Firebase.
      if (!joinCode) {
        return;
      }


      event.preventDefault();

      event.stopPropagation();

      event.stopImmediatePropagation();


      const choice =
        button.dataset.choice;


      const voteField =
        choice === "choiceOne"
          ? "votesOne"
          : choice === "choiceTwo"
            ? "votesTwo"
            : "";


      if (!voteField) {
        return;
      }


      document
        .querySelectorAll(
          "#guestViewScreen .guest-vote-choice"
        )
        .forEach(function (item) {

          item.disabled =
            true;

          item.classList.remove(
            "selected-choice"
          );
        });


      button.classList.add(
        "selected-choice"
      );


      const confirmation =
        document.getElementById(
          "guestVoteConfirmation"
        );


      if (confirmation) {

        confirmation.textContent =
          "Submitting vote…";

        confirmation.style.setProperty(
          "display",
          "block",
          "important"
        );
      }


      const voteRef =
        eventDatabase.ref(
          "events/" +
          joinCode +
          "/poll/" +
          voteField
        );


      voteRef
        .transaction(
          function (currentVotes) {

            return (
              Number(
                currentVotes || 0
              ) +
              1
            );
          }
        )
        .then(function () {

          if (confirmation) {

            confirmation.textContent =
              "✓ Vote submitted!";

            confirmation.style.setProperty(
              "display",
              "block",
              "important"
            );

            confirmation.style.setProperty(
              "color",
              "var(--eppA)",
              "important"
            );


            setTimeout(
              function () {

                confirmation.style.display =
                  "none";

              },
              3000
            );
          }

        })
        .catch(function (error) {

          console.error(
            "Live vote failed:",
            error
          );


          document
            .querySelectorAll(
              "#guestViewScreen .guest-vote-choice"
            )
            .forEach(function (item) {

              item.disabled =
                false;
            });


          if (confirmation) {

            confirmation.textContent =
              "Vote could not be sent. Please try again.";

            confirmation.style.display =
              "block";
          }

        });

    },
    true
  );


  // ====================================================
  // HOST LIVE TOTALS
  // ====================================================

  function startEppHostPollSync() {

    const event =
      getCurrentEvent();

    if (
      !event ||
      !event.id
    ) {
      return;
    }


    const eventCode =
      getGuestEventCode(
        event
      );


    if (eppHostPollRef) {

      eppHostPollRef.off();
    }


    eppHostPollRef =
      eventDatabase.ref(
        "events/" +
        eventCode +
        "/poll"
      );


    eppHostPollRef.on(
      "value",
      function (snapshot) {

        const poll =
          snapshot.val();


        if (!poll) {
          return;
        }


        // Keep local copy synchronized too.
        localStorage.setItem(
          "liveGuestPoll-" +
          event.id,
          JSON.stringify(
            poll
          )
        );


        const votesOne =
          Number(
            poll.votesOne || 0
          );


        const votesTwo =
          Number(
            poll.votesTwo || 0
          );


        const total =
          votesOne +
          votesTwo;


        const status =
          document.getElementById(
            "hostPollStatus"
          );


        const question =
          document.getElementById(
            "hostPollLiveQuestion"
          );


        const choices =
          document.getElementById(
            "hostPollLiveChoices"
          );


        if (status) {

          status.style.display =
            "block";
        }


        if (question) {

          question.textContent =
            poll.question ||
            "Live Vote";
        }


        if (choices) {

          choices.textContent =
            (poll.choiceOne || "Choice 1") +
            " — " +
            votesOne +
            " vote" +
            (votesOne === 1 ? "" : "s") +
            " • " +
            (poll.choiceTwo || "Choice 2") +
            " — " +
            votesTwo +
            " vote" +
            (votesTwo === 1 ? "" : "s") +
            " • " +
            total +
            " total";
        }

      }
    );
  }


  const guestHubButton =
    document.getElementById(
      "guestHubButton"
    );


  if (guestHubButton) {

    guestHubButton.addEventListener(
      "click",
      function () {

        setTimeout(
          startEppHostPollSync,
          150
        );

      }
    );
  }


  // ====================================================
  // SEND CURRENT FIREBASE RESULTS TO GUEST PHONES
  // ====================================================

  document.addEventListener(
    "click",
    function (event) {

      const button =
        event.target.closest(
          "#eppVoteResults"
        );


      if (!button) {
        return;
      }


      event.preventDefault();

      event.stopPropagation();

      event.stopImmediatePropagation();


      const eventCode =
        eppCurrentCode();


      if (!eventCode) {

        alert(
          "Open an event first."
        );

        return;
      }


      const originalText =
        button.textContent;


      button.textContent =
        "SENDING…";

      button.disabled =
        true;


      eventDatabase
        .ref(
          "events/" +
          eventCode +
          "/poll"
        )
        .once(
          "value"
        )
        .then(
          function (snapshot) {

            const poll =
              snapshot.val();


            if (!poll) {

              throw new Error(
                "No live voting results were found."
              );
            }


            const votesOne =
              Number(
                poll.votesOne || 0
              );


            const votesTwo =
              Number(
                poll.votesTwo || 0
              );


            const total =
              votesOne +
              votesTwo;


            const one =
              poll.choiceOne ||
              "Choice 1";


            const two =
              poll.choiceTwo ||
              "Choice 2";


            const onePercent =
              total
                ? Math.round(
                    votesOne /
                    total *
                    100
                  )
                : 0;


            const twoPercent =
              total
                ? Math.round(
                    votesTwo /
                    total *
                    100
                  )
                : 0;


            let winner =
              "TIED";


            if (
              votesOne >
              votesTwo
            ) {

              winner =
                one;
            }


            if (
              votesTwo >
              votesOne
            ) {

              winner =
                two;
            }


            return eventDatabase
              .ref(
                "events/" +
                eventCode +
                "/guestResults"
              )
              .set({

                active:
                  true,

                title:
                  poll.question ||
                  "VOTING RESULTS",

                value:
                  winner,

                detail:
                  one +
                  " " +
                  onePercent +
                  "% • " +
                  two +
                  " " +
                  twoPercent +
                  "%",

                updatedAt:
                  firebase
                    .database
                    .ServerValue
                    .TIMESTAMP
              });
          }
        )
        .then(function () {

          button.textContent =
            "✓ VOTING RESULTS SENT";


          const status =
            document.getElementById(
              "eppResultSendStatus"
            );


          if (status) {

            status.textContent =
              "✓ Live results sent to connected guest phones";

            status.style.display =
              "block";
          }


          setTimeout(
            function () {

              button.textContent =
                originalText;

              button.disabled =
                false;


              if (status) {

                status.style.display =
                  "none";
              }

            },
            2200
          );

        })
        .catch(function (error) {

          console.error(
            "Send voting results failed:",
            error
          );


          button.textContent =
            "RESULTS NOT SENT";

          button.disabled =
            false;


          alert(
            error.message ||
            "Voting results could not be sent."
          );

        });

    },
    true
  );


  // ====================================================
  // GUEST LIVE RESULT LISTENER
  // ====================================================

  const joinCode =
    eppJoinCode();


  if (joinCode) {

    eventDatabase
      .ref(
        "events/" +
        joinCode +
        "/guestResults"
      )
      .on(
        "value",
        function (snapshot) {

          const result =
            snapshot.val();


          const panel =
            document.getElementById(
              "eppResults"
            );


          if (!panel) {
            return;
          }


          if (
            !result ||
            !result.active
          ) {

            panel.style.display =
              "none";

            return;
          }


          const title =
            document.getElementById(
              "eppResultTitle"
            );


          const value =
            document.getElementById(
              "eppResultValue"
            );


          const detail =
            document.getElementById(
              "eppResultDetail"
            );


          if (title) {

            title.textContent =
              result.title ||
              "LIVE RESULT";
          }


          if (value) {

            value.textContent =
              result.value ||
              "—";
          }


          if (detail) {

            detail.textContent =
              result.detail ||
              "";
          }


          panel.style.display =
            "block";


          panel.scrollIntoView({
            behavior:
              "smooth",

            block:
              "center"
          });

        }
      );
  }

})();


// EPP AUTHORITATIVE WORD CLOUD V1
(function () {

  function wcEventCode() {

    const event =
      getCurrentEvent();

    if (
      !event ||
      !event.id
    ) {
      return "";
    }

    return getGuestEventCode(
      event
    );
  }


  function wcJoinCode() {

    return new URLSearchParams(
      window.location.search
    ).get("join") || "";
  }


  // ====================================================
  // MAKE SURE GUEST WORD CLOUD UI EXISTS
  // ====================================================

  function ensureGuestWordCloudUI() {

    const guest =
      document.getElementById(
        "guestViewScreen"
      );

    if (!guest) {
      return;
    }


    let panel =
      document.getElementById(
        "eppGuestCloud"
      );


    if (!panel) {

      panel =
        document.createElement(
          "div"
        );

      panel.id =
        "eppGuestCloud";

      panel.className =
        "eppBox";

      panel.style.display =
        "none";


      panel.innerHTML = `
        <span class="small-label">
          LIVE WORD CLOUD
        </span>

        <h3>
          One Word
        </h3>

        <p>
          Submit one word and watch the room build the cloud together.
        </p>

        <input
          id="eppWord"
          type="text"
          maxlength="30"
          placeholder="Type one word"
          style="
            width:100%;
            box-sizing:border-box;
            padding:12px;
            margin-top:10px;
          "
        >

        <div
          class="eppBtns"
          style="margin-top:12px;"
        >

          <button
            id="eppWordSend"
          >
            SUBMIT WORD
          </button>

        </div>

        <p
          id="eppWordStatus"
          style="
            display:none;
            margin-top:12px;
            font-weight:800;
            text-align:center;
          "
        >
          ✓ Word submitted!
        </p>

        <div
          id="eppGuestWords"
          class="eppCloud"
        ></div>
      `;


      guest.appendChild(
        panel
      );
    }
  }


  // ====================================================
  // MAKE SURE AUDIENCE CLOUD EXISTS
  // ====================================================

  function ensureAudienceWordCloudUI() {

    const audience =
      document.getElementById(
        "audienceScreen"
      );

    if (!audience) {
      return;
    }


    let panel =
      document.getElementById(
        "eppAudienceCloud"
      );


    if (!panel) {

      panel =
        document.createElement(
          "div"
        );

      panel.id =
        "eppAudienceCloud";

      panel.style.display =
        "none";

      panel.style.margin =
        "20px";

      panel.style.padding =
        "24px";

      panel.style.borderRadius =
        "18px";

      panel.style.border =
        "3px solid var(--eppA)";

      panel.style.background =
        "var(--eppB)";

      panel.style.color =
        "var(--eppT)";


      panel.innerHTML = `

        <span class="small-label">
          LIVE WORD CLOUD
        </span>

        <h2 style="text-align:center;">
          What The Room Is Saying
        </h2>

        <div
          id="eppAudienceWords"
          class="eppCloud"
        ></div>
      `;


      audience.appendChild(
        panel
      );
    }
  }


  ensureGuestWordCloudUI();
  ensureAudienceWordCloudUI();


  // ====================================================
  // HOST STATUS MESSAGE
  // ====================================================

  function ensureWordCloudStatus() {

    if (
      document.getElementById(
        "eppWordCloudHostStatus"
      )
    ) {
      return;
    }


    const openButton =
      document.getElementById(
        "eppOpenCloud"
      );


    if (!openButton) {
      return;
    }


    const status =
      document.createElement(
        "div"
      );


    status.id =
      "eppWordCloudHostStatus";

    status.style.display =
      "none";

    status.style.marginTop =
      "12px";

    status.style.padding =
      "11px 14px";

    status.style.borderRadius =
      "12px";

    status.style.border =
      "2px solid var(--eppA)";

    status.style.color =
      "var(--eppA)";

    status.style.fontWeight =
      "800";

    status.style.textAlign =
      "center";


    openButton
      .parentElement
      .after(
        status
      );
  }


  ensureWordCloudStatus();


  function showWordCloudHostStatus(
    text
  ) {

    const status =
      document.getElementById(
        "eppWordCloudHostStatus"
      );


    if (!status) {
      return;
    }


    status.textContent =
      text;

    status.style.display =
      "block";


    setTimeout(
      function () {

        status.style.display =
          "none";

      },
      2200
    );
  }


  // ====================================================
  // HOST STATE CONTROLS
  // ====================================================

  function updateWordCloudState(
    updates
  ) {

    const code =
      wcEventCode();


    if (!code) {

      alert(
        "Open an event first."
      );

      return Promise.reject(
        new Error(
          "No active event."
        )
      );
    }


    updates.updatedAt =
      firebase
        .database
        .ServerValue
        .TIMESTAMP;


    return eventDatabase
      .ref(
        "events/" +
        code +
        "/wordCloud/state"
      )
      .update(
        updates
      );
  }


  document.addEventListener(
    "click",
    function (event) {

      const openButton =
        event.target.closest(
          "#eppOpenCloud"
        );


      if (openButton) {

        event.preventDefault();

        event.stopPropagation();

        event.stopImmediatePropagation();


        openButton.textContent =
          "OPENING…";


        updateWordCloudState({
          open:
            true
        })
        .then(function () {

          openButton.textContent =
            "✓ WORD CLOUD OPEN";

          showWordCloudHostStatus(
            "✓ Guest word submission is now open"
          );


          setTimeout(
            function () {

              openButton.textContent =
                "OPEN";

            },
            1800
          );

        })
        .catch(function (error) {

          console.error(
            "Open Word Cloud failed:",
            error
          );

          openButton.textContent =
            "OPEN";

        });


        return;
      }


      const closeButton =
        event.target.closest(
          "#eppCloseCloud"
        );


      if (closeButton) {

        event.preventDefault();

        event.stopPropagation();

        event.stopImmediatePropagation();


        updateWordCloudState({
          open:
            false
        })
        .then(function () {

          closeButton.textContent =
            "✓ CLOSED";

          showWordCloudHostStatus(
            "Word submissions closed"
          );


          setTimeout(
            function () {

              closeButton.textContent =
                "CLOSE";

            },
            1500
          );

        });


        return;
      }


      const showButton =
        event.target.closest(
          "#eppShowCloud"
        );


      if (showButton) {

        event.preventDefault();

        event.stopPropagation();

        event.stopImmediatePropagation();


        updateWordCloudState({
          showAudience:
            true
        })
        .then(function () {

          showButton.textContent =
            "✓ SHOWING";

          showWordCloudHostStatus(
            "✓ Word Cloud sent to Audience Display"
          );


          setTimeout(
            function () {

              showButton.textContent =
                "SHOW ON AUDIENCE";

            },
            1800
          );

        });


        return;
      }


      const hideButton =
        event.target.closest(
          "#eppHideCloud"
        );


      if (hideButton) {

        event.preventDefault();

        event.stopPropagation();

        event.stopImmediatePropagation();


        updateWordCloudState({
          showAudience:
            false
        })
        .then(function () {

          hideButton.textContent =
            "✓ HIDDEN";

          showWordCloudHostStatus(
            "Word Cloud hidden from Audience Display"
          );


          setTimeout(
            function () {

              hideButton.textContent =
                "HIDE AUDIENCE";

            },
            1500
          );

        });


        return;
      }


      const clearButton =
        event.target.closest(
          "#eppClearCloud"
        );


      if (clearButton) {

        event.preventDefault();

        event.stopPropagation();

        event.stopImmediatePropagation();


        const code =
          wcEventCode();


        if (!code) {
          return;
        }


        eventDatabase
          .ref(
            "events/" +
            code +
            "/wordCloud/words"
          )
          .remove()
          .then(function () {

            clearButton.textContent =
              "✓ CLEARED";

            showWordCloudHostStatus(
              "All Word Cloud responses cleared"
            );


            setTimeout(
              function () {

                clearButton.textContent =
                  "CLEAR WORDS";

              },
              1500
            );

          });


        return;
      }

    },
    true
  );


  // ====================================================
  // GUEST SUBMIT WORD
  // ====================================================

  document.addEventListener(
    "click",
    function (event) {

      const button =
        event.target.closest(
          "#eppWordSend"
        );


      if (!button) {
        return;
      }


      event.preventDefault();

      event.stopPropagation();

      event.stopImmediatePropagation();


      const joinCode =
        wcJoinCode();


      if (!joinCode) {

        return;
      }


      const input =
        document.getElementById(
          "eppWord"
        );


      if (!input) {
        return;
      }


      const word =
        (input.value || "")
          .trim()
          .replace(
            /\s+/g,
            " "
          )
          .slice(
            0,
            30
          );


      if (!word) {

        alert(
          "Type one word first."
        );

        return;
      }


      button.textContent =
        "SUBMITTING…";

      button.disabled =
        true;


      eventDatabase
        .ref(
          "events/" +
          joinCode +
          "/wordCloud/words"
        )
        .push({

          word:
            word,

          submittedAt:
            firebase
              .database
              .ServerValue
              .TIMESTAMP

        })
        .then(function () {

          input.value =
            "";


          button.textContent =
            "✓ SUBMITTED";


          const status =
            document.getElementById(
              "eppWordStatus"
            );


          if (status) {

            status.textContent =
              "✓ Word submitted!";

            status.style.display =
              "block";

            status.style.color =
              "var(--eppA)";
          }


          setTimeout(
            function () {

              button.textContent =
                "SUBMIT WORD";

              button.disabled =
                false;


              if (status) {

                status.style.display =
                  "none";
              }

            },
            2200
          );

        })
        .catch(function (error) {

          console.error(
            "Word submission failed:",
            error
          );


          button.textContent =
            "SUBMIT WORD";

          button.disabled =
            false;


          alert(
            "Word could not be submitted."
          );

        });

    },
    true
  );


  // ====================================================
  // BUILD WORD FREQUENCIES
  // ====================================================

  function renderWordCloud(
    container,
    wordsObject
  ) {

    if (!container) {
      return;
    }


    const counts =
      {};


    Object
      .values(
        wordsObject || {}
      )
      .forEach(
        function (entry) {

          const word =
            (
              entry &&
              entry.word
                ? entry.word
                : ""
            )
            .trim();


          if (!word) {
            return;
          }


          const key =
            word.toLowerCase();


          if (!counts[key]) {

            counts[key] = {

              word:
                word,

              count:
                0

            };
          }


          counts[key].count++;

        }
      );


    const words =
      Object
        .values(
          counts
        )
        .sort(
          function (a, b) {

            return (
              b.count -
              a.count
            );
          }
        );


    container.innerHTML =
      "";


    if (!words.length) {

      container.textContent =
        "Waiting for the first word…";

      return;
    }


    const maximum =
      Math.max.apply(
        null,
        words.map(
          function (item) {

            return item.count;
          }
        )
      );


    words.forEach(
      function (item) {

        const span =
          document.createElement(
            "span"
          );


        const ratio =
          maximum
            ? item.count /
              maximum
            : 1;


        span.style.fontSize =
          (
            20 +
            Math.round(
              ratio *
              34
            )
          ) +
          "px";


        span.style.opacity =
          String(
            0.65 +
            ratio *
            0.35
          );


        span.style.color =
          "var(--eppP)";


        span.textContent =
          item.word;


        container.appendChild(
          span
        );

      }
    );
  }


  // ====================================================
  // HOST LIVE WORD LISTENER
  // ====================================================

  function startHostWordCloudListener() {

    const code =
      wcEventCode();


    if (!code) {
      return;
    }


    eventDatabase
      .ref(
        "events/" +
        code +
        "/wordCloud/words"
      )
      .on(
        "value",
        function (snapshot) {

          renderWordCloud(
            document.getElementById(
              "eppHostWords"
            ),
            snapshot.val()
          );


          renderWordCloud(
            document.getElementById(
              "eppAudienceWords"
            ),
            snapshot.val()
          );

        }
      );


    eventDatabase
      .ref(
        "events/" +
        code +
        "/wordCloud/state"
      )
      .on(
        "value",
        function (snapshot) {

          const state =
            snapshot.val() ||
            {};


          const audience =
            document.getElementById(
              "eppAudienceCloud"
            );


          if (audience) {

            audience.style.display =
              state.showAudience
                ? "block"
                : "none";
          }

        }
      );
  }


  const guestHub =
    document.getElementById(
      "guestHubButton"
    );


  if (guestHub) {

    guestHub.addEventListener(
      "click",
      function () {

        setTimeout(
          startHostWordCloudListener,
          150
        );

      }
    );
  }


  startHostWordCloudListener();


  // ====================================================
  // GUEST LIVE LISTENERS
  // ====================================================

  const joinCode =
    wcJoinCode();


  if (joinCode) {

    eventDatabase
      .ref(
        "events/" +
        joinCode +
        "/wordCloud/state"
      )
      .on(
        "value",
        function (snapshot) {

          const state =
            snapshot.val() ||
            {};


          ensureGuestWordCloudUI();


          const panel =
            document.getElementById(
              "eppGuestCloud"
            );


          if (panel) {

            panel.style.display =
              state.open
                ? "block"
                : "none";


            if (
              state.open
            ) {

              panel.scrollIntoView({
                behavior:
                  "smooth",

                block:
                  "center"
              });
            }
          }

        }
      );


    eventDatabase
      .ref(
        "events/" +
        joinCode +
        "/wordCloud/words"
      )
      .on(
        "value",
        function (snapshot) {

          renderWordCloud(
            document.getElementById(
              "eppGuestWords"
            ),
            snapshot.val()
          );

        }
      );

  }

})();


// EPP GLOWSTICK HOST FEEDBACK V1
(function () {

  function glowFeedback(button, message) {
    if (!button) return;

    const original =
      button.dataset.eppGlowOriginal ||
      button.textContent;

    button.dataset.eppGlowOriginal = original;

    // Reset all preset buttons first.
    document
      .querySelectorAll("#eppHostXL [data-glow]")
      .forEach(function (item) {
        item.style.removeProperty("outline");
        item.style.removeProperty("transform");
      });

    button.textContent = "✓ " + original;

    button.style.setProperty(
      "outline",
      "3px solid var(--eppA)",
      "important"
    );

    button.style.setProperty(
      "transform",
      "scale(1.05)",
      "important"
    );

    let status =
      document.getElementById(
        "eppGlowHostStatus"
      );

    if (!status) {
      status =
        document.createElement("div");

      status.id =
        "eppGlowHostStatus";

      status.style.marginTop = "12px";
      status.style.padding = "11px 14px";
      status.style.borderRadius = "12px";
      status.style.fontWeight = "800";
      status.style.textAlign = "center";
      status.style.border =
        "2px solid var(--eppA)";
      status.style.color =
        "var(--eppA)";

      const stop =
        document.getElementById(
          "eppGlowStop"
        );

      if (stop && stop.parentElement) {
        stop.parentElement.after(status);
      }
    }

    status.textContent = message;
    status.style.display = "block";

    setTimeout(function () {
      button.textContent = original;

      if (status) {
        status.style.display = "none";
      }
    }, 1800);
  }


  // Preset colors
  document
    .querySelectorAll("#eppHostXL [data-glow]")
    .forEach(function (button) {

      button.addEventListener(
        "click",
        function () {

          const name =
            button.textContent.trim();

          glowFeedback(
            button,
            "✓ " +
            name +
            " glow sent to guest phones"
          );
        }
      );
    });


  // START custom selected color
  const start =
    document.getElementById(
      "eppGlowStart"
    );

  if (start) {
    start.addEventListener(
      "click",
      function () {

        glowFeedback(
          start,
          "✓ Custom glow sent to guest phones"
        );
      }
    );
  }


  // STOP
  const stop =
    document.getElementById(
      "eppGlowStop"
    );

  if (stop) {
    stop.addEventListener(
      "click",
      function () {

        const original =
          stop.textContent;

        stop.textContent =
          "✓ GLOW STOPPED";

        let status =
          document.getElementById(
            "eppGlowHostStatus"
          );

        if (status) {
          status.textContent =
            "✓ Guest phones returned to normal";
          status.style.display =
            "block";
        }

        setTimeout(function () {
          stop.textContent = original;

          if (status) {
            status.style.display =
              "none";
          }
        }, 1800);
      }
    );
  }

})();


// EPP STANDALONE AUDIENCE DISPLAY V1
(function () {

  function currentCode() {

    const event =
      getCurrentEvent();

    if (!event || !event.id) {
      return "";
    }

    return getGuestEventCode(
      event
    );
  }


  function installHostControl() {

    const host =
      document.getElementById(
        "hostControlScreen"
      );

    if (
      !host ||
      document.getElementById(
        "eppAudienceDisplayControl"
      )
    ) {
      return;
    }


    const panel =
      document.createElement(
        "div"
      );

    panel.id =
      "eppAudienceDisplayControl";

    panel.className =
      "eppBox";


    panel.innerHTML =
      '<span class="small-label">VENUE DISPLAY</span>' +
      '<h3>Audience Display</h3>' +
      '<p>Open a separate live screen for the projector, TV or venue display while keeping Event Command Center open on the DJ computer.</p>' +
      '<div class="eppBtns">' +
      '<button id="eppOpenAudienceDisplay">OPEN AUDIENCE DISPLAY</button>' +
      '<button id="eppCopyAudienceDisplayLink" class="ghost">COPY DISPLAY LINK</button>' +
      '</div>' +
      '<div id="eppAudienceDisplayStatus" style="display:none;margin-top:12px;padding:11px 14px;border:2px solid var(--eppA);border-radius:12px;color:var(--eppA);font-weight:800;text-align:center;"></div>';


    host.insertBefore(
      panel,
      host.firstChild
    );


    function displayURL() {

      const code =
        currentCode();

      if (!code) {
        return "";
      }

      const base =
        window.location.href
          .split("?")[0]
          .split("#")[0];

      return (
        base +
        "?audience=" +
        encodeURIComponent(
          code
        )
      );
    }


    const openButton =
      document.getElementById(
        "eppOpenAudienceDisplay"
      );

    const copyButton =
      document.getElementById(
        "eppCopyAudienceDisplayLink"
      );

    const status =
      document.getElementById(
        "eppAudienceDisplayStatus"
      );


    if (openButton) {

      openButton.onclick =
        function () {

          const url =
            displayURL();

          if (!url) {

            alert(
              "Open an event first."
            );

            return;
          }


          const win =
            window.open(
              url,
              "_blank"
            );


          if (!win) {

            alert(
              "The browser blocked the Audience Display window. Allow pop-ups for this page and try again."
            );

            return;
          }


          openButton.textContent =
            "✓ DISPLAY OPENED";


          if (status) {

            status.textContent =
              "✓ Audience Display opened in a separate window";

            status.style.display =
              "block";
          }


          setTimeout(
            function () {

              openButton.textContent =
                "OPEN AUDIENCE DISPLAY";

              if (status) {

                status.style.display =
                  "none";
              }

            },
            2200
          );
        };
    }


    if (copyButton) {

      copyButton.onclick =
        function () {

          const url =
            displayURL();

          if (!url) {

            alert(
              "Open an event first."
            );

            return;
          }


          navigator.clipboard
            .writeText(
              url
            )
            .then(
              function () {

                copyButton.textContent =
                  "✓ LINK COPIED";


                setTimeout(
                  function () {

                    copyButton.textContent =
                      "COPY DISPLAY LINK";

                  },
                  1800
                );

              }
            );
        };
    }
  }


  installHostControl();


  const hubButton =
    document.getElementById(
      "guestHubButton"
    );


  if (hubButton) {

    hubButton.addEventListener(
      "click",
      function () {

        setTimeout(
          installHostControl,
          150
        );

      }
    );
  }


  const audienceCode =
    new URLSearchParams(
      window.location.search
    ).get(
      "audience"
    );


  if (!audienceCode) {
    return;
  }


  document
    .querySelectorAll(
      ".screen"
    )
    .forEach(
      function (screen) {

        screen.classList.remove(
          "active"
        );

        screen.style.display =
          "none";
      }
    );


  const style =
    document.createElement(
      "style"
    );


  style.textContent =
    'body.eppAudienceMode{margin:0!important;padding:0!important;overflow:hidden;background:#0f0f12}' +
    '#eppStandaloneAudience{position:fixed;inset:0;z-index:2147483600;display:flex;flex-direction:column;box-sizing:border-box;padding:clamp(24px,4vw,70px);background:var(--audBg,#0f0f12);color:var(--audText,#fff);overflow:auto}' +
    '#eppAudTop{display:flex;justify-content:space-between;gap:20px;align-items:flex-start}' +
    '#eppAudName{margin:0;font-size:clamp(28px,4vw,64px);color:var(--audPrimary,#f45bd2)}' +
    '#eppAudFull{border:2px solid var(--audAccent,#fff);border-radius:999px;padding:11px 18px;background:transparent;color:var(--audAccent,#fff);font-weight:800;cursor:pointer}' +
    '#eppAudStage{flex:1;display:flex;align-items:center;justify-content:center;padding:30px 0}' +
    '#eppAudWaiting{text-align:center;max-width:900px}' +
    '#eppAudWaiting h2{font-size:clamp(38px,6vw,90px);color:var(--audPrimary,#f45bd2);margin:0 0 16px}' +
    '#eppAudResult{display:none;width:min(1100px,92vw);text-align:center;border:4px solid var(--audAccent,#fff);border-radius:30px;padding:clamp(28px,5vw,70px);box-sizing:border-box}' +
    '#eppAudResultValue{margin:22px 0;font-size:clamp(60px,10vw,150px);line-height:.95;font-weight:900;color:var(--audPrimary,#f45bd2)}' +
    '#eppAudCloud{display:none;width:min(1300px,94vw);text-align:center}' +
    '#eppAudCloud h2{font-size:clamp(42px,6vw,90px);color:var(--audPrimary,#f45bd2)}' +
    '#eppAudWords{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:18px 28px;min-height:300px}' +
    '#eppAudWords span{font-weight:900;color:var(--audPrimary,#f45bd2);line-height:1}';


  document.head.appendChild(
    style
  );


  document.body.classList.add(
    "eppAudienceMode"
  );


  const display =
    document.createElement(
      "div"
    );


  display.id =
    "eppStandaloneAudience";


  display.innerHTML =
    '<div id="eppAudTop">' +
      '<div>' +
        '<h1 id="eppAudName">Live Event</h1>' +
        '<div>LIVE EXPERIENCE</div>' +
      '</div>' +
      '<button id="eppAudFull">FULL SCREEN</button>' +
    '</div>' +

    '<div id="eppAudStage">' +

      '<div id="eppAudWaiting">' +
        '<h2>LIVE EXPERIENCE</h2>' +
        '<p>Watch this screen for live results, activities and audience moments.</p>' +
      '</div>' +

      '<div id="eppAudResult">' +
        '<div id="eppAudResultTitle">LIVE RESULT</div>' +
        '<div id="eppAudResultValue">—</div>' +
        '<div id="eppAudResultDetail"></div>' +
      '</div>' +

      '<div id="eppAudCloud">' +
        '<span class="small-label">LIVE WORD CLOUD</span>' +
        '<h2>What The Room Is Saying</h2>' +
        '<div id="eppAudWords"></div>' +
      '</div>' +

    '</div>';


  document.body.appendChild(
    display
  );


  const waiting =
    document.getElementById(
      "eppAudWaiting"
    );

  const result =
    document.getElementById(
      "eppAudResult"
    );

  const cloud =
    document.getElementById(
      "eppAudCloud"
    );

  const wordsBox =
    document.getElementById(
      "eppAudWords"
    );


  let resultState =
    null;

  let cloudState =
    {};

  let wordsState =
    {};


  function chooseView() {

    if (
      cloudState &&
      cloudState.showAudience
    ) {

      waiting.style.display =
        "none";

      result.style.display =
        "none";

      cloud.style.display =
        "block";

      renderWords();

      return;
    }


    if (
      resultState &&
      resultState.active
    ) {

      waiting.style.display =
        "none";

      cloud.style.display =
        "none";

      result.style.display =
        "block";


      document.getElementById(
        "eppAudResultTitle"
      ).textContent =
        resultState.title ||
        "LIVE RESULT";


      document.getElementById(
        "eppAudResultValue"
      ).textContent =
        resultState.value ||
        "—";


      document.getElementById(
        "eppAudResultDetail"
      ).textContent =
        resultState.detail ||
        "";


      return;
    }


    result.style.display =
      "none";

    cloud.style.display =
      "none";

    waiting.style.display =
      "block";
  }


  function renderWords() {

    const counts =
      {};


    Object
      .values(
        wordsState || {}
      )
      .forEach(
        function (entry) {

          const word =
            entry &&
            entry.word
              ? String(
                  entry.word
                ).trim()
              : "";


          if (!word) {
            return;
          }


          const key =
            word.toLowerCase();


          if (!counts[key]) {

            counts[key] = {

              label:
                word,

              count:
                0
            };
          }


          counts[key].count++;

        }
      );


    const items =
      Object
        .values(
          counts
        )
        .sort(
          function (a, b) {

            return (
              b.count -
              a.count
            );
          }
        );


    wordsBox.innerHTML =
      "";


    if (!items.length) {

      wordsBox.textContent =
        "Waiting for the first word…";

      return;
    }


    const max =
      Math.max.apply(
        null,
        items.map(
          function (item) {

            return item.count;
          }
        )
      );


    items.forEach(
      function (item) {

        const span =
          document.createElement(
            "span"
          );


        const ratio =
          max
            ? item.count /
              max
            : 1;


        span.style.fontSize =
          (
            30 +
            Math.round(
              ratio *
              60
            )
          ) +
          "px";


        span.style.opacity =
          String(
            0.62 +
            ratio *
            0.38
          );


        span.textContent =
          item.label;


        wordsBox.appendChild(
          span
        );

      }
    );
  }


  const full =
    document.getElementById(
      "eppAudFull"
    );


  full.onclick =
    function () {

      if (
        !document.fullscreenElement
      ) {

        document
          .documentElement
          .requestFullscreen()
          .catch(
            function () {}
          );

      } else {

        document
          .exitFullscreen();
      }
    };


  eventDatabase
    .ref(
      "events/" +
      audienceCode +
      "/eventInfo"
    )
    .on(
      "value",
      function (snapshot) {

        const info =
          snapshot.val();


        if (info) {

          document
            .getElementById(
              "eppAudName"
            )
            .textContent =
              info.eventName ||
              info.type ||
              "Live Event";
        }
      }
    );


  eventDatabase
    .ref(
      "events/" +
      audienceCode +
      "/theme"
    )
    .on(
      "value",
      function (snapshot) {

        const t =
          snapshot.val() ||
          {};


        const light =
          t.mode ===
          "light";


        const savedAudiencePrimary =
          String(t.primary || "")
            .toLowerCase();

        const audiencePrimary =
          [
            "#d4af37",
            "#d8b56a",
            "#d8b75d",
            "#e8bd69"
          ].includes(savedAudiencePrimary)
            ? "#f45bd2"
            : t.primary || "#f45bd2";

        document.documentElement.style.setProperty(
          "--audPrimary",
          audiencePrimary
        );


        document.documentElement.style.setProperty(
          "--audAccent",
          t.accent || "#77d7ff"
        );


        document.documentElement.style.setProperty(
          "--audBg",
          light
            ? "#f7f7f7"
            : "#0f0f12"
        );


        document.documentElement.style.setProperty(
          "--audText",
          light
            ? "#161616"
            : "#ffffff"
        );

      }
    );


  eventDatabase
    .ref(
      "events/" +
      audienceCode +
      "/guestResults"
    )
    .on(
      "value",
      function (snapshot) {

        resultState =
          snapshot.val();

        chooseView();
      }
    );


  eventDatabase
    .ref(
      "events/" +
      audienceCode +
      "/wordCloud/state"
    )
    .on(
      "value",
      function (snapshot) {

        cloudState =
          snapshot.val() ||
          {};

        chooseView();
      }
    );


  eventDatabase
    .ref(
      "events/" +
      audienceCode +
      "/wordCloud/words"
    )
    .on(
      "value",
      function (snapshot) {

        wordsState =
          snapshot.val() ||
          {};

        renderWords();

        chooseView();
      }
    );

})();


// EPP AUTHORITATIVE PHOTOS V1
(function () {

  function photoJoinCode() {
    return new URLSearchParams(
      window.location.search
    ).get("join") || "";
  }


  function photoEventCode() {
    const event = getCurrentEvent();

    if (!event || !event.id) {
      return "";
    }

    return getGuestEventCode(event);
  }


  // ================================================
  // HOST OPEN PHOTO SUBMISSIONS
  // ================================================

  document.addEventListener(
    "click",
    function (event) {

      const button =
        event.target.closest(
          "#openPhotoSubmissionsButton"
        );

      if (!button) return;

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      const code =
        photoEventCode();

      if (!code) {
        alert("Open an event first.");
        return;
      }

      const promptInput =
        document.getElementById(
          "hostPhotoPrompt"
        );

      const prompt =
        promptInput &&
        promptInput.value.trim()
          ? promptInput.value.trim()
          : "Share your favorite photo from tonight!";


      button.textContent =
        "OPENING…";

      button.disabled =
        true;


      eventDatabase
        .ref(
          "events/" +
          code +
          "/photoSubmissionsState"
        )
        .set({
          open: true,
          prompt: prompt,
          updatedAt:
            firebase.database.ServerValue.TIMESTAMP
        })
        .then(function () {

          button.textContent =
            "✓ PHOTO SUBMISSIONS OPEN";

          const status =
            document.getElementById(
              "hostPhotoStatus"
            );

          if (status) {
            status.style.display =
              "block";
          }

          const livePrompt =
            document.getElementById(
              "hostPhotoLivePrompt"
            );

          if (livePrompt) {
            livePrompt.textContent =
              prompt;
          }

          setTimeout(function () {
            button.textContent =
              "OPEN PHOTO SUBMISSIONS";

            button.disabled =
              false;
          }, 1800);

        })
        .catch(function (error) {

          console.error(
            "Open photos failed:",
            error
          );

          button.textContent =
            "OPEN PHOTO SUBMISSIONS";

          button.disabled =
            false;

          alert(
            "Photo submissions could not be opened."
          );
        });

    },
    true
  );


  // ================================================
  // HOST CLOSE PHOTO SUBMISSIONS
  // ================================================

  document.addEventListener(
    "click",
    function (event) {

      const button =
        event.target.closest(
          "#closePhotoSubmissionsButton"
        );

      if (!button) return;

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      const code =
        photoEventCode();

      if (!code) return;


      eventDatabase
        .ref(
          "events/" +
          code +
          "/photoSubmissionsState"
        )
        .update({
          open: false,
          updatedAt:
            firebase.database.ServerValue.TIMESTAMP
        })
        .then(function () {

          button.textContent =
            "✓ CLOSED";

          const status =
            document.getElementById(
              "hostPhotoStatus"
            );

          if (status) {
            status.style.display =
              "none";
          }

          setTimeout(function () {
            button.textContent =
              "CLOSE PHOTO SUBMISSIONS";
          }, 1500);

        });

    },
    true
  );


  // ================================================
  // GUEST — FIREBASE CONTROLS PHOTO PANEL
  // ================================================

  const joinCode =
    photoJoinCode();


  if (joinCode) {

    eventDatabase
      .ref(
        "events/" +
        joinCode +
        "/photoSubmissionsState"
      )
      .on(
        "value",
        function (snapshot) {

          const state =
            snapshot.val();

          const panel =
            document.getElementById(
              "guestPhotoPanel"
            );

          const prompt =
            document.getElementById(
              "guestPhotoPrompt"
            );


          if (!panel) return;


          if (
            !state ||
            !state.open
          ) {

            panel.style.display =
              "none";

            return;
          }


          if (prompt) {
            prompt.textContent =
              state.prompt ||
              "Share your favorite photo from tonight!";
          }


          // State is open.
          // Panel will display when guest taps Photos.
        }
      );
  }


  // ================================================
  // GUEST PHOTOS BUTTON
  // ================================================

  document.addEventListener(
    "click",
    function (event) {

      const button =
        event.target.closest(
          '#guestViewScreen .guest-view-action[data-feature="Photos"]'
        );

      if (!button) return;

      if (!joinCode) return;

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();


      eventDatabase
        .ref(
          "events/" +
          joinCode +
          "/photoSubmissionsState"
        )
        .once(
          "value"
        )
        .then(function (snapshot) {

          const state =
            snapshot.val();

          const panel =
            document.getElementById(
              "guestPhotoPanel"
            );

          const prompt =
            document.getElementById(
              "guestPhotoPrompt"
            );


          if (!panel) return;


          if (
            !state ||
            !state.open
          ) {

            panel.style.display =
              "none";

            alert(
              "Photo submissions are not open right now."
            );

            return;
          }


          if (prompt) {
            prompt.textContent =
              state.prompt ||
              "Share your favorite photo from tonight!";
          }


          panel.style.display =
            "block";


          panel.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });

        });

    },
    true
  );


  // ================================================
  // GUEST SUBMIT PHOTO
  // ================================================

  document.addEventListener(
    "click",
    function (event) {

      const button =
        event.target.closest(
          "#submitGuestPhotoButton"
        );

      if (!button) return;

      if (!joinCode) return;

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();


      const input =
        document.getElementById(
          "guestPhotoInput"
        );


      if (
        !input ||
        !input.files ||
        !input.files[0]
      ) {

        alert(
          "Choose a photo first."
        );

        return;
      }


      const file =
        input.files[0];


      // Keep Firebase Realtime Database payloads
      // reasonably small.
      if (
        file.size >
        2 * 1024 * 1024
      ) {

        alert(
          "Please choose a photo smaller than 2 MB."
        );

        return;
      }


      button.textContent =
        "SENDING…";

      button.disabled =
        true;


      const reader =
        new FileReader();


      reader.onload =
        function () {

          eventDatabase
            .ref(
              "events/" +
              joinCode +
              "/photoInbox"
            )
            .push({
              image:
                reader.result,

              submittedAt:
                new Date().toISOString(),

              status:
                "pending"
            })
            .then(function () {

              input.value =
                "";

              button.textContent =
                "✓ PHOTO SENT";


              const confirmation =
                document.getElementById(
                  "guestPhotoConfirmation"
                );


              if (confirmation) {

                confirmation.textContent =
                  "✓ Photo submitted!";

                confirmation.style.display =
                  "block";
              }


              setTimeout(function () {

                button.textContent =
                  "SEND PHOTO";

                button.disabled =
                  false;

                if (confirmation) {
                  confirmation.style.display =
                    "none";
                }

              }, 2200);

            })
            .catch(function (error) {

              console.error(
                "Photo submission failed:",
                error
              );

              button.textContent =
                "SEND PHOTO";

              button.disabled =
                false;

              alert(
                "Photo could not be submitted."
              );

            });
        };


      reader.onerror =
        function () {

          button.textContent =
            "SEND PHOTO";

          button.disabled =
            false;

          alert(
            "The photo could not be read."
          );
        };


      reader.readAsDataURL(
        file
      );

    },
    true
  );

})();

// ======================================================
// CUE THE CROWD — ROBUST LIVE TIPPING PATCH
// Direct Firebase save/read so guest tipping does not depend
// on localStorage synchronization timing between browsers.
// ======================================================
(function installRobustLiveTippingPatch() {

  const enableButton = document.getElementById("enableGuestTipsButton");
  const disableButton = document.getElementById("disableGuestTipsButton");

  if (enableButton) {
    enableButton.addEventListener("click", function () {
      const event = getCurrentEvent();
      if (!event || !event.id) return;

      const businessField = document.getElementById("hostTipBusinessName");
      const linkField = document.getElementById("hostTipPaymentLink");

      const businessName = businessField ? businessField.value.trim() : "";
      let paymentLink = linkField ? linkField.value.trim() : "";

      if (!businessName || !paymentLink) return;

      if (!/^https?:\/\//i.test(paymentLink)) {
        paymentLink = "https://" + paymentLink;
        if (linkField) linkField.value = paymentLink;
      }

      const eventCode = getGuestEventCode(event);
      if (!eventCode) return;

      const tipping = {
        enabled: true,
        businessName: businessName,
        paymentLink: paymentLink
      };

      localStorage.setItem(
        "guestTipping-" + event.id,
        JSON.stringify(tipping)
      );

      eventDatabase
        .ref("events/" + eventCode + "/tipping")
        .set(tipping)
        .then(function () {
          console.log("Live tipping saved directly to Firebase.");
        })
        .catch(function (error) {
          console.error("Live tipping save failed:", error);
          alert("The tipping link could not be saved. Please try again.");
        });
    });
  }

  if (disableButton) {
    disableButton.addEventListener("click", function () {
      const event = getCurrentEvent();
      if (!event || !event.id) return;

      const eventCode = getGuestEventCode(event);
      if (!eventCode) return;

      const businessField = document.getElementById("hostTipBusinessName");
      const linkField = document.getElementById("hostTipPaymentLink");

      const tipping = {
        enabled: false,
        businessName: businessField ? businessField.value.trim() : "",
        paymentLink: linkField ? linkField.value.trim() : ""
      };

      localStorage.setItem(
        "guestTipping-" + event.id,
        JSON.stringify(tipping)
      );

      eventDatabase
        .ref("events/" + eventCode + "/tipping")
        .set(tipping)
        .catch(function (error) {
          console.error("Live tipping disable sync failed:", error);
        });
    });
  }

  window.addEventListener("click", function (clickEvent) {
    const tipButton =
      clickEvent.target.closest &&
      clickEvent.target.closest('.guest-view-action[data-feature="Tips"]');

    if (!tipButton) return;

    clickEvent.preventDefault();
    clickEvent.stopPropagation();
    clickEvent.stopImmediatePropagation();

    const currentEvent = getCurrentEvent();
    const joinCode =
      new URLSearchParams(window.location.search).get("join") ||
      (currentEvent && currentEvent.id
        ? getGuestEventCode(currentEvent)
        : "");

    if (!joinCode) {
      alert("This event could not be identified. Please reopen the guest link.");
      return;
    }

    const paymentWindow = window.open("about:blank", "_blank");

    eventDatabase
      .ref("events/" + joinCode + "/tipping")
      .once("value")
      .then(function (snapshot) {
        const tipping = snapshot.val();

        if (!tipping || !tipping.enabled) {
          if (paymentWindow) paymentWindow.close();
          alert("Tipping is not enabled for this event.");
          return;
        }

        if (!tipping.paymentLink) {
          if (paymentWindow) paymentWindow.close();
          alert("The host has not added a tipping payment link yet.");
          return;
        }

        let paymentLink = String(tipping.paymentLink).trim();

        if (!/^https?:\/\//i.test(paymentLink)) {
          paymentLink = "https://" + paymentLink;
        }

        try {
          new URL(paymentLink);
        } catch (error) {
          if (paymentWindow) paymentWindow.close();
          alert("The host's tipping payment link is invalid.");
          return;
        }

        if (currentEvent && currentEvent.id) {
          localStorage.setItem(
            "guestTipping-" + currentEvent.id,
            JSON.stringify(tipping)
          );
        }

        if (paymentWindow) {
          paymentWindow.location.href = paymentLink;
        } else {
          window.location.href = paymentLink;
        }
      })
      .catch(function (error) {
        if (paymentWindow) paymentWindow.close();
        console.error("Guest tipping lookup failed:", error);
        alert("The tipping payment link could not be loaded. Please try again.");
      });
  }, true);

})();
// ======================================================
// CUE THE CROWD — GLOBAL EVENT HQ NAVIGATION
// Gives the DJ a direct Event HQ button from Host Control,
// Guest Hub and other event screens.
// ======================================================

(function installGlobalEventHQButton() {

  function install() {

    if (document.getElementById("ctcTopEventHQButton")) {
      return;
    }

    const myEventsButton =
      document.getElementById("topMyEventsButton");

    if (!myEventsButton || !myEventsButton.parentElement) {
      return;
    }

    const button =
      document.createElement("button");

    button.id =
      "ctcTopEventHQButton";

    button.className =
      "small-button";

    button.textContent =
      "EVENT HQ";

    button.addEventListener(
      "click",
      function () {

        const currentEvent =
          typeof getCurrentEvent === "function"
            ? getCurrentEvent()
            : null;

        if (!currentEvent || !currentEvent.id) {
          alert("Open an event first.");
          return;
        }

        if (typeof updateEventHQ === "function") {
          updateEventHQ(currentEvent);
        }

        hideAllScreens();

        eventHQScreen.classList.add(
          "active"
        );
      }
    );

    myEventsButton.parentElement.insertBefore(
      button,
      myEventsButton
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      install,
      { once: true }
    );
  } else {
    install();
  }

})();
