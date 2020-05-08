/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-08 23:56
 */
import React, { Component } from 'react'
import { View, Text, Platform } from 'react-native'
import { COLORS_WHITE } from '../configs'

// tab button width
export const TAB_BUTTON_WIDTH = 44

export default class HeaderTitle extends Component {
    render () {
        const { title, wrapperStyles, textStyles } = this.props
        return <View
            style={{
                height: '100%',
                justifyContent: 'center',
                marginLeft: Platform.OS === 'ios' ? TAB_BUTTON_WIDTH : 0,
                marginRight: TAB_BUTTON_WIDTH,
                ...wrapperStyles
            }}
        >
            <Text
                numberOfLines={1}
                style={{
                    color: COLORS_WHITE,
                    fontSize: 17,
                    fontWeight: '600',
                    ...textStyles
                }}
            >{title}</Text>
        </View>
    }
}