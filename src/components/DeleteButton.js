/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-10 17:18
 */
import React, { Component } from 'react'
import { TouchableOpacity, Alert } from 'react-native'
import Icons from './Icons'
import { COLORS_PRIMARY } from '../configs'

const defaultStyles = {
    alignItems: 'center',
    justifyContent: 'center'
}

export default class DeleteButton extends Component {
    handlePress () {
        Alert.alert(
            'Warning',
            'Do you want to delete the favorite?',
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
        const { style, iconStyle } = this.props
        return (
            <TouchableOpacity
                style={{ ...defaultStyles, ...style }}
                onPress={() => this.handlePress()}
            >
                <Icons
                    name={'delete'}
                    style={{
                        color: COLORS_PRIMARY,
                        fontSize: 22,
                        ...iconStyle
                    }}
                />
            </TouchableOpacity>
        )
    }
}
