<<<<<<< HEAD
# Personal Portfolio – Maryam Batool

A modern, animated 3D personal portfolio . Built with HTML5, CSS3 and a little vanilla JavaScript (no libraries).

## Features

- Hero section with name, role title and avatar placeholder
- About Me section
- Skills grid with progress bars
- Three placeholder project cards with GitHub link placeholders
- Contact section with email, GitHub and LinkedIn icons
- Smooth-scroll navigation (CSS `scroll-behavior`)
- Consistent branding: one font family (Bricolage Grotesque) and a navy and cobalt colour scheme
- Animated 3D hero: rotating rings, floating skill chips and mouse parallax
- 3D tilt effect on cards, scroll-reveal animations, typing effect and scroll progress bar
- Fully responsive, with automatic light and dark modes; animations are disabled for users who prefer reduced motion

## Project structure

```
portfolio/
├── index.html   # page structure and content
├── style.css    # all styling and animations (colour tokens are defined in :root)
├── script.js    # menu, scroll reveal, 3D tilt, typing effect
└── README.md
```

## How to run

Open `index.html` in any modern browser. No build step or dependencies are needed. An internet connection is only used to load the Google Font; a fallback font is used offline.

## How to customise

1. In `index.html`, replace the placeholder email address, and the GitHub and LinkedIn URLs.
2. Edit the About text, the skills list and the three project cards.
3. To use a real photo, replace `MB` inside `<div class="avatar">` with `<img src="photo.jpg" alt="Maryam Batool">` and add `overflow:hidden` plus `img{width:100%;height:100%;object-fit:cover}` for `.avatar` in `style.css`.
4. To change colours, edit the variables at the top of `style.css`.

## Deploying

Upload the folder to GitHub and enable GitHub Pages (Settings, then Pages, then deploy from the main branch).
=======
# Temperature Converter

**Created by Maryam Batool**

A small, dependency-free web tool that converts temperatures between **Celsius**, **Fahrenheit** and **Kelvin**, with real-time input validation.

Built with HTML5, CSS3 and vanilla JavaScript.

## Files

| File         | Purpose                                         |
|--------------|-------------------------------------------------|
| `index.html` | Page structure: input, unit selector, results   |
| `style.css`  | Layout, colours, responsive and focus styles    |
| `script.js`  | Validation and conversion logic                 |
| `README.md`  | This document                                   |

## How to run

1. Put all files in the same folder.
2. Open `index.html` in any modern browser. No build step or server is needed.

## How to use

1. Type a temperature in the input field.
2. Choose the unit you are converting **from** (°C, °F or K).
3. Click **Convert** (or press Enter).
4. The result area shows the value in all three units at once. The unit you entered is highlighted.

## Features checklist

- [x] Numeric input field, rejects non-numeric text with an error message (checked while typing)
- [x] Unit selector (radio buttons) for Celsius / Fahrenheit / Kelvin
- [x] All output units shown simultaneously
- [x] Convert button that triggers the calculation
- [x] Result area with correct unit labels (°C, °F, K)
- [x] Absolute zero handling, with a friendly message
- [x] Clean, centred, responsive layout with clear labels

## Validation rules

| Input                                   | Behaviour                                         |
|-----------------------------------------|---------------------------------------------------|
| Empty                                   | "Please enter a temperature value."               |
| Not a number (`abc`, `12abc`, `1,5`)    | Error naming the invalid text                     |
| Below absolute zero                     | "Below absolute zero…" message, no result shown   |
| Exactly absolute zero                   | Converts, with a note that it is the coldest possible |

Absolute zero limits per unit: **−273.15 °C**, **−459.67 °F**, **0 K**.
Accepted formats include `25`, `-3.5`, `+10`, `.5` and scientific notation such as `1e3`.

## Formulas

- Celsius → Fahrenheit: `F = C × 9/5 + 32`
- Fahrenheit → Celsius: `C = (F − 32) × 5/9`
- Celsius → Kelvin: `K = C + 273.15`
- Kelvin → Celsius: `C = K − 273.15`

Every input is first converted to Celsius, then to the other units. Results are rounded to 2 decimal places.

## Modern UI and animations

- Glassmorphism card over softly drifting gradient background blobs
- Light / dark mode toggle (remembers your choice, follows your system by default)
- Card entrance animation, staggered result rows, and count-up numbers
- Animated thermometer that fills according to the temperature
- Input shake on errors and a ripple effect on the Convert button
- All motion is switched off for users who prefer reduced motion

## Extras

- The accent colour shifts from cool blue to warm orange depending on the temperature converted.
- Keyboard accessible, with visible focus styles and screen-reader friendly error messages.
- Respects the "reduce motion" system setting.

## Quick test cases

| Input   | Unit | Expected output                      |
|---------|------|--------------------------------------|
| 0       | °C   | 32 °F, 273.15 K                      |
| 100     | °C   | 212 °F, 373.15 K                     |
| 98.6    | °F   | 37 °C, 310.15 K                      |
| 0       | K    | −273.15 °C, −459.67 °F               |
| −300    | °C   | Error: below absolute zero           |
| abc     | any  | Error: not a number                  |
>>>>>>> dab797e4ee4184cce411b9099f357ffe01bbde09
