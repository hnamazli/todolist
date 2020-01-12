import {createStore} from "redux";
import {ADD_TODO, DELETE_TODO, COMPLETE_TODO} from "./actionTypes";

class Model {
    constructor() {
        this._initialState = [
            {
                text: 'First Redux Task',
                completed: false,
                id: 0
            }
        ];

        this._store = createStore(this.reducer);
    }

    getState = () => {
        return this._store.getState();
    };

    reducer = (state = this._initialState, action) => {
        switch (action.type) {
            case ADD_TODO:
                return [
                    ...state,
                    {
                        text: action.payload,
                        id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1
                    }
                ];
            case DELETE_TODO:
                return state.filter(todo =>
                    todo.id !== +action.payload
                );
            case COMPLETE_TODO:
                return state.map(todo =>
                    todo.id === +action.payload ?
                        { ...todo, completed: !todo.completed } :
                        todo
                );
            default:
                return state;
        }
    };

    dispatch = action => {
        this._store.dispatch(action);
    };

    subscribe = cb => {
        this._store.subscribe(cb);
    }
}

export default Model;