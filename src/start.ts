import { getConfiguration, loadConfiguration } from "./lib/configuration.js";
import { loadIcons } from "./lib/icons.js";
import { setNotFoundRoute, setRoute, showRoute } from "./lib/router.js";
import { loadProjects } from "./services/projects/projects.js";
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

  await loadConfiguration("gtdf.config.json")
  await loadIcons("material", `${getConfiguration("path")["icons"]}/materialicons.json`)
  await loadIcons("social", `${getConfiguration("path")["icons"]}/socialicons.json`)
  await loadProjects()

  setRoute("", showHomeView)
  setNotFoundRoute(showErrorView)
  showRoute(window.location.hash.slice(1).toLowerCase(), document.body)
}


