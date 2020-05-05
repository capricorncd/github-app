/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-02 15:54
 */
import types from '../types'

const changeDevLangKeys = (keys) => {
    return {
        type: types.SELECTED_DEV_LANGUAGES_CHANGE,
        keys
    }
}

export {
    changeDevLangKeys
}