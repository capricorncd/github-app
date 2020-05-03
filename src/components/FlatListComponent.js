/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-03 08:28
 */
import React, { Component } from 'react'
import { View, Text, StyleSheet, RefreshControl, FlatList, ActivityIndicator } from 'react-native'

const REFRESH_START = 'REFRESH_START'
const REFRESH_SUCCESS = 'REFRESH_SUCCESS'
const REFRESH_FAILED = 'REFRESH_FAILED'

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
        this.props.onRefresh().then(_ => {
            this.setState({
                refreshState: REFRESH_SUCCESS
            })
        }).catch(err => {
            this.setState({
                refreshState: REFRESH_FAILED
            })
            alert(err.message)
        })
    }

    _onLoadMore () {
        if (this.state.loadMoreState === LOAD_MORE_START) return
        this.setState({
            loadMoreState: LOAD_MORE_START
        })
        this.props.onLoadMore().then(_ => {
            this.setState({
                loadMoreState: LOAD_MORE_SUCCESS
            })
        }).catch(err => {
            this.setState({
                loadMoreState: LOAD_MORE_FAILED
            })
            alert(err.message)
        })
    }

    render () {
        const { theme, renderItem, list, keyExtractor } = this.props
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
                    return this.state.loadMoreState === LOAD_MORE_START ? null : <View style={styles.genIndicator}>
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
    genIndicator: {
        alignItems: 'center'
    },
    activityIndicator: {
        margin: 10
    }
})