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
    },
    left: {
        Icon: AntDesign,
        name: 'left'
    },
    right: {
        Icon: AntDesign,
        name: 'right'
    },
    bars: {
        Icon: AntDesign,
        name: 'bars'
    },
    github: {
        Icon: AntDesign,
        name: 'github'
    },
    weChat: {
        Icon: AntDesign,
        name: 'wechat'
    },
    search: {
        Icon: AntDesign,
        name: 'search1'
    },
    bili: {
        Icon: AntDesign,
        name: 'playcircleo'
    },
    mail: {
        Icon: AntDesign,
        name: 'mail'
    },
    feedback: {
        Icon: AntDesign,
        name: 'message1'
    },
    source: {
        Icon: AntDesign,
        name: 'folderopen'
    },
    design: {
        Icon: AntDesign,
        name: 'paperclip'
    },
    selection: {
        Icon: AntDesign,
        name: 'form'
    },
    sort: {
        Icon: AntDesign,
        name: 'profile'
    },
    setting: {
        Icon: AntDesign,
        name: 'setting'
    },
    meh: {
        Icon: AntDesign,
        name: 'meh'
    }
}

const defaultIcon = {
    Icon: AntDesign,
    name: 'questioncircleo'
}

export default class Icons extends Component {
    render () {
        const {Icon, name} = ICONS[this.props.name] || defaultIcon
        const { style } = this.props
        return (
            <Icon
                name={name}
                style={style}
            />
        )
    }
}