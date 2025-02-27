import { BubbleUI } from "../../lib/bubble.js"
import { getConfiguration } from "../../lib/configuration.js"
import { setDomEvents, uiComponent } from "../../lib/dom.js"
import { Html } from "../../lib/html.js"
import { connectToSignal, emitSignal, setSignal } from "../../lib/signals.js"

export class Header {
  private static readonly HEADER_ID = "header"
  private static readonly TAG_MENU_ID = "tag-menu"
  private static readonly TAG_BUTTON_CLASS = "tag-button"

  static readonly TAG_SELECTED_SIGNAL = setSignal()

  static render(tags: Set<string>): HTMLElement {
    return Header.create(tags)
  }

  static create(tags: Set<string>): HTMLElement {
    let header = uiComponent({
      type: Html.Div,
      id: Header.HEADER_ID,
      classes: [BubbleUI.BoxColumn, BubbleUI.BoxXStart, BubbleUI.BoxYCenter],
    })

    const profilePicture = uiComponent({
      type: Html.Img,
      id: "logo",
      attributes: {
        src: `${getConfiguration("path")["images"]}/logo.jpg`,
      },
    })

    const title = uiComponent({
      type: Html.H1,
      text: "Skylerie",
      id: "title",
      classes: [BubbleUI.TextCenter],
    })

    const selected = tags.values().next().value;
    const tagMenu = this.drawTags(tags, selected);

    header.appendChild(profilePicture)
    header.appendChild(title)
    header.appendChild(tagMenu)

    return header
  }

  static drawTags(tags: Set<string>, selected: string): HTMLElement {

    const menu = uiComponent({
      type: Html.Div,
      id: Header.TAG_MENU_ID,
      classes: [BubbleUI.BoxColumn, BubbleUI.BoxXStart, BubbleUI.BoxYStart],
    })

    tags.forEach(tag => {

      const button = uiComponent({
        type: Html.Button,
        text: tag,
        classes: selected == tag ? [Header.TAG_BUTTON_CLASS, "selected"] : [Header.TAG_BUTTON_CLASS],
      })

      setDomEvents(button, {
        click: () => {
          const buttons = document.querySelectorAll(`#${Header.HEADER_ID} .${Header.TAG_BUTTON_CLASS}`)
          buttons.forEach(b => b.classList.remove("selected"))
          button.classList.add("selected")

          emitSignal(Header.TAG_SELECTED_SIGNAL, tag)
        }
      })
      menu.appendChild(button)
    })

    return menu
  }

} 
