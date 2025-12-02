// Temperature converter tests
registerTest('temperature-converter: conversions & clear', async function () {
  // Prepare DOM elements expected by the script
  document.body.insertAdjacentHTML('beforeend', `
    <input id="celsius" />
    <input id="fahrenheit" />
    <input id="kelvin" />
  `);

  // Load the script dynamically
  await new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = '../tools/temperature-converter/script.js';
    s.onload = () => {
      // The script attaches listeners on DOMContentLoaded; emulate it
      document.dispatchEvent(new Event('DOMContentLoaded'));
      resolve();
    };
    s.onerror = reject;
    document.head.appendChild(s);
  });

  const c = document.getElementById('celsius');
  const f = document.getElementById('fahrenheit');
  const k = document.getElementById('kelvin');

  // Test Celsius -> Fahrenheit/Kelvin
  c.value = '100';
  c.dispatchEvent(new Event('input', { bubbles: true }));
  // After event loop
  await new Promise(r => setTimeout(r, 20));
  assert.equal(f.value, '212');
  assert.equal(k.value, '373.15');

  // Test Fahrenheit -> Celsius/Kelvin
  f.value = '32';
  f.dispatchEvent(new Event('input', { bubbles: true }));
  await new Promise(r => setTimeout(r, 20));
  assert.equal(c.value, '0');
  assert.equal(k.value, '273.15');

  // Test Kelvin -> Celsius/Fahrenheit
  k.value = '310.15';
  k.dispatchEvent(new Event('input', { bubbles: true }));
  await new Promise(r => setTimeout(r, 20));
  // rounding to 2 decimals
  // Celsius expected 37 -> script uses rounding
  assert.equal(c.value, '37');
  // Fahrenheit expected approx 98.6
  assert.approxEqual(parseFloat(f.value), 98.6, 0.01);

  // Test clearAll
  if (typeof window.clearAll !== 'function') throw new Error('clearAll not defined');
  window.clearAll();
  assert.equal(c.value, '');
  assert.equal(f.value, '');
  assert.equal(k.value, '');

  // Clean up elements
  c.remove(); f.remove(); k.remove();
});
