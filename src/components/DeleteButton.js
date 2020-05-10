/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-10 17:18
 */
import React, { Component } from 'react'
import { TouchableOpacity, Alert } from 'react-native'
import Icons from './Icons'
import { COLORS_GRAY_LIGHT } from '../configs'

const defaultStyles = {
    alignItems: 'center',
    justifyContent: 'center'
}

export default class DeleteButton extends Component {
    handlePress (data) {
        Alert.alert(
            'Warning',
            `Do you want to remove the "${data.title}"?`,
            [
                {
                    text: 'No',
                    onPress: () => {
                    }
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        this.props.onDelete()
                    },
                    style: 'cancel'
                }
            ],
            { cancelable: false }
        )
    }

    render () {
        const { style, iconStyle, data } = this.props
        return (
            <TouchableOpacity
                style={{ ...defaultStyles, ...style }}
                onPress={() => this.handlePress(data)}
            >
                <Icons
                    name={'delete'}
                    style={{
                        color: COLORS_GRAY_LIGHT,
                        fontSize: 22,
                        ...iconStyle
                    }}
                />
            </TouchableOpacity>
        )
    }
}
