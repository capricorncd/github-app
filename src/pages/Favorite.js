/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-09 17:22
 */
import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import actions from '../stores/actions'
import { FAVORITE_STORAGE_KEY, GLOBAL_BACKGROUND_COLOR } from '../configs'
import FlatListComponent from '../components/FlatListComponent'
import RepositoryItem from '../components/RepositoryItem'
import storeUtils from '../stores/storeUtils'
import NoContent from '../components/NoContent'

class Favorite extends Component {
    constructor (props) {
        super(props)
        this.state = {
            favoriteItems: []
        }
        this.initFavorites()
    }

    initFavorites () {
        storeUtils.get(FAVORITE_STORAGE_KEY).then(res => {
            console.log('FAVORITE_STORAGE_KEY', res)
            this.setState({
                favoriteItems: res
            })
        }).catch(err => {
            console.log(err)
        })
    }

    componentWillUnmount () {
        this.props.changeFavorites(this.state.favoriteItems)
        storeUtils.set(FAVORITE_STORAGE_KEY, this.state.favoriteItems).catch(console.log)
    }

    renderItem (data) {
        const { navigation: { navigate } } = this.props
        return <RepositoryItem
            data={data}
            onClick={_ => {
                navigate('Detail', { ...data })
            }}
            onFavoriteChange={flag => this.favoriteChange({ ...data, isFavorite: flag })}
            changeConfirm={true}
        />
    }

    favoriteChange (data) {
        let oldList = this.state.favoriteItems
        let index = oldList.findIndex(item => item.id === data.id)
        if (index > -1) {
            oldList.splice(index, 1)
            this.setState({
                favoriteItems: oldList
            })
        }
    }

    render () {
        const { theme } = this.props
        return (
            <View style={{ flex: 1, backgroundColor: GLOBAL_BACKGROUND_COLOR }}>
                {
                    this.state.favoriteItems.length === 0
                        ? <NoContent/>
                        : <FlatListComponent
                            list={this.state.favoriteItems}
                            keyExtractor={item => item.id + ''}
                            theme={theme}
                            renderItem={data => this.renderItem(data.item)}
                            disabledLoadMore={true}
                        />
                }
            </View>
        )
    }
}

const mapStateToProps = state => ({
    favorite: state.favorite,
    theme: state.theme
})

const mapDispatchToProps = {
    changeFavorites: actions.changeFavorites
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorite)
