/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-05 21:52
 */
import React, { Component } from 'react'
import { View, TextInput, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import Icons from './Icons'
import { COLORS_BORDER, COLORS_GRAY_LIGHT, COLORS_PRIMARY, COLORS_WHITE, DEV_LANGUAGES_STORAGE_KEY } from '../configs'
import storeUtils from '../stores/storeUtils'
import { originalDevLanguages } from '../configs/developmentLanguages'

export const SEARCH_WRAPPER_HEIGHT = 48
const INPUT_HEIGHT = 32
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

const { height, width } = Dimensions.get('window')

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
        this.keyword = item.text
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(item.text)
        }
    }

    render () {
        const { theme, style, inputStyles, placeholder, placeholderTextColor } = this.props

        // let isEmptyList = this.state.list.length === 0

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
                        style={{
                            position: 'absolute',
                            zIndex: 1,
                            top: (SEARCH_WRAPPER_HEIGHT - INPUT_HEIGHT) / 2,
                            right: 10,
                            height: INPUT_HEIGHT,
                            width: INPUT_HEIGHT + 12,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Icons
                            name={'search'}
                            style={{
                                marginTop: 2,
                                fontSize: 24,
                                color: COLORS_PRIMARY
                            }}
                        />
                    </TouchableOpacity>
                </View>
                <ResultList
                    list={this.state.list}
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
                style={{
                    paddingLeft: 10,
                    paddingRight: 10,
                    height: 44,
                    borderBottomWidth: i === lastIndex ? 0 : 0.5,
                    borderColor: COLORS_BORDER,
                    backgroundColor: COLORS_WHITE,
                    justifyContent: 'center'
                }}
            >
                <Text numberOfLines={1}>{item.text}</Text>
            </TouchableOpacity>
        })
    }

    render () {
        const { list } = this.props
        let isEmpty = !list || list.length === 0
        return isEmpty ? null : <View
            style={{
                maxHeight: height / 4,
                position: 'absolute',
                zIndex: 10,
                top: SEARCH_WRAPPER_HEIGHT - 4,
                left: 10,
                right: 10,
                shadowColor: COLORS_PRIMARY,
                shadowOffset: { height: 5 },
                shadowOpacity: 0.2,
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
                backgroundColor: COLORS_WHITE,
                paddingBottom: 4
            }}
        >
            <ScrollView
                style={{}}
            >
                {this.createItems(list)}
            </ScrollView>
        </View>
    }
}