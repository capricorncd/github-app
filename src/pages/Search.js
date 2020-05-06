/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-05 21:35
 */
import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { connect } from 'react-redux'
import SearchBar, { SEARCH_WRAPPER_HEIGHT } from '../components/SearchBar'
import SearchResultList from '../components/SearchResultList'
import storeUtils from '../stores/storeUtils'
import { DEV_LANGUAGES_STORAGE_KEY } from '../configs'
import actions from '../stores/actions/index'

class Search extends Component {
    constructor (props) {
        super(props)
        this.state = {
            keyword: ''
        }
        this.selectedKeywords = []
    }

    onInitDevLang (list) {
        this.devLanguages = list
    }

    componentWillUnmount () {
        if (this.selectedKeywords.length > 0 && this.devLanguages) {
            let hasUpdate = false
            this.devLanguages.forEach((item, i) => {
                if (this.selectedKeywords.includes(item.text) && !item.isChecked) {
                    item.isChecked = true
                    hasUpdate = true
                }
            })
            // has update items
            if (hasUpdate) {
                // join selected development languages to storage
                storeUtils.set(DEV_LANGUAGES_STORAGE_KEY, this.devLanguages).catch(console.log)
                // update home tab keys
                this.props.changeDevLangKeys(this.devLanguages
                    .filter(item => item.isChecked)
                    .sort((a, b) => a.order - b.order)
                    .map(item => item.text)
                )
            }
        }
    }

    onChange (value) {
        this.setState({
            keyword: value
        })
        if (!this.selectedKeywords.includes(value)) {
            this.selectedKeywords.push(value)
        }
    }

    render () {
        const { theme, navigation } = this.props
        return (
            <>
                <SearchBar
                    theme={theme}
                    onChange={value => this.onChange(value)}
                    onInitEnd={list => this.onInitDevLang(list)}
                />
                <SearchResultList
                    navigation={navigation}
                    style={{ marginTop: SEARCH_WRAPPER_HEIGHT }}
                    keyword={this.state.keyword}
                />
            </>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme
})

const mapDispatchToProps = {
    changeDevLangKeys: actions.changeDevLangKeys
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
