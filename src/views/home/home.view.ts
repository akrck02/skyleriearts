import ProjectGallery from "../../components/gallery/gallery.js";
import Header from "../../components/header/header.js";
import { ImageVisualizer } from "../../components/visualizer/visualizer.js";
import { Config } from "../../config/config.js";
import IProject from "../../core/models/project.js";
import { Browser } from "../../lib/gtdf/components/browser.js";
import { HTML } from "../../lib/gtdf/components/dom.js";
import {
  UIComponent,
  UIProperties,
} from "../../lib/gtdf/components/uicomponent.js";
import { Signal } from "../../lib/gtdf/core/signals/signals.js";
import { Route } from "../../lib/gtdf/decorators/Route.js";
import { Singleton } from "../../lib/gtdf/decorators/Singleton.js";
import { ViewUI } from "../../lib/gtdf/views/ViewUI.js";
import { Gtdf } from "../../lib/others/gtdf.js";

@Route(["home", "", undefined])
@Singleton()
export default class HomeView extends ViewUI {
  private static readonly ID = "home";
  private static readonly MOBILE_CLASS = "mobile";

  private header: Header;
  private galleryContainer: UIComponent;
  private visualizer: ImageVisualizer;
  private loadProject: Signal<IProject> = new Signal<IProject>(
    "load-project",
    false,
  );

  private galleryData: Array<IProject> = [];
  private tags: Set<string> = new Set<string>();

  public constructor() {
    super({
      type: HTML.VIEW,
      id: HomeView.ID,
      classes: [Gtdf.BOX_ROW, Gtdf.BOX_X_START, Gtdf.BOX_Y_START],
    });

    this.loadProject.connect(this.loadProjectMethod);
  }

  async loadProjectMethod(project: IProject): Promise<IProject> {
    alert(`Load project ${project.name}`);
    return project;
  }

  /**
   * Show the home view
   * @param params The parameters
   * @param container The container
   * @returns Promise<void>
   */
  public async show(params: string[], container: UIComponent): Promise<void> {
    Config.setTitle(`${Config.Base.app_name} - home`);
    if (Browser.isSmallDevice()) {
      this.element.classList.add(HomeView.MOBILE_CLASS);
    }

    this.visualizer = new ImageVisualizer();
    this.galleryContainer = new UIComponent({
      type: HTML.DIV,
      id: "gallery-container",
      classes: [Gtdf.BOX_COLUMN, Gtdf.BOX_X_START, Gtdf.BOX_Y_START],
    });

    this.galleryData = await this.getGalleryData();

    // Get all tags and the selected tag or the first one
    this.tags = this.getTags(this.galleryData);
    const currentTag: string =
      params.length > 0 ? params[0] : this.tags.values().next().value;

    // Show the header
    this.header = new Header(this.tags);
    this.header.appendTo(this);

    // Get the current project
    let currentProject = undefined;

    if (params.length > 1) {
      currentProject = this.galleryData.find(
        (project) => project.name == params[1],
      );
    }

    console.log(this.tags);
    console.log(this.galleryData);

    this.loadProject.emit(currentProject);

    await this.showTag(currentTag, currentProject?.name);
    this.galleryContainer.appendTo(this);
    this.appendTo(container);
  }

  /**
   * Get the gallery data from JSON file
   * @returns Promise<Array<IProject>> The gallery data
   */
  async getGalleryData(): Promise<Array<IProject>> {
    const dataPath = `${Config.Path.resources}/data/images.json`;
    const response = await fetch(dataPath);
    return await response.json();
  }

  /**
   * Get all tags
   * @param projects The projects
   * @returns Set<string> The tags
   */
  getTags(projects: Array<IProject>): Set<string> {
    const tags = new Set<string>();
    projects.forEach((project: IProject) =>
      project.tags.forEach((tag) => tags.add(tag)),
    );
    return tags;
  }

  /**
   * Show the projects of the selected tag
   * @param currentTag The selected tag
   * @param tags All tags
   * @param projects The projects of the selected tag
   * @returns Promise<void>
   */
  async showTag(currentTag: string, currentProjectName: string): Promise<void> {
    if (!this.tags.has(currentTag)) {
      console.error(`Tag ${currentTag} not found`);
      return;
    }

    // get the projects with the current tag
    const projects = this.galleryData.filter((project) =>
      project.tags.includes(currentTag),
    );

    // find the project with the current name
    let currentProject: IProject = projects.find(
      (project) => project.name == currentProjectName,
    );

    // if the project is not found, get the first one
    if (currentProject == undefined) {
      currentProject = projects.values().next().value;
    }

    // Add tag title to UI
    const title = new UIComponent({
      type: HTML.H1,
      text: currentTag,
      id: "title",
    });
    title.appendTo(this.galleryContainer);

    // Create the project bar
    const projectBar = new ProjectBar(projects, currentProject);
    projectBar.appendTo(this.galleryContainer);

    // Create the project gallery
    const gallery = new ProjectGallery(currentProject);
    gallery.appendTo(this.galleryContainer);
  }
}

/**
 * Bar with the available projects
 */
class ProjectBar extends UIComponent {
  constructor(projects: Array<IProject>, current: IProject) {
    super({
      type: HTML.DIV,
      id: "project-bar",
      classes: [Gtdf.BOX_ROW, Gtdf.BOX_X_CENTER, Gtdf.BOX_Y_START],
    });

    this.configure(projects, current);
  }

  /**
   * Configure the project bar
   * @param projects The available projects
   * @param current The current project
   */
  private configure(projects: Array<IProject>, current: IProject) {
    projects.forEach((project) => {
      const button = new UIComponent({
        type: HTML.BUTTON,
        text: project.name,
        classes: project.name == current.name ? ["selected"] : [],
      });
      button.appendTo(this);
    });
  }
}
