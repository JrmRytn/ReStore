export const INCREMENT_COUNTER = "INCREMENT_COUNTER";
export const DECCREMENT_COUNTER = "DECCREMENT_COUNTER";


export interface CounterState {
    data: number,
    title: string
}

const initialState: CounterState = {
    data: 42,
    title: 'YARC (yet another redux counter'
}

export function increment(amount = 1) {
    return {
        type: INCREMENT_COUNTER,
        payload: amount
    }
}

export function decrement(amount = 1) {
    return {
        type: DECCREMENT_COUNTER,
        payload: amount
    }
}

interface CounterAction {
    type: string,
    payload: number
}

export default function counterReducer(state = initialState, action: CounterAction) {
    switch (action.type) {
        case INCREMENT_COUNTER:
            return {
                ...state, data: state.data + action.payload
            }
            break;
        case DECCREMENT_COUNTER:
            return {
                ...state, data: state.data - action.payload
            }
            break;

        default:
            return state;
    }
    return state;
}