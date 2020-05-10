/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-05 21:52
 */
import React, { Component } from 'react'
import { View, TextInput, Text, TouchableOpacity, ScrollView, Platform, Keyboard, StyleSheet } from 'react-native'
import Icons from './Icons'
import {
    COLORS_BORDER,
    COLORS_GRAY_LIGHT,
    COLORS_PRIMARY,
    COLORS_WHITE,
    DEV_LANGUAGES_STORAGE_KEY
} from '../configs'
import storeUtils from '../stores/storeUtils'
import { originalDevLanguages } from '../configs/developmentLanguages'

export const SEARCH_WRAPPER_HEIGHT = 48
const INPUT_HEIGHT = 36
const DEFAULT_PLACEHOLDER = 'Search or jump to…'

const defaultBarStyles = {
    position: 'absolute',
    zIndex: 9,
    paddingLeft: 10,
    paddingRight: 10,
    height: SEARCH_WRAPPER_HEIGHT,
    width: '100%',
    justifyContent: 'center'
}

const defaultInputStyles = {
    height: INPUT_HEIGHT,
    width: '100%',
    paddingLeft: 8,
    paddingRight: 40,
    paddingTop: 0,
    paddingBottom: 0,
    borderWidth: 0.5,
    borderRadius: 4
}

export default class SearchBar extends Component {
    constructor (props) {
        super(props)
        this.state = {
            list: [],
            isFocus: true
        }
        this.keyword = props.keyword || ''
        this.devLanguages = []
        this._initDevLanguages()
        this.keyboardHandler = this._keyboardHandler.bind(this)
        this.iosKeyboardHeight = 0
    }

    /**
     * init development languages
     * @private
     */
    _initDevLanguages () {
        storeUtils.get(DEV_LANGUAGES_STORAGE_KEY).then(res => {
            this.devLanguages = res
            this.props.onInitEnd(res)
        }).catch(err => {
            console.log('Error', err)
            this.devLanguages = [...originalDevLanguages]
        })
    }

    componentDidMount () {
        Keyboard.addListener('keyboardDidShow', this.keyboardHandler)
    }

    componentWillUnmount () {
        Keyboard.removeListener('keyboardDidShow', this.keyboardHandler)
    }

    _keyboardHandler (e) {
        if (!this.iosKeyboardHeight) {
            this.iosKeyboardHeight = e.endCoordinates.height
        }
    }

    handleChange (value) {
        this.keyword = value
        this.setState({
            list: value
                ? this.devLanguages.filter(item => new RegExp(`^${value}`, 'i').test(item.text))
                : []
        })
    }

    onFocus (isFocus) {
        this.setState({
            isFocus
        })
        if (isFocus && this.textInput) {
            this.textInput.clear()
            this.setState({
                list: []
            })
        }
    }

    handelPress (item) {
        this.setState({
            list: []
        })
        if (!item.text) return
        this.keyword = item.text.trim()
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(this.keyword)
        }
    }

    render () {
        const { theme, style, inputStyles, placeholder, placeholderTextColor } = this.props

        const barStyles = {
            ...defaultBarStyles,
            ...style,
            backgroundColor: theme.color
        }
        const textInputStyles = {
            ...defaultInputStyles,
            ...inputStyles,
            backgroundColor: this.state.isFocus ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.2)'
        }

        return (
            <>
                <View style={barStyles}>
                    <TextInput
                        ref={el => this.textInput = el}
                        style={textInputStyles}
                        onChangeText={value => this.handleChange(value)}
                        value={this.keyword}
                        onBlur={() => this.onFocus(false)}
                        onFocus={() => this.onFocus(true)}
                        placeholder={placeholder || DEFAULT_PLACEHOLDER}
                        placeholderTextColor={placeholderTextColor || COLORS_GRAY_LIGHT}
                        autoCapitalize="none"
                        autoFocus={true}
                    />
                    <TouchableOpacity
                        style={styles.searchBtn}
                        onPress={() => {
                            this.handelPress({ text: this.keyword })
                        }}
                    >
                        <Icons
                            name={'search'}
                            style={styles.searchIcon}
                        />
                    </TouchableOpacity>
                </View>
                <ResultList
                    list={this.state.list}
                    keyboardHeight={this.iosKeyboardHeight}
                    onSelect={item => this.handelPress(item)}
                />
            </>
        )
    }
}

class ResultList extends Component {
    createItems (list) {
        const { onSelect } = this.props
        let lastIndex = list.length - 1
        return list.map((item, i) => {
            return <TouchableOpacity
                key={i}
                onPress={_ => onSelect && onSelect(item)}
                style={[
                    styles.listItemWrapper,
                    { borderBottomWidth: i === lastIndex ? 0 : 0.5 }
                ]}
            >
                <Text numberOfLines={1}>{item.text}</Text>
            </TouchableOpacity>
        })
    }

    render () {
        const { list, keyboardHeight } = this.props
        let isEmpty = !list || list.length === 0
        return isEmpty ? null : <View style={styles.listModelWrapper}>
            <ScrollView
                style={[
                    styles.listInnerWrapper,
                    { bottom: Platform.OS === 'ios' ? keyboardHeight + 20 : 20 }
                ]}
            >
                {this.createItems(list)}
            </ScrollView>
        </View>
    }
}

const styles = StyleSheet.create({
    searchBtn: {
        position: 'absolute',
        zIndex: 1,
        top: (SEARCH_WRAPPER_HEIGHT - INPUT_HEIGHT) / 2,
        right: 10,
        height: INPUT_HEIGHT,
        width: INPUT_HEIGHT + 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchIcon: {
        marginTop: 2,
        fontSize: 24,
        color: COLORS_PRIMARY
    },
    listModelWrapper: {
        position: 'absolute',
        zIndex: 10,
        top: SEARCH_WRAPPER_HEIGHT - 4,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },
    listInnerWrapper: {
        position: 'absolute',
        top: 0,
        left: 10,
        right: 10,
        backgroundColor: COLORS_WHITE,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        paddingBottom: 4
    },
    listItemWrapper: {
        paddingLeft: 10,
        paddingRight: 10,
        height: 44,
        borderColor: COLORS_BORDER,
        backgroundColor: COLORS_WHITE,
        justifyContent: 'center'
    }
})