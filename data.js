// ======================================================
// EVENT PLATFORM PRO
// ACTIVITY ENGINE
// ======================================================

const activityLibrary = [

  // ====================================================
  // CROWD PULSE
  // ====================================================

  {
    id: "crowd-pulse-01",

    name: "Who's More Likely?",

    engine: "Crowd Pulse",
scoreType: "none",
    eventTypes: ["Wedding"],

    minutes: [3, 5, 10],

    energy: ["Low Energy", "Transition", "Unexpected Delay"],

    crowds: ["Shy", "Mixed Ages", "High Energy"],

    requiresPhotos: false,
    requiresPhones: false,
    requiresMusic: false,

    description:
      "Fast whole-room predictions about the couple without putting individual guests on the spot.",

    hostIntro:
      "Alright, everybody gets to have an opinion on this one. I'm going to give you two choices, and you tell me which one fits our couple best.",

    rounds: [
      {
        prompt:
          "Who is more likely to control the thermostat for the rest of their lives?"
      },
      {
        prompt:
          "Who is more likely to say 'we don't need directions' and immediately get lost?"
      },
      {
        prompt:
          "Who is more likely to spend more money on something completely unnecessary?"
      },
      {
        prompt:
          "Who is more likely to fall asleep during a movie they picked?"
      },
      {
        prompt:
          "Who is more likely to win an argument and still bring it up three years later?"
      }
    ],

    transition:
      "Alright, I think we just learned a little more about these two than they wanted us to know."
  },


  // ====================================================
  // SIDE VS SIDE
  // ====================================================

  {
    id: "side-showdown-01",

    name: "Bride's Side vs. Groom's Side",

    engine: "Side vs. Side",
scoreType: "two-team",
teamNames: ["BRIDE'S SIDE", "GROOM'S SIDE"],
    eventTypes: ["Wedding"],

    minutes: [5, 10, 15],

    energy: ["Low Energy", "Need Competition"],

    crowds: ["Mixed Ages", "High Energy", "Competitive"],

    requiresPhotos: false,
    requiresPhones: false,
    requiresMusic: false,

    description:
      "Two sides of the room compete in fast wedding-themed challenges.",

    hostIntro:
      "We're about to find out which side of this room came prepared. Bride's side, you're one team. Groom's side, you're the other.",

    rounds: [
      {
        prompt:
          "Which side can name five things the couple has in common first?"
      },
      {
        prompt:
          "Which side can produce someone married the longest?"
      },
      {
        prompt:
          "Which side can produce someone who traveled the farthest to be here?"
      },
      {
        prompt:
          "Which side can produce the oldest photo of themselves with either member of the couple?"
      },
      {
        prompt:
          "Final round: which side can make the most noise?"
      }
    ],

    transition:
      "Give it up for both sides. We're calling that family rivalry officially settled — at least until tomorrow."
  },


  // ====================================================
  // BATTLE OF THE TABLES
  // ====================================================

 {
  id: "tables-01",

  name: "Table Takeover",

  engine: "Battle of the Tables",

  scoreType: "multi-team",

  teamMode: "tables",

  eventTypes: ["Wedding"],

  minutes: [10, 15, 20],

  energy: [
    "Unexpected Delay",
    "Need Competition",
    "Low Energy",
    "Need a Laugh"
  ],

  crowds: [
    "Mixed Ages",
    "High Energy",
    "Competitive"
  ],

  requiresPhotos: false,
  requiresPhones: false,
  requiresMusic: false,

  description:
    "Every table becomes a team in a fast-moving series of wedding challenges, scavenger hunts, crowd missions and bragging-rights battles.",

  hostIntro:
    "Alright, every table in this room is officially a team. You're competing for absolutely enormous bragging rights and probably nothing else. Keep your table together, listen carefully, and when I call a challenge, move fast.",

  rounds: [

    {
      title: "THE LONGEST MARRIAGE",
      prompt:
        "Find the person at your table who has been married the longest. When you have them, your table captain raises a hand. The table with the longest confirmed marriage earns the point.",
      rule:
        "One representative per table. Host confirms number of years.",
      timeLimit: 60
    },

    {
      title: "FARTHEST FROM HOME",
      prompt:
        "Who at your table traveled the farthest to be here tonight? Decide quickly and have that person stand. Farthest verified distance wins.",
      rule:
        "Use hometown or starting location for today's trip.",
      timeLimit: 60
    },

    {
      title: "OLDEST PHOTO",
      prompt:
        "Find the oldest photo anyone at your table has on their phone with either member of the couple. First strong contender gets the host's attention.",
      rule:
        "Photo must actually include at least one member of the couple.",
      timeLimit: 90
    },

    {
      title: "POCKET PURSE PANIC",
      prompt:
        "First table to produce three of these wins: a paper receipt, a mint or piece of gum, and a pen.",
      rule:
        "All three items must come from guests currently seated at that table.",
      timeLimit: 45
    },

    {
      title: "BIRTHDAY LINEUP",
      prompt:
        "Your table has 45 seconds to figure out whose birthday is coming up next on the calendar. Send that person to stand beside the table captain.",
      rule:
        "Closest upcoming birthday wins. Do not count today's date unless it is actually their birthday.",
      timeLimit: 45
    },

    {
      title: "COUPLE CONNECTION",
      prompt:
        "Your table has one minute to identify the person who has known either member of the couple the longest.",
      rule:
        "Host asks the finalist how they know the couple and approximately how many years.",
      timeLimit: 60
    },

    {
      title: "FIND SOMETHING BLUE",
      prompt:
        "First table to hold up five different blue items wins the point.",
      rule:
        "Items must already be at the table or on a person at the table. No running across the venue.",
      timeLimit: 45
    },

    {
      title: "THE HUMAN ALPHABET",
      prompt:
        "Find one person at your table whose first name begins with A, B, C, D or E. The table covering the most different letters wins.",
      rule:
        "One person can only count for one letter.",
      timeLimit: 60
    },

    {
      title: "ANNIVERSARY MATH",
      prompt:
        "Add together the number of years married for every married couple sitting at your table. Highest combined total wins.",
      rule:
        "Host may ask the top two tables to verify their total.",
      timeLimit: 75
    },

    {
      title: "PHONE BATTERY SURVIVOR",
      prompt:
        "Everybody at the table check your phone battery. Find the person with the LOWEST battery percentage who still has a working phone.",
      rule:
        "Lowest visible percentage wins. A dead phone does not count.",
      timeLimit: 45
    },

    {
      title: "SAME BIRTH MONTH",
      prompt:
        "How many people at your table share a birth month with someone else at the same table? Highest number of matching guests wins.",
      rule:
        "Guests only count if at least one other person at the table shares their month.",
      timeLimit: 60
    },

    {
      title: "THE GENERATION STACK",
      prompt:
        "Your table earns one point for every generation represented: Silent Generation, Boomers, Gen X, Millennials and Gen Z.",
      rule:
        "Host verifies the table claiming the most generations.",
      timeLimit: 60
    },

    {
      title: "WEDDING WORD BLITZ",
      prompt:
        "Your table has 30 seconds to come up with as many wedding-related words as possible beginning with the letter M.",
      rule:
        "One spokesperson gives the final list. Duplicate versions of the same word count once.",
      timeLimit: 30
    },

    {
      title: "MOST STATES",
      prompt:
        "Count how many different U.S. states are represented by people sitting at your table based on where they currently live.",
      rule:
        "Different states only. Highest number wins.",
      timeLimit: 60
    },

    {
      title: "THE SHOE SHOWDOWN",
      prompt:
        "Without leaving your table area, count how many different types of footwear your table has: heels, sneakers, boots, sandals, dress shoes and so on.",
      rule:
        "Host has final say on whether two styles are actually different.",
      timeLimit: 45
    },

    {
      title: "COUPLE TRIVIA HUDDLE",
      prompt:
        "As a table, decide who you think said 'I love you' first: Partner One or Partner Two. Lock in one answer as a team.",
      rule:
        "Host reveals the correct answer from Event DNA when available. If Event DNA does not contain it, ask the couple live.",
      timeLimit: 30
    },

    {
      title: "THE QUIETEST CHALLENGE",
      prompt:
        "For the next 20 seconds, your entire table must remain completely silent. Any laugh, word or obvious noise eliminates the table.",
      rule:
        "Last table remaining earns the point.",
      timeLimit: 20
    },

    {
      title: "TABLE CHEER",
      prompt:
        "You have 30 seconds to invent a five-second table cheer. When your table number is called, perform it together.",
      rule:
        "Host awards the point based on participation, creativity and crowd reaction.",
      timeLimit: 30
    },

    {
      title: "ONE DEGREE OF SEPARATION",
      prompt:
        "Your table has one minute to find the most unexpected connection between two people sitting there who did not arrive together.",
      rule:
        "Examples: same hometown, same school, same employer, same birthday, mutual friend. Host chooses the best connection.",
      timeLimit: 60
    },

    {
      title: "FINAL TABLE TAKEOVER",
      prompt:
        "This is worth TWO points. When your table number is called, you have five seconds to make as much coordinated noise as possible. The room decides the winner.",
      rule:
        "Host judges by crowd reaction. Winning table receives two points.",
      timeLimit: 90,
      points: 2
    }

  ],

  scoring:
    "Most rounds are worth 1 point. The final Table Takeover round is worth 2 points. Use the built-in table scoreboard throughout the activity.",

  transition:
    "Give it up for our winning table. You now have official bragging rights for the rest of the night — use them irresponsibly."
},


  // ====================================================
  // GENERATION BATTLE
  // ====================================================

  {
    id: "generation-01",

    name: "Generation Showdown",

    engine: "Generation Battle",
scoreType: "multi-team",
    eventTypes: ["Wedding", "Birthday", "Corporate", "Reunion"],

    minutes: [10, 15, 20],

    energy: ["Low Energy", "Need Competition", "Need Movement"],

    crowds: ["Mixed Ages", "High Energy", "Competitive"],

    requiresPhotos: false,
    requiresPhones: false,
    requiresMusic: true,

    description:
      "Different generations battle for control of the dance floor.",

    hostIntro:
      "We're settling something tonight. Which generation actually owns the dance floor?",

    rounds: [
      {
        title: "Boomers",
        prompt:
          "DJ: play one recognizable 60s or 70s floor-filler for approximately 30 seconds."
      },
      {
        title: "Gen X",
        prompt:
          "DJ: play one recognizable 80s or early-90s anthem for approximately 30 seconds."
      },
      {
        title: "Millennials",
        prompt:
          "DJ: play one recognizable late-90s or 2000s anthem for approximately 30 seconds."
      },
      {
        title: "Gen Z",
        prompt:
          "DJ: play one recognizable current-era crowd favorite for approximately 30 seconds."
      }
    ],

    scoring:
      "Host scores each generation from 1–10 based on participation and crowd response.",

    transition:
      "Apparently we have our answer. DJ, give the winning generation one more."
  },


  // ====================================================
  // QUICK LAUGH
  // ====================================================

  {
    id: "quick-laugh-01",

    name: "Wedding Reality Check",

    engine: "Quick Laugh",
scoreType: "none",
    eventTypes: ["Wedding"],

    minutes: [3, 5],

    energy: ["Need a Laugh", "Unexpected Delay", "Transition"],

    crowds: ["Shy", "Mixed Ages", "High Energy"],

    requiresPhotos: false,
    requiresPhones: false,
    requiresMusic: false,

    description:
      "Fast relatable marriage prompts designed to get easy laughs without embarrassing guests.",

    hostIntro:
      "Married people in the room, you're about to help our newlyweds understand what they've actually signed up for.",

    rounds: [
      {
        prompt:
          "Raise your hand if you've ever argued about where to eat and then rejected every suggestion."
      },
      {
        prompt:
          "Keep your hand up if you've ever asked 'what's wrong?' and immediately regretted it."
      },
      {
        prompt:
          "Raise your hand if your spouse has a completely different definition of 'five minutes' than you do."
      },
      {
        prompt:
          "Raise your hand if you've ever watched an entire television series without your spouse after promising you wouldn't."
      }
    ],

    transition:
      "There you go. Free marriage counseling courtesy of everybody in this room."
  },


  // ====================================================
  // MOVEMENT
  // ====================================================

  {
    id: "movement-01",

    name: "Find Your People",

    engine: "Get the Room Moving",
scoreType: "none",
    eventTypes: ["Wedding", "Birthday", "Class Reunion", "Corporate Event", "Holiday Party", "School Event", "Bar / Venue", "General Event"],

    minutes: [5, 10],

    energy: ["Need Movement", "Low Energy"],

    crowds: ["Mixed Ages", "High Energy"],

    requiresPhotos: false,
    requiresPhones: false,
    requiresMusic: false,

    description:
      "Guests physically respond to fast prompts that reveal connections throughout the room.",

    hostIntro:
      "Nobody has to dance and nobody has to perform. I just need you to move when one of these applies to you.",

    rounds: [
      {
        prompt:
          "Stand if you've known the guest or guests of honor for more than ten years."
      },
      {
        prompt:
          "Stand if you traveled more than an hour to be here."
      },
      {
        prompt:
          "Stand if you went to school with someone involved in this event."
      },
      {
        prompt:
          "Stand if you met someone in this room for the first time tonight."
      }
    ],

    transition:
      "Look around — that's the room you're celebrating with tonight."
  }

,

  // ====================================================
  // UNIVERSAL CROWD PULSE
  // ====================================================

  {
    id: "crowd-pulse-universal-01",

    name: "Room Hot Takes",

    engine: "Crowd Pulse",

    scoreType: "none",

    eventTypes: [
      "Birthday",
      "Class Reunion",
      "Corporate Event",
      "Holiday Party",
      "School Event",
      "Bar / Venue",
      "General Event"
    ],

    minutes: [
      3,
      5,
      10
    ],

    energy: [
      "Low Energy",
      "Transition",
      "Unexpected Delay",
      "Need a Laugh"
    ],

    crowds: [
      "Shy",
      "Mixed Ages",
      "High Energy",
      "Competitive"
    ],

    requiresPhotos: false,
    requiresPhones: false,
    requiresMusic: false,

    description:
      "Fast whole-room either-or prompts that work without putting individual guests on the spot.",

    hostIntro:
      "Everybody gets an opinion. Pick a side fast — overthinking is officially not allowed.",

    rounds: [

      {
        prompt:
          "Which is more important at a great event: the food or the music?"
      },

      {
        prompt:
          "Would this room rather have an extra hour of party time or an open dessert bar?"
      },

      {
        prompt:
          "Which gets people competitive faster: trivia or a physical challenge?"
      },

      {
        prompt:
          "Would this crowd rather sing in public or dance alone in the middle of the floor?"
      },

      {
        prompt:
          "Which side of the room thinks they could run this event better than the host?"
      }

    ],

    transition:
      "Excellent. We have opinions. That means we have a room."
  },


  // ====================================================
  // UNIVERSAL SIDE VS SIDE
  // ====================================================

  {
    id:
      "side-showdown-universal-01",

    name:
      "Room vs. Room",

    engine:
      "Side vs. Side",

    scoreType:
      "two-team",

    teamNames: [
      "SIDE A",
      "SIDE B"
    ],

    eventTypes: [
      "Birthday",
      "Class Reunion",
      "Corporate Event",
      "Holiday Party",
      "School Event",
      "Bar / Venue",
      "General Event"
    ],

    minutes: [
      5,
      10,
      15
    ],

    energy: [
      "Low Energy",
      "Need Competition",
      "Need a Laugh"
    ],

    crowds: [
      "Mixed Ages",
      "High Energy",
      "Competitive"
    ],

    requiresPhotos: false,
    requiresPhones: false,
    requiresMusic: false,

    description:
      "Split the room into two teams for fast challenges that work at almost any event.",

    hostIntro:
      "This room is officially split in half. Your side is your team, and bragging rights start now.",

    rounds: [

      {
        title:
          "ROUND 1",

        prompt:
          "Which side can produce someone with the earliest birthday in the calendar year?"
      },

      {
        title:
          "ROUND 2",

        prompt:
          "Which side can produce someone who traveled the farthest to be here?"
      },

      {
        title:
          "ROUND 3",

        prompt:
          "Which side can name five things everyone in this room probably has in common first?"
      },

      {
        title:
          "ROUND 4",

        prompt:
          "Which side can produce the lowest working phone battery percentage?"
      },

      {
        title:
          "FINAL ROUND",

        prompt:
          "Which side can make the most coordinated noise in five seconds?"
      }

    ],

    scoring:
      "One point per round. Host decides ties.",

    transition:
      "Give it up for both sides. The rivalry can continue after I leave."
  },


  // ====================================================
  // UNIVERSAL QUICK LAUGH
  // ====================================================

  {
    id:
      "quick-laugh-universal-01",

    name:
      "Everybody Has Done It",

    engine:
      "Quick Laugh",

    scoreType:
      "none",

    eventTypes: [
      "Birthday",
      "Class Reunion",
      "Corporate Event",
      "Holiday Party",
      "School Event",
      "Bar / Venue",
      "General Event"
    ],

    minutes: [
      3,
      5
    ],

    energy: [
      "Need a Laugh",
      "Unexpected Delay",
      "Transition",
      "Low Energy"
    ],

    crowds: [
      "Shy",
      "Mixed Ages",
      "High Energy"
    ],

    requiresPhotos: false,
    requiresPhones: false,
    requiresMusic: false,

    description:
      "Fast relatable prompts that create easy laughs without embarrassing anyone.",

    hostIntro:
      "No names, no explanations. Just raise your hand if this has ever been you.",

    rounds: [

      {
        prompt:
          "Raise your hand if you've walked into a room and forgotten why you went there."
      },

      {
        prompt:
          "Keep it up if you've sent a text to the person you were talking about."
      },

      {
        prompt:
          "Raise your hand if you've pretended to understand something because it was too late to ask."
      },

      {
        prompt:
          "Raise your hand if you've looked for your phone while holding your phone."
      }

    ],

    transition:
      "Perfect. We are apparently all doing just fine."
  },


  // ====================================================
  // HOLIDAY PARTY
  // ====================================================

  {
    id:
      "holiday-hot-takes-01",

    name:
      "Holiday Hot Takes",

    engine:
      "Crowd Pulse",

    scoreType:
      "none",

    eventTypes: [
      "Holiday Party"
    ],

    minutes: [
      3,
      5,
      10
    ],

    energy: [
      "Low Energy",
      "Need a Laugh",
      "Transition",
      "Unexpected Delay"
    ],

    crowds: [
      "Shy",
      "Mixed Ages",
      "High Energy",
      "Competitive"
    ],

    requiresPhotos: false,
    requiresPhones: false,
    requiresMusic: false,

    description:
      "Fast holiday debates that get the room participating immediately.",

    hostIntro:
      "We're settling a few holiday arguments right now. Pick a side and commit to it.",

    rounds: [

      {
        prompt:
          "Real tree or artificial tree?"
      },

      {
        prompt:
          "Holiday music before Thanksgiving: acceptable or absolutely not?"
      },

      {
        prompt:
          "Better holiday movie: comedy or classic?"
      },

      {
        prompt:
          "Open presents one at a time or everybody at once?"
      },

      {
        prompt:
          "Ugly sweater: festive tradition or fashion crime?"
      }

    ],

    transition:
      "Excellent. Nothing says holiday spirit like judging each other's traditions."
  }


,

  // ====================================================
  // BIRTHDAY
  // ====================================================

  {
    id: "birthday-bash-01",
    name: "Birthday Bash",
    engine: "Crowd Pulse",
    scoreType: "none",
    eventTypes: ["Birthday"],
    minutes: [3, 5, 10],
    energy: [
      "Need a Laugh",
      "Low Energy",
      "Transition",
      "Unexpected Delay"
    ],
    crowds: [
      "Shy",
      "Mixed Ages",
      "High Energy",
      "Competitive"
    ],
    requiresPhotos: false,
    requiresPhones: false,
    requiresMusic: false,

    description:
      "Fast birthday-themed crowd prompts that put the guest of honor at the center.",

    hostIntro:
      "We're about to find out what this room thinks they know about our guest of honor. First instinct wins.",

    rounds: [
      {
        title: "BIRTHDAY PRIORITIES",
        prompt:
          "Which matters more on your birthday: the cake or the presents?"
      },
      {
        title: "THE PERFECT DAY",
        prompt:
          "Would our guest of honor rather have a huge party or disappear somewhere quiet for the day?"
      },
      {
        title: "BIRTHDAY BEHAVIOR",
        prompt:
          "Who thinks our guest of honor is more likely to stay out too late than go home early?"
      },
      {
        title: "THE GIFT TEST",
        prompt:
          "Better birthday gift: something expensive or something ridiculously thoughtful?"
      },
      {
        title: "ONE MORE YEAR",
        prompt:
          "Who thinks birthdays get better as you get older?"
      }
    ],

    transition:
      "Another year older and apparently now open to public opinion."
  },


  // ====================================================
  // CLASS REUNION
  // ====================================================

  {
    id: "reunion-then-now-01",
    name: "Then vs. Now",
    engine: "Crowd Pulse",
    scoreType: "none",
    eventTypes: ["Class Reunion"],
    minutes: [5, 10],
    energy: [
      "Need a Laugh",
      "Low Energy",
      "Transition",
      "Unexpected Delay"
    ],
    crowds: [
      "Shy",
      "Mixed Ages",
      "High Energy"
    ],
    requiresPhotos: false,
    requiresPhones: false,
    requiresMusic: false,

    description:
      "A nostalgia-driven reunion game comparing school days with life now.",

    hostIntro:
      "We're going back for a minute. I'm giving you a choice between then and now.",

    rounds: [
      {
        title: "COMMUNICATION",
        prompt:
          "Which was better: passing notes in class or texting?"
      },
      {
        title: "WEEKENDS",
        prompt:
          "Which took more planning: going out back then or going out now?"
      },
      {
        title: "PHOTOS",
        prompt:
          "Would you rather have every old school photo deleted or shown on this screen right now?"
      },
      {
        title: "SCHOOL STYLE",
        prompt:
          "Who thinks the fashion from your school years deserves a comeback?"
      },
      {
        title: "THE REAL QUESTION",
        prompt:
          "Who would actually go back and relive high school for one week?"
      }
    ],

    transition:
      "And somehow we survived all of that without Wi-Fi."
  },


  // ====================================================
  // CORPORATE EVENT
  // ====================================================

  {
    id: "corporate-office-showdown-01",
    name: "Office Showdown",
    engine: "Side vs. Side",
    scoreType: "two-team",
    teamNames: [
      "TEAM A",
      "TEAM B"
    ],
    eventTypes: [
      "Corporate Event"
    ],
    minutes: [
      5,
      10,
      15
    ],
    energy: [
      "Need Competition",
      "Need a Laugh",
      "Low Energy"
    ],
    crowds: [
      "Mixed Ages",
      "High Energy",
      "Competitive"
    ],
    requiresPhotos: false,
    requiresPhones: false,
    requiresMusic: false,

    description:
      "Two sides of the room battle through workplace-friendly challenges with live scoring.",

    hostIntro:
      "Forget job titles for the next few minutes. This room is now two teams.",

    rounds: [
      {
        title: "EARLY BIRD",
        prompt:
          "Which team can produce the person who arrived at work earliest today?"
      },
      {
        title: "EMAIL SURVIVOR",
        prompt:
          "Which team can produce someone with the most unread emails right now?"
      },
      {
        title: "COMPANY LONGEVITY",
        prompt:
          "Which team has the employee who has worked with the company the longest?"
      },
      {
        title: "COMMUTE CHAMPION",
        prompt:
          "Which team can produce the person with the longest normal commute?"
      },
      {
        title: "FINAL OFFICE SHOWDOWN",
        prompt:
          "Which team can create the loudest coordinated team cheer in five seconds?"
      }
    ],

    scoring:
      "One point per round. Host verifies answers and decides ties.",

    transition:
      "Congratulations. Please add this achievement to absolutely no performance review."
  },


  // ====================================================
  // SCHOOL EVENT
  // ====================================================

  {
    id: "school-spirit-01",
    name: "School Spirit Showdown",
    engine: "Side vs. Side",
    scoreType: "two-team",
    teamNames: [
      "SIDE A",
      "SIDE B"
    ],
    eventTypes: [
      "School Event"
    ],
    minutes: [
      5,
      10,
      15
    ],
    energy: [
      "Need Competition",
      "Need Movement",
      "Low Energy"
    ],
    crowds: [
      "Mixed Ages",
      "High Energy",
      "Competitive"
    ],
    requiresPhotos: false,
    requiresPhones: false,
    requiresMusic: false,

    description:
      "A fast school-friendly competition built around spirit and participation.",

    hostIntro:
      "We're splitting this room in half. Your assignment is to prove your side has more school spirit.",

    rounds: [
      {
        title: "BIRTHDAY RACE",
        prompt:
          "Which side can produce someone whose birthday is closest to today?"
      },
      {
        title: "SCHOOL COLORS",
        prompt:
          "Which side can hold up the most items matching a school color?"
      },
      {
        title: "NAME GAME",
        prompt:
          "Which side can produce five people whose names begin with five different letters?"
      },
      {
        title: "SPIRIT POSE",
        prompt:
          "Each side has 20 seconds to create one giant team pose."
      },
      {
        title: "FINAL CHEER",
        prompt:
          "Which side can deliver the loudest five-second school cheer?"
      }
    ],

    scoring:
      "One point per round.",

    transition:
      "Only one side gets the bragging rights."
  },


  // ====================================================
  // BAR / VENUE
  // ====================================================

  {
    id: "venue-crowd-chaos-01",
    name: "Bar Crowd Chaos",
    engine: "Quick Laugh",
    scoreType: "none",
    eventTypes: [
      "Bar / Venue"
    ],
    minutes: [
      3,
      5,
      10
    ],
    energy: [
      "Need a Laugh",
      "Low Energy",
      "Unexpected Delay",
      "Transition"
    ],
    crowds: [
      "Shy",
      "Mixed Ages",
      "High Energy"
    ],
    requiresPhotos: false,
    requiresPhones: false,
    requiresMusic: false,

    description:
      "Fast, low-pressure crowd prompts designed for bars and mixed groups.",

    hostIntro:
      "No names and no explanations. Just admit it if one of these sounds familiar.",

    rounds: [
      {
        title: "THE TAB",
        prompt:
          "Raise your hand if you've ever said 'I'm only staying for one' and immediately lied."
      },
      {
        title: "THE PHONE",
        prompt:
          "Raise your hand if you've texted someone who was in the same room."
      },
      {
        title: "THE SONG",
        prompt:
          "Raise your hand if you've claimed you hated a song and then knew every word."
      },
      {
        title: "THE EXIT",
        prompt:
          "Raise your hand if you've said goodbye and then stayed another hour."
      },
      {
        title: "THE NEXT DAY",
        prompt:
          "Raise your hand if you've promised yourself you were never going out again."
      }
    ],

    transition:
      "Apparently everyone here makes outstanding decisions."
  },


  // ====================================================
  // GENERAL EVENT
  // ====================================================

  {
    id: "general-room-rally-01",
    name: "Room Rally",
    engine: "Get the Room Moving",
    scoreType: "none",
    eventTypes: [
      "General Event"
    ],
    minutes: [
      5,
      10
    ],
    energy: [
      "Need Movement",
      "Low Energy",
      "Transition"
    ],
    crowds: [
      "Shy",
      "Mixed Ages",
      "High Energy"
    ],
    requiresPhotos: false,
    requiresPhones: false,
    requiresMusic: false,

    description:
      "A flexible whole-room activity that reveals connections between guests and raises the energy.",

    hostIntro:
      "We're going to find out what this room has in common. If something applies to you, stand up.",

    rounds: [
      {
        title: "TRAVEL",
        prompt:
          "Stand if you traveled more than an hour to be here."
      },
      {
        title: "FIRST TIME",
        prompt:
          "Stand if this is your first event with this group."
      },
      {
        title: "LONG CONNECTION",
        prompt:
          "Stand if you've known someone here for more than ten years."
      },
      {
        title: "NEW CONNECTION",
        prompt:
          "Stand if you've met someone new here today."
      },
      {
        title: "READY TO GO",
        prompt:
          "Stay standing if you're ready for whatever the host does next."
      }
    ],

    transition:
      "That's your room — now let's do something with it."
  }



  ,

  // ====================================================
  // MUSIC SPOTLIGHT — INDIVIDUAL PLAYERS
  // ====================================================

  {
    id: "music-spotlight-01",

    name: "Music Spotlight",

    engine: "Music Spotlight",

    scoreType: "none",

    eventTypes: [
      "Wedding",
      "Birthday",
      "Class Reunion",
      "Corporate Event",
      "Holiday Party",
      "School Event",
      "Bar / Venue",
      "General Event"
    ],

    minutes: [5, 10],

    energy: [
      "Need a Laugh",
      "Need Competition",
      "Low Energy"
    ],

    crowds: [
      "Mixed Ages",
      "High Energy",
      "Competitive"
    ],

    requiresPhotos: false,
    requiresPhones: false,
    requiresMusic: true,

    description:
      "Individual guests step into the spotlight for fast music-driven challenges using the entertainer's own music source.",

    hostIntro:
      "I need a few brave volunteers. This one is individual — short music challenges, quick reactions and instant bragging rights.",

    rounds: [
      {
        title: "OPENING NOTE",
        prompt:
          "Bring up two volunteers. DJ plays a recognizable song intro. First player to correctly identify the artist earns the win."
      },
      {
        title: "DECADE CALL",
        prompt:
          "Play a recognizable song. First volunteer to correctly identify the decade wins the round."
      },
      {
        title: "ARTIST OR TITLE",
        prompt:
          "Play another song. The volunteer may score by correctly naming either the artist or the song title."
      },
      {
        title: "NEXT WORD",
        prompt:
          "Pause a familiar clean crowd song at a safe moment. First volunteer to correctly say the next word or phrase wins."
      },
      {
        title: "FINAL SPOTLIGHT",
        prompt:
          "Bring up the final two players. Play one last recognizable intro. Fastest correct answer takes the final."
      }
    ],

    transition:
      "Give it up for our music experts — and for everyone who was confidently wrong from their seat."
  },


  // ====================================================
  // INDIVIDUAL SPOTLIGHT
  // ====================================================

  {
    id: "individual-spotlight-01",

    name: "Individual Spotlight",

    engine: "Individual Challenge",

    scoreType: "none",

    eventTypes: [
      "Wedding",
      "Birthday",
      "Class Reunion",
      "Corporate Event",
      "Holiday Party",
      "School Event",
      "Bar / Venue",
      "General Event"
    ],

    minutes: [5, 10],

    energy: [
      "Need a Laugh",
      "Need Competition",
      "Low Energy"
    ],

    crowds: [
      "Mixed Ages",
      "High Energy",
      "Competitive"
    ],

    requiresPhotos: false,
    requiresPhones: false,
    requiresMusic: false,

    description:
      "Fast individual-player challenges for hosts who want volunteers instead of table or side teams.",

    hostIntro:
      "This one is individual. I need a few people willing to put their reputation on the line for absolutely unnecessary bragging rights.",

    rounds: [
      {
        title: "FASTEST FIND",
        prompt:
          "Bring up three volunteers. First person to produce a requested everyday item wins the round."
      },
      {
        title: "BIRTHDAY BATTLE",
        prompt:
          "Closest birthday to today's date wins."
      },
      {
        title: "PHONE BATTERY",
        prompt:
          "Lowest visible phone battery percentage above zero wins."
      },
      {
        title: "QUICK FIVE",
        prompt:
          "First player to name five things in the host's chosen category wins."
      },
      {
        title: "FINAL REACTION",
        prompt:
          "Finalists get one fast host challenge. First correct response wins."
      }
    ],

    transition:
      "Give our volunteers a hand. They risked public embarrassment so everyone else didn't have to."
  }

];
