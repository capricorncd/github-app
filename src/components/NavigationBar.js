/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-01 23:21
 */
import * as React from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { connect } from 'react-redux'
import { COLORS_WHITE, GLOBAL_BACKGROUND_COLOR } from '../configs/index'

class NavigationBar extends React.Component {
    render () {
        const { children, theme } = this.props

        const themeOptions = {
            ...DefaultTheme,
            colors: {
                ...DefaultTheme.colors,
                primary: 'rgba(255, 255, 255, .8)',
                background: GLOBAL_BACKGROUND_COLOR,
                card: theme.color,
                text: COLORS_WHITE,
                border: theme.color
            }
        }

        return (
            <NavigationContainer
                theme={themeOptions}>
                {children}
            </NavigationContainer>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme
})

export default connect(mapStateToProps)(NavigationBar)