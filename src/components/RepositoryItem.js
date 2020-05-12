/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-02 18:02
 */
import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import appUtils from '../utils'
import Icons from './Icons'
import { COLORS_GRAY, COLORS_PRIMARY, GLOBAL_BACKGROUND_COLOR, COLORS_WHITE, COLORS_GRAY_LIGHT } from '../configs/index'
import { getLangColor } from '../configs/developmentLanguages'

export default class RepositoryItem extends Component {
    render () {
        const { data, onClick, rightTopButton, showLanguageTag } = this.props
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
                        >{data.title}</Text>
                        {rightTopButton}
                    </View>
                    {data.description ? <Text style={styles.description}>{data.description}</Text> : null}
                    <View style={styles.bottomWrapper}>
                        {
                            showLanguageTag ? <View style={[styles.bottomItem, { minWidth: '25%' }]}>
                                <Text style={[styles.languageTag, { backgroundColor: getLangColor(data.language) }]}/>
                                <Text style={styles.bottomText}>{data.language}</Text>
                            </View> : null
                        }
                        <View style={styles.bottomItem}>
                            <Icons name={'star'} style={{ marginRight: 2, color: COLORS_GRAY }}/>
                            <Text style={styles.bottomText}>{appUtils.formatCount(data.stargazers_count)}</Text>
                        </View>
                        <View style={styles.bottomItem}>
                            <Icons name={'fork'} style={{ marginLeft: 30, marginRight: 2, color: COLORS_GRAY }}/>
                            <Text style={styles.bottomText}>{appUtils.formatCount(data.forks)}</Text>
                        </View>
                        <Text style={styles.updateDate}>{appUtils.formatGitDate(data.updated_at)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    itemWrapper: {
        backgroundColor: COLORS_WHITE,
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 4,
        borderWidth: 0,
        borderRadius: 4,
        shadowColor: COLORS_GRAY_LIGHT,
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
        backgroundColor: GLOBAL_BACKGROUND_COLOR
    },
    fullName: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 2,
        color: COLORS_PRIMARY,
        width: '80%'
    },
    description: {
        fontSize: 14,
        marginTop: 8,
        color: COLORS_GRAY
    },
    bottomWrapper: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8
    },
    bottomItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '20%'
    },
    languageTag: {
        marginRight: 2,
        width: 10,
        height: 10,
        borderRadius: 5,
        overflow: 'hidden'
    },
    bottomText: {
        fontSize: 12,
        color: COLORS_GRAY
    },
    updateDate: {
        position: 'absolute',
        top: 0,
        right: 0,
        fontSize: 12,
        color: COLORS_GRAY
    }
})