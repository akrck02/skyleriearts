import Crypto from "../crypto/crypto.js";
/**
 * This class represents a signal that can be emitted
 * and listen by functions
 * @author akrck02
 */
export class Signal {
    /**
     * Create a new signal
     * @param id The id of the signal
     */
    constructor(id) {
        this.id = id;
        this.actions = {};
    }
    /**
     * @inheritdoc
     */
    async connect(action) {
        const prototypeString = action.action.toString();
        this.actions[await this.hashAction(action)] = action;
    }
    /**
     * @inheritdoc
     */
    async disconnect(action) {
        this.actions[await this.hashAction(action)] = undefined;
    }
    /**
     * @inheritdoc
     */
    async emit(data) {
        for (const name in this.actions) {
            await this.actions[name].action(data);
        }
    }
    /**
     * Hash the body of the action using sha256
     */
    async hashAction(action) {
        const prototypeString = action.toString();
        const hashedBody = await Crypto.sha256(prototypeString);
        const hashedOrigin = await Crypto.sha256(action.origin);
        return `${hashedOrigin}-${hashedBody}`;
    }
}
