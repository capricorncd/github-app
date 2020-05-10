/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-10 14:24
 */
import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { COLORS_GRAY_LIGHT, GLOBAL_BACKGROUND_COLOR } from '../configs'
import Icons from './Icons'

export default class NoContent extends Component {
    render () {
        return (
            <View style={styles.wrapper}>
                <Icons name={'cloudo'} style={{ color: COLORS_GRAY_LIGHT, fontSize: 42 }}/>
                <Text style={{ color: COLORS_GRAY_LIGHT }}>No Content</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: GLOBAL_BACKGROUND_COLOR
    }
})