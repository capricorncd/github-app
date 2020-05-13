/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-02 17:29
 */
import React, { Component } from 'react'
import { View } from 'react-native'
import {
    GLOBAL_BACKGROUND_COLOR,
    GITHUB_URL_API,
    FAVORITE_STORAGE_KEY
} from '../configs/index'
import appUtils from '../utils'
import RepositoryItem from './RepositoryItem'
import FlatListComponent from './FlatListComponent'
import { connect } from 'react-redux'
import storeUtils from '../stores/storeUtils'
import FavoriteButton from './FavoriteButton'
import actions from '../stores/actions'

class RepositoryItemList extends Component {
    constructor (props) {
        super(props)
        const { route } = this.props
        this.keyword = appUtils.toGithubQueryKeyword(route.name)
        this.isKeywordChanged = false
        this.state = {
            list: [],
            page: 1
        }
    }

    componentDidMount () {
        this.getList()
    }

    static getDerivedStateFromProps (props, state) {
        return {
            list: state.list.map(item => {
                item.isFavorite = props.favoriteItems.some(fav => fav.id === item.id)
                return item
            })
        }
    }

    getList (isLoadMore) {
        return new Promise((resolve, reject) => {
            let page = this.isKeywordChanged ? 1 : this.state.page
            let oldList = this.isKeywordChanged ? [] : this.state.list
            this.isKeywordChanged = false
            appUtils.fetch(GITHUB_URL_API, { q: this.keyword, sort: 'star', page }).then(res => {
                if (res.items) {
                    let list = formatItemData(res, oldList, this.props.favoriteItems)
                    this.setState({
                        page: ++page,
                        list: isLoadMore ? oldList.concat(list) : list
                    }, resolve)
                } else {
                    throw new Error(`RepositoryItemList.getList()'s response items is undefined`)
                }
            }).catch(reject)
        })
    }

    renderItem (data) {
        const { navigation: { navigate }, favoriteItems, updateFavoriteItems } = this.props
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
                        data.isFavorite = flag
                        handleFavoriteChange(data, favoriteItems, updateFavoriteItems)
                    }}/>
            )}
        />
    }

    render () {
        const { theme, route } = this.props
        let newKeyword = appUtils.toGithubQueryKeyword(route.name)
        this.isKeywordChanged = this.keyword !== newKeyword
        this.keyword = newKeyword
        return (
            <View style={{ flex: 1, backgroundColor: GLOBAL_BACKGROUND_COLOR }}>
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

/**
 * format list item data
 * @param res
 * @param oldList
 * @returns {*}
 */
export function formatItemData (res, oldList, favoriteItems = []) {
    let list = res.items.map(item => {
        return {
            id: item.id,
            title: item.full_name,
            url: item.html_url,
            description: item.description,
            forks: item.forks,
            watchers: item.watchers,
            watchers_count: item.watchers_count,
            stargazers_count: item.stargazers_count,
            forks_count: item.forks_count,
            language: item.language,
            updated_at: item.updated_at,
            avatar: item.owner?.avatar_url + '&size=64',
            isFavorite: favoriteItems.some(o => o.id === item.id)
        }
    })

    // duplicate removal
    if (oldList.length > 0) {
        list.forEach(item => {
            let index = oldList.findIndex(oldItem => {
                return oldItem.id === item.id
            })
            if (index !== -1) oldList.splice(index, 1)
        })
    }
    return list
}

/**
 * handle favorite change
 * @param data change item
 * @param oldList old favorite list
 * @param updateFavoriteItems
 */
export function handleFavoriteChange (data, oldList, updateFavoriteItems) {
    let item = { ...data }
    let index = oldList.findIndex(oldItem => item.id === oldItem.id)
    if (item.isFavorite) {
        if (index > -1) {
            oldList[index] = item
        } else {
            oldList.unshift(item)
        }
    } else if (index > -1) {
        oldList.splice(index, 1)
    }
    if (updateFavoriteItems) {
        storeUtils.set(FAVORITE_STORAGE_KEY, oldList).catch(console.log)
        updateFavoriteItems(oldList)
    }
}

const mapStateToProps = state => ({
    theme: state.theme,
    favoriteItems: state.favorite.items
})

const mapDispatchToProps = {
    updateFavoriteItems: actions.updateFavoriteItems
}

export default connect(mapStateToProps, mapDispatchToProps)(RepositoryItemList)