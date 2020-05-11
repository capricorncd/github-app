/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-08 23:56
 */
import React, { Component } from 'react'
import { View, Text, Platform, Dimensions } from 'react-native'
import { COLORS_WHITE } from '../configs'

// tab button width
export const TAB_BUTTON_WIDTH = 44
const windowWidth = Dimensions.get('window').width

const defaultStyles = {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: TAB_BUTTON_WIDTH,
    marginRight: TAB_BUTTON_WIDTH
}

export default class HeaderTitle extends Component {
    render () {
        const { title, wrapperStyles, textStyles } = this.props
        const styles = {
            ...defaultStyles,
            ...wrapperStyles
        }
        // fix bug that text too long out of screen of android navigator
        if (Platform.OS === 'android') {
            styles.width = windowWidth - TAB_BUTTON_WIDTH * 2
        }
        return <View style={styles}>
            <Text
                numberOfLines={1}
                style={{
                    color: COLORS_WHITE,
                    fontSize: 17,
                    fontWeight: 'bold',
                    ...textStyles
                }}
            >{title}</Text>
        </View>
    }
}