/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-03 13:57
 */
import React, { Component } from 'react'
import { DeviceEventEmitter } from 'react-native'
import { WebView } from 'react-native-webview'
import { HEADER_BACK_CLICK } from '../configs'

export default class Detail extends Component {
    constructor (props) {
        super(props)
        this.headerBackClickHandler = this._handleGoBack.bind(this)
    }

    componentDidMount () {
        DeviceEventEmitter.addListener(HEADER_BACK_CLICK, this.headerBackClickHandler)
    }

    componentWillUnmount () {
        DeviceEventEmitter.removeListener(HEADER_BACK_CLICK, this.headerBackClickHandler)
    }

    _handleGoBack ({ navigation }) {
        if (this.canGoBack) {
            this.webView.goBack()
        } else {
            navigation.goBack()
        }
    }

    render () {
        const { route } = this.props
        let data = route?.params || {}
        return (
            <WebView
                ref={el => this.webView = el}
                source={{ uri: data.url }}
                startInLoadingState={true}
                onNavigationStateChange={navState => {
                    this.canGoBack = navState.canGoBack
                }}
            />
        )
    }
}