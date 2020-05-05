/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-05 16:06
 */
import types from '../types'

const defaultDevLangState = {
    keys: []
}

const onAction = (state = defaultDevLangState, action) => {
    switch (action.type) {
        case types.SELECTED_DEV_LANGUAGES_CHANGE:
            return {
                ...state,
                keys: action.keys
            }
        default:
            return state
    }
}

export default onAction
