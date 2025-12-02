// base64 encoder tests
registerTest('base64-encoder: encode/decode basic behavior', async function () {
  // Create minimal DOM the script expects
  document.body.insertAdjacentHTML('beforeend', `
    <textarea id="input-text"></textarea>
    <textarea id="output-text"></textarea>
    <button id="encode-mode"></button>
    <button id="decode-mode"></button>
    <button id="convert-btn"><span id="convert-btn-text"></span></button>
    <button id="swap-btn"></button>
    <button id="clear-all"></button>
    <button id="clear-input"></button>
    <button id="paste-btn"></button>
    <button id="copy-btn"></button>
    <label id="input-label"></label>
    <label id="output-label"></label>
    <div id="error-message"><span id="error-text"></span></div>
    <span id="input-length">0</span>
    <span id="output-length">0</span>
    <span id="size-change">0%</span>
    <span id="current-mode"></span>
  `);

  await new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = '../tools/base64-encoder/script.js';
    s.onload = () => {
      // dispatch DOMContentLoaded to ensure script initializes
      document.dispatchEvent(new Event('DOMContentLoaded'));
      resolve();
    };
    s.onerror = reject;
    document.head.appendChild(s);
  });

  const inEl = document.getElementById('input-text');
  const outEl = document.getElementById('output-text');
  const convertBtn = document.getElementById('convert-btn');

  inEl.value = 'hello';
  // Simulate clicking convert
  convertBtn.click();
  await new Promise(r => setTimeout(r, 200));

  // Basic check: output should be non-empty and contain known substring
  assert.ok(outEl.value.length > 0, 'expected encoded output');
  assert.ok(outEl.value.indexOf('aGVsbG8') !== -1, 'encoded hello should contain aGVsbG8');

  // Switch to decode mode and decode back
  document.getElementById('decode-mode').click();
  inEl.value = outEl.value;
  convertBtn.click();
  await new Promise(r => setTimeout(r, 200));
  assert.equal(outEl.value, 'hello');

  // cleanup
  document.getElementById('encode-mode').remove();
  document.getElementById('decode-mode').remove();
  inEl.remove(); outEl.remove(); convertBtn.remove();
});
