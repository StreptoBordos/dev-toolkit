// hex-to-rgb tests
registerTest('hex-to-rgb: conversion and UI update', async function () {
  // Prepare required DOM
  document.body.insertAdjacentHTML('beforeend', `
    <input id="hexInput" />
    <div id="output"></div>
    <div id="prev-box"></div>
    <div id="message"></div>
  `);

  await new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = '../tools/hex-to-rgb-converter/script.js';
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });

  // test utility function exists
  if (typeof window.hexToRgb !== 'function') throw new Error('hexToRgb not defined');

  assert.equal(window.hexToRgb('#f00'), 'rgb(255, 0, 0)');
  assert.equal(window.hexToRgb('00ff00'), 'rgb(0, 255, 0)');
  assert.equal(window.hexToRgb('#zzz'), 'Invalid Hex color');

  // test UI conversion invocation
  document.getElementById('hexInput').value = '#0000ff';
  if (typeof window.conversion === 'function') {
    window.conversion();
    assert.equal(document.getElementById('output').textContent.trim(), 'rgb(0, 0, 255)');
  }

  // cleanup
  document.getElementById('hexInput').remove();
  document.getElementById('output').remove();
  document.getElementById('prev-box').remove();
  document.getElementById('message').remove();
});
