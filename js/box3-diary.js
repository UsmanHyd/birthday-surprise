function initBox3({ onComplete }) {
  const gameEl = document.getElementById("box3-game");
  const revealEl = document.getElementById("box3-reveal");
  const cover = document.getElementById("diary-cover");
  const book = document.getElementById("diary-book");
  const prevBtn = document.getElementById("diary-prev");
  const nextBtn = document.getElementById("diary-next");
  const pageLeft = document.getElementById("diary-page-left");
  const pageRight = document.getElementById("diary-page-right");
  const spine = document.getElementById("diary-spine");
  const spread = document.getElementById("diary-spread");
  const leafFwd = document.getElementById("diary-leaf-fwd");
  const leafFwdFront = document.getElementById("leaf-fwd-front");
  const leafFwdBack = document.getElementById("leaf-fwd-back");
  const leafRev = document.getElementById("diary-leaf-rev");
  const leafRevFront = document.getElementById("leaf-rev-front");
  const leafRevBack = document.getElementById("leaf-rev-back");

  document.getElementById("box3-title").textContent = CONFIG.box3.title;
  document.getElementById("box3-instructions").textContent = CONFIG.box3.instructions;

  // flat list of single pages, grouped into spreads of up to 2 (left/right)
  const pages = CONFIG.box3.pages || [];
  const spreads = [];
  for (let i = 0; i < pages.length; i += 2) {
    spreads.push([pages[i] || null, pages[i + 1] || null]);
  }

  let spreadIndex = 0;
  let opened = false;
  let flipping = false;
  let completed = false;
  const FLIP_MS = 850;

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => (
      { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
    ));
  }

  function pageHTML(page) {
    if (!page) return "";
    const media = page.type === "video"
      ? `<div class="diary-video-wrap">`
        + `<video src="${page.media}" playsinline></video>`
        + `<button type="button" class="diary-play-btn" aria-label="Play video"></button>`
        + `</div>`
      : `<img class="diary-media" src="${page.media}" alt="" />`;
    return `${media}<p class="diary-text">${escapeHtml(page.text || "")}</p>`;
  }

  // videos are re-created on every render (innerHTML swap), so playback
  // is wired up via one delegated listener on the whole book instead of
  // per-video handlers that would get thrown away each time
  book.addEventListener("click", (e) => {
    const wrap = e.target.closest(".diary-video-wrap");
    if (!wrap || wrap.classList.contains("is-playing")) return;
    const video = wrap.querySelector("video");
    if (!video) return;
    wrap.classList.add("is-playing");
    video.controls = true;
    video.play().catch(() => {});
  });

  function updateArrows() {
    prevBtn.classList.toggle("is-disabled", spreadIndex === 0);
    const isLast = spreadIndex >= spreads.length - 1;
    nextBtn.classList.toggle("is-final", isLast);
    nextBtn.innerHTML = isLast ? "&#10003;" : "&#10095;";
    nextBtn.setAttribute("aria-label", isLast ? "Close the diary" : "Next page");
  }

  function renderStatic(index) {
    const spread = spreads[index] || [null, null];
    pageLeft.innerHTML = pageHTML(spread[0]);
    pageRight.innerHTML = pageHTML(spread[1]);
    updateArrows();
  }

  function resetLeaf(leaf) {
    leaf.style.transition = "none";
    leaf.classList.remove("active", "flipped");
    void leaf.offsetWidth; // force reflow so the next flip starts clean
    leaf.style.transition = "";
  }

  function openDiary() {
    if (opened) return;
    opened = true;
    cover.classList.add("opening");
    setTimeout(() => {
      cover.classList.add("hidden");
      book.classList.remove("hidden");
      renderStatic(spreadIndex);
    }, 650);
  }

  function flip(direction) {
    if (!opened || flipping) return;
    const isLast = spreadIndex >= spreads.length - 1;

    if (direction === "next" && isLast) {
      closeDiary();
      return;
    }
    if (direction === "next" && spreadIndex >= spreads.length - 1) return;
    if (direction === "prev" && spreadIndex <= 0) return;

    flipping = true;
    const fromIndex = spreadIndex;
    const toIndex = direction === "next" ? spreadIndex + 1 : spreadIndex - 1;
    const leaf = direction === "next" ? leafFwd : leafRev;
    const frontFace = direction === "next" ? leafFwdFront : leafRevFront;
    const backFace = direction === "next" ? leafFwdBack : leafRevBack;

    if (direction === "next") {
      // front face = the current right page (what's flipping away),
      // back face = the upcoming spread's left page
      frontFace.innerHTML = pageHTML(spreads[fromIndex][1]);
      backFace.innerHTML = pageHTML(spreads[toIndex][0]);
      // the static right page is what's left showing once the leaf has
      // rotated away from it mid-flip — update it now, while it's still
      // fully hidden behind the leaf's front face, so there's nothing
      // stale to reveal partway through the animation
      pageRight.innerHTML = pageHTML(spreads[toIndex][1]);
    } else {
      // front face = the current left page, back face = the previous
      // spread's right page
      frontFace.innerHTML = pageHTML(spreads[fromIndex][0]);
      backFace.innerHTML = pageHTML(spreads[toIndex][1]);
      // same idea, mirrored: the static left page is what's exposed once
      // this leaf rotates away from it
      pageLeft.innerHTML = pageHTML(spreads[toIndex][0]);
    }

    leaf.classList.add("active");
    void leaf.offsetWidth; // force reflow so the 0deg starting state paints first
    leaf.classList.add("flipped");

    setTimeout(() => {
      spreadIndex = toIndex;
      renderStatic(spreadIndex);
      resetLeaf(leaf);
      flipping = false;
    }, FLIP_MS);
  }

  function coverFaceHTML() {
    return `<span class="diary-cover-ribbon" aria-hidden="true"></span>`
      + `<span class="diary-cover-title">${escapeHtml(CONFIG.box3.title)}</span>`;
  }

  function closeDiary() {
    flipping = true;

    // fold the current right page shut over the left page, around the
    // spine — literally the same motion as every other "next" flip, just
    // landing on a proper book-cover face instead of another page
    leafFwdFront.innerHTML = pageHTML(spreads[spreadIndex][1]);
    leafFwdBack.innerHTML = coverFaceHTML();
    leafFwdBack.classList.add("is-cover-back");
    // the static right page (and the spine next to it) would otherwise
    // just sit there as an empty box once the leaf rotates away from it —
    // stay invisible-but-space-reserved (not collapsed) for now, since
    // collapsing them would shrink .diary-spread mid-flip and throw off
    // the leaf's own left:50% math while it's still animating
    pageRight.innerHTML = "";
    pageRight.style.visibility = "hidden";
    spine.style.visibility = "hidden";
    prevBtn.classList.add("is-disabled");
    nextBtn.classList.add("is-disabled");

    leafFwd.classList.add("active");
    void leafFwd.offsetWidth; // force reflow so the 0deg starting state paints first
    leafFwd.classList.add("flipped");

    setTimeout(() => {
      // the flip has finished — now it's safe to nudge the closed cover
      // over to true center, and hold there for a beat before it vanishes
      spread.classList.add("is-closed-centered");
      setTimeout(() => {
        book.classList.add("closing-fade");
        setTimeout(() => {
          gameEl.classList.add("hidden");
          revealEl.classList.remove("hidden");
          if (!completed) {
            completed = true;
            burstConfetti();
            if (onComplete) onComplete();
          }
        }, 450);
      }, 400);
    }, FLIP_MS);
  }

  cover.addEventListener("click", openDiary);
  nextBtn.addEventListener("click", () => flip("next"));
  prevBtn.addEventListener("click", () => flip("prev"));

  function reset() {
    opened = false;
    flipping = false;
    completed = false;
    spreadIndex = 0;
    cover.classList.remove("opening");
    cover.classList.remove("hidden");
    cover.style.transition = "none";
    cover.style.transform = "";
    cover.style.opacity = "";
    void cover.offsetWidth;
    cover.style.transition = "";
    book.classList.add("hidden");
    book.classList.remove("closing-fade");
    book.style.transition = "none";
    book.style.opacity = "";
    book.style.transform = "";
    void book.offsetWidth;
    book.style.transition = "";
    leafFwdBack.classList.remove("is-cover-back");
    leafFwdBack.innerHTML = "";
    pageRight.style.visibility = "";
    spine.style.visibility = "";
    spread.style.transition = "none";
    spread.classList.remove("is-closed-centered");
    void spread.offsetWidth;
    spread.style.transition = "";
    resetLeaf(leafFwd);
    resetLeaf(leafRev);
    prevBtn.classList.add("is-disabled");
    nextBtn.classList.remove("is-final", "is-disabled");
    nextBtn.innerHTML = "&#10095;";
    gameEl.classList.remove("hidden");
    revealEl.classList.add("hidden");
  }

  return { reset };
}
