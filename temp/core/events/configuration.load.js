import { Configuration } from "../../configuration/configuration.js";
import { EasyFetch } from "../../lib/gtdf/core/connection/easy.fetch.js";
export default class ConfigurationLoader {
    async start() {
        console.debug("ConfigurationLoader start");
        await EasyFetch.get({
            url: "./gtdf.config.json",
            parameters: {},
        })
            .status(200, (configuration) => Configuration.instance.load(configuration))
            .error(this.errorHandle)
            .json();
        console.debug("Configuration loaded");
    }
    errorHandle(error) {
        console.error(error);
    }
}
