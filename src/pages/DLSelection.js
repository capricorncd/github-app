/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-04 20:45
 */
import React, { Component } from 'react'
import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import { devLanguages } from '../configs/developmentLanguages'
import CheckBox, { checkBoxStyles } from '../components/CheckBox'
import storeUtils from '../stores/storeUtils'
import { COLORS_GRAY_LIGHT, GLOBAL_BACKGROUND_COLOR, DEV_LANGUAGES_STORAGE_KEY } from '../configs'
import actions from '../stores/actions'
import { connect } from 'react-redux'
import appUtils from '../utils'

/**
 * Development Language Selection
 */
class DLSelection extends Component {
    constructor (props) {
        super(props)
        this.state = {
            devLanguages: []
        }
        this.originalSelectedKeys = []
        this.getDevLanguages()
    }

    getDevLanguages () {
        storeUtils.get(DEV_LANGUAGES_STORAGE_KEY).then(res => {
            this.setState({
                devLanguages: res
            })
            this.originalSelectedKeys = res.filter(item => item.isChecked)
                .sort((a, b) => a.order - b.order)
                .map(item => item.text)
        }).catch(err => {
            console.log('Error', err)
            this.setState({
                // after storeUtils.get()
                devLanguages: devLanguages
            })
        })
    }

    createItems () {
        const result = []
        let index = 0
        this.state.devLanguages.forEach((item, i) => {
            // grouping
            if (item.column) {
                // last checkbox item check
                if (index % 2 !== 0) {
                    result.push(<View key={i + 'ColumnLastSpaceItem'} style={checkBoxStyles.wrapper}/>)
                }
                // column
                result.push(<View
                    style={{ height: 30, width: '100%', justifyContent: 'center' }}
                    key={item.column + 'Column'}
                >
                    <Text style={{ marginLeft: 10, color: COLORS_GRAY_LIGHT }}>{item.column}</Text>
                </View>)
                // reset index = 0
                index = 0
            }
            // create checkbox item
            result.push(<CheckBox
                key={i}
                data={{ ...item }}
                onChange={data => {
                    this.handleChange(data, i)
                }}
            />)
            index++
        })
        // last item count check
        if (index % 2 === 1) {
            result.push(<View key={index + 'LastSpaceItem'} style={checkBoxStyles.wrapper}/>)
        }
        return result
    }

    handleChange (data, i) {
        this.state.devLanguages[i] = data
        // storeUtils.set(DEV_LANGUAGES_STORAGE_KEY, this.state.devLanguages).catch(console.log)
    }

    componentWillUnmount () {
        let updateKeys = this.state.devLanguages.filter(item => item.isChecked)
            .sort((a, b) => a.order - b.order)
            .map(item => item.text)
        if (!appUtils.equals(updateKeys, this.originalSelectedKeys)) {
            storeUtils.set(DEV_LANGUAGES_STORAGE_KEY, this.state.devLanguages).catch(console.log)
            this.props.changeDevLangKeys(updateKeys)
        }
    }

    render () {
        return (
            <SafeAreaView>
                <ScrollView style={{ backgroundColor: GLOBAL_BACKGROUND_COLOR }}>
                    <View
                        style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}
                    >
                        {this.createItems()}
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const mapDispatchToProps = {
    changeDevLangKeys: actions.changeDevLangKeys
}

export default connect(null, mapDispatchToProps)(DLSelection)
