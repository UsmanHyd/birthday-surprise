// ============================================================
// CONFIG — everything you personally need to fill in lives here.
// Every placeholder is marked with "TODO:". Nothing else in the
// codebase needs to change to customize the site — just edit
// this file (and drop the audio file where noted).
// ============================================================

const CONFIG = {

  // TODO: her name, used all over the site
  herName: "Baji",

  landing: {
    // TODO: personalize the greeting
    greetingLine1: "Happy Birthday, Baji!",
    // Shown under the greeting, explains what this site actually is
    briefing:
      "I built you a little birthday website instead of just texting you like a normal person. There are three gifts hidden below — unwrap them all, and there's one more surprise waiting at the end.",
    // Shown just above the box grid
    boxesSubtitle: "Pick a gift, any gift. Open all three to unlock the finale.",
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
    "This one's been waiting for you all day.",
  ],

  box1: {
    title: "The Present",
    instructions: "Click it as fast as you can. It won't unwrap itself.",
    clicksNeeded: 10,
    idleResetMs: 900,
    // shown first, as "the wrong gift"
    jokeImageSrc: "assets/images/lizardGift.jpg",
    // shown a few seconds later, once the popup below has swapped it in
    realImageSrc: "assets/images/birthdayGift.jpeg",
    // TODO: tweak the wording if you want — shown as a little popup right
    // before the joke photo swaps out for the real one
    swapMessage: "Sorry sorry, galat gift dikha diya — yeh raha real gift!",
  },

  box2: {
    title: "The Pop-Up Box",
    instructions: "Turn the crank. Keep turning. You'll regret it.",
    turnsNeeded: 3,
    // TODO: put the real audio file at this exact path (see assets/audio/README.txt)
    audioSrc: "assets/audio/happy-birthday-scream.mp3",
    // TODO: caption shown under the joker when it pops out
    revealCaption: "TODO: replace with a funny caption for the pop-up reveal",
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
    heading: "You unlocked every gift.",
    // TODO: closing line / signature, e.g. "Love, [your name]"
    closingNote: "TODO: replace with your closing note / signature",
  },
};
