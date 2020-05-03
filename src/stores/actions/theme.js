/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-02 15:54
 */
import types from '../types'

const changeTheme = (color) => {
    return {
        type: types.THEME_CHANGE,
        color
    }
}

export {
    changeTheme
}