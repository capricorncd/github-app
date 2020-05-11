/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-10 12:16
 */
import React, { Component } from 'react'
import { View, TouchableOpacity, DeviceEventEmitter, Platform } from 'react-native'
import { COLORS_WHITE, HEADER_BACK_CLICK } from '../configs'
import Icons from './Icons'

const defaultWrapperStyles = {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
}

let isIos = Platform.OS === 'ios'

export class HeaderLeftBackButton extends Component {
    render () {
        const { navigation, route, isCustomGoBack } = this.props
        return <TouchableOpacity
            style={{
                ...defaultWrapperStyles,
                width: 40,
                paddingRight: isIos ? 10 : 0
            }}
            onPress={_ => {
                // custom go back when header back button on click
                if (isCustomGoBack) {
                    DeviceEventEmitter.emit(HEADER_BACK_CLICK, { navigation, route })
                } else {
                    navigation.goBack()
                }
            }}
        >
            <LeftArrow/>
        </TouchableOpacity>
    }
}

export class HeaderRightBackButton extends Component {
    render () {
        const { navigation } = this.props
        return <TouchableOpacity
            style={{
                ...defaultWrapperStyles,
                width: 50,
                opacity: 0.6
            }}
            onPress={_ => {
                navigation.goBack()
            }}
        >
            <Icons
                name={'close'}
                style={{
                    color: COLORS_WHITE,
                    fontSize: 24
                }}
            />
        </TouchableOpacity>
    }
}

const publicStyles = {
    width: 15,
    height: 3,
    borderBottomRightRadius: 2,
    borderTopRightRadius: 2,
    backgroundColor: COLORS_WHITE,
}

class LeftArrow extends Component {
    render () {
        publicStyles.height = isIos ? 3 : 2
        return <>
            <View style={{
                ...publicStyles,
                top: 6,
                transform: [{ rotate: '45deg' }]
            }}/>
            <View style={{
                ...publicStyles,
                top: -6,
                transform: [{ rotate: '-45deg' }]
            }}/>
        </>
    }
}