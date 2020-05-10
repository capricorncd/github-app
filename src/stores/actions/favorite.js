/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-09 17:22
 */
import types from '../types'

const changeFavorites = (list) => {
    return {
        type: types.SELECTED_DEV_LANGUAGES_CHANGE,
        list
    }
}

export {
    changeFavorites
}