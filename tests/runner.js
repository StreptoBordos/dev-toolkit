// Simple runner: executes registered tests sequentially and shows results in DOM
(async function () {
  const resultsEl = document.getElementById('results');
  const summaryEl = document.getElementById('summary');
  const tests = window.__TESTS__ || [];

  function appendLine(html, klass) {
    const div = document.createElement('div');
    div.innerHTML = html;
    if (klass) div.classList.add('result', klass);
    resultsEl.appendChild(div);
  }

  let passed = 0, failed = 0;

  for (const t of tests) {
    appendLine(`<strong>${t.name}</strong> — running...`);
    try {
      // Allow test functions to return a promise
      await Promise.resolve().then(() => t.fn());
      passed++;
      appendLine(`<strong>${t.name}</strong> — PASS`, 'pass');
    } catch (err) {
      failed++;
      appendLine(`<strong>${t.name}</strong> — FAIL: ${err.message}`, 'fail');
      const pre = document.createElement('pre');
      pre.textContent = (err && err.stack) || String(err);
      resultsEl.appendChild(pre);
    }
  }

  summaryEl.textContent = `${passed} passed, ${failed} failed — ${tests.length} total`;
  if (failed === 0) summaryEl.style.borderColor = 'green';
  else summaryEl.style.borderColor = 'red';
})();
