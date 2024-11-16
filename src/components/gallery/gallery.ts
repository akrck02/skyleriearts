import { Config } from "../../config/config.js";
import Project, { Image } from "../../core/models/project.js";
import { Browser } from "../../lib/gtdf/components/browser.js";
import { HTML } from "../../lib/gtdf/components/dom.js";
import { UIComponent } from "../../lib/gtdf/components/uicomponent.js";
import { Gtdf } from "../../lib/others/gtdf.js";

/**
 * Gallery component to show images
 * for a project
 */
export default class ProjectGallery extends UIComponent {
  private static readonly CLASS = "gallery";
  private static readonly TITLE_ID = "title";
  private static readonly LIST_ID = "image-list";
  private static readonly MOBILE_CLASS = "mobile";

  public constructor(project: Project) {
    super({
      type: HTML.DIV,
      classes: [
        ProjectGallery.CLASS,
        Gtdf.BOX_COLUMN,
        Gtdf.BOX_X_START,
        Gtdf.BOX_Y_START,
      ],
    });
    this.configure(project);
  }

  /**
   * Configure the gallery
   * @param project Project to show
   * @returns void
   */
  public async configure(project: Project) {
    // if nothing to show, return
    if (
      undefined == project ||
      undefined == project.images ||
      project.images.length == 0
    )
      return;

    // turn on mobile class if needed
    if (Browser.isSmallDevice()) {
      this.element.classList.add(ProjectGallery.MOBILE_CLASS);
    }

    // Add a list of images to show
    // in the gallery
    const list = new UIComponent({
      type: HTML.UL,
      id: ProjectGallery.LIST_ID,
    });

    project.images?.forEach((image) => this.register(list, image));
    list.appendTo(this);
  }

  /**
   * Register an image to the gallery
   * @param list List to append the image
   * @param image Image to register
   */
  register(list: UIComponent, image: Image): void {
    const listItem = new UIComponent({ type: HTML.LI });
    const url = image.url.startsWith("https://")
      ? image.url
      : `${Config.Path.images}uploads/${image.url}`;

    image.url = url;
    const canvas = new ImageCanvas(image);
    setTimeout(() => (canvas.element.style.opacity = "1"), 1);
    canvas.appendTo(listItem);
    listItem.appendTo(list);
  }
}

/**
 * ImageCanvas component to show an image
 * in the gallery
 */
class ImageCanvas extends UIComponent {
  public constructor(image: Image) {
    super({
      type: HTML.DIV,
      classes: ["canvas"],
    });

    this.configure(image);
  }

  /**
   * Configure the image
   * @param image Image to show
   */
  configure(image: Image): void {
    const imageComponent = new UIComponent({
      type: HTML.IMG,
      attributes: {
        src: image.url,
        alt: image.title,
        loading: "lazy",
        background: "#fff",
      },
    });

    imageComponent.setEvents({
      load: () => (imageComponent.element.style.opacity = "1"),
    });

    imageComponent.appendTo(this);
  }
}
