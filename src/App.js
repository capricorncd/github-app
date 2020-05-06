/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-02 11:13
 */
import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
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
import Search from './pages/Search'
import { COLORS_WHITE } from './configs'

const Stack = createStackNavigator()

export default class App extends Component {
    constructor (props) {
        super(props)
        // disable warning
        console.disableYellowBox = true
    }

    handleHomeOptions ({ navigation, route }) {
        return {
            title: 'Github',
            headerLeft: params => {
                return <TouchableOpacity
                    style={styles.tabButtonWrapper}
                    onPress={_ => navigation.navigate('Settings')}
                >
                    <Icons
                        name="setting"
                        style={styles.tabButtonIcon}
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
                    onPress={_ => navigation.navigate('Search')}
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
            title: null
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
                        <Stack.Screen name="Profile" component={Profile}/>
                        <Stack.Screen
                            name="Detail"
                            component={Detail}
                            options={params => this.handleDetailOptions(params)}
                        />
                        <Stack.Screen name="Settings" component={Settings}/>
                        <Stack.Screen name="DLSelection" component={DLSelection}/>
                        <Stack.Screen name="DLSorting" component={DLSorting}/>
                        <Stack.Screen name="Search" component={Search}/>
                    </Stack.Navigator>
                </NavigationBar>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    tabButtonWrapper: {
        height: '100%',
        width: 44,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabButtonIcon: {
        color: COLORS_WHITE,
        fontSize: 24,
        opacity: 0.4
    }
})