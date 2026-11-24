T-M Hospital and Kidney Dialysis Center - Website Package
==========================================================

FILES
  index.html          All pages (Home, About Us, Specialities, Health Check,
                      Online Report, Patient Stories, Career) in one file.
                      Pages switch with the menu (#home, #about, ...).
  css/style.css       All styles (colors, 3D effects, layout).
  js/script.js        All scripts (menu, page switching, slider, 3D effects,
                      Online Report accounts system, print / PDF / CSV).
  assets/images/      All logos, photos and icons.

HOW TO USE
  1. Unzip the folder and keep the structure as it is.
  2. Double-click index.html to open it in a browser.
  3. To put it online, upload the whole folder to any web hosting
     (the index.html file must stay in the top folder).

NOTES
  - Google Fonts (Fraunces, Work Sans) and the PDF tool (jsPDF) load from
    the internet. Without internet the site still works with standard
    fonts, but "Download PDF" needs internet. "Print A4" works offline.
  - Online Report data is saved only in the browser on the computer where
    it was typed (localStorage). It is not shared between computers and
    there is no login. For real patient and finance records, a login and a
    database on a server are needed.
  - The Health Check and Career forms do not send anything yet; they only
    show a message. They need a form service or server to work.
  - Theme colors: #bbdb44, #000000, #11823b, #004d25 (see the top of
    css/style.css).
