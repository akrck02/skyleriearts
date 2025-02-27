import { ProjectGallery } from "../../components/gallery/gallery.js";
import { Header } from "../../components/header/header.js";
import { Visualizer, VisualizerProcessor } from "../../components/visualizer/visualizer.js";
import { BubbleUI } from "../../lib/bubble.js";
import { uiComponent } from "../../lib/dom.js";
import { Html } from "../../lib/html.js";
import { connectToSignal, emitSignal, setSignal } from "../../lib/signals.js";
import Project from "../../models/project.js";
import { getProjectsByTag, getProjectTags } from "../../services/projects/projects.js";


// HTML ids and classes
const VIEW_ID = "home";

// Signals
const PROJECT_SELECTED_SIGNAL: string = setSignal()

// Data
let visualizerProcessor: VisualizerProcessor = new VisualizerProcessor()

/**
 * Show home view
 */
export async function showHomeView(parameters: string[], container: HTMLElement) {

  const tags = new Set(getProjectTags())

  const view = uiComponent({
    type: Html.View,
    id: VIEW_ID,
    classes: [BubbleUI.BoxRow, BubbleUI.BoxXStart, BubbleUI.BoxYStart],
  })

  const selectedTag = parameters[0] || getProjectTags().values().next().value
  const visualizer = Visualizer.render(visualizerProcessor)
  const header = Header.render(tags)

  const galleryContainer = uiComponent({
    type: Html.Div,
    id: "gallery-container",
    classes: [BubbleUI.BoxColumn, BubbleUI.BoxXStart, BubbleUI.BoxYStart],
  });

  connectToSignal(Header.TAG_SELECTED_SIGNAL, async tag => showTag(galleryContainer, tag, undefined))
  connectToSignal(PROJECT_SELECTED_SIGNAL, async data => showTag(galleryContainer, data?.tag, data?.project?.name))

  view.appendChild(header)
  view.appendChild(galleryContainer)
  view.appendChild(visualizer)
  container.appendChild(view)

  emitSignal(Header.TAG_SELECTED_SIGNAL, selectedTag)
}

/**
 * Show the projects of the selected tag
 * @param container The container of the gallery
 * @param currentTag The selected tag
 * @param currentProject The selected project
 */
async function showTag(container: HTMLElement, currentTag: string, currentProjectName: string): Promise<void> {

  // If container is not present, return
  if (undefined == container) {
    console.error(`Undefined container`)
    return
  }

  // If tag is not selected, return
  if (undefined == currentTag) {
    console.error(`Tag ${currentTag} not found`)
    return
  }

  console.log(currentProjectName);

  // If the project is not found, return
  const projects = getProjectsByTag(currentTag)
  const currentProject = currentProjectName == undefined ? projects[0] : projects.find(project => project.name.toLowerCase() == currentProjectName.toLowerCase())
  if (undefined == currentProject) {
    console.error(`Project not selected`)
    return
  }

  // Disappear animation
  container.style.opacity = "0";
  await new Promise(resolve => setTimeout(resolve, 500))

  // Clear the gallery container
  container.innerHTML = ""

  // Add tag title to UI
  const title = uiComponent({
    type: Html.H1,
    text: currentTag,
    id: "title",
  })
  container.appendChild(title)

  // Create the project bar
  const bar = projectBar(projects, currentProject, currentTag)
  container.appendChild(bar)

  // Create the project gallery
  const gallery = ProjectGallery.render(currentProject)
  connectToSignal(ProjectGallery.IMAGE_SELECTED_SIGNAL, async data => {
    visualizerProcessor.load(data.images)
    visualizerProcessor.set(data.selected)
    Visualizer.render(visualizerProcessor)
    Visualizer.show()
  })
  container.appendChild(gallery)

  // appear animation
  container.style.opacity = "1";
  await new Promise(resolve => setTimeout(resolve, 260))
}

function projectBar(projects: Array<Project>, current: Project, tag: string): HTMLElement {
  const bar = uiComponent({
    type: Html.Div,
    id: "project-bar",
    classes: [BubbleUI.BoxRow, BubbleUI.BoxXCenter, BubbleUI.BoxYStart],
  })

  projects.forEach(project => {
    const button = uiComponent({
      type: Html.Button,
      text: project.name,
      classes: project.name == current.name ? ["selected"] : [],
    })

    button.onclick = () => emitSignal(PROJECT_SELECTED_SIGNAL, {
      tag: tag,
      project: project,
    })

    bar.appendChild(button)
  })

  return bar
}
