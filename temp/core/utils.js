import { Configuration } from "../configuration/configuration.js";
export default class Utils {
    static copyToClipboard(text) {
        navigator.clipboard.writeText(text);
    }
    /**
     * Redirect to url with '/' separated params
     * @param url The URL to be redirected to
     * @param params The parameter Array
     */
    static redirect(url, params, force = false) {
        if (force)
            location.href = Configuration.instance.views.blank;
        url += params.join("/");
        location.href = url;
    }
}
