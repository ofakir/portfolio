// Regenerates Othmane-Fakir-CV.pdf from cv/cv.html.
// Usage: node cv/build-cv.js   (needs Playwright: npm i -D playwright && npx playwright install chromium)
const path = require('path');
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file://' + path.join(__dirname, 'cv.html'));
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({
    path: path.join(__dirname, '..', 'Othmane-Fakir-CV.pdf'),
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
  });
  await browser.close();
  console.log('Wrote Othmane-Fakir-CV.pdf');
})();
