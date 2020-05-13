/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-02 23:08
 */
import React, { Component } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const ICONS = {
    bars: {
        name: 'bars'
    },
    bili: {
        name: 'videocamera'
    },
    camera: {
        name: 'camerao'
    },
    close: {
        name: 'close'
    },
    cloudo: {
        name: 'cloudo'
    },
    delete: {
        Icon: MaterialCommunityIcons,
        name: 'delete-circle-outline'
    },
    design: {
        name: 'picture'
    },
    feedback: {
        name: 'message1'
    },
    fork: {
        Icon: MaterialCommunityIcons,
        name: 'source-fork'
    },
    github: {
        name: 'github'
    },
    left: {
        name: 'left'
    },
    mail: {
        name: 'mail'
    },
    meh: {
        name: 'meh'
    },
    right: {
        name: 'right'
    },
    search: {
        name: 'search1'
    },
    selection: {
        name: 'form'
    },
    setting: {
        name: 'setting'
    },
    source: {
        name: 'folderopen'
    },
    sort: {
        name: 'profile'
    },
    star: {
        name: 'star'
    },
    staro: {
        name: 'staro'
    },
    trending: {
        name: 'areachart'
    },
    weChat: {
        name: 'wechat'
    }
}

export default class Icons extends Component {
    render () {
        const { Icon = AntDesign, name = 'questioncircleo' } = ICONS[this.props.name] || {}
        const { style } = this.props
        return <Icon name={name} style={style}/>
    }
}