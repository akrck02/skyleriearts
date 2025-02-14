import { getErrorByCode } from "../../errors/errors.js";
import { getConfiguration } from "../../lib/configuration.js";
import { uiComponent } from "../../lib/dom.js";
import { Html } from "../../lib/html.js";

const DEFAULT_ERROR_CODE = 404;
const ID = "error";
const IMAGE_ID = "error-img";
const TITLE_ID = "error-title";

export async function showErrorView(params: string[], container: HTMLElement) {

  const view = uiComponent({
    type: "view",
    id: ID,
    classes: ["box-column", "box-center"],
  });

  this.clean();
  const code = parseInt(params[0]);
  let error = getErrorByCode(code);

  // Default error set if no error parameter was given
  if (!error) {
    error = getErrorByCode(DEFAULT_ERROR_CODE);
  }

  // Image
  const image = uiComponent({
    type: Html.Img,
    id: IMAGE_ID,
    attributes: {
      src: `${getConfiguration("paths")["icons"]}error.svg`,
    },
  });
  this.appendChild(image);

  // Error title
  const title = uiComponent({
    type: Html.H1,
    id: TITLE_ID,
    text: error.friendly,
  });

  this.appendChild(title);

  // Error description
  const description = uiComponent({
    type: Html.P,
    text: error.description,
  });

  this.appendChild(description);
  this.appendTo(container);
}
