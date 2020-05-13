/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-09 17:22
 */
import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { FAVORITE_STORAGE_KEY, GLOBAL_BACKGROUND_COLOR } from '../configs'
import FlatListComponent from '../components/FlatListComponent'
import RepositoryItem from '../components/RepositoryItem'
import storeUtils from '../stores/storeUtils'
import NoContent from '../components/NoContent'
import DeleteButton from '../components/DeleteButton'
import actions from '../stores/actions'

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
            this.setState({
                favoriteItems: res
            })
        }).catch(err => {
            console.log(err)
        })
    }

    componentWillUnmount () {
        if (!this.isChanged) return
        storeUtils.set(FAVORITE_STORAGE_KEY, this.state.favoriteItems).catch(console.log)
        this.props.updateFavoriteItems(this.state.favoriteItems)
    }

    renderItem (data) {
        const { navigation: { navigate } } = this.props
        return <RepositoryItem
            data={data}
            onClick={_ => {
                navigate('Detail', { ...data })
            }}
            rightTopButton={(<DeleteButton
                    data={data}
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0
                    }}
                    onDelete={() => this.deleteFavorite(data)}
                />
            )}
            showLanguageTag={true}
        />
    }

    deleteFavorite (data) {
        let oldList = this.state.favoriteItems
        let index = oldList.findIndex(item => item.id === data.id)
        if (index > -1) {
            oldList.splice(index, 1)
            this.setState({
                favoriteItems: oldList
            })
            this.isChanged = true
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
                            disableRefresh={true}
                            disableLoadMore={true}
                        />
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(Favorite)
