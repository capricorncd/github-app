/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-04 14:02
 */
import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Alert, Linking } from 'react-native'
import Clipboard from '@react-native-community/clipboard'
import { COLORS_GRAY_LIGHT, COLORS_PRIMARY, GLOBAL_BACKGROUND_COLOR, SETTINGS_ITEMS } from '../configs'
import Icons from '../components/Icons'

export default class Settings extends Component {
    handleClick (item) {
        const { navigation } = this.props
        // url
        if (item.url) {
            navigation.navigate('Detail', { ...item })
        }
        // page
        else if (item.page) {
            navigation.navigate(item.page, { ...item })
        }
        // text
        else if (item.value) {
            Clipboard.setString(item.value)
            Alert.alert('Copy Successful.')
        }
        // mail
        else if (item.mail) {
            Linking.canOpenURL(`mailto:${item.mail}`).then(async _ => {
                await Linking.openURL(`mailto:${item.mail}`)
            }).catch(err => {
                console.log(err)
                Clipboard.setString(item.mail)
                Alert.alert('Copy Successful to mail address.')
            })
        }
        else {
            Alert.alert('', item.url || item.value || item.text)
        }
    }

    handleItemRight (item) {
        return typeof item.value !== 'undefined'
            ?
            <View style={styles.rightTextWrapper}><Text style={{ color: COLORS_GRAY_LIGHT }}>{item.value}</Text></View>
            : <View style={styles.rightButton}><Icons name="right" style={{ fontSize: 16, color: COLORS_GRAY_LIGHT }}/></View>
    }

    createItems () {
        let result = []
        SETTINGS_ITEMS.forEach(item => {
            if (item.title) {
                result.push(<View style={styles.titleWrapper} key={item.title}>
                    <Text style={styles.titleText}>{item.title}</Text>
                </View>)
            }
            result.push(<TouchableOpacity
                style={styles.itemWrapper}
                onPress={_ => this.handleClick(item)}
                key={item.text}
            >
                <Icons
                    name={item.name}
                    style={styles.icon}
                />
                <Text style={styles.text}>{item.text}</Text>
                {this.handleItemRight(item)}
            </TouchableOpacity>)
        })
        return result
    }

    render () {
        return (
            <SafeAreaView>
                <ScrollView style={{ backgroundColor: GLOBAL_BACKGROUND_COLOR }}>
                    {this.createItems()}
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const border = {
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee'
}


const styles = StyleSheet.create({
    titleWrapper: {
        height: 30,
        justifyContent: 'center',
        ...border
    },
    titleText: {
        marginLeft: 10,
        color: COLORS_GRAY_LIGHT
    },
    itemWrapper: {
        height: 60,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        ...border
    },
    icon: {
        marginLeft: 10,
        fontSize: 20,
        width: 30,
        color: COLORS_GRAY_LIGHT
    },
    text: {
        color: COLORS_PRIMARY
    },
    rightButton: {
        position: 'absolute',
        right: 0,
        top: 0,
        height: '100%',
        width: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    rightTextWrapper: {
        position: 'absolute',
        right: 15,
        top: 0,
        height: '100%',
        justifyContent: 'center'
    }
})