/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-03 13:57
 */
import React, { Component } from 'react'
import { AppState, DeviceEventEmitter } from 'react-native'
import { WebView } from 'react-native-webview'
import { HEADER_BACK_CLICK } from '../configs'

export default class Detail extends Component {
    constructor (props) {
        super(props)
        this.headerBackClickHandler = this._handleGoBack.bind(this)
        this.appStateChangeHandler = this._appStateChangeHandler.bind(this)
    }

    componentDidMount () {
        DeviceEventEmitter.addListener(HEADER_BACK_CLICK, this.headerBackClickHandler)
        AppState.addEventListener('change', this.appStateChangeHandler)
    }

    componentWillUnmount () {
        DeviceEventEmitter.removeListener(HEADER_BACK_CLICK, this.headerBackClickHandler)
        AppState.removeEventListener('change', this.appStateChangeHandler)
    }

    /**
     * app state change
     * @param e
     * @private
     */
    _appStateChangeHandler (e) {
        if (e === 'active' && this.isWebviewProcessTerminated) {
            this.webView.reload()
            this.isWebviewProcessTerminated = false
        }
    }

    _handleGoBack ({ navigation }) {
        if (this.canGoBack) {
            this.webView.goBack()
        } else {
            navigation.goBack()
        }
    }

    /**
     * WebView state change
     * @param type
     * @param e
     */
    webViewStateChangeHandler (type, navState) {
        // console.log(type, navState)
        switch (type) {
            // Webview Process Terminated
            case 'onContentProcessDidTerminate':
                this.isWebviewProcessTerminated = true
                break
            // onNavigationStateChange
            case 'onNavigationStateChange':
                this.canGoBack = navState.canGoBack
                break
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
                onNavigationStateChange={params => this.webViewStateChangeHandler('onNavigationStateChange', params)}
                onError={params => this.webViewStateChangeHandler('onError', params)}
                onLoad={params => this.webViewStateChangeHandler('onLoad', params)}
                onLoadEnd={params => this.webViewStateChangeHandler('onLoadEnd', params)}
                onLoadStart={params => this.webViewStateChangeHandler('onLoadStart', params)}
                onLoadProgress={params => this.webViewStateChangeHandler('onLoadProgress', params)}
                onHttpError={params => this.webViewStateChangeHandler('onHttpError', params)}
                onMessage={params => this.webViewStateChangeHandler('onMessage', params)}
                onContentProcessDidTerminate={params => this.webViewStateChangeHandler('onContentProcessDidTerminate', params)}
            />
        )
    }
}