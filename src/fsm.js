class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config) {
            throw new Error("config isn't passed");
        } else {
            this.config = config.states;
            this.initial = config.initial;
            this.prevInitial = [];
            this.nextInitial = [];
        }
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.initial;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (this.config.hasOwnProperty(state)) {
            this.prevInitial.push(this.initial);
            this.initial = state;
            this.nextInitial.length = 0;
        } else {
            throw new Error('state isn\'t exist');
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (this.config[this.initial].transitions.hasOwnProperty(event)) {
            this.prevInitial.push(this.initial);
            this.initial = this.config[this.initial].transitions[event];
            this.nextInitial.length = 0;
        } else {
            throw new Error('state isn\'t exist');
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.initial = 'normal';
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let arrKeys = [];
        if (!event) {
            return Object.keys(this.config);
        } else {
            for (let key in this.config) {
                if (this.config[key].transitions.hasOwnProperty(event)) {
                    arrKeys.push(key);
                }
            }
        }
        return arrKeys;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.prevInitial.length === 0) {
            return false;
        } else {
            this.nextInitial.push(this.initial);
            this.initial = this.prevInitial[this.prevInitial.length-1];
            this.prevInitial.pop();
            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.nextInitial.length === 0) {
            return false;
        } else {
            this.prevInitial.push(this.initial);
            this.initial = this.nextInitial[this.nextInitial.length-1];
            this.nextInitial.pop();
            return true;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.nextInitial.length = 0;
        this.prevInitial.length = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
