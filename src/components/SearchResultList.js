/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-02 17:29
 */
import React, { Component } from 'react'
import { View } from 'react-native'
import {
    GLOBAL_BACKGROUND_COLOR,
    GITHUB_URL_API, FAVORITE_STORAGE_KEY
} from '../configs/index'
import appUtils from '../utils'
import RepositoryItem from './RepositoryItem'
import FlatListComponent from './FlatListComponent'
import { connect } from 'react-redux'
import { formatItemData, handleFavoriteChange } from './RepositoryItemList'
import FavoriteButton from './FavoriteButton'
import actions from '../stores/actions'
import storeUtils from '../stores/storeUtils'

class SearchResultList extends Component {
    constructor (props) {
        super(props)
        this.keyword = appUtils.toGithubQueryKeyword(props.keyword)
        this.isKeywordChanged = false
        this.state = {
            list: [],
            page: 1
        }
    }

    componentDidMount () {
        this.getList()
    }

    componentWillUnmount () {
        if (this.isFavoriteChanged) {
            const { favoriteItems, updateFavoriteItems } = this.props
            updateFavoriteItems([...favoriteItems])
            storeUtils.set(FAVORITE_STORAGE_KEY, favoriteItems).catch(console.log)
        }
    }

    getList (isLoadMore) {
        return new Promise((resolve, reject) => {
            // keyword change check
            if (!this.keyword) {
                this.setState({
                    list: []
                }, resolve)
                return
            }
            // page and reset isKeywordChanged
            let page = this.isKeywordChanged ? 1 : this.state.page
            let oldList = this.isKeywordChanged ? [] : this.state.list
            this.isKeywordChanged = false

            appUtils.fetch(GITHUB_URL_API, { q: this.keyword, sort: 'star', page }).then(res => {
                // keyword result check
                if (res?.total_count === 0) {
                    this.props.onResultError(this.keyword)
                    resolve()
                    return
                }
                if (res.items) {
                    let list = formatItemData(res, oldList, this.props.favoriteItems)
                    this.setState({
                        page: ++page,
                        list: isLoadMore ? oldList.concat(list) : list
                    }, resolve)
                } else {
                    throw new Error(`SearchResultList.getList()'s response items is undefined`)
                }
            }).catch(reject)
        })
    }

    renderItem (data) {
        const { navigation: { navigate }, favoriteItems } = this.props
        return <RepositoryItem
            data={data}
            onClick={_ => {
                navigate('Detail', { ...data })
            }}
            rightTopButton={(
                <FavoriteButton
                    data={data}
                    isFavorite={data.isFavorite}
                    onChange={flag => {
                        this.isFavoriteChanged = true
                        data.isFavorite = flag
                        handleFavoriteChange(data, favoriteItems)
                    }}/>
            )}
        />
    }

    render () {
        const { theme, keyword, style } = this.props
        let newKeyword = appUtils.toGithubQueryKeyword(keyword)
        this.isKeywordChanged = newKeyword !== this.keyword
        this.keyword = newKeyword
        if (this.isKeywordChanged) {
            this.getList()
        }
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: GLOBAL_BACKGROUND_COLOR,
                    ...style
                }}>
                <FlatListComponent
                    list={this.state.list}
                    keyExtractor={item => item.id + ''}
                    theme={theme}
                    onRefresh={_ => this.getList()}
                    onLoadMore={_ => this.getList(true)}
                    renderItem={data => this.renderItem(data.item)}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme,
    favoriteItems: state.favorite.items
})

const mapDispatchToProps = {
    updateFavoriteItems: actions.updateFavoriteItems
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultList)
