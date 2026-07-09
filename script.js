const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");

if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
  });

  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      primaryNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "메뉴 열기");
    });
  });
}

document.querySelectorAll(".faq-item button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const willOpen = !item.classList.contains("is-open");

    item.classList.toggle("is-open", willOpen);
    button.setAttribute("aria-expanded", String(willOpen));
  });
});

function scrollToTarget(selector) {
  const target = document.querySelector(selector);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    return true;
  }
  return false;
}

document.querySelectorAll(".js-scroll-contact").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    if (!scrollToTarget("#contact")) {
      window.location.href = "customer-center.html#contact";
    }
  });
});

document.querySelectorAll(".js-scroll-process").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    if (!scrollToTarget("#process")) {
      window.location.href = "process.html";
    }
  });
});

document.querySelectorAll(".js-phone").forEach((button) => {
  button.addEventListener("click", () => {
    window.location.href = "tel:1533-1683";
  });
});

document.querySelectorAll(".js-blog").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    window.open("https://blog.naver.com/serveon0818", "_blank", "noopener,noreferrer");
  });
});

document.querySelectorAll(".js-youtube").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    window.open("https://www.youtube.com/watch?v=WaXcaMwFUyI", "_blank", "noopener,noreferrer");
  });
});
