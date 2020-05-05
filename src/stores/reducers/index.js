/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-02 16:51
 */
import { combineReducers } from 'redux'
import theme from './theme'
import devLanguages from './devLanguages'

export default combineReducers({
    theme,
    devLanguages
})