import { ProjectGallery } from "../../components/gallery/gallery.js";
import { Header } from "../../components/header/header.js";
import { Visualizer, VisualizerProcessor } from "../../components/visualizer/visualizer.js";
import { BubbleUI } from "../../lib/bubble.js";
import { uiComponent } from "../../lib/dom.js";
import { Html } from "../../lib/html.js";
import { setSignal } from "../../lib/signals.js";
import { getProjects, getProjectTags } from "../../services/projects/projects.js";


// HTML ids and classes
const VIEW_ID = "home";

// Signals
const REDRAW_SIGNAL: string = setSignal()

// View internal data
let tags: Set<string> = new Set<string>()

// Ui components

/**
 * Show home view
 */
export async function showHomeView(_parameters: string[], container: HTMLElement) {

  tags = new Set(getProjectTags())

  const view = uiComponent({
    type: Html.View,
    id: VIEW_ID,
    classes: [BubbleUI.BoxRow, BubbleUI.BoxXStart, BubbleUI.BoxYStart],
  })

  const visualizerProcessor = new VisualizerProcessor()
  visualizerProcessor.load([
    { url: "resources/icons/github.svg", title: "Skylerie 1" },
    { url: "resources/icons/hand.svg", title: "Skylerie 2" },
    { url: "resources/icons/logo.svg", title: "Skylerie 3" }
  ])

  const selectedProject = getProjects()[0]

  const visualizer = Visualizer.render(visualizerProcessor)
  const header = Header.render(tags)
  const gallery = ProjectGallery.render(selectedProject)

  view.appendChild(header)
  view.appendChild(visualizer)
  view.appendChild(gallery)
  container.appendChild(view)

}
