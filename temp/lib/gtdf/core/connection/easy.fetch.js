import { HttpMethod } from "./http.js";
/**
 * A class that represents a response from a fetch request.
 * @description Encapsulates the data and methods for easy fetching
 * @author Akrck02
 */
export class Response {
    constructor(response) {
        this.response = response;
        this.middleware = [];
        this.errorFunction = (err) => console.error("Error in response : ", err);
        this.statusFunctions = new Map();
        this.statusFunctions.set(200, (res) => console.log("Success", res));
    }
    /**
     * Handles the response status code transforming the response with the responseTransformFunction
     * and executing the corresponding status function.
     * @param res The response object
     * @param statusFunctions The map of status functions
     * @param errorFunction The error function
     * @param responseTranformFunction The response transform function
     */
    async handleResponseStatus(res, statusFunctions, errorFunction, responseTranformFunction) {
        if (this.statusFunctions.has(res.status)) {
            let data = await responseTranformFunction(res);
            await this.statusFunctions.get(res.status)(data);
        }
        else
            this.errorFunction(new Error("Status code not handled"));
    }
    /**
     * Executes the callback functions corresponding to the status code getting the response as a json object.
     * in case of an error, the error function will be executed.
     *
     * @example
     * await EasyFetch.get({
     *   url: "https://mydomain/json/1",
     *   parameters: {
     *        name: "John",
     *   },
     *   headers: {
     *      "Content-type": "application/json",
     *   }
     * })
     * .status(200,(response) => {
     *    console.log(response);
     * })
     * .status(404,(response) => {
     *   console.log("NOT FOUND: ",response);
     * })
     * .error((error) => {
     *   console.error(error);
     * })
     * .json()
     */
    async json() {
        await this.response
            .then(async (res) => await this.handleResponseStatus(res, this.statusFunctions, this.errorFunction, async (res) => await res.json()))
            .catch((err) => this.errorFunction(err));
    }
    /**
     * Executes the callback function corresponding to the status code getting the response as a text.
     * in case of an error, the error function will be executed.
     * @example
     * await EasyFetch.get({
     *   url: "https://mydomain/text/1",
     *   parameters: {
     *        name: "John",
     *   },
     *   headers: {
     *      "Content-type": "text/plain",
     *   }
     * })
     * .status(200,(response) => {
     *    console.log(response);
     * })
     * .status(404,(response) => {
     *   console.log("NOT FOUND: ",response);
     * })
     * .error((error) => {
     *   console.error(error);
     * })
     * .text()
     */
    async text() {
        await this.response
            .then(async (res) => await this.handleResponseStatus(res, this.statusFunctions, this.errorFunction, async (res) => await res.text()))
            .catch((err) => this.errorFunction(err));
    }
    /**
     * Executes the callback function corresponding to the status code getting the response as a blob.
     * in case of an error, the error function will be executed.
     * @example
     * await EasyFetch.get({
     *  url: "https://mydomain/blob/1",
     * parameters: {
     *     name: "John",
     * },
     * headers: {
     *    "Content-type": "application/octet-stream",
     * }
     * })
     * .status(200,(response) => {
     *   console.log(response);
     * })
     * .status(404,(response) => {
     *  console.log("NOT FOUND: ",response);
     * })
     * .error((error) => {
     *  console.error(error);
     * })
     * .blob()
     */
    async blob() {
        await this.response
            .then(async (res) => await this.handleResponseStatus(res, this.statusFunctions, this.errorFunction, async (res) => await res.blob()))
            .catch((err) => this.errorFunction(err));
    }
    /**
     * Sets the callback function to be executed corresponding to the status code.
     * @param code the status code or list of status codes
     * @param success the callback function
     * @returns the response itself
     */
    status(code, func) {
        let numbers = [];
        if (typeof code === "number") {
            numbers.push(code);
        }
        else {
            numbers = code;
        }
        for (let i = 0; i < numbers.length; i++) {
            this.statusFunctions.set(numbers[i], func);
        }
        return this;
    }
    /**
     * Sets the callback function to be executed when the response is unsuccessful.
     * @param error the callback function
     * @returns the response itself
     */
    error(error) {
        this.errorFunction = error;
        return this;
    }
}
export class EasyFetch {
    static get(properties) {
        return EasyFetch.exec({
            method: HttpMethod.Get,
            parameters: properties.parameters,
            url: properties.url,
            headers: properties.headers,
            charset: properties.charset,
            contentType: properties.contentType,
        });
    }
    static post(properties) {
        return EasyFetch.exec({
            method: HttpMethod.Post,
            parameters: properties.parameters,
            url: properties.url,
            headers: properties.headers,
            charset: properties.charset,
            contentType: properties.contentType,
        });
    }
    static put(properties) {
        return EasyFetch.exec({
            method: HttpMethod.Put,
            parameters: properties.parameters,
            url: properties.url,
            headers: properties.headers,
            charset: properties.charset,
            contentType: properties.contentType,
        });
    }
    static delete(properties) {
        return EasyFetch.exec({
            method: HttpMethod.Delete,
            parameters: properties.parameters,
            url: properties.url,
            headers: properties.headers,
            charset: properties.charset,
            contentType: properties.contentType,
        });
    }
    static patch(properties) {
        return EasyFetch.exec({
            method: HttpMethod.Patch,
            parameters: properties.parameters,
            url: properties.url,
            headers: properties.headers,
            charset: properties.charset,
            contentType: properties.contentType,
        });
    }
    static head(properties) {
        return EasyFetch.exec({
            method: HttpMethod.Head,
            parameters: properties.parameters,
            url: properties.url,
            headers: properties.headers,
            charset: properties.charset,
            contentType: properties.contentType,
        });
    }
    static options(properties) {
        return EasyFetch.exec({
            method: HttpMethod.Options,
            parameters: properties.parameters,
            url: properties.url,
            headers: properties.headers,
            charset: properties.charset,
            contentType: properties.contentType,
        });
    }
    static connect(properties) {
        return EasyFetch.exec({
            method: HttpMethod.Connect,
            parameters: properties.parameters,
            url: properties.url,
            headers: properties.headers,
            charset: properties.charset,
            contentType: properties.contentType,
        });
    }
    static trace(properties) {
        return EasyFetch.exec({
            method: HttpMethod.Trace,
            parameters: properties.parameters,
            url: properties.url,
            headers: properties.headers,
            charset: properties.charset,
            contentType: properties.contentType,
        });
    }
    static update(properties) {
        return EasyFetch.exec({
            method: HttpMethod.Update,
            parameters: properties.parameters,
            url: properties.url,
            headers: properties.headers,
            charset: properties.charset,
            contentType: properties.contentType,
        });
    }
    /**
     * Adds a middleware function to be executed before the request is sent.
     * @param func the middleware function
     */
    static addMiddleware(func) {
        EasyFetch.middleware.push(func);
    }
    /**
     * Removes a middleware function.
     * @param func the middleware function
     * @returns true if the function was removed, false otherwise
     */
    static exec(properties) {
        let options = {
            method: properties.method,
            headers: {
                "Content-type": `${properties.contentType || "application/json"};charset=${properties.charset || "UTF-8"}`,
                mode: "cors",
                "Sec-Fetch-Site": "cross-site",
            },
        };
        properties.headers && Object.assign(options.headers, properties.headers);
        if (properties.method !== HttpMethod.Get) {
            if (properties.parameters instanceof FormData) {
                options["body"] = properties.parameters;
                options.headers["Content-type"] =
                    `multipart/form-data;charset=${properties.charset || "UTF-8"}`;
            }
            else {
                options["body"] = JSON.stringify(properties.parameters);
            }
        }
        const promise = fetch(properties.url, options);
        return new Response(promise);
    }
}
EasyFetch.middleware = [];