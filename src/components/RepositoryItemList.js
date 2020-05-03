/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-02 17:29
 */
import React, { Component } from 'react'
import { View } from 'react-native'
import { BACKGROUND_COLOR, GITHUB_URL_API } from '../configs/index'
import appUtils from '../utils'
import RepositoryItem from './RepositoryItem'
import FlatListComponent from './FlatListComponent'
import { connect } from 'react-redux'

class RepositoryItemList extends Component {
    constructor (props) {
        super(props)
        const { route } = this.props
        this.keyword = route.name.toLowerCase().trim().replace(/\s/g, '-')
        this.state = {
            list: [],
            page: 1
        }
    }

    componentDidMount () {
        this.getList()
    }

    getList (isLoadMore) {
        return new Promise((resolve, reject) => {
            let page = this.state.page
            appUtils.fetch(GITHUB_URL_API, { q: this.keyword, sort: 'star', page }).then(res => {
                if (res.items) {
                    let list = res.items.map(item => {
                        return {
                            id: item.id,
                            full_name: item.full_name,
                            html_url: item.html_url,
                            description: item.description,
                            forks: item.forks,
                            watchers: item.watchers,
                            watchers_count: item.watchers_count,
                            stargazers_count: item.stargazers_count,
                            forks_count: item.forks_count,
                            language: item.language,
                            updated_at: item.updated_at,
                            avatar: item.owner.avatar_url + '&size=64'
                        }
                    })
                    console.log(list)
                    let oldList = this.state.list

                    list.forEach(item => {
                        let index = oldList.findIndex(oldItem => {
                            return oldItem.id === item.id
                        })
                        if (index !== -1) oldList.splice(index, 1)
                    })

                    this.setState({
                        page: ++page,
                        list: isLoadMore ? oldList.concat(list) : list
                    })
                    resolve()
                } else {
                    throw new Error(`RepositoryItemList.getList()'s response items is undefined`)
                }
            }).catch(reject)
        })
    }

    renderItem (data) {
        const { navigation: { navigate } } = this.props
        return <RepositoryItem
            data={data.item}
            onClick={_ => {
                navigate('Detail', { ...data })
            }}
        />
    }

    render () {
        const { theme } = this.props
        return (
            <View style={{ flex: 1, backgroundColor: BACKGROUND_COLOR }}>
                <FlatListComponent
                    list={this.state.list}
                    keyExtractor={item => item.id + ''}
                    theme={theme}
                    onRefresh={_ => this.getList()}
                    onLoadMore={_ => this.getList(true)}
                    renderItem={data => this.renderItem(data)}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme
})

export default connect(mapStateToProps)(RepositoryItemList)
