/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-03 13:57
 */
import React, { Component } from 'react'
import { WebView} from 'react-native-webview'

export default class Detail extends Component {
    render () {
        const { item: data } = this.props.route.params
        return (
            <WebView
                source={{uri: data.html_url}}
                startInLoadingState={true}
            />
        )
    }
}