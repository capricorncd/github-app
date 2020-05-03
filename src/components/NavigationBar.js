/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-01 23:21
 */
import 'react-native-gesture-handler'
import * as React from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { connect } from 'react-redux'

class NavigationBar extends React.Component {
    render () {
        const { children, theme } = this.props

        const themeOptions = {
            ...DefaultTheme,
            colors: {
                ...DefaultTheme.colors,
                primary: 'rgba(255, 255, 255, .8)',
                background: '#f1f2f3',
                card: theme.color,
                text: '#fff',
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