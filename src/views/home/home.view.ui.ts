import ProjectGallery from "../../components/gallery/gallery.js";
import Header from "../../components/header/header.js";
import Select from "../../components/select/select.component.js";
import { ImageVisualizer } from "../../components/visualizer/visualizer.js";
import { Configuration } from "../../configuration/configuration.js";
import { GalleryRequestParams as GalleryRequestParams } from "../../core/models/gallery.request.params.js";
import Project from "../../core/models/project.js";
import { Text } from "../../language/text.js";
import { HomeBundle, TextCategory } from "../../language/text.register.js";
import { BubbleUI } from "../../lib/bubble/bubble.js";
import DOM, { Html } from "../../lib/gtdf/component/dom.js";
import I18nUIComponent from "../../lib/gtdf/component/i18n.ui.component.js";
import { UIComponent } from "../../lib/gtdf/component/ui.component.js";
import { Route } from "../../lib/gtdf/core/decorator/route.js";
import { Singleton } from "../../lib/gtdf/core/decorator/singleton.js";
import { Signal } from "../../lib/gtdf/core/signals/signals.js";
import Strings from "../../lib/gtdf/data/strings.js";
import Language from "../../lib/gtdf/language/language.js";
import { ViewUI } from "../../lib/gtdf/view/view.ui.js";
import { Browser } from "../../lib/gtdf/web/browser.js";
import MaterialIcons from "../../lib/material/material.icons.js";
import HomeViewCore from "./home.view.core.js";

@Route(["home", "", undefined])
@Singleton()
export default class HomeView extends ViewUI {
  private static readonly ID = "home";
  private static readonly MOBILE_CLASS = "mobile";

  private header: Header;
  private galleryContainer: UIComponent;
  private visualizer: ImageVisualizer;
  private redrawSignal: Signal<GalleryRequestParams> =
    new Signal<GalleryRequestParams>("load-project");

  private galleryData: Array<Project> = [];
  private tags: Set<string> = new Set<string>();

  public constructor() {
    super({
      type: Html.View,
      id: HomeView.ID,
      classes: [BubbleUI.BoxRow, BubbleUI.BoxXStart, BubbleUI.BoxYStart],
    });

    this.redrawSignal.connect({
      origin: HomeView.ID,
      action: async (params: GalleryRequestParams) => {
        await this.showTag(params?.tag, params?.project?.name);
      },
    });
  }

  /**
   * Show the view
   * @param params The parameters of the view
   * @param container The container to append the view to
   */
  public async show(params: string[], container: UIComponent) {
    Configuration.instance.setTitle(
      `${Configuration.instance.base.app_name} - home`,
    );
    if (Browser.isSmallDevice()) {
      this.element.classList.add(HomeView.MOBILE_CLASS);
    }

    this.visualizer = new ImageVisualizer();
    this.galleryContainer = new UIComponent({
      type: Html.Div,
      id: "gallery-container",
      classes: [BubbleUI.BoxColumn, BubbleUI.BoxXStart, BubbleUI.BoxYStart],
    });

    this.galleryData = await this.getGalleryData();

    // Get all tags and the selected tag or the first one
    this.tags = this.getTags(this.galleryData);
    const currentTag: string =
      params.length > 0 ? params[0] : this.tags.values().next().value;

    // Show the header
    this.header = new Header(this.tags);
    this.header.tagSelectedSignal.connect({
      origin: HomeView.ID,
      action: async (data: GalleryRequestParams) =>
        this.redrawSignal.emit(data),
    });
    this.header.appendTo(this);

    // Get the current project
    let currentProject: Project = undefined;

    if (params.length > 1) {
      currentProject = this.galleryData.find(
        (project) => project.name == params[1],
      );
    }

    this.redrawSignal.emit({
      tag: currentTag,
      project: currentProject,
    });
    this.galleryContainer.appendTo(this);
    this.appendTo(container);
  }

  /**
   * Get the gallery data from JSON file
   * @returns Promise<Array<Project>> The gallery data
   */
  async getGalleryData(): Promise<Array<Project>> {
    const dataPath = `${Configuration.instance.path.resources}/data/images.json`;
    const response = await fetch(dataPath);
    return await response.json();
  }

  /**
   * Get all tags
   * @param projects The projects
   * @returns Set<string> The tags
   */
  getTags(projects: Array<Project>): Set<string> {
    const tags = new Set<string>();
    projects.forEach((project: Project) =>
      project.tags.forEach((tag) => tags.add(tag)),
    );
    return tags;
  }

  /**
   * Show the projects of the selected tag
   * @param currentTag The selected tag
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
    let currentProject: Project = projects.find(
      (project) => project.name == currentProjectName,
    );

    // if the project is not found, get the first one
    if (currentProject == undefined) {
      currentProject = projects.values().next().value;
    }

    // Clear the gallery container
    this.galleryContainer.clean();

    // Add tag title to UI
    const title = new UIComponent({
      type: Html.H1,
      text: currentTag,
      id: "title",
    });
    title.appendTo(this.galleryContainer);

    // Create the project bar
    const projectBar = new ProjectBar(projects, currentProject, currentTag);
    projectBar.projectSelectedSignal.connect({
      origin: HomeView.ID,
      action: async (data: GalleryRequestParams) =>
        this.redrawSignal.emit(data),
    });
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
  public projectSelectedSignal: Signal<GalleryRequestParams> =
    new Signal<GalleryRequestParams>("project-selected");

  constructor(projects: Array<Project>, current: Project, tag: string) {
    super({
      type: Html.Div,
      id: "project-bar",
      classes: [BubbleUI.BoxRow, BubbleUI.BoxXCenter, BubbleUI.BoxYStart],
    });

    this.configure(projects, current, tag);
  }

  /**
   * Configure the project bar
   * @param projects The available projects
   * @param current The current project
   * @param tag The current tag
   */
  private configure(projects: Array<Project>, current: Project, tag: string) {
    projects.forEach((project) => {
      const button = new UIComponent({
        type: Html.Button,
        text: project.name,
        classes: project.name == current.name ? ["selected"] : [],
      });
      button.element.onclick = () =>
        this.projectSelectedSignal.emit({
          tag: tag,
          project: project,
        });

      button.appendTo(this);
    });
  }
}
