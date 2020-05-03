/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-02 18:02
 */
import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import appUtils from '../utils'
import Icons from './Icons'

const BOTTOM_ICON_COLOR = '#586069'

export default class RepositoryItem extends Component {
    render () {
        const { data, onClick } = this.props
        return (
            <TouchableOpacity
                onPress={_ => onClick(onClick)}
            >
                <View style={styles.itemWrapper}>
                    <View style={styles.titleWrapper}>
                        <Image
                            style={styles.avatar}
                            source={{ uri: data.avatar }}
                        />
                        <Text
                            style={styles.fullName}
                            numberOfLines={1}
                        >{data.full_name}</Text>
                    </View>
                    {data.description ? <Text style={styles.description}>{data.description}</Text> : null}
                    <View style={styles.bottom}>
                        <View style={styles.bottomItem}>
                            <Icons name={'star'} style={{marginRight: 2, color: BOTTOM_ICON_COLOR}}/>
                            <Text style={styles.bottomText}>{appUtils.formatCount(data.stargazers_count)}</Text>
                            <Icons name={'fork'} style={{marginLeft: 30, marginRight: 2, color: BOTTOM_ICON_COLOR}}/>
                            <Text style={styles.bottomText}>{appUtils.formatCount(data.forks)}</Text>
                        </View>
                        <Text style={styles.bottomText}>{appUtils.formatGitDate(data.updated_at)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    itemWrapper: {
        backgroundColor: '#fff',
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 3,
        borderColor: '#678',
        borderWidth: 0,
        borderRadius: 4,
        shadowColor: 'gray',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 2
    },
    titleWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden'
    },
    avatar: {
        borderRadius: 2,
        height: 22,
        width: 22,
        marginRight: 4,
        backgroundColor: '#999'
    },
    fullName: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 2,
        color: '#24292e',
        width: '90%'
    },
    description: {
        fontSize: 14,
        marginTop: 8,
        color: BOTTOM_ICON_COLOR
    },
    bottom: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8
    },
    bottomItem: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    bottomText: {
      fontSize: 12,
      color: BOTTOM_ICON_COLOR
    }
})