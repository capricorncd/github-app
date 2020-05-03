/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-02 23:08
 */
import React, { Component } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const ICONS = {
    star: {
        Icon: AntDesign,
        name: 'star'
    },
    fork: {
        Icon: MaterialCommunityIcons,
        name: 'source-fork'
    }
}

export default class Icons extends Component {
    render () {
        const {Icon, name} = ICONS[this.props.name] || {}
        const { style } = this.props
        return (
            <Icon
                name={name}
                style={style}
            />
        )
    }
}