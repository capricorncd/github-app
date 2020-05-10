/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-09 15:34
 */
import React, { Component } from 'react'
import { Alert, TouchableOpacity } from 'react-native'
import Icons from './Icons'
import { COLORS_PRIMARY } from '../configs'

const defaultStyles = {
    alignItems: 'center',
    justifyContent: 'center'
}

export default class FavoriteButton extends Component {
    constructor (props) {
        super(props)
        this.state = {
            isFavorite: props.isFavorite || false
        }
    }

    onPress () {
        if (this.props.changeConfirm) {
            Alert.alert(
                'Warning',
                'Do you want to change the favorite state?',
                [
                    {
                        text: 'No',
                        onPress: () => {}
                    },
                    {
                        text: 'Yes',
                        onPress: () => {
                            this._handleOnPress()
                        },
                        style: 'cancel'
                    }
                ],
                { cancelable: false }
            )
        } else {
            this._handleOnPress()
        }
    }

    _handleOnPress () {
        let value = !this.state.isFavorite
        this.setState({
            isFavorite: value
        }, () => {
            this.props.onChange && this.props.onChange(value)
        })
    }

    render () {
        const { style, iconStyles } = this.props
        return (
            <TouchableOpacity
                style={{
                    ...defaultStyles,
                    ...style
                }}
                onPress={() => this.onPress()}
            >
                <Icons
                    name={this.state.isFavorite ? 'star' : 'staro'}
                    style={{
                        color: COLORS_PRIMARY,
                        fontSize: 22,
                        ...iconStyles
                    }}
                />
            </TouchableOpacity>
        )
    }
}
