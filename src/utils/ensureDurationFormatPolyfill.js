import {shouldPolyfill} from '@formatjs/intl-durationformat/should-polyfill.js';

/**
 * @returns {Promise<void>}
 */
export async function ensureDurationFormatPolyfill () {
  if (shouldPolyfill()) {
    // Load the polyfill and its locale data if needed
    await import('@formatjs/intl-durationformat/polyfill.js');
  }
}
