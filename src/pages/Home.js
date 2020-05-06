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
import { DEV_LANGUAGES_STORAGE_KEY } from '../configs'
import { DL_ANNUAL_LEAGUE_TABLE } from '../configs/developmentLanguages'

const Tab = createMaterialTopTabNavigator()

class Home extends Component {
    constructor (props) {
        super(props)
        this.state = {
            devLanguages: []
        }
        this.initDevLanguages()
    }

    initDevLanguages () {
        storeUtils.get(DEV_LANGUAGES_STORAGE_KEY).then(res => {
            let cacheList = res.filter(item => item.isChecked).sort((a, b) => a.order - b.order).map(item => item.text)
            this.setState({
                devLanguages: cacheList.length > 0 ? cacheList : DL_ANNUAL_LEAGUE_TABLE
            })
        }).catch(err => {
            console.log('Error', err)
            this.setState({
                devLanguages: DL_ANNUAL_LEAGUE_TABLE
            })
        })
    }

    createTabScreen (list) {
        // console.log(list)
        return list.map(item => {
            return <Tab.Screen name={item} key={item} component={RepositoryItemList}/>
        })
    }

    render () {
        const { keys } = this.props
        let list = keys && keys.length > 0 ? keys : this.state.devLanguages
        return (
            list.length > 0
                ? <Tab.Navigator
                    tabBarOptions={{
                        scrollEnabled: true,
                        upperCaseLabel: false
                    }}
                    lazy={true}
                >
                    {this.createTabScreen(list)}
                </Tab.Navigator>
                : null
        )
    }
}

const mapStateToProps = state => ({
    keys: state.devLanguages.keys
})

export default connect(mapStateToProps)(Home)