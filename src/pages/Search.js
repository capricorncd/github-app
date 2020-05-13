/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-05 21:35
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import SearchBar, { SEARCH_WRAPPER_HEIGHT } from '../components/SearchBar'
import SearchResultList from '../components/SearchResultList'
import storeUtils from '../stores/storeUtils'
import { DEV_LANGUAGES_STORAGE_KEY } from '../configs'
import actions from '../stores/actions/index'
import appUtils from '../utils'

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
            let tempIndex = -1
            this.selectedKeywords.forEach(keyword => {
                tempIndex = this.devLanguages.findIndex(item => item.text.toLowerCase() === keyword.toLowerCase())
                if (tempIndex !== -1) {
                    if (!this.devLanguages[tempIndex].isChecked) {
                        this.devLanguages[tempIndex].isChecked = true
                        hasUpdate = true
                    }
                } else {
                    tempIndex = appUtils.findInsertIndex(keyword, this.devLanguages, 'text')
                    if (tempIndex !== -1) {
                        // insert
                        this.devLanguages.splice(tempIndex + 1, 0, {
                            column: null,
                            text: keyword,
                            isChecked: true,
                            order: 0
                        })
                    } else {
                        // unshift
                        this.devLanguages.unshift({
                            column: null,
                            text: keyword,
                            isChecked: true,
                            order: 0
                        })
                    }
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

    // remove keyword from selectedKeywords
    handleResultError(keyword) {
        let index = this.selectedKeywords.findIndex(item => item === keyword)
        // remove keyword because search result is null
        if (index !== -1) {
            this.selectedKeywords.splice(index, 1)
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
                    onResultError={keyword => this.handleResultError(keyword)}
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
