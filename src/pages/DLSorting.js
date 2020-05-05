/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-05 11:19
 */
import React, { Component } from 'react'
import { Alert, Text, TouchableHighlight } from 'react-native'
import SortableListView from '../components/SortableListView'
import storeUtils from '../stores/storeUtils'
import {
    COLORS_BORDER,
    COLORS_GRAY_LIGHT,
    COLORS_WHITE,
    DEV_LANGUAGES_STORAGE_KEY,
    GLOBAL_BACKGROUND_COLOR
} from '../configs'
import appUtils from '../utils'
import { connect } from 'react-redux'
import actions from '../stores/actions/index'

class DLSorting extends Component {
    constructor (props) {
        super(props)
        this.state = {
            data: {},
            oldKeys: [],
            keys: [],
            devLanguages: []
        }
        this.initData()
    }

    componentWillUnmount () {
        if (this.state.keys.length > 0 && !appUtils.equals(this.state.oldKeys, this.state.keys)) {
            let devLanguages = this.state.devLanguages
            this.state.keys.forEach((key, i) => {
                let index = devLanguages.findIndex(item => item.text === key)
                devLanguages[index].order = i
            })
            storeUtils.set(DEV_LANGUAGES_STORAGE_KEY, devLanguages).catch(console.log)
            // update to Home tabs
            this.props.changeDevLangKeys(this.state.keys)
        }
    }

    initData () {
        storeUtils.get(DEV_LANGUAGES_STORAGE_KEY).then(res => {
            if (res && res.length > 0) {
                let data = {}
                let targetItems = res.filter(item => item.isChecked)
                let keys = targetItems.sort((a, b) => a.order - b.order).map(item => {
                    data[item.text] = item
                    return item.text
                })
                this.setState({
                    data,
                    oldKeys: [...keys],
                    keys,
                    devLanguages: res
                })
            }
        }).catch(err => {
            console.log('Error', err)
            Alert.alert(err.message())
        })
    }

    forceUpdate (from, to) {
        let keys = [...this.state.keys]
        keys.splice(to, 0, keys.splice(from, 1)[0])
        this.setState({
            keys
        })
    }

    render () {
        let order = this.state.keys
        return (
            <SortableListView
                style={{ flex: 1, backgroundColor: GLOBAL_BACKGROUND_COLOR }}
                data={this.state.data}
                order={order}
                onRowMoved={({ from, to }) => {
                    this.forceUpdate(from, to)
                }}
                renderRow={row => <RowComponent data={row}/>}
            />
        )
    }
}

class RowComponent extends React.Component {
    render () {
        return (
            <TouchableHighlight
                underlayColor={COLORS_GRAY_LIGHT}
                style={{
                    padding: 25,
                    backgroundColor: COLORS_WHITE,
                    borderBottomWidth: 0.5,
                    borderColor: COLORS_BORDER
                }}
                {...this.props.sortHandlers}
            >
                <Text>{this.props.data.text}</Text>
            </TouchableHighlight>
        )
    }
}

const mapDispatchToProps = {
    changeDevLangKeys: actions.changeDevLangKeys
}

export default connect(null, mapDispatchToProps)(DLSorting)