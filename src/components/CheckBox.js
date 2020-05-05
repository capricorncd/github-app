/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-04 22:40
 */
import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { COLORS_BORDER, COLORS_GRAY, COLORS_GRAY_LIGHT, COLORS_PRIMARY, COLORS_WHITE } from '../configs'

const defaultBoxStyles = {
    borderRadius: 2,
    borderColor: COLORS_GRAY,
    borderWidth: 1,
    width: 18,
    height: 18
}

/**
 * checkbox item
 */
export default class CheckBox extends Component {
    constructor (props) {
        super(props)
        this.state = {
            data: this.props.data || {}
        }
        this.handleChange = this.updateState.bind(this)
    }

    async updateState () {
        let data = {
            ...this.state.data,
            isChecked: !this.state.data.isChecked
        }
        await this.setState({
            data
        })
        const { onChange } = this.props
        if (typeof onChange === 'function') onChange(data)
    }

    render () {
        return <TouchableOpacity
            style={checkBoxStyles.wrapper}
            onPress={this.handleChange}
        >
            <Box
                value={this.state.data.isChecked}
                style={{ alignSelf: 'center', marginLeft: 8 }}
            />
            <Text
                style={{ color: COLORS_PRIMARY, marginLeft: 4, marginRight: 50 }}
                numberOfLines={1}
            >{this.state.data.text}</Text>
        </TouchableOpacity>
    }
}


class Box extends Component {
    render () {
        let { style, value } = this.props
        let styles = {
            ...defaultBoxStyles,
            ...style
        }
        return <View style={styles}>
            <Text
                style={{
                    borderWidth: 2,
                    borderColor: COLORS_WHITE,
                    borderRadius: 1,
                    backgroundColor: value ? COLORS_GRAY_LIGHT : COLORS_WHITE,
                    width: '100%',
                    height: '100%'
                }}
            />
        </View>
    }
}

export const checkBoxStyles = StyleSheet.create({
    wrapper: {
        width: '50%',
        backgroundColor: '#fff',
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS_BORDER,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center'
    }
})