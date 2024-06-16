export const Routes = [];
export function Route(value) {
    return function (target) {
        if (typeof value == "string") {
            target.instance().routes = [value];
        }
        else {
            target.instance().routes = value;
        }
        console.debug(`Route registered /${value}`);
        Routes.push(target.instance());
    };
}
