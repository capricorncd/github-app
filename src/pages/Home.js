/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-01 23:39
 */
import React, { Component } from 'react'
import { View, Button } from 'react-native'
import { connect } from 'react-redux'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import RepositoryItemList from '../components/RepositoryItemList'
import storeUtils from '../stores/storeUtils'
import { DEV_LANGUAGES_STORAGE_KEY, FAVORITE_STORAGE_KEY } from '../configs'
import { DL_ANNUAL_LEAGUE_TABLE } from '../configs/developmentLanguages'
import actions from '../stores/actions/index'
import appUtils from '../utils'
import NoContent from '../components/NoContent'

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
        console.log('getDerivedStateFromProps', props, state)
        if (props.keys && !appUtils.equals(props.keys, state.keys)) {
            return {
                keys: props.keys
            }
        }
        return null
    }

    initDevLanguages () {
        const { updateDevLangKeys } = this.props
        storeUtils.get(DEV_LANGUAGES_STORAGE_KEY).then(res => {
            let cacheList = res.filter(item => item.isChecked).sort((a, b) => a.order - b.order).map(item => item.text)
            // use updateDevLangKeys,
            // Convenient for "static getDerivedStateFromProps()" get props.keys
            updateDevLangKeys(cacheList.length > 0 ? cacheList : DL_ANNUAL_LEAGUE_TABLE)
        }).catch(err => {
            console.log('Error', err)
            // Convenient for "static getDerivedStateFromProps()" get props.keys
            updateDevLangKeys(DL_ANNUAL_LEAGUE_TABLE)
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
        const { navigation } = this.props
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
                : <NoContent
                    content={'No development language subscribed'}
                >
                    <View style={{ marginTop: 50 }}>
                        <Button
                            title={'Select Languages'}
                            onPress={() => navigation.navigate('DLSelection')}
                        />
                    </View>
                </NoContent>
        )
    }
}

const mapStateToProps = state => ({
    keys: state.devLanguages.keys,
    favoriteItems: state.favorite.items
})

const mapDispatchToProps = {
    updateFavoriteItems: actions.updateFavoriteItems,
    updateDevLangKeys: actions.updateDevLangKeys
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)