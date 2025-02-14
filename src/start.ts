import { loadConfiguration } from "./lib/configuration.js";
import { setNotFoundRoute, setRoute, showRoute } from "./lib/router.js";
import { showErrorView } from "./views/error/error.js";
import { showHomeView } from "./views/home/home.js";

/**
 * When the dynamic URL changes loads
 * the correspoding view from the URL
 */
window.addEventListener("hashchange", start);

/**
 * When the window is loaded load
 * the app state to show
 */
window.onload = start;

/** Start the web app */
async function start() {

  loadConfiguration("gtdf.config.json")
  setRoute("", showHomeView)
  setNotFoundRoute(showErrorView)
  showRoute(window.location.hash.slice(1).toLowerCase(), document.body)
}


