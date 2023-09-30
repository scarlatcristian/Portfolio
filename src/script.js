"use strict";

const body = document.querySelector("body");
const particles = document.getElementById("cursor-overlay");

const btnStart = document.querySelector(".btn-start-animation");
const logoHome = document.querySelector(".logo-home");
const btnBorder = document.querySelector(".rotate-container");
const video = document.getElementById("video");
const videoLoop = document.getElementById("video-loop");

const text = document.querySelector(".text-about");
const title = document.querySelectorAll(".title");
const btnFadeText = document.querySelector(".btn__text-about");

const cards = document.querySelectorAll(".card");
const btnAboutMe = document.querySelector(".btn-about_me");
const btnTechnologies = document.querySelector(".btn-technologies");
const btnProjects = document.querySelector(".btn-projects");
const btnReusableComponents = document.querySelector(
  ".btn-reusable_components"
);
const btnContact = document.querySelector(".btn-contact");

const infoTechnologies = document.querySelector(".info-technologies");
const infoAboutMe = document.querySelector(".info-about_me");
const infoProjects = document.querySelector(".info-projects");
const infoReusableComponents = document.querySelector(
  ".info-reusable_components"
);
const infoContactAndResume = document.querySelector(".info-contact_resume");

// Hide logo when scrolling down, show when scrolling up
const hideLogo = () => {
  let lastScrollTop = 0;
  document.addEventListener(
    "scroll",
    function () {
      logoHome.style.transition = "0.5s";
      // or window.addEventListener("scroll"....
      let st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
      if (st > lastScrollTop) {
        // down-scroll code
        logoHome.classList.remove("fade-in");
      } else if (st < lastScrollTop) {
        // up-scroll code
        logoHome.classList.add("fade-in");
      }
      lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    },
    false
  );
};

let timer = 350;

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Animate the title in about page
const addClassInterval = () => {
  title.forEach((titleSpan) => {
    let counter = 0;
    let intervalId = setInterval(() => {
      if (counter >= title.length) {
        clearInterval(intervalId);
        return;
      }
      titleSpan.style.transition = "all 0.5s ease";
      titleSpan.classList.add("color-change");
      counter++;
    }, timer);
    timer += 350;
  });
};

// After first btn click
btnStart.addEventListener("click", () => {
  setTimeout(() => {
    particles.style.opacity = 1;
  }, 600);

  video.style.visibility = "visible";
  video.play();

  if (isMobile) {
    video.setAttribute("autoplay", "autoplay");
    video.setAttribute("playsinline", "playsinline");
    video.setAttribute("muted", "muted");

    videoLoop.setAttribute("autoplay", "autoplay");
    videoLoop.setAttribute("playsinline", "playsinline");
    videoLoop.setAttribute("muted", "muted");

    video.style.visibility = "visible";
    video.play();

    setTimeout(() => {
      document.querySelector(".bg-video-loop").style.visibility = "visible";
      videoLoop.style.visibility = "visible";
      videoLoop.play();
      document.querySelector(".bg-video-loop").style.opacity = "0.6";
    }, 1890);
  } else {
    video.style.visibility = "visible";
    video.play();

    setTimeout(() => {
      document.querySelector(".bg-video-loop").style.visibility = "visible";
      videoLoop.play();
      document.querySelector(".bg-video-loop").style.opacity = "0.6";
    }, 1300);
  }

  btnStart.classList.add("scale-down");
  btnBorder.classList.add("scale-down");

  setTimeout(() => {
    btnBorder.style.border = "none";
    btnStart.remove();
    btnBorder.remove();
  }, 700);

  setTimeout(() => {
    text.style.transition = "all 1s ease";
    text.classList.remove("text-invisible");

    addClassInterval();
  }, 700);
});

// After text arrow-right btn click
const hideBtn = () => {
  // Calls function that hides logo on scroll
  hideLogo();

  // shows cards
  cards.forEach((card) => {
    card.classList.add("fade-out");
  });

  body.style.overflow = "hidden";
};

const ShowBtn = () => {
  cards.forEach((card, idx) => {
    setTimeout(() => {
      card.classList.remove("fade-out");
    }, idx * 100);
  });
};

btnFadeText.addEventListener("click", () => {
  text.classList.add("text-fade-out");
  ShowBtn();

  // Show Home btn
  logoHome.classList.add("fade-in");

  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.transitionDelay = "0.2s";
      card.style.transition = "all 1s ease";
      card.classList.remove("card-invisible");
    }, 100 * index);
  });
});

const addClassActive = (screen) => {
  hideBtn();
  screen.style.transition = "all 1s ease";
  screen.classList.add("active");
};

// TECHNOLOGIES
btnTechnologies.addEventListener("click", () => {
  addClassActive(infoTechnologies);
});

// ABOUT ME
btnAboutMe.addEventListener("click", () => {
  addClassActive(infoAboutMe);
});

// PROJECTS
btnProjects.addEventListener("click", () => {
  addClassActive(infoProjects);
});

// Reusable Components
btnReusableComponents.addEventListener("click", () => {
  addClassActive(infoReusableComponents);
});

// Contact & Resume
btnContact.addEventListener("click", () => {
  addClassActive(infoContactAndResume);
});

document.querySelectorAll(".btn-arrow-left").forEach((btn) => {
  btn.addEventListener("click", () => {
    cards.forEach((card, idx) => {
      setTimeout(() => {
        card.classList.remove("fade-out");
      }, 100 * idx);
    });

    body.style.overflow = "hidden";

    infoTechnologies.classList.remove("active");
    infoAboutMe.classList.remove("active");
    infoProjects.classList.remove("active");
    infoReusableComponents.classList.remove("active");
    infoContactAndResume.classList.remove("active");

    if (!logoHome.classList.contains("fade-in")) {
      logoHome.classList.add("fade-in");
    }
  });
});

// Going back to explore page when pressing the logo
logoHome.addEventListener("click", () => {
  logoHome.classList.remove("fade-in");

  if (text.classList.contains("text-fade-out")) {
    text.classList.remove("text-fade-out");

    body.style.overflow = "hidden";

    hideBtn();

    if (infoTechnologies.classList.contains("active")) {
      infoTechnologies.classList.remove("active");
    }

    if (infoAboutMe.classList.contains("active")) {
      infoAboutMe.classList.remove("active");
    }

    if (infoProjects.classList.contains("active")) {
      infoProjects.classList.remove("active");
    }

    if (infoContactAndResume.classList.contains("active")) {
      infoContactAndResume.classList.remove("active");
    }

    if (infoReusableComponents.classList.contains("active")) {
      infoReusableComponents.classList.remove("active");
    }
  }
});

// Particles cursor
document.addEventListener("DOMContentLoaded", function () {
  const particleContainer = document.getElementById("cursor-overlay");

  // Generate a random number within a range
  const getRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  // Create a new particle element with random velocities and append it to the container
  const createParticle = (x, y) => {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.setProperty("--x", getRandomNumber(-50, 50) + "px");
    particle.style.setProperty("--y", getRandomNumber(-50, 50) + "px");
    particle.style.left = x + "px";
    particle.style.top = y + "px";
    particleContainer.appendChild(particle);
    setTimeout(() => {
      particle.remove();
    }, 800);
  };

  // Create particles at the cursor position
  document.addEventListener("mousemove", function (e) {
    const x = e.clientX;
    const y = e.clientY;
    createParticle(x, y);
  });
});
