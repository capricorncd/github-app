/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-01 23:39
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import RepositoryItemList from '../components/RepositoryItemList'
import storeUtils from '../stores/storeUtils'
import { DEV_LANGUAGES_STORAGE_KEY, FAVORITE_STORAGE_KEY } from '../configs'
import { DL_ANNUAL_LEAGUE_TABLE } from '../configs/developmentLanguages'
import actions from '../stores/actions/index'
import appUtils from '../utils'

const Tab = createMaterialTopTabNavigator()

class Home extends Component {
    constructor (props) {
        super(props)
        this.state = {
            keys: []
        }
        this.initFavorites()
        this.initDevLanguages()
    }

    static getDerivedStateFromProps (props, state) {
        if (props.keys && !appUtils.equals(props.keys, state.keys)) {
            return {
                keys: props.keys
            }
        }
        return null
    }

    initDevLanguages () {
        storeUtils.get(DEV_LANGUAGES_STORAGE_KEY).then(res => {
            let cacheList = res.filter(item => item.isChecked).sort((a, b) => a.order - b.order).map(item => item.text)
            this.setState({
                keys: cacheList.length > 0 ? cacheList : DL_ANNUAL_LEAGUE_TABLE
            })
        }).catch(err => {
            console.log('Error', err)
            this.setState({
                keys: DL_ANNUAL_LEAGUE_TABLE
            })
        })
    }

    initFavorites () {
        storeUtils.get(FAVORITE_STORAGE_KEY).then(res => {
            this.props.updateFavoriteItems(res)
        }).catch(err => {
            console.log(err)
        })
    }

    createTabScreen (list) {
        return list.map(item => {
            return <Tab.Screen name={item} key={item} component={RepositoryItemList}/>
        })
    }

    render () {
        return (
            this.state.keys.length > 0
                ? <Tab.Navigator
                    tabBarOptions={{
                        scrollEnabled: true,
                        upperCaseLabel: false
                    }}
                    lazy={true}
                >
                    {this.createTabScreen(this.state.keys)}
                </Tab.Navigator>
                : null
        )
    }
}

const mapStateToProps = state => ({
    keys: state.devLanguages.keys,
    favoriteItems: state.favorite.items
})

const mapDispatchToProps = {
    updateFavoriteItems: actions.updateFavoriteItems
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)