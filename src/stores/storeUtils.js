/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-02 14:17
 */
import AsyncStorage from '@react-native-community/async-storage'
import { STORAGE_CACHE_MILLISECOND } from '../configs/index'

const storeUtils = {
    /**
     * set local storage data
     * @param key
     * @param data
     * @param hasTimeLimit
     * @returns {Promise<R>}
     */
    set (key, data, hasTimeLimit = false) {
        return new Promise((resolve, reject) => {
            if (!key || !data) {
                throw new Error(`storeUtils.set(key, data[, hasTimeLimit]) error, valid key[${key}] or data${data}`)
            }
            if (hasTimeLimit) {
                data = {
                    data,
                    cacheTimeLimit: +new Date()
                }
            }
            AsyncStorage.setItem(key, JSON.stringify(data)).then(resolve).catch(reject)
        })
    },
    /**
     * get local storage data
     * @param key string or array
     * @returns {Promise<R>}
     */
    get (key) {
        return new Promise(async (resolve, reject) => {
            try {
                if (key instanceof Array) {
                    let res = await AsyncStorage.multiGet(key)
                    let list = res.map(arr => {
                        return getCacheData(JSON.parse(arr[1]))
                    })
                    resolve(list)
                } else {
                    let res = await AsyncStorage.getItem(key)
                    if (res) {
                        resolve(getCacheData(JSON.parse(res)))
                    } else {
                        reject(new Error(`storeUtils.get(${key}) is ${res}`))
                    }
                }
            } catch (e) {
                console.error(e)
                reject(e)
            }
        })

    },
    remove (key) {
        return AsyncStorage.removeItem(key)
    },
    clear () {
        return AsyncStorage.clear()
    },
    getAllKeys () {
        return AsyncStorage.getAllKeys()
    }
}

/**
 * get cache data
 * @param obj
 * @returns {*}
 */
function getCacheData (obj) {
    // has cache time limit
    if (obj && obj.hasOwnProperty('cacheTimeLimit')) {
        return +new Date() - obj.cacheTimeLimit > STORAGE_CACHE_MILLISECOND
            ? null : obj.data
    }
    return obj
}

export default storeUtils