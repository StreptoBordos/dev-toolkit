# Pure-JS Tests (No external libraries)

This folder contains a tiny pure-JavaScript test harness you can run in a browser — no Node/Jest required.

How to run

1. Open the file `tests/index.html` in your browser (double-click or use your webserver).
2. The page will run the tests and show pass/fail results.

Notes

- Tests are implemented without external test frameworks. They dynamically load the target scripts from the `tools/` folder and create the DOM nodes those scripts expect.
- Some scripts attach listeners on `DOMContentLoaded`. The test harness dispatches a synthetic `DOMContentLoaded` after loading such scripts so they initialize during tests.
- For coverage: open DevTools in your browser (Sources / Coverage tab in Chrome) and reload `tests/index.html`; you'll see which lines were executed by the tests.

Extending

- Add new test files next to existing `*.test.js` and load them from `index.html`.
- Use `registerTest('name', async function () { ... })` and the global `assert` helper.
