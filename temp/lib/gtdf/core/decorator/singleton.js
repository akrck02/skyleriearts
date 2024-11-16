/**
 * Singleton decorator to make a class a singleton
 *
 */
export function Singleton() {
    return function (target) {
        console.debug(`Singleton instanciated: ${target.name}`);
        target.instanceFn = () => {
            if (!target.instance)
                target.instance = new target();
            return target.instance;
        };
        target.instanceFn();
    };
}
