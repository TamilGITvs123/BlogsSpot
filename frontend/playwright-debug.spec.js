const { test } = require('@playwright/test');

test('capture console and DOM', async ({ page }) => {
  page.on('console', msg => console.log('console:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('pageerror:', err.message));
  page.on('requestfailed', req => console.log('requestfailed:', req.url(), req.failure()?.errorText));
  await page.goto('http://127.0.0.1:4200', { waitUntil: 'networkidle' });
  const content = await page.content();
  console.log('content starts:', content.slice(0, 200));
  const appRootHtml = await page.locator('app-root').innerHTML();
  console.log('app-root innerHTML:', appRootHtml);
});
