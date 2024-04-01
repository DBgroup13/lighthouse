/**
 * @license
 * Copyright 2016 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import pwaDetailsExpectations from './pwa-expectations-details.js';

const jakeExpectations = {...pwaDetailsExpectations, hasShortName: false};

/** @type {LH.Config} */
const config = {
  extends: 'lighthouse:default',
  settings: {
    onlyCategories: ['pwa'],
  },
};

/**
 * @type {Smokehouse.ExpectedRunnerResult}
 * Expected Lighthouse results for svgomg.
 */
const expectations = {
  lhr: {
    runWarnings: [
      // In DevTools the IndexedDB storage from the initial load will persist into the Lighthouse run, emitting a warning.
      Object.assign(/IndexedDB/, {_runner: 'devtools'}),
      // DevTools can't simply test a redirect, because the browser will have already navigated before the Lighthouse panel can begin.
      Object.assign(/redirected/, {_excludeRunner: 'devtools'}),
    ],
    // Intentionally start out on http to test the redirect.
    requestedUrl: 'http://jakearchibald.github.io/svgomg/',
    finalDisplayedUrl: 'https://jakearchibald.github.io/svgomg/',
    audits: {
      'redirects-http': {
        _excludeRunner: 'devtools',
        score: 1,
      },
      'viewport': {
        score: 1,
      },
      'installable-manifest': {
        score: 1,
        details: {items: [], debugData: {manifestUrl: 'https://jakearchibald.github.io/svgomg/manifest.json'}},
      },
      'splash-screen': {
        score: 1,
        details: {items: [jakeExpectations]},
      },
      'themed-omnibox': {
        score: 1,
        details: {items: [jakeExpectations]},
      },
      'content-width': {
        score: 1,
      },

      // "manual" audits. Just verify in the results.
      'pwa-cross-browser': {
        score: null,
        scoreDisplayMode: 'manual',
      },
      'pwa-page-transitions': {
        score: null,
        scoreDisplayMode: 'manual',
      },
      'pwa-each-page-has-url': {
        score: null,
        scoreDisplayMode: 'manual',
      },
    },
  },
};

export default {
  id: 'pwa-svgomg',
  expectations,
  config,
};
