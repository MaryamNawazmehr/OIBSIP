// Temperature Converter – by Maryam Batool
// Vanilla JavaScript: validation, conversion, and UI animations.

(function () {
  "use strict";

  var ABSOLUTE_ZERO = { C: -273.15, F: -459.67, K: 0 };
  var UNIT_SYMBOL = { C: "°C", F: "°F", K: " K" };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var form = document.getElementById("converter-form");
  var input = document.getElementById("temp-input");
  var inputWrap = document.getElementById("input-wrap");
  var errorMsg = document.getElementById("error-msg");
  var results = document.getElementById("results");
  var notice = document.getElementById("notice");
  var thermoFill = document.getElementById("thermo-fill");
  var convertBtn = document.getElementById("convert-btn");
  var themeToggle = document.getElementById("theme-toggle");
  var unitRadios = document.querySelectorAll('input[name="unit"]');

  var lastShown = { C: 0, F: 0, K: 0 }; // for count-up animation

  // ---------- Theme (light / dark) ----------
  var savedTheme = null;
  try { savedTheme = localStorage.getItem("theme"); } catch (e) {}
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(savedTheme || (prefersDark ? "dark" : "light"));

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("theme", theme); } catch (e) {}
  }
  themeToggle.addEventListener("click", function () {
    var now = document.documentElement.getAttribute("data-theme");
    setTheme(now === "dark" ? "light" : "dark");
  });

  // ---------- Helpers ----------
  function getUnit() {
    return document.querySelector('input[name="unit"]:checked').value;
  }

  // Accepts: 25, -3.5, +10, .5, 1e3. Rejects: abc, 12abc, 1,5, --4, empty.
  function isNumeric(text) {
    return /^[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/i.test(text);
  }

  function toCelsius(v, unit) {
    if (unit === "C") return v;
    if (unit === "F") return (v - 32) * 5 / 9;
    return v - 273.15;
  }
  function fromCelsius(c, unit) {
    if (unit === "C") return c;
    if (unit === "F") return c * 9 / 5 + 32;
    return c + 273.15;
  }

  function format(n) {
    var r = Math.round(n * 100) / 100;
    if (Object.is(r, -0)) r = 0;
    return r.toLocaleString("en-US", { maximumFractionDigits: 2 });
  }

  function validate() {
    var text = input.value.trim();
    var unit = getUnit();

    if (text === "") return { ok: false, message: "Please enter a temperature value." };
    if (!isNumeric(text)) {
      return { ok: false, message: "“" + text + "” is not a number. Use digits only, for example 25 or -4.5." };
    }
    var value = parseFloat(text);
    if (!isFinite(value)) return { ok: false, message: "That number is too large. Try a smaller value." };
    if (value < ABSOLUTE_ZERO[unit]) {
      return {
        ok: false,
        message: "Below absolute zero. Nothing can be colder than " + ABSOLUTE_ZERO[unit] + UNIT_SYMBOL[unit] + " (0 K)."
      };
    }
    return { ok: true, value: value };
  }

  function showError(message, shake) {
    errorMsg.textContent = message;
    input.classList.add("invalid");
    input.setAttribute("aria-invalid", "true");
    if (shake && !reduceMotion) {
      inputWrap.classList.remove("shake");
      void inputWrap.offsetWidth; // restart animation
      inputWrap.classList.add("shake");
    }
  }
  function clearError() {
    errorMsg.textContent = "";
    input.classList.remove("invalid");
    input.setAttribute("aria-invalid", "false");
  }

  // Accent colour: 205 (cold blue) -> 15 (hot orange) between -50 and 50 °C.
  function updateTheme(celsius) {
    var c = Math.max(-50, Math.min(50, celsius));
    var hue = 205 - ((c + 50) / 100) * 190;
    document.documentElement.style.setProperty("--hue", Math.round(hue));
  }

  function updateThermometer(celsius) {
    var pct = ((celsius + 50) / 100) * 100;
    thermoFill.style.height = Math.max(4, Math.min(100, pct)) + "%";
  }

  // Animate a number from its previous value to the new one.
  function countUp(el, from, to, unit) {
    if (reduceMotion) { el.textContent = format(to) + UNIT_SYMBOL[unit]; return; }
    var start = null, duration = 700;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = format(from + (to - from) * eased) + UNIT_SYMBOL[unit];
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // ---------- Real-time validation ----------
  function liveValidate() {
    if (input.value.trim() === "") { clearError(); return; }
    var check = validate();
    if (check.ok) clearError(); else showError(check.message, false);
  }

  input.addEventListener("input", liveValidate);
  unitRadios.forEach(function (radio) {
    radio.addEventListener("change", function () {
      liveValidate();
      if (!results.hidden && validate().ok) convert();
    });
  });

  // ---------- Convert ----------
  function convert() {
    var check = validate();

    if (!check.ok) {
      showError(check.message, true);
      results.hidden = true;
      notice.hidden = true;
      input.focus();
      return;
    }

    clearError();
    var unit = getUnit();
    var celsius = toCelsius(check.value, unit);

    results.hidden = false;
    ["C", "F", "K"].forEach(function (u) {
      var out = document.getElementById("out-" + u);
      var row = out.parentElement;
      var target = fromCelsius(celsius, u);

      countUp(out, lastShown[u], target, u);
      lastShown[u] = target;

      row.classList.toggle("source", u === unit);
      row.classList.remove("pop");
      void row.offsetWidth;
      row.classList.add("pop");
    });

    if (check.value === ABSOLUTE_ZERO[unit]) {
      notice.textContent = "This is absolute zero, the coldest temperature possible.";
      notice.hidden = false;
    } else {
      notice.hidden = true;
    }

    updateTheme(celsius);
    updateThermometer(celsius);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    convert();
  });

  // ---------- Button ripple ----------
  convertBtn.addEventListener("click", function (e) {
    if (reduceMotion) return;
    var rect = convertBtn.getBoundingClientRect();
    var size = Math.max(rect.width, rect.height);
    var dot = document.createElement("span");
    dot.className = "ripple";
    dot.style.width = dot.style.height = size + "px";
    dot.style.left = (e.clientX - rect.left - size / 2) + "px";
    dot.style.top = (e.clientY - rect.top - size / 2) + "px";
    convertBtn.appendChild(dot);
    dot.addEventListener("animationend", function () { dot.remove(); });
  });
})();
