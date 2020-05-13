/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-05 16:06
 */
import types from '../types'

const defaultState = {
    items: []
}

const onAction = (state = defaultState, action) => {
    switch (action.type) {
        case types.FAVORITE_CHANGE:
            return {
                ...state,
                items: action.items
            }
        default:
            return state
    }
}

export default onAction
