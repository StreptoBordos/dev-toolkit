// json-formatter tests
registerTest('json-formatter: format & processInput', async function () {
  // Create DOM nodes the script expects
  document.body.insertAdjacentHTML('beforeend', `
    <textarea id="json-input"></textarea>
    <pre id="pretty"></pre>
    <pre id="raw"></pre>
    <div id="tree"></div>
    <div id="status"></div>
    <button id="formatBtn"></button>
    <button id="minifyBtn"></button>
    <button id="copyFormattedBtn"></button>
    <button id="copyInputBtn"></button>
    <button id="clearBtn"></button>
    <button id="sampleBtn"></button>
    <button id="downloadBtn"></button>
    <div id="pane-pretty"></div>
    <div id="pane-tree"></div>
    <div id="pane-raw"></div>
    <div class="tab" data-tab="pretty"></div>
    <div class="tab" data-tab="tree"></div>
    <div class="tab" data-tab="raw"></div>
  `);

  await new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = '../tools/json-formatter/script.js';
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });

  const input = document.getElementById('json-input');
  input.value = '{"a":1,"b":2}';

  // call the global doFormat function (defined in script)
  if (typeof window.doFormat === 'function') {
    window.doFormat();
  } else {
    // the script exposes doFormat as a top-level function, but if not, invoke formatBtn
    const btn = document.getElementById('formatBtn');
    btn.click();
  }

  // allow debounce/processing
  await new Promise(r => setTimeout(r, 50));

  // After formatting, input should be pretty-printed
  assert.ok(input.value.indexOf('\n') !== -1, 'expected pretty printed JSON');
  assert.ok(document.getElementById('pretty').textContent.indexOf('"a": 1') !== -1, 'pretty contains a');

  // cleanup: remove nodes
  document.getElementById('json-input').remove();
  document.getElementById('pretty').remove();
  document.getElementById('raw').remove();
  document.getElementById('tree').remove();
  document.getElementById('status').remove();
});
