import { BubbleUI } from "../../lib/bubble.js";
import { uiComponent } from "../../lib/dom.js";
import { Html } from "../../lib/html.js";
import { connectToSignal, setSignal } from "../../lib/signals.js";
import { GalleryRequestParams } from "../../models/gallery.request.js";
import Project from "../../models/project.js";


// HTML ids and classes
const VIEW_ID = "home";

// Signals
const REDRAW_SIGNAL: string = setSignal();

// View internal data
const galleryData: Array<Project> = [];
const tags: Set<string> = new Set<string>();

// Ui components
let visualizer: HTMLElement

/**
 * Show home view
 */
export async function showHomeView(parameters: string[], container: HTMLElement) {
  const view = uiComponent({
    type: Html.View,
    id: VIEW_ID,
    classes: [BubbleUI.BoxRow, BubbleUI.BoxXStart, BubbleUI.BoxYStart],
  });

  visualizer =


    container.appendChild(view)
}
