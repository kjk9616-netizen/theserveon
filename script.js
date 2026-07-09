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

const consultationForm = document.querySelector("#consultation-form");

if (consultationForm) {
  consultationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(consultationForm);
    const scope = data.getAll("scope").join(", ") || "미선택";
    const lines = [
      `성함: ${data.get("name") || ""}`,
      `연락처: ${data.get("phone") || ""}`,
      `병원명 및 진료과: ${data.get("hospital") || ""}`,
      `방문 예정 일시: ${data.get("visit-datetime") || ""}`,
      `출발지: ${data.get("departure") || ""}`,
      `귀가지: ${data.get("destination") || ""}`,
      `필요한 동행 범위: ${scope}`,
      `특이사항: ${data.get("notes") || ""}`,
    ];

    const subject = encodeURIComponent(`서브온 병원동행 상담 신청 - ${data.get("name") || ""}`);
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:help@theserveon.com?subject=${subject}&body=${body}`;
  });
}
