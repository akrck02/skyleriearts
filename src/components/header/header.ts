import { BubbleUI } from "../../lib/bubble.js"
import { getConfiguration } from "../../lib/configuration.js"
import { setDomEvents, uiComponent } from "../../lib/dom.js"
import { Html } from "../../lib/html.js"
import { disconnectSignal, emitSignal, setSignal } from "../../lib/signals.js"

/**
 * This class represents the header of the application
 * it is static because only one is needed across th app.
 */
export class Header {

  private static readonly HEADER_ID = "header"
  private static readonly TAG_MENU_ID = "tag-menu"
  private static readonly TAG_BUTTON_CLASS = "tag-button"

  static readonly OPTION_SELECTED_SIGNAL = setSignal()

  /**
   * Render the header
   * @param options The header options
   * @returns The composed HTML element
   */
  static render(options: Set<string>): HTMLElement {

    disconnectSignal(this.OPTION_SELECTED_SIGNAL)

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

    setDomEvents(profilePicture, {
      click: () => window.open("/#/bio", "_self")
    })

    const title = uiComponent({
      type: Html.H1,
      text: "Skylerie",
      id: "title",
      classes: [BubbleUI.TextCenter],
    })

    const selected = options.values().next().value;
    const tagMenu = this.drawOptions(options, selected);

    header.appendChild(profilePicture)
    header.appendChild(title)
    header.appendChild(tagMenu)

    return header
  }

  /**
   * Draw the options of the menu
   * @param options The options to show
   * @param selected The selected option
   * @returns The composed HTML element 
   */
  static drawOptions(options: Set<string>, selected: string): HTMLElement {

    const menu = uiComponent({
      type: Html.Div,
      id: Header.TAG_MENU_ID,
      classes: [BubbleUI.BoxColumn, BubbleUI.BoxXStart, BubbleUI.BoxYStart],
    })

    options.forEach(option => {

      const button = uiComponent({
        type: Html.Button,
        text: option,
        classes: selected == option ? [Header.TAG_BUTTON_CLASS, "selected"] : [Header.TAG_BUTTON_CLASS],
      })

      setDomEvents(button, {
        click: (e) => {

          if ((e.target as HTMLElement).classList.contains("selected")) return

          const buttons = document.querySelectorAll(`#${Header.HEADER_ID} .${Header.TAG_BUTTON_CLASS}`)
          buttons.forEach(b => b.classList.remove("selected"))
          button.classList.add("selected")

          emitSignal(Header.OPTION_SELECTED_SIGNAL, option)
        }
      })
      menu.appendChild(button)
    })

    return menu
  }
} 
