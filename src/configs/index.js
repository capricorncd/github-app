/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-02 14:31
 */
import { SETTINGS_ITEMS } from './settings'

/** Time */
const STORAGE_CACHE_MILLISECOND = 8 * 3600000
/** cache key */
const DEV_LANGUAGES_STORAGE_KEY = 'devLanguages'
const FAVORITE_STORAGE_KEY = 'favoriteStorageKey'

/** Color */
const GLOBAL_BACKGROUND_COLOR = '#f1f2f3'
const COLORS_PRIMARY = '#24292e'
const COLORS_GRAY = '#586069'
const COLORS_GRAY_LIGHT = '#6a737d'
const COLORS_BORDER = '#eaecef'
const COLORS_WHITE = '#fff'

/** uri */
const GITHUB_URL_API = 'https://api.github.com/search/repositories'
const REQUEST_PAGE_SIZE = 30

export {
    COLORS_BORDER,
    COLORS_GRAY,
    COLORS_GRAY_LIGHT,
    COLORS_PRIMARY,
    COLORS_WHITE,
    DEV_LANGUAGES_STORAGE_KEY,
    FAVORITE_STORAGE_KEY,
    GITHUB_URL_API,
    GLOBAL_BACKGROUND_COLOR,
    REQUEST_PAGE_SIZE,
    STORAGE_CACHE_MILLISECOND,
    SETTINGS_ITEMS
}