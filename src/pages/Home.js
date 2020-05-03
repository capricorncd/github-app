/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-01 23:39
 */
import React, { Component } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import RepositoryItemList from '../components/RepositoryItemList'

const Tab = createMaterialTopTabNavigator()

const DEV_LANGUAGE = ['Java', 'C', 'Python', 'C++', 'C#', 'Visual Basic', 'JavaScript', 'PHP', 'SQL', 'R']

export default class Home extends Component {
    createTabScreen () {
        return DEV_LANGUAGE.map(item => {
            return <Tab.Screen name={item} key={item} component={RepositoryItemList}/>
        })
    }

    render () {
        return (
            <Tab.Navigator
                tabBarOptions={{
                    scrollEnabled: true,
                    upperCaseLabel: false
                }}
                lazy={true}
            >
                {this.createTabScreen()}
            </Tab.Navigator>
        )
    }
}