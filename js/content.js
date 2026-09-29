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
      "Ab bola tha to karni parti ha na phir, ya lo bana de",
    // Shown just above the box grid
    boxesSubtitle: "Pick a gift, any gift. Open all three to unlock the finale.",
  },

  // Shown as a teasing speech-bubble when hovering/tapping a box,
  // before it's opened. Add as many as you like, one is picked at random.
  // These are safe as-is, but feel free to make them more "you two".
  teaseLines: [
    "Ma kahta hon sooch lo",
    "Sooch lo",
    "are you super sure",
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
    instructions: "Sit tight — it winds itself up.",
    // how long the automatic wind-up (2 full turns) takes once this
    // screen opens, before the lid pops
    windMs: 3000,
    // TODO: put the real "pop" sound at this exact path (see assets/audio/README.txt)
    audioSrc: "assets/audio/happy-birthday-scream.mp3",
    // TODO: put a winding/ratchet sound effect at this exact path — it loops
    // for the ~3s wind-up and stops the moment the lid pops (see assets/audio/README.txt)
    windAudioSrc: "assets/audio/spindle-winding.mp3",
    // plays inline on this screen once the lid pops; can't be skipped or paused
    videoSrc: "assets/birthdayVideo.mp4",
    // TODO: caption shown once the video finishes
    revealCaption: "TODO: replace with a funny caption for the pop-up reveal",
  },

  box3: {
    title: "A Little Memories Freshup",
    instructions: "Tap the diary to open it, then flip through with the arrows.",
    // Each entry is ONE page (one side of a sheet). Pages are shown two at
    // a time, left + right, in this exact order, and flipped through with
    // the arrows. `type` is "image" or "video". Keep this list an EVEN
    // length (add/remove in pairs) so every spread always shows two real
    // pictures — an odd length leaves the last spread with a blank side.
    // On the last spread the next-arrow turns into a "close the diary"
    // button. TODO: swap in the real photos/videos and write the real
    // text for each one.
    pages: [
      { type: "image", media: "assets/images/firstPicture.jpeg", text: "The one & only best picture we had" },
      { type: "image", media: "assets/images/secondPicture.jpeg", text: "One of the best uni trip" },
      { type: "video", media: "assets/tripVido.mp4", text: "Peak mrasi moment \u{1F602}" },
      { type: "image", media: "assets/images/birthdayGift.jpeg", text: "TODO: write the closing page here" },
    ],
  },

  finale: {
    // small label above the greeting
    eyebrow: "One last thing",
    // TODO: personalize the greeting
    greeting: "Dear Baji,",
    letter:
      "Sab sa phala to happy birthday\n\nallah apko zindagi ke har wo khushian da jinke ap duaen karti rahi ho\n\nenjoy your day may you have many more\n\nya bas ek chota sa tohfa tha zada time ni mil saka bas yaahe ho saka",
    signature: "Your bro",
  },
};
