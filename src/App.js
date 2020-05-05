/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-02 11:13
 */
import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { View, Text, Button, TouchableOpacity } from 'react-native'
import { Provider } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'
import store from './stores/index'
import NavigationBar from './components/NavigationBar'
import Icons from './components/Icons'
/** pages */
import Home from './pages/Home'
import Profile from './pages/Profile'
import Detail from './pages/Detail'
import Settings from './pages/Settings'
import DLSelection from './pages/DLSelection'
import DLSorting from './pages/DLSorting'

const Stack = createStackNavigator()

export default class App extends Component {
    handleHomeOptions ({ navigation, route }) {
        return {
            title: 'Github',
            headerLeft: params => {
                return <TouchableOpacity
                    style={{
                        height: '100%',
                        width: 44,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={_ => navigation.navigate('Settings')}
                >
                    <Icons
                        name="setting"
                        style={{ color: '#fff', fontSize: 24, opacity: 0.4 }}
                    />
                </TouchableOpacity>
            },
            headerRight: (params) => {
                return <TouchableOpacity
                    style={{
                        height: '100%',
                        width: 44,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={_ => navigation.navigate('Settings')}
                >
                    <Icons
                        name="search"
                        style={{ color: '#fff', fontSize: 24, opacity: 0.4 }}
                    />
                </TouchableOpacity>
            }
        }
    }

    handleDetailOptions ({ navigation, route }) {
        return {
            title: null,
        }
    }

    render () {
        return (
            <Provider store={store}>
                <NavigationBar>
                    <Stack.Navigator>
                        <Stack.Screen
                            name="Home"
                            component={Home}
                            options={params => this.handleHomeOptions(params)}
                        />
                        <Stack.Screen
                            name="Profile"
                            component={Profile}/>
                        <Stack.Screen
                            name="Detail"
                            component={Detail}
                            options={params => this.handleDetailOptions(params)}
                        />
                        <Stack.Screen
                            name="Settings"
                            component={Settings}
                        />
                        <Stack.Screen
                            name="DLSelection"
                            component={DLSelection}
                        />
                        <Stack.Screen
                            name="DLSorting"
                            component={DLSorting}
                        />
                    </Stack.Navigator>
                </NavigationBar>
            </Provider>
        )
    }
}
