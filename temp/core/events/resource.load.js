import MaterialIcons from "../../lib/material/material.icons.js";
export default class ResourceLoader {
    async start() {
        await MaterialIcons.instance.loader.update();
    }
}
