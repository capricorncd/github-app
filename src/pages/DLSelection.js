/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-04 20:45
 */
import React, { Component } from 'react'
import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import { originalDevLanguages } from '../configs/developmentLanguages'
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
            elList: []
        }
        this.devLanguages = []
        this.originalSelectedKeys = []
        this.initDevLanguages(this.createItems.bind(this))
    }

    initDevLanguages (callback) {
        storeUtils.get(DEV_LANGUAGES_STORAGE_KEY).then(res => {
            this.devLanguages = res
            callback()
            this.originalSelectedKeys = res.filter(item => item.isChecked)
                .sort((a, b) => a.order - b.order)
                .map(item => item.text)
        }).catch(err => {
            console.log('Error', err)
            this.devLanguages = [...originalDevLanguages]
            callback()
        })
    }

    createItems () {
        const result = []
        let index = 0
        this.devLanguages.forEach((item, i) => {
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

        // Optimize render that development language CheckBox
        this.setState({
            elList: result.slice(0, 50)
        })
        let total = result.length
        let currentLen = 50
        let timer = setInterval(() => {
            currentLen += 100
            this.setState({
                elList: result.slice(0, Math.min(currentLen, total))
            })
            if (currentLen > total) clearInterval(timer)
        }, 300)
    }

    handleChange (data, i) {
        this.devLanguages[i] = data
    }

    componentWillUnmount () {
        let updateKeys = this.devLanguages.filter(item => item.isChecked)
            .sort((a, b) => a.order - b.order)
            .map(item => item.text)
        if (!appUtils.equals(updateKeys, this.originalSelectedKeys)) {
            storeUtils.set(DEV_LANGUAGES_STORAGE_KEY, this.devLanguages).catch(console.log)
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
                        {this.state.elList}
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
