/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-05-02 14:17
 */
const defaultFetchOptions = {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: 'JSON.stringify(data)' // body data type must match "Content-Type" header
}

const appUtils = {
    /**
     * create request uri parameter
     * @param params
     * @param prefix
     * @returns {string}
     */
    createURIParams (params, prefix = '') {
        if (!params || typeof params !== 'object') return prefix
        let str = prefix + '?'
        Object.keys(params).forEach(key => {
            str += `${key}=${params[key]}&`
        })
        return str.substring(0, str.length - 1)
    },
    /**
     * fetch
     * @param url
     * @param params
     * @returns {Promise<R>}
     */
    fetch (url, params) {
        return new Promise(async (resolve, reject) => {
            if (!url) {
                throw new Error(`appUtils.fetch(url[, params]) failed, url[${url}], params[${params}]`)
            }
            // arguments check
            if (typeof url === 'object' && typeof params === 'undefined') {
                params = url
                url = params.url || ''
            }
            // handle url
            if (!params || !params.method || params.method.toLowerCase() === 'get') {
                url = appUtils.createURIParams(params, url)
            }
            console.log(url)
            // handle params
            let options = {}
            if (params && typeof params === 'object') {
                Object.keys(defaultFetchOptions).forEach(key => {
                    if (params[key]) options[key] = params[key]
                })
            }
            try {
                let res = await fetch(url, options)
                if (res.ok) {
                    resolve(res.json())
                } else {
                    reject(res)
                }
            } catch (e) {
                console.error('appUtils.fetch()', e)
                reject(e)
            }
        })
    },
    formatDate (str, format = 'yyyy-MM-dd hh:mm') {
        try {
            let date = str instanceof Date ? str : new Date(str)
            let obj = {
                'y+': date.getFullYear(),
                'M+': toDoubleUnit(date.getMonth() + 1),
                'd+': toDoubleUnit(date.getDate()),
                'h+': toDoubleUnit(date.getHours()),
                'm+': toDoubleUnit(date.getMinutes()),
                's+': toDoubleUnit(date.getSeconds())
            }
            for (let reg in obj) {
                if (new RegExp(`(${reg})`).test(format)) {
                    format = format.replace(RegExp.$1, obj[reg])
                }
            }
            return format
        } catch (e) {
            return str
        }
    },
    formatCount (num) {
        try {
            num = parseInt(num)
            if (num > 1000) {
                num = parseInt(num / 100) / 10
                return num + 'k'
            }
        } catch (e) {
        }
        return num
    },
    formatGitDate (str) {
        try {
            let date = str instanceof Date ? str : new Date(str)
            let year = date.getFullYear()
            let month = date.getMonth()
            let day = date.getDate()
            let h = date.getHours()
            let now = new Date()
            if (year === now.getFullYear()) {
                if (month === now.getMonth()) {
                    if (day === now.getDate()) {
                        if (h === now.getHours()) {
                            return `${Math.max(now.getMinutes() - date.getMinutes(), 1)} minutes ago`
                        } else {
                            return `${now.getHours() - h} hours ago`
                        }
                    } else {
                        let days = now.getDate() - day
                        return days === 1 ? 'yesterday' : `${days} days ago`
                    }
                } else {
                    return `${now.getMonth() - month} months ago`
                }
            } else {
                return `${now.getFullYear() - year} years ago`
            }
        } catch (e) {
            console.error(e)
        }
        return str
    },
    /**
     * array equals
     * @param arr1
     * @param arr2
     * @returns {boolean}
     */
    equals (arr1, arr2) {
        let len = arr1.length
        if (arr2.length !== len) return false
        for (let i = 0; i < len; i++) {
            if (arr1[i] !== arr2[i]) return false
        }
        return true
    },
    toGithubQueryKeyword (str) {
        return str ? str.toLowerCase().trim().replace(/\s/g, '-') : str
    }
}

function toDoubleUnit (str) {
    str = str + ''
    return str[1] ? str : ('0' + str)
}

export default appUtils