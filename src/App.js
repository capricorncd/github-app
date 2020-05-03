/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-02 11:13
 */
import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'
import store from './stores/index'
import NavigationBar from './components/NavigationBar'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Detail from './pages/Detail'

const Stack = createStackNavigator()

export default class App extends Component {
    render () {
        return (
            <Provider store={store}>
                <NavigationBar>
                    <Stack.Navigator>
                        <Stack.Screen
                            name="Home"
                            component={Home}
                            options={{ title: 'Github' }}
                        />
                        <Stack.Screen name="Profile" component={Profile}/>
                        <Stack.Screen name="Detail" component={Detail}/>
                    </Stack.Navigator>
                </NavigationBar>
            </Provider>
        )
    }
}
