import { Visualizer, VisualizerProcessor } from "../../components/visualizer/visualizer.js";
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

/**
 * Show home view
 */
export async function showHomeView(parameters: string[], container: HTMLElement) {
  const view = uiComponent({
    type: Html.View,
    id: VIEW_ID,
    classes: [BubbleUI.BoxRow, BubbleUI.BoxXStart, BubbleUI.BoxYStart],
  });

  const visualizerProcessor = new VisualizerProcessor()
  visualizerProcessor.load([
    { url: "resources/icons/github.svg", title: "Skylerie 1" },
    { url: "resources/icons/hand.svg", title: "Skylerie 2" },
    { url: "resources/icons/logo.svg", title: "Skylerie 3" }
  ])

  const visualizer = Visualizer.render(visualizerProcessor)


  view.appendChild(visualizer)
  container.appendChild(view)

}
