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
    position: 'absolute',
    top: 0,
    right: 0,
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center'
}

export default class FavoriteButton extends Component {
    constructor (props) {
        super(props)
        this.state = {
            isFavorite: props.data.isFavorite || false
        }
    }

    static getDerivedStateFromProps (props, state) {
        if (state.isFavorite !== props.isFavorite) {
            return {
                isFavorite: props.data.isFavorite
            }
        }
        return null
    }

    onPress () {
        let value = !this.state.isFavorite
        // fix change isFavorite failed, props change before getDerivedStateFromProps()
        this.props.data.isFavorite = value
        this.props.onChange && this.props.onChange(value)
        this.setState({
            isFavorite: value
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
