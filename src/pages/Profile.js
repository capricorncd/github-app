/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-01 23:33
 */
import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class Profile extends Component {
    render () {
        return (
            <View style={styles.wrapper}>
                <Text>Profile</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#678'
    }
})