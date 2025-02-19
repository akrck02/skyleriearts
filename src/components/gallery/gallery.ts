import { BubbleUI } from "../../lib/bubble.js";
import { setDomEvents, uiComponent } from "../../lib/dom.js";
import { Html } from "../../lib/html.js";
import Project, { Image } from "../../models/project.js";
import { isSmallDevice } from "../../lib/browser.js";
import { emitSignal, setSignal } from "../../lib/signals.js";



export class ProjectGallery {

  private static readonly CLASS = "gallery";
  private static readonly TITLE_ID = "title";
  private static readonly LIST_ID = "image-list";
  private static readonly MOBILE_CLASS = "mobile";

  static readonly imageSelectedSignal = setSignal()

  static render(project: Project): HTMLElement {

    // if nothing to show, return
    if (undefined == project?.images || 0 == project.images.length) return

    let gallery = uiComponent({
      type: Html.Div,
      classes: [
        ProjectGallery.CLASS,
        BubbleUI.BoxColumn,
        BubbleUI.BoxXStart,
        BubbleUI.BoxYStart,
      ],
    })

    // turn on mobile class if needed
    if (isSmallDevice()) {
      gallery.classList.add(ProjectGallery.MOBILE_CLASS);
    }

    // Add a list of images to show
    // in the gallery
    const list = uiComponent({
      type: Html.Ul,
      id: ProjectGallery.LIST_ID,
    })

    project?.images?.forEach((image: Image) => this.register(list, image, project.images))
    gallery.appendChild(list)

    return gallery
  }

  static register(list: HTMLElement, image: Image, album: Array<Image>): void {
    console.log(image);

    const listItem = uiComponent({ type: Html.Li })
    const canvas = this.imageCanvas(image, album)
    setTimeout(() => canvas.style.opacity = "1", 1)
    listItem.appendChild(canvas)
    list.appendChild(listItem)
  }

  static imageCanvas(image: Image, album: Array<Image>): HTMLElement {
    const canvas = uiComponent({
      type: Html.Div,
      classes: ["canvas"],
    })

    setDomEvents(canvas, {
      click: () => {
        emitSignal(ProjectGallery.imageSelectedSignal, {
          images: album,
          selected: album.indexOf(image),
        })
      },
    })

    const imageComponent = uiComponent({
      type: Html.Img,
      attributes: {
        src: image.url,
        alt: image.title,
        loading: "lazy",
        background: "#fff",
      },
    })

    setDomEvents(imageComponent, {
      load: () => (imageComponent.style.opacity = "1"),
    })

    canvas.appendChild(imageComponent)
    return canvas
  }
} 
