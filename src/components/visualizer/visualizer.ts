import { BubbleUI } from "../../lib/bubble.js"
import { uiComponent } from "../../lib/dom.js"
import { Html } from "../../lib/html.js"
import { Image } from "../../models/project.js"

const VISUALIZER_ID = "visualizer"
const BUTTON_CLOSE_ID = "close"
const BUTTON_BACK_ID = "back"
const BUTTON_NEXT_ID = "next"
const INFO_TEXT_ID = "info-text"

export class Visualizer {

  images: Image[] = []
  index: number = 0

  load(images: Image[]) {
    images = images
  }

  isFirstImage() {
    if (0 == this.images.length) return false
    return 0 == this.index
  }

  isLastImage() {
    if (0 == this.images.length) return false
    return this.images.length - 1 == this.index
  }

  set(currentImage: Image) {

    this.index = images.indexOf(currentImage)

    if (-1 == this.index) {
      this.index = 0
    }
  }
}

function showVisualizer(currentImage: Image) {

  index = images.indexOf(currentImage)
  image.style.display = "flex"

  this.buttonBack.element.style.visibility = (index == 0) ? "hidden" : "visible"
  this.buttonNext.element.style.visibility = (index == images.length - 1) ? "hidden" : "visible"

  image.setAttribute("src", currentImage.url)
}



export function showVisualizer() {

}


  //buttonClose: HTMLElement
  //buttonBack: HTMLElement
  //image: HTMLElement
  //buttonNext: HTMLElement
  //infoText: HTMLElement
