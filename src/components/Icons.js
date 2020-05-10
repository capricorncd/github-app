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
        name: 'star'
    },
    staro: {
        name: 'staro'
    },
    fork: {
        Icon: MaterialCommunityIcons,
        name: 'source-fork'
    },
    left: {
        name: 'left'
    },
    right: {
        name: 'right'
    },
    bars: {
        name: 'bars'
    },
    github: {
        name: 'github'
    },
    weChat: {
        name: 'wechat'
    },
    search: {
        name: 'search1'
    },
    bili: {
        name: 'playcircleo'
    },
    mail: {
        name: 'mail'
    },
    feedback: {
        name: 'message1'
    },
    source: {
        name: 'folderopen'
    },
    design: {
        name: 'paperclip'
    },
    selection: {
        name: 'form'
    },
    sort: {
        name: 'profile'
    },
    setting: {
        name: 'setting'
    },
    meh: {
        name: 'meh'
    },
    close: {
        name: 'close'
    },
    trending: {
        name: 'areachart'
    },
    cloudo: {
        name: 'cloudo'
    },
    delete: {
        Icon: MaterialCommunityIcons,
        name: 'delete-circle-outline'
    }
}

export default class Icons extends Component {
    render () {
        const { Icon = AntDesign, name = 'questioncircleo' } = ICONS[this.props.name] || {}
        const { style } = this.props
        return <Icon name={name} style={style}/>
    }
}