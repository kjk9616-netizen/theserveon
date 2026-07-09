const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");

function trackEvent(eventName, params = {}) {
  if (!eventName) return;

  const eventParams = {
    page_path: window.location.pathname,
    page_title: document.title,
    ...params,
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...eventParams,
  });

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, eventParams);
  }
}

function inferEventName(element) {
  if (!element) return "";

  if (element.dataset && element.dataset.event) {
    return element.dataset.event;
  }

  const label = (element.textContent || "").trim();
  const href = element.getAttribute("href") || "";

  if (href.startsWith("tel:")) return "click_phone";
  if (label.includes("카카오")) return "click_kakao";
  if (label.includes("예상 이용료") || href.includes("pricing.html")) return "view_pricing";
  if (label.includes("가능 여부") || label.includes("상담")) return "click_hero_consult";

  return "";
}

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

    if (willOpen) {
      trackEvent("open_faq", { faq_question: button.textContent.trim() });
    }
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
    trackEvent("click_phone", { click_text: button.textContent.trim() });
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
    trackEvent("submit_consult_form");

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

document.addEventListener("click", (event) => {
  const clickable = event.target.closest("a, button");
  if (!clickable) return;
  if (clickable.tagName === "BUTTON" && !clickable.dataset.event) return;
  if (clickable.classList.contains("js-phone")) return;

  const eventName = inferEventName(clickable);
  if (eventName) {
    trackEvent(eventName, {
      click_text: (clickable.textContent || "").trim().slice(0, 80),
      click_url: clickable.getAttribute("href") || "",
    });
  }
});

function createMobileStickyCta() {
  if (document.querySelector(".mobile-sticky-cta")) return;

  const sticky = document.createElement("nav");
  sticky.className = "mobile-sticky-cta";
  sticky.setAttribute("aria-label", "빠른 상담");
  sticky.innerHTML = `
    <a href="tel:1533-1683" data-event="click_phone">전화 상담</a>
    <a href="customer-center.html#contact" data-event="click_kakao">카카오톡 문의</a>
    <a href="customer-center.html#contact" data-event="click_situation_cta">가능 여부 확인</a>
  `;
  document.body.appendChild(sticky);
}

createMobileStickyCta();

const pricingSection = document.querySelector(".pricing-main-section, #pricing-faq");
if (pricingSection && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        trackEvent("view_pricing");
        observer.disconnect();
      }
    },
    { threshold: 0.35 }
  );

  observer.observe(pricingSection);
}
