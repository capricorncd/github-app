/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-02 16:51
 */
import types from '../types'

const defaultThemeState = {
    color: '#24292e'
}

const onAction = (state = defaultThemeState, action) => {
    switch (action.type) {
        case types.THEME_CHANGE:
            return {
                ...state,
                color: action.color
            }
        default:
            return state
    }
}

export default onAction
