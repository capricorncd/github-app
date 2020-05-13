/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-09 17:22
 */
import types from '../types'

const updateFavoriteItems = (items) => {
    return {
        type: types.FAVORITE_CHANGE,
        items
    }
}

export {
    updateFavoriteItems
}