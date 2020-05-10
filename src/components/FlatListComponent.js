/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-03 08:28
 */
import React, { Component } from 'react'
import { Alert, View, Text, StyleSheet, RefreshControl, FlatList, ActivityIndicator } from 'react-native'
// refresh state
const REFRESH_START = 'REFRESH_START'
const REFRESH_SUCCESS = 'REFRESH_SUCCESS'
const REFRESH_FAILED = 'REFRESH_FAILED'
// load more state
const LOAD_MORE_START = 'LOAD_MORE_START'
const LOAD_MORE_SUCCESS = 'LOAD_MORE_SUCCESS'
const LOAD_MORE_FAILED = 'LOAD_MORE_FAILED'

export default class FlatListComponent extends Component {
    constructor (props) {
        super(props)
        this.state = {
            refreshState: REFRESH_SUCCESS,
            loadMoreState: LOAD_MORE_SUCCESS
        }
    }

    _onRefresh () {
        if (this.state.refreshState === REFRESH_START) return
        this.setState({
            refreshState: REFRESH_START
        })
        const { onRefresh } = this.props
        if (typeof onRefresh === 'function') {
            onRefresh().then(_ => {
                this.setState({
                    refreshState: REFRESH_SUCCESS
                })
            }).catch(err => {
                this.setState({
                    refreshState: REFRESH_FAILED
                })
                Alert.alert(err.message)
            })
        }
    }

    _onLoadMore () {
        if (this.state.loadMoreState === LOAD_MORE_START) return
        this.setState({
            loadMoreState: LOAD_MORE_START
        })
        const { onLoadMore } = this.props
        if (typeof onLoadMore === 'function') {
            onLoadMore().then(_ => {
                this.setState({
                    loadMoreState: LOAD_MORE_SUCCESS
                })
            }).catch(err => {
                this.setState({
                    loadMoreState: LOAD_MORE_FAILED
                })
                Alert.alert(err.message)
            })
        }
    }

    render () {
        const { theme, renderItem, list, keyExtractor, disabledLoadMore } = this.props
        const themeColor = theme.color
        return (
            <FlatList
                data={list}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                refreshControl={
                    <RefreshControl
                        title={'loading'}
                        titleColor={themeColor}
                        colors={[themeColor]}
                        refreshing={this.state.refreshState === REFRESH_START}
                        onRefresh={_ => this._onRefresh()}
                        tintColor={themeColor}
                    />
                }
                ListFooterComponent={_ => {
                    return disabledLoadMore || this.state.loadMoreState === LOAD_MORE_START || list.length === 0
                        ? null
                        : <View style={styles.wrapper}>
                            <ActivityIndicator
                                style={styles.activityIndicator}
                            />
                            <Text>Loading</Text>
                        </View>
                }}
                onEndReached={_ => {
                    console.log('======onEndReached======')
                    this._onLoadMore()
                }}
                onEndReachedThreshold={0.5}
                onMomentumScrollBegin={_ => {
                    console.log('=====onMomentumScrollBegin=========')
                }}
            />
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center'
    },
    activityIndicator: {
        margin: 10
    }
})