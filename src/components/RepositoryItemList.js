/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-02 17:29
 */
import React, { Component } from 'react'
import { DeviceEventEmitter, View } from 'react-native'
import { GLOBAL_BACKGROUND_COLOR, GITHUB_URL_API, FAVORITE_STORAGE_KEY } from '../configs/index'
import appUtils from '../utils'
import RepositoryItem from './RepositoryItem'
import FlatListComponent from './FlatListComponent'
import { connect } from 'react-redux'
import storeUtils from '../stores/storeUtils'
import actions from '../stores/actions'

class RepositoryItemList extends Component {
    constructor (props) {
        super(props)
        const { route, favorite } = this.props
        this.keyword = appUtils.toGithubQueryKeyword(route.name)
        this.isKeywordChanged = false
        this.state = {
            list: [],
            page: 1
        }
        this.favoriteItems = favorite.list
        this.initFavorites(() => {
            this.getList()
        })
    }

    componentDidMount () {
        DeviceEventEmitter.addListener('detailFavoriteStateChange', data => {
            this.favoriteChange(data)
            let oldList = this.state.list
            if (!Array.isArray(data)) {
                data = [data]
            }
            data.forEach(item => {
                let index = oldList.findIndex(oldItem => item.id === oldItem.id)
                if (index === -1) return
                oldList[index] = {
                    ...item
                }
            })
            // update UI
            this.setState({
                list: oldList
            }, () => {
                alert('setState success')
            })
        })
    }

    componentWillUnmount () {
        DeviceEventEmitter.removeAllListeners('detailFavoriteStateChange')
    }

    initFavorites (callback) {
        storeUtils.get(FAVORITE_STORAGE_KEY).then(res => {
            this.favoriteItems = res
            callback()
        }).catch(err => {
            console.log(err)
            callback()
        })
    }

    getList (isLoadMore) {
        return new Promise((resolve, reject) => {
            let page = this.isKeywordChanged ? 1 : this.state.page
            let oldList = this.isKeywordChanged ? [] : this.state.list
            this.isKeywordChanged = false
            appUtils.fetch(GITHUB_URL_API, { q: this.keyword, sort: 'star', page }).then(res => {
                if (res.items) {
                    let list = formatItemData(res, oldList, this.favoriteItems)
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
        const { navigation: { navigate } } = this.props
        return <RepositoryItem
            data={data}
            onClick={_ => {
                navigate('Detail', { ...data })
            }}
            onFavoriteChange={flag => this.favoriteChange({
                ...data,
                isFavorite: flag
            })}
        />
    }

    favoriteChange (data) {
        if (!Array.isArray(data)) {
            data = [data]
        }
        data.forEach(item => {
            let index = this.favoriteItems.findIndex(oldItem => item.id === oldItem.id)
            if (item.isFavorite) {
                if (index > -1) {
                    this.favoriteItems[index] = item
                } else {
                    this.favoriteItems.unshift(item)
                }
            } else if (index > -1) {
                this.favoriteItems.splice(index, 1)
            }
        })
        storeUtils.set(FAVORITE_STORAGE_KEY, this.favoriteItems).catch(console.log)
        this.props.changeFavorites(this.favoriteItems)
    }

    render () {
        const { theme, route, favorite } = this.props
        this.favoriteItems = favorite.list
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

const mapStateToProps = state => ({
    theme: state.theme,
    favorite: state.favorite
})

const mapDispatchToProps = {
    changeFavorites: actions.changeFavorites
}

export default connect(mapStateToProps, mapDispatchToProps)(RepositoryItemList)
