console.log(
  "%cDesign & Code by www.mislavrepinac.com",
  "color: white; background: black; font-size: 16px; padding: 12px; border-radius: 4px;"
);

let scroll;

// Prevent target not found console errors from GSAP
gsap.config({
  nullTargetWarn: false,
});

// Start Barba.js
window.onload = function () {
  initBarba();
};

function initBarba() {
  async function commonLeaveBeforeOffset(data) {
    const transitionScreen = document.querySelector(".transition-screen");
    const theme = data.next.namespace === "white" ? "white" : "black";
    transitionScreen.setAttribute("data-theme-transition", theme);
    pageTransitionIn(data.current);
  }

  async function commonLeaveAfterOffset(data) {
    scroll.destroy();
    killAllScrollTriggers();
    data.current.container.remove();
  }

  async function commonEnter(data) {
    initSplitText();
    pageTransitionOut(data.next.container);
  }

  async function commonBeforeEnter(data) {
    initResetWebflow(data);
    ScrollTrigger.getAll().forEach((t) => t.kill());
    initSmoothScroll(data.next.container);
  }

  async function commonAfterEnter(data) {
    window.scrollTo(0, 0);
    initScript();
    ScrollTrigger.refresh(true);
  }

  barba.init({
    sync: false,
    timeout: 7000,
    transitions: [
      {
        name: "to-white",
        to: { namespace: ["white"] },
        once(data) {
          initSplitText();
          initSmoothScroll(data.next.container);
          initResetWebflow(data);
          initScript();
          initPreloader();
        },
        async leave(data) {
          await commonLeaveBeforeOffset(data);
          await delay(750);
          await commonLeaveAfterOffset(data);
        },
        async enter(data) {
          await commonEnter(data);
        },
        async beforeEnter(data) {
          await commonBeforeEnter(data);
        },
        async afterEnter(data) {
          await commonAfterEnter(data);
        },
      },
      {
        name: "self",
        async leave(data) {
          await commonLeaveBeforeOffset(data);
          await delay(750);
          await commonLeaveAfterOffset(data);
        },
        async enter(data) {
          await commonEnter(data);
        },
        async beforeEnter(data) {
          await commonBeforeEnter(data);
        },
        async afterEnter(data) {
          await commonAfterEnter(data);
        },
      },
      {
        name: "default",
        once(data) {
          initSplitText();
          initSmoothScroll(data.next.container);
          initResetWebflow(data);
          initScript();
          initPreloader();
        },
        async leave(data) {
          await commonLeaveBeforeOffset(data);
          await delay(750);
          await commonLeaveAfterOffset(data);
        },
        async enter(data) {
          await commonEnter(data);
        },
        async beforeEnter(data) {
          await commonBeforeEnter(data);
        },
        async afterEnter(data) {
          await commonAfterEnter(data);
        },
      },
    ],
  });

  // Killing all the scrollTriggers from GSAP
  function killAllScrollTriggers() {
    if (typeof ScrollTrigger !== "undefined") {
      // Kill all ScrollTrigger instances
      ScrollTrigger.killAll();
    }
  }

  // Refreshing scrollTriggers and running lenis
  function initSmoothScroll(container) {
    initLenis();
    ScrollTrigger.refresh(true);
  }

  // Make sure that we can scroll to top
  history.scrollRestoration = "manual";
}

// Delay function, don't touch
function delay(n) {
  n = n || 2000;
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, n);
  });
}

function initPreloader() {
  const logo1 = document.querySelector('[data-loader="logo-1"]');
  const logo2 = document.querySelector('[data-loader="logo-2"]');
  const background = document.querySelector('[data-loader="loader"]');
  const mainLogo = document.querySelector('[data-loader="main-logo"]');
  const nav = document.querySelector('[data-loader="nav"]');

  const tl = gsap.timeline({
    defaults: {
      ease: "power4.inOut",
    },
  });

  gsap.set(logo1, { autoAlpha: 1 });
  gsap.set(logo2, { autoAlpha: 1 });

  tl.from(
    logo1,
    {
      yPercent: 101,
      duration: 1.2,
    },
    0
  )
    .from(
      logo2,
      {
        yPercent: 101,
        duration: 1.2,
      },
      0.1
    )
    .to(
      background,
      {
        autoAlpha: 0,
        duration: 1.2,
      },
      1.3
    )
    .from(
      nav,
      {
        autoAlpha: 0,
        duration: 0.85,
      },
      2
    )
    .from(
      mainLogo,
      {
        opacity: 0,
        duration: 0.85,
      },
      2
    );
  tl.call(
    function () {
      pageTransitionOut();
    },
    null,
    1.4
  );
}

function pageTransitionOut() {
  const heroHeadings = document.querySelectorAll('[data-hero="heading"]');
  const heroParagraphs = document.querySelectorAll('[data-hero="paragraph"]');
  const heroImage = document.querySelector('[data-loader="background"]');

  heroHeadings.forEach((heading) => {
    gsap.set(heading, { autoAlpha: 1 });
  });
  heroParagraphs.forEach((paragraph) => {
    gsap.set(paragraph, { autoAlpha: 1 });
  });

  const tl = gsap.timeline({
    defaults: {
      duration: 1.2,
      ease: "power4.inOut",
    },
  });

  heroHeadings.forEach((heading) => {
    tl.fromTo(
      heading.querySelectorAll(".single-word-inner"),
      {
        yPercent: 101,
      },
      {
        yPercent: 0,
        stagger: { each: 0.05 },
      },
      0
    );
  });

  heroParagraphs.forEach((paragraph) => {
    tl.fromTo(
      paragraph.querySelectorAll(".single-line-inner"),
      {
        yPercent: 101,
      },
      {
        yPercent: 0,
        stagger: { each: 0.05 },
      },
      0.2
    );
  });

  if (heroImage) {
    tl.from(
      heroImage,
      {
        scale: 1.1,
        opacity: 0,
        duration: 3,
        ease: "power1.out",
      },
      0
    );
  }

  tl.call(
    function () {
      scroll.start();
    },
    null,
    "+=0.2"
  );
}

function pageTransitionIn() {
  var tl = gsap.timeline();

  tl.set(
    ".transition-screen",
    {
      autoAlpha: 0,
    },
    0
  );

  tl.to(
    ".transition-screen",
    {
      autoAlpha: 1,
      ease: "power1.inOut",
      duration: 0.25,
    },
    0
  );

  tl.to(
    ".transition-screen",
    {
      autoAlpha: 0,
      ease: "power1.inOut",
      duration: 0.75,
    },
    0.8
  );
}

function initParallax() {
  gsap.utils.toArray('[data-gsap-parallax="image"]').forEach((element) => {
    gsap.fromTo(
      element,
      { yPercent: -35 },
      {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  });
}

function initResetWebflow(data) {
  const webflowPageId = document.documentElement.getAttribute("data-wf-page");
  document.documentElement.setAttribute("data-wf-page", webflowPageId);
  window.Webflow?.destroy();
  window.Webflow?.ready();
  window.Webflow?.require("ix2")?.init();
}

function initOdometer() {
  document.querySelectorAll(".odometer").forEach((el) => {
    // 1, grab a real numeric value
    const finalValue = parseInt(el.getAttribute("data-target"), 10) || 0;
    // 2, make a fresh Odometer instance on this element
    const od = new Odometer({
      el: el,
      format: "(,ddd)", // leave out if you don’t need commas
      theme: "default",
    });
    // 3, watch it enter the viewport
    const obs = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            od.update(finalValue);
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.1, // trigger when 10% visible, tweak as you like
      }
    );
    obs.observe(el);
  });
}

function initSwiper() {
  const workSlider = new Swiper('[data-swiper="work"]', {
    slidesPerView: "auto",
    spaceBetween: 32,
    speed: 750,
    navigation: {
      nextEl: '[data-swiper="work-next"]',
      prevEl: '[data-swiper="work-prev"]',
    },
    on: {
      slideChange() {
        const index = this.realIndex;
        // pick 2em on mobile (≤767px) or 2.65em otherwise
        const step = window.matchMedia("(max-width: 767px)").matches ? 2 : 3;
        const numberWrap = document.querySelector(".work-slider_number-track");
        numberWrap.style.transform = `translateY(-${index * step}em)`;
      },
    },
  });

  const logoSlider = new Swiper('[data-swiper="logo"]', {
    freeMode: true,
    loop: true,
    slidesPerView: "auto",
    centeredSlides: true,
    spaceBetween: 40,
    speed: 5000,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
  });
}

function initImageAnimation() {
  const images = gsap.utils.toArray('[data-work="image"]');
  if (!images.length) return;

  gsap.set(images, { autoAlpha: 1 });

  images.forEach((img) => {
    gsap.fromTo(
      img,
      {
        clipPath: "inset(0% 0% 100% 0%)",
        scale: 1.1,
      },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        scale: 1,
        duration: 1.3,
        ease: "power2.out",
        //immediateRender: false,
        scrollTrigger: {
          trigger: img,
          start: "30% bottom",
        },
      }
    );
  });
}

function initTextAnimation() {
  const wordEl = document.querySelectorAll("[data-gsap-word]");
  const lineEl = document.querySelectorAll("[data-gsap-line]");

  if (wordEl.length > 0) {
    document.querySelectorAll("[data-gsap-word]").forEach((el) => {
      let e = el.querySelectorAll(".single-word-inner");

      gsap.set(e, { yPercent: 101, autoAlpha: 1 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: el,
            start: "0% 100%",
          },
        })
        .fromTo(
          e,
          { yPercent: 101 },
          {
            yPercent: 0,
            ease: "power3.inOut",
            duration: 1.2,
            stagger: { each: 0.05 },
            clearProps: "all",
          }
        );
    });
  }

  if (lineEl.length > 0) {
    document.querySelectorAll("[data-gsap-line]").forEach((el) => {
      let e = el.querySelectorAll(".single-line-inner");

      gsap.set(e, { yPercent: 101 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: el,
            start: "0% 100%",
          },
        })
        .fromTo(
          e,
          { yPercent: 101 },
          {
            yPercent: 0,
            ease: "power3.inOut",
            duration: 1.2,
            stagger: { each: 0.05 },
            clearProps: "all",
          }
        );
    });
  }
}

function initButtonAnimation() {
  // Only init on desktop widths
  if (window.innerWidth < 1025) return;

  // Find each button with the animation attribute
  $("[data-button-animation]").each(function () {
    const $button = $(this);
    const $charInners = $button.find(".single-char-inner");

    // Create a paused timeline for the hover animation
    const hoverTimeline = gsap.timeline({
      paused: true,
      defaults: {
        ease: "power2.inOut",
        duration: 0.55,
        stagger: { each: 0.02 },
      },
    });

    // Animate characters up on hover
    hoverTimeline.fromTo($charInners, { y: "0em" }, { y: "-1.1em" });

    // Play on mouse enter, reverse on mouse leave
    $button.on("mouseenter", () => hoverTimeline.play());
    $button.on("mouseleave", () => hoverTimeline.reverse());
  });
}

/*
function initContactModal() {
  const modal = document.querySelector('[data-modal="modal"]');
  const closeButtons = document.querySelectorAll('[data-modal="close"]');
  const openButtons = document.querySelectorAll('[data-modal="open"]');
  const bg = document.querySelector('[data-modal="wrapper"]');

  const tl = gsap.timeline({ paused: true });

  tl.set(modal, {
    autoAlpha: 1,
    xPercent: 110,
  });

  tl.to(
    modal,
    {
      xPercent: 0,
      duration: 0.8,
      ease: "power1.inOut",
    },
    0
  );

  tl.fromTo(
    bg,
    {
      autoAlpha: 0,
    },
    {
      autoAlpha: 1,
      duration: 0.3,
      ease: "none",
    },
    0
  );

  let isOpen = false;

  openButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (!isOpen) {
        tl.play();
        isOpen = true;
        if (typeof scroll !== "undefined" && scroll.stop) scroll.stop();
      }
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (isOpen) {
        tl.reverse().then(() => {
          if (typeof scroll !== "undefined" && scroll.start) scroll.start();
        });
        isOpen = false;
      }
    });
  });
}
*/

function initSplitText() {
  // split by words
  $("[data-split-word]").each(function () {
    // create word wrappers
    new SplitText(this, {
      type: "words",
      wordsClass: "single-word",
    });
    // wrap each word’s contents in a div
    $(this)
      .find(".single-word")
      .each(function () {
        $(this).wrapInner('<div class="single-word-inner"></div>');
      });
  });

  // split by chars
  $("[data-split-char]").each(function () {
    // create char wrappers
    new SplitText(this, {
      type: "chars",
      charsClass: "single-char",
    });
    // wrap each char’s contents in a div
    $(this)
      .find(".single-char")
      .each(function () {
        $(this).wrapInner('<div class="single-char-inner"></div>');
      });
  });

  // split by lines
  $("[data-split-line]").each(function () {
    // create line wrappers
    new SplitText(this, {
      type: "lines",
      linesClass: "single-line",
    });
    // wrap each line’s contents in a div
    $(this)
      .find(".single-line")
      .each(function () {
        $(this).wrapInner('<div class="single-line-inner"></div>');
      });
  });
}

function initLenis() {
  scroll = new Lenis({
    lerp: 0.08,
    wheelMultiplier: 1.1,
  });

  scroll.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    scroll.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
}

function initCardStack() {
  const cards = document.querySelectorAll('[data-stack="card"]');
  // If no card  array on page, kill the function
  if (cards.length === 0) return;
  let isTicking = false;

  const updateCardStyles = () => {
    cards.forEach((card, index) => {
      const nextCard = cards[index + 1];
      if (!nextCard) return;

      const cardRect = card.getBoundingClientRect();
      const nextCardRect = nextCard.getBoundingClientRect();
      const overlap = Math.max(0, cardRect.bottom - nextCardRect.top);
      const progress = overlap / cardRect.height;

      card.style.transform = `scale(${1 - 0.15 * progress})`;
      card.style.filter = `blur(${10 * progress}px)`;
      card.style.opacity = 1 - progress;
    });

    isTicking = false;
  };

  window.addEventListener("scroll", () => {
    if (!isTicking) {
      requestAnimationFrame(updateCardStyles);
      isTicking = true;
    }
  });
}

function initCal() {
  const el = document.querySelector("#my-cal-inline-discovery");
  if (!el) return; // exit if calendar container is not on the page

  // prevent re-init if already mounted
  if (el.dataset.calMounted === "true") return;

  // load Cal script if not already loaded
  if (!window.Cal) {
    const s = document.createElement("script");
    s.src = "https://app.cal.com/embed/embed.js";
    s.async = true;
    s.onload = mountCal;
    document.head.appendChild(s);
  } else {
    mountCal();
  }

  function mountCal() {
    Cal("init", "discovery", { origin: "https://app.cal.com" });

    Cal.ns.discovery("inline", {
      elementOrSelector: "#my-cal-inline-discovery",
      config: { layout: "month_view", theme: "light" }, // always light
      calLink: "team/i-ii-concept/discovery",
    });

    Cal.ns.discovery("ui", {
      hideEventTypeDetails: false,
      layout: "month_view",
      theme: "light", // always light
    });

    el.dataset.calMounted = "true";
  }
}

function initScript() {
  initParallax();
  initTextAnimation();
  initImageAnimation();
  initButtonAnimation();
  initSwiper();
  initCardStack();
  initOdometer();
  initCal();
}
