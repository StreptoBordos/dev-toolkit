// Minimal assertion and test registration utilities (pure JS)
(function (global) {
  const tests = [];

  function registerTest(name, fn) {
    tests.push({ name, fn });
  }

  function makeError(message) {
    const e = new Error(message);
    return e;
  }

  const assert = {
    ok(condition, msg) {
      if (!condition) throw makeError(msg || 'Assertion failed: expected truthy');
    },
    equal(a, b, msg) {
      if (a !== b) throw makeError(msg || `Assertion failed: ${a} !== ${b}`);
    },
    approxEqual(a, b, tol = 1e-6, msg) {
      if (Math.abs(a - b) > tol) throw makeError(msg || `Assertion failed: ${a} ≉ ${b}`);
    },
    throws(fn, msg) {
      let threw = false;
      try { fn(); } catch (e) { threw = true; }
      if (!threw) throw makeError(msg || 'Expected function to throw');
    }
  };

  // Expose
  global.registerTest = registerTest;
  global.assert = assert;
  global.__TESTS__ = tests;
})(window);
