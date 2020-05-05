/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-03 13:57
 */
import React, { Component } from 'react'
import { WebView } from 'react-native-webview'

export default class Detail extends Component {
    render () {
        console.log('Detail', this.props)
        const data = this.props.route.params
        return (
            <WebView
                source={{ uri: data.url }}
                startInLoadingState={true}
            />
        )
    }
}