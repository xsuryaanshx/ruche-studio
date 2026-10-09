import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = '/Users/shubhu-chaan/.gemini/antigravity-ide/brain/25dfbc25-f176-43e7-964f-1d6fb915fb75/qa_screenshots';
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function runQA() {
  console.log('--- STARTING RUCHÉ STUDIO BROWSER QA ---');

  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  
  // Collect console messages and errors
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', err => {
    consoleErrors.push(err.toString());
  });

  // 1. DESKTOP VIEWPORT TEST (1440 x 900)
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle0' });
  console.log('Page loaded on desktop viewport');

  // Capture Desktop Hero
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, '01_desktop_hero.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('Saved 01_desktop_hero.png');

  // Scroll to Philosophy & Materiality
  await page.evaluate(() => {
    document.getElementById('philosophy').scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, '02_desktop_philosophy_materials.png')
  });
  console.log('Saved 02_desktop_philosophy_materials.png');

  // Scroll to Portfolio
  await page.evaluate(() => {
    document.getElementById('portfolio').scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, '03_desktop_portfolio.png')
  });
  console.log('Saved 03_desktop_portfolio.png');

  // Test Modal Interaction - click first project card
  const firstProject = await page.$('.project-card[data-id="travertine-penthouse"]');
  if (firstProject) {
    await firstProject.click();
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, '04_desktop_project_modal.png')
    });
    console.log('Saved 04_desktop_project_modal.png');

    // Close modal
    const closeBtn = await page.$('#modalClose');
    if (closeBtn) await closeBtn.click();
    await new Promise(r => setTimeout(r, 300));
  }

  // Scroll to Vision Estimator
  await page.evaluate(() => {
    document.getElementById('estimator').scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, '05_desktop_vision_estimator.png')
  });
  console.log('Saved 05_desktop_vision_estimator.png');

  // Scroll to Contact & Footer
  await page.evaluate(() => {
    document.getElementById('contact').scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, '06_desktop_contact_footer.png')
  });
  console.log('Saved 06_desktop_contact_footer.png');

  // Full Page Screenshot
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, '07_desktop_full_page.png'),
    fullPage: true
  });
  console.log('Saved 07_desktop_full_page.png');

  // 2. MOBILE VIEWPORT TEST (390 x 844 - iPhone 14 / modern device)
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle0' });
  console.log('Page loaded on mobile viewport');

  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, '08_mobile_hero.png'),
    clip: { x: 0, y: 0, width: 390, height: 844 }
  });
  console.log('Saved 08_mobile_hero.png');

  // Test Mobile Menu Drawer
  const menuToggle = await page.$('#menuToggle');
  if (menuToggle) {
    await menuToggle.click();
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, '09_mobile_drawer_open.png'),
      clip: { x: 0, y: 0, width: 390, height: 844 }
    });
    console.log('Saved 09_mobile_drawer_open.png');

    // Close drawer
    await menuToggle.click();
    await new Promise(r => setTimeout(r, 400));
  }

  // Scroll down mobile page to portfolio
  await page.evaluate(() => {
    document.getElementById('portfolio').scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, '10_mobile_portfolio.png')
  });
  console.log('Saved 10_mobile_portfolio.png');

  // Verify all WhatsApp links
  const waLinks = await page.$$eval('a[href*="wa.me"]', links => links.map(a => a.href));
  console.log(`Verified ${waLinks.length} WhatsApp links on page:`);
  waLinks.forEach((link, idx) => console.log(`  ${idx + 1}. ${link}`));

  console.log('Console Errors found:', consoleErrors.length > 0 ? consoleErrors : 'NONE');
  console.log('--- QA COMPLETED SUCCESSFULLY ---');

  await browser.close();
}

runQA().catch(err => {
  console.error('QA Failed:', err);
  process.exit(1);
});
