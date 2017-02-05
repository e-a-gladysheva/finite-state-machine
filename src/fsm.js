class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (config == null) throw Error();
        this.config = config;
        this.current = config.initial;
        this.undoArr = [config.initial];
        this.redoArr = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.current;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if(!this.config.states.hasOwnProperty(state)) throw Error();
        this.current = state;
        this.undoArr.push(state);
        this.redoArr = [];
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        var state = this.config.states[this.current].transitions[event];
        if (state == undefined) {
            throw Error();
        }
        else {
            this.changeState(state);
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.changeState(this.config.initial);
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {}

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.undoArr.length == 1) return false;
        this.redoArr.push(this.undoArr.pop());
        this.current = this.undoArr[this.undoArr.length-1];
        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.redoArr.length == 0) return false;
        this.undoArr.push(this.redoArr.pop());
        this.current = this.undoArr[this.undoArr.length-1];
        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.current = this.config.initial;
        this.undoArr = [this.config.initial];
        this.redoArr = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/