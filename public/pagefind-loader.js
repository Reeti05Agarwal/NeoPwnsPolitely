// Loads Pagefind's search API (generated into /pagefind/ by `npm run build`)
// outside the app bundle, then tells the search page it is ready.
import * as pagefind from "/pagefind/pagefind.js";

window.__pagefind = pagefind;
window.dispatchEvent(new Event("pagefind-ready"));
