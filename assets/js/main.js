/* Sytrix — site behaviour */
(function () {
  "use strict";
  document.documentElement.classList.replace("no-js", "js");

  // ---- Site config (edit these) ----
  var CONTACT_EMAIL = "hello@sytrix.ai";   // TODO: replace with the real inbox
  var FORM_ENDPOINT = "";                  // Optional: Formspree / Basin / own endpoint. Leave empty to fall back to mailto.

  // Year in footer
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Contact email link
  document.querySelectorAll("[data-contact-email]").forEach(function (a) {
    a.textContent = CONTACT_EMAIL;
    a.setAttribute("href", "mailto:" + CONTACT_EMAIL);
  });

  // Mobile nav
  var toggle = document.querySelector(".nav-toggle");
  var header = document.querySelector(".header");
  if (toggle && header) {
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    header.querySelectorAll(".nav a").forEach(function (a) {
      a.addEventListener("click", function () {
        header.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Language toggle placeholder (Arabic version planned)
  var lang = document.querySelector(".lang-toggle");
  if (lang) {
    lang.addEventListener("click", function () {
      lang.textContent = "عربي — قريباً";
      setTimeout(function () { lang.textContent = "EN · عربي"; }, 1800);
    });
  }

  // Reveal on scroll + animated bars
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var reveals = document.querySelectorAll(".reveal");
  var bars = document.querySelectorAll(".bar__fill");
  function fillBars() { bars.forEach(function (b) { b.style.width = b.getAttribute("data-width") + "%"; }); }

  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-visible");
        if (e.target.id === "bars") fillBars();
        io.unobserve(e.target);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
    var barsEl = document.getElementById("bars");
    if (barsEl) io.observe(barsEl);
    // Safety net: never leave content hidden if the observer misbehaves
    setTimeout(function () {
      reveals.forEach(function (el) { el.classList.add("is-visible"); });
      fillBars();
    }, 4000);
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
    fillBars();
  }

  // Contact form
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");
  if (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var data = new FormData(form);
      var required = ["name", "company", "email"];
      for (var i = 0; i < required.length; i++) {
        if (!String(data.get(required[i]) || "").trim()) {
          status.textContent = "Please fill in your name, company and work email.";
          form.querySelector("[name=" + required[i] + "]").focus();
          return;
        }
      }
      var email = String(data.get("email"));
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        status.textContent = "That email address doesn't look right.";
        return;
      }

      if (FORM_ENDPOINT) {
        status.textContent = "Sending…";
        fetch(FORM_ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } })
          .then(function (r) {
            if (!r.ok) throw new Error("bad status");
            status.textContent = "Thanks — we'll be in touch within one business day.";
            form.reset();
          })
          .catch(function () {
            status.textContent = "Something went wrong. Please email us directly at " + CONTACT_EMAIL + ".";
          });
        return;
      }

      // Fallback: open the visitor's email client with a pre-filled message
      var subject = "Sytrix inquiry — " + data.get("company");
      var body = [
        "Name: " + data.get("name"),
        "Company: " + data.get("company"),
        "Email: " + email,
        "Country: " + data.get("country"),
        "Interest: " + data.get("interest"),
        "",
        String(data.get("message") || "")
      ].join("\n");
      window.location.href = "mailto:" + CONTACT_EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      status.textContent = "Opening your email client… If nothing happens, write to " + CONTACT_EMAIL + ".";
    });
  }
})();
