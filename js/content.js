// ============================================================
// CONFIG — everything you personally need to fill in lives here.
// Every placeholder is marked with "TODO:". Nothing else in the
// codebase needs to change to customize the site — just edit
// this file (and drop the audio file where noted).
// ============================================================

const CONFIG = {

  // TODO: her name, used all over the site
  herName: "Buddy",

  landing: {
    // TODO: personalize the greeting
    greetingLine1: "Hey Buddy...",
  },

  // Shown as a teasing speech-bubble when hovering/tapping a box,
  // before it's opened. Add as many as you like, one is picked at random.
  // These are safe as-is, but feel free to make them more "you two".
  teaseLines: [
    "Are you SURE about this?",
    "Really? You want to open this one?",
    "Last chance to back out...",
    "I would think twice if I were you.",
    "This one's cursed. Probably. Maybe.",
    "Bold choice. Bold, bold choice.",
    "Don't say I didn't warn you.",
    "This box has seen things.",
  ],

  box1: {
    title: "The Chest",
    instructions: "Click it as fast as you can. It won't open itself.",
    clicksNeeded: 10,
    idleResetMs: 900,
    // TODO: this is the payoff joke — write the actual bit here.
    // Why a lizard? Inside joke context goes here so the caption lands.
    revealCaption:
      "TODO: replace with the real lizard joke/caption — e.g. why on earth is it a lizard?",
  },

  box2: {
    title: "The Joker Box",
    instructions: "Turn the crank. Keep turning. You'll regret it.",
    turnsNeeded: 3,
    // TODO: put the real audio file at this exact path (see assets/audio/README.txt)
    audioSrc: "assets/audio/happy-birthday-scream.mp3",
    // TODO: caption shown under the joker when it pops out
    revealCaption: "TODO: replace with a funny caption for the joker reveal",
  },

  box3: {
    title: "Roast or Toast",
    instructions: "Pull the lever. Repeatedly. You've been warned.",
    // TODO: replace these with real inside-joke roasts about her.
    // They're shown one per lever-pull, in this exact order, so you
    // can build up a deliberate comedic sequence.
    roastLines: [
      "You've rewatched the same show four times and still cry at the same part.",
      "You have a favorite mug and will not be talked out of it.",
      "You've never once arrived on time, and honestly, why start now.",
      "You definitely have a 'system' for something that doesn't need one.",
      "You've sent a voice note longer than most podcast episodes.",
      "Okay. I'm out of roasts. You win. Pull it one more time.",
    ],
    // TODO: the real heartfelt message. Use \n for line breaks — it will
    // type out on screen character by character.
    finalMessage:
      "TODO: replace this with the real heartfelt birthday message.\n\nWrite it like you'd actually say it to her.",
  },

  finale: {
    heading: "You unlocked everything.",
    // TODO: closing line / signature, e.g. "Love, [your name]"
    closingNote: "TODO: replace with your closing note / signature",
  },
};
