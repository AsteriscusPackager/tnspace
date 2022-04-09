/*
 * ************************************************************************************** *
 * *****     ****     ******         ********         *******     ****  ****   *****   ** *
 * *****  *   **   *  ****      ***    ****    *****    *****  *   ***  *****  ******* ** *
 * *****  **  *   **  ****       ****  ****  *********  *****  **   **  *****  ********** *
 * *****  ***    ***  ****      ***    ****    *****    *****  ***   *  *****  ********** *
 * ****   **********  ******         ********         ******   *****    *****        **** *
 * ************************************************************************************** *
 */
    
window['__debug__'] = new Function('callback', 'if (/127\.0\.0\.1|localhost/.test(location.hostname))callback(console.log)')
window['__qmod__'] = new Function('return !(navigator.userAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || navigator.userAgent.match(/LG|SAMSUNG|Samsung/) != null)')()

window['__moonless'] = {
    version: 'Project;Moonless/1.1.316',
    loader: new Function('fw', 'tm', 'tm(fw)'),
    lslc() {
        if (/base\;moonless\/framework\/\d+\.\d+(\.\d+(\.\d+)?)?/i.test(window['__ml_fw__']['__version'])) {
            ;((...selector) => {
                for (let s of selector) document.body.querySelectorAll(s).forEach(s => s.remove())
            })('script')
            let appMount = (() => {
                let _ = document.createElement('div')
                _.id = 'app-mount'
                document.body.appendChild(_)
                return _
            })()
            window['__ml_fw__']['render'](appMount)
        }
    },
}
window['__ml_fw__'] = {
    __version: 'Base;Moonless/Framework/0.2',
    init: function() {
        if (/project\;moonless\/\d+\.\d\.\d+/i.test(window['__moonless']['version'])) {
            let afterInit = {
                __ml_cache: [],
                __ml_process: 0,
                render: function(root) {
                    for (let temp of window['__ml_fw__']['__ml_cache']) {
                        switch (temp['type']) {
                            case 'add-element':
                                for (let el of temp['value'])
                                try { root.appendChild(el) } catch { return }
                            break
                            case 'element-loaded':
                                if (!temp['value']['delay']) temp['value']['delay'] = 1
                                setTimeout(() => {
                                    temp['value']['appMount'] = root
                                    temp['func'](temp['value'])
                                }, temp['value']['delay'])
                            break
                            case 'global-style':
                                let style = document.createElement('style')
                                style.innerText = temp['value']
                                for (let [name, value] of Object.entries(temp['attribute']))
                                    style.setAttribute(name, value)
                                document.head.appendChild(style)
                            break
                            case 'event-handling':
                                if (!temp['value']['delay']) temp['value']['delay'] = 0
                                temp['value']['origin'].addEventListener(temp['eventType'], event => {
                                    temp['value']['eventMethod'] = event
                                    temp['value']['appMount'] = root
                                    setTimeout(() => {
                                        temp['func'](temp['value'])
                                    }, temp['value']['delay'])
                                })
                            break
                            case 'request-http':
                                fetch(temp['value']['url'])
                                .then(res => {
                                    switch (temp['value']['stream']) {
                                        default:
                                        case 'text': return res.text()
                                        case 'blob': return res.blob()
                                        case 'formdata': return res.formData()
                                        case 'json': return res.json()
                                    }
                                })
                                .then(promise => {
                                    delete temp['value']['url']
                                    delete temp['value']['stream']
                                    temp['value']['promisedResponse'] = promise
                                    temp['func'](temp['value'])
                                })
                                .finally(() => {
                                    setTimeout(() => {
                                        let max = window['__ml_fw__']['__ml_process']
                                        for (let index = 0; index < max; index++) {
                                            window['__ml_fw__']['__ml_cache'].shift()
                                            window['__ml_fw__']['__ml_process']--
                                        }
                                        this.render(root)
                                    }, 100)
                                })
                            break
                            case 'observer':
                                let observer = new MutationObserver(temp['value']['callback'])
                                observer.observe(temp['value']['origin'], temp['value']['config'])
                            break
                            default: break
                        }
                        
                        window['__ml_fw__']['__ml_process']++
                    }
                },
                styleMap: function(map = [{}], attributes = {}) {
                    let mapping = []
                    function getLine(entrie) {
                        let line = []
                        for (let [name, value] of entrie) {
                            let property = []
                            for (let div of name.split(/(?=[A-Z])/g)) {
                                if (/^[A-Z]/.test(div)) {
                                    property.push('-')
                                    property.push(`${div[0].toLowerCase()}${div.slice(1)}`)
                                } else property.push(div)
                            }
                            line.push(`${property.join('')}: ${`${value}`.replace(/^\s+|\s+$/g, '')}`)
                        }
                        return line.join('; ')
                    }
                    for (let m of map) {
                        if (!!m['rule']) {
                            let rule = m['rule'].toLowerCase(), construct = undefined
                            switch (rule) {
                                case 'charset': construct = 'regular'; break
                                case 'import': construct = 'regular'; break
                                case 'namespace': construct = 'regular'; break
                                case 'media': construct = 'nested'; break
                                case 'supports': construct = 'nested'; break
                                case 'document': construct = 'nested'; break
                                case 'page': construct = 'nested'; break
                                case 'font-face': construct = 'nested'; break
                                case 'keyframes': construct = 'nested'; break
                                case 'viewport': construct = 'nested'; break
                                case 'counter-style': construct = 'nested'; break
                                case 'font-feature-values': construct = 'nested'; break
                                default: break
                            }
                            if (construct === 'regular') {
                                let query = m['query']
                                mapping.push(`@${rule} ${query};`)
                            } else if (construct === 'nested') {
                                let name = m['name']
                                let block = m['block'], line = []
                                for (let [offset, identifier] of Object.entries(block)) {
                                    let entrie = Object.entries(identifier)
                                    if (!!name || !!rule || entrie.length > 0)
                                        line.push(`${offset} { ${getLine(entrie)} }`)
                                }
                                mapping.push(`@${rule} ${name} { ${line.join(' ')} }`)
                            } else null
                        } else {
                            let selector = m['selector'], properties = m['property']
                            try {
                                let entries = Object.entries(properties)
                                if (!!selector || entries.length > 0)
                                    mapping.push(`${selector} { ${getLine(entries)} }`)
                            } catch { }
                        }
                    }

                    window['__ml_fw__']['__ml_cache'].push({
                        type: 'global-style',
                        value: mapping.join(' '),
                        attribute: attributes,
                    })
                },
                template: function(map = [{}]) {
                    let stack = []
                    function undo(childs = [], parent) {
                        function element(property = {}) {
                            this.element = null, this.property = property, this.tag = property['tag']

                            if (!!this.property['log']) {
                                if (typeof this.property['log'] === 'string') {
                                    console.log(this.property['log'])
                                } else if (typeof this.property['log'] === 'object') {
                                    try { console.log(...this.property['log']) } catch {}
                                }
                            }

                            if (!!this.property['node']) {
                                for (let node of this.property['node']) {
                                    node['appMount'] = this.property['appMount']
                                    node['eventMethod'] = this.property['eventMethod']
                                    node['type'] = 'property-modifier'
                                    try { node['origin'] = document.querySelector(node['selector'])
                                    } catch { console.warn('The operation was canceled because no selector was specified.', node) }
                                    element(node)
                                }
                            }

                            if (!this.tag) {
                                if (this.property['type'] === 'property-modifier') {
                                } else if (this.property['type'] === 'element-child-control') {
                                } else {
                                    console.error(`Unable to create element because TAG does not exist.`)
                                    return null
                                }
                            }

                            this.element = ((namespace, tag) => {
                                if (this.property['type'] === 'property-modifier') {
                                    return this.property['origin']
                                } else if (this.property['type'] === 'element-child-control') {
                                    return this.property['origin']
                                } else if (!!namespace &&  /(\s+)?http(s)?\:/i.test(namespace) && typeof namespace === 'string')
                                    return document.createElementNS(namespace, tag)
                                else return document.createElement(tag)
                            })(this.property['namespace'], this.tag)

                            if (typeof this.property['check'] === 'boolean') {
                                if (this.property['check'] === false) {
                                    if (!!this.property['not']) {
                                        this.property['not']['type'] = 'property-modifier'
                                        this.property['not']['origin'] = this.property['origin']
                                        return element(this.property['not'])
                                    }
                                    return null
                                }
                            }

                            if (!!this.property['data'] && typeof this.property['data'] === 'object') {
                                for (let [name, value] of Object.entries(this.property['data']))
                                    this.element.setAttribute(`data-${name}`, value)
                            }
                            if (!!this.property['attr'] && typeof this.property['attr'] === 'object') {
                                for (let [name, value] of Object.entries(this.property['attr']))
                                    this.element.setAttribute(name, value)
                            }

                            if (!!this.property['class']) {
                                if (typeof this.property['class'] === 'object')
                                    this.element.classList.add(...this.property['class'])
                                else if (typeof this.property['class'] === 'string')
                                    this.element.classList.add(...this.property['class'].split(/\s/))
                            }

                            if (!!this.property['style'] && typeof this.property['style'] === 'object') {
                                let style = [], property = {}
                                for (let [name, value] of Object.entries(this.property['style'])) {
                                    if (typeof this.element.style[name] !== 'undefined') {
                                        let properties = []
                                        for (let div of name.split(/(?=[A-Z])/g)) {
                                            if (/^[A-Z]/.test(div)) {
                                                properties.push('-')
                                                properties.push(`${div[0].toLowerCase()}${div.slice(1)}`)
                                            } else properties.push(div)
                                        }
                                        property[properties.join('')] = value
                                    }
                                }
                                if (!!this.element.getAttribute('style')) {
                                    style = this.element.getAttribute('style').split(/;/)
                                    function rearrange() {
                                        let entries = Object.entries(property)
                                        let [name, value] = entries[0]
                                        style = style.filter(f => !(new RegExp(`(\s+)?${name}`, 'i')).test(f))
                                        style.push(`${name}: ${value}`)
                                        delete property[name]

                                        if (entries.length - 1 > 0) return rearrange()
                                        return style.filter(f => 0 < f.length)
                                    }
                                    style = rearrange()
                                } else {
                                    for (let [name, value] of Object.entries(property))
                                        style.push(`${name}: ${value}`)
                                }
                                this.element.setAttribute('style', style.join('; '))
                            }
                            
                            if (!!this.property['text'] && typeof this.property['text']) {
                                this.element.textContent = this.property['text']
                            }

                            if (!!this.property['lang'] && typeof this.property['lang'] === 'object') {
                                for (let [name, property] of Object.entries(this.property['lang'])) {
                                    const lang = document.querySelector('html').lang
                                    if (lang === name) {
                                        delete this.property['lang']
                                        for (let [key, value] of Object.entries(property))
                                            this.property[key] = value
                                        return element(this.property)
                                    }
                                }
                                for (let [key, value] of Object.entries(this.property['lang']['en']))
                                    this.property[key] = value
                                delete this.property['lang']
                                return element(this.property)
                            }

                            if (!!this.property['response'] && typeof this.property['response'] === 'object') {
                                if (this.property['type'] === 'element-child-control') {
                                    /* A bug exists where values are not replaced when re-referencing a function */

                                    let promisedResponse = []
                                    if (!Array.isArray(this.property['promisedResponse']))
                                        promisedResponse.push(this.property['promisedResponse'])
                                    else promisedResponse = this.property['promisedResponse']

                                    let rule = ((r) => {
                                        let list = {}
                                        for (let name of this.property['response'][r])
                                            list[name] = 0
                                        return list
                                    })
                                    let ruleAppliedResponse = []
                                    for (let node of promisedResponse) {
                                        for (let [key] of Object.entries(node)) {
                                            if (!!this.property['response']['allow']) {
                                                if (!(key in rule('allow'))) delete node[key]
                                            } else if (!!this.property['response']['deny']) {
                                                if (key in rule('deny')) delete node[key]
                                            }
                                        }
                                        if (!!this.property['response']['replace']) {
                                            for (let [key, value] of Object.entries(node)) {
                                                let replace = this.property['response']['replace']
                                                node[key] = `${value}`.replace(replace['search'], replace['value'])
                                            }
                                        }
                                        ruleAppliedResponse.push(node)
                                    }
                                    delete this.property['response']['allow']
                                    delete this.property['response']['deny']
                                    delete this.property['response']['replace']
                                    this.property['response']['type'] = 'element-child-control'
                                    this.property['response']['promisedResponse'] = ruleAppliedResponse

                                    return element(this.property['response'])
                                }
                            }

                            if (!!this.property['event'] && typeof this.property['event'] === 'object') {
                                for (let [type, property] of Object.entries(this.property['event'])) {
                                    this.property[type] = {
                                        type: 'property-modifier',
                                        origin: this.element,
                                    }
                                    for (let [name, value] of Object.entries(property)) {
                                        this.property[type][name] = value
                                    }
                                    let cacheType = 'event-handling'
                                    let eventType = (type => {
                                        switch (type) {
                                            case 'abort': cacheType = 'element-abort'; break
                                            case 'afterprint': cacheType = 'after-printing'; break
                                            case 'aniend': return 'animationend'
                                            case 'aniiteration': return 'animationiteration'
                                            case 'anistart': return 'animationstart'
                                            case 'appinstalled': cacheType = 'app-installed'; break
                                            case 'beforeprint': cacheType = 'before-printing'; break
                                            case 'beforeunload': cacheType = 'element-before-unload'; break
                                            case 'beginevent': return 'beginEvent'
                                            case 'blocked': ; break
                                            case 'blur': return type
                                            case 'canplay': return type
                                            case 'canplaythrough': return type
                                            case 'change': return type
                                            case 'chargingchange': cacheType = 'battery-changed'; break
                                            case 'chargingtimechange': cacheType = 'battery-time-changed'; break
                                            case 'clicked': return 'click'
                                            case 'close': return type
                                            case 'complete': ; break
                                            case 'compend': return 'compositionend'
                                            case 'compstart': return 'compositionstart'
                                            case 'compupdate': return 'compositionupdate'
                                            case 'contextmenu': return type
                                            case 'copy': return type
                                            case 'cut': return type
                                            case 'double': return 'dblclick'
                                            case 'devicechange': ; break
                                            case 'devicelight': ; break
                                            case 'devicemotion': ; break
                                            case 'deviceorientation': ; break
                                            case 'deviceproximity': ; break
                                            case 'dischargingtimechange': cacheType = 'battery-time-dischanged'; break
                                            case 'downloading': cacheType = type; break
                                            case 'drag': return type
                                            case 'dragend': return type
                                            case 'dragenter': return type
                                            case 'dragleave': return type
                                            case 'dragover': return type
                                            case 'dragstart': return type
                                            case 'drop': return type
                                            case 'durationchange': return type
                                            case 'emptied': return type
                                            case 'ended': return type
                                            case 'endevent': return type
                                            case 'error': return type
                                            case 'loaded': cacheType = 'element-loaded'; break
                                            case 'unload': return type
                                            case 'focus': return type
                                            case 'focusin': return type
                                            case 'focusout': return type
                                            case 'fullscreenchange': cacheType = 'window-fullscreen-changed'; break
                                            case 'fullscreenerror': cacheType = 'window-fullscreen-error'; break
                                            case 'gamepadconnected': cacheType = 'gamepad-connected'; break
                                            case 'gamepaddisconnected': cacheType = 'gamepad-disconnected'; break
                                            case 'gotpointercapture': return type
                                            case 'hashchange': cacheType = 'page-hash-changed'; break
                                            case 'lostpointercapture': return type
                                            case 'input': return type
                                            case 'invalid': return type
                                            case 'keydown': return type
                                            case 'keypress': return type
                                            case 'keyup': return type
                                            case 'langchange': cacheType = 'page-language-changed'; break
                                            case 'levelchange': cacheType = 'battery-level-changed'; break
                                            case 'loadeddata': return type
                                            case 'loadedmetadata': return type
                                            case 'loadend': ; break
                                            case 'loadstart': ; break
                                            case 'message': cacheType = 'received-message'; break
                                            case 'messageerror': cacheType = 'received-message-error'; break
                                            case 'mousedown': return type
                                            case 'mouseenter': return type
                                            case 'mouseleave': return type
                                            case 'mousemove': return type
                                            case 'mouseout': return type
                                            case 'mouseover': return type
                                            case 'mouseup': return type
                                            case 'notificationclick': cacheType = 'notification-clicked'; break
                                            case 'noupdate': ; break
                                            case 'observe': cacheType = 'observer'; break
                                            case 'obsolete': ; break
                                            case 'offline': cacheType = 'page-offline'; break
                                            case 'online': cacheType = 'page-online'; break
                                            case 'open': cacheType = 'open'; break
                                            case 'orientationchange': cacheType = 'orientation-change'; break
                                            case 'pagehide': cacheType = 'page-hide'; break
                                            case 'pageshow': cacheType = 'page-show'; break
                                            case 'paste': return type
                                            case 'pause': return type
                                            case 'pointercancel': return type
                                            case 'pointerdown': return type
                                            case 'pointerenter': return type
                                            case 'pointerleave': return type
                                            case 'pointerlockchange': ; break
                                            case 'pointerlockerror': ; break
                                            case 'pointermove': return type
                                            case 'pointerout': return type
                                            case 'pointerover': return type
                                            case 'pointerup': return type
                                            case 'play': return type
                                            case 'playing': return type
                                            case 'popstate': cacheType = type; break
                                            case 'progress': return type
                                            case 'push': ; break
                                            case 'pushsubscriptionchange': ; break
                                            case 'ratechange': return type
                                            case 'readystatechange': return type
                                            case 'repeatevent': return 'repeatEvent'
                                            case 'reset': return type
                                            case 'resize': return type
                                            case 'resourcetimingbufferfull': ; break
                                            case 'scroll': return type
                                            case 'seeked': return type
                                            case 'seeking': return type
                                            case 'select': return type
                                            case 'selectstart': return type
                                            case 'selectionchange': return type
                                            case 'show': return type
                                            case 'slotchange': return type
                                            case 'stalled': return type
                                            case 'storage': cacheType = type; break
                                            case 'submit': return type
                                            case 'success': cacheType = type; break
                                            case 'suspend': return type
                                            case 'svgabort': return 'SVGAbort'
                                            case 'svgerror': return 'SVGError'
                                            case 'svgload': return 'SVGLoad'
                                            case 'svgresize': return 'SVGResize'
                                            case 'svgscroll': return 'SVGScroll'
                                            case 'svgunload': return 'SVGUnload'
                                            case 'svgzoom': return 'SVGZoom'
                                            case 'timeout': ; break
                                            case 'timeupdate': return type
                                            case 'touchcancel': return type
                                            case 'touchend': return type
                                            case 'touchmove': return type
                                            case 'touchstart': return type
                                            case 'transitionend': return type
                                            case 'unload': cacheType = 'element-unload'; break
                                            case 'updateready': ; break
                                            case 'upgradeneeded': ; break
                                            case 'userproximity': ; break
                                            case 'versionchange': ; break
                                            case 'visibilitychange': cacheType = 'page-visibility-change'; break
                                            case 'volumechanged': return 'volumechange'
                                            case 'waiting': return type
                                            case 'wheel': return type
                                            default: break
                                        }
                                        return 'none'
                                    })(type)
                                    window['__ml_fw__']['__ml_cache'].push({
                                        type: cacheType,
                                        value: this.property[type],
                                        eventType: eventType,
                                        func: element,
                                    })
                                }
                            }

                            if (!!this.property['callback'] && typeof this.property['callback'] === 'function') {
                                if (this.property['type'] === 'property-modifier') {
                                    this.property['callback'](this.property['eventMethod'], this.property['appMount'], this.element)
                                }
                                if (this.property['type'] === 'element-child-control')
                                    this.property['callback'](this.property['promisedResponse'])
                            }

                            if (!!this.property['request'] && typeof this.property['request'] === 'object') {
                                this.property['request']['type'] = 'element-child-control'
                                this.property['request']['origin'] = this.element
                                if (!!this.property['request']['get']) {
                                    for (let node of this.property['promisedResponse']) {
                                        if (this.property['request']['get'] in node) {
                                            let request = {}
                                            for (let [name, value] of Object.entries(this.property['request']))
                                                request[name] = value
                                            request['url'] = node[request['get']]
                                            delete request['get']
                                            delete request['origin']

                                            window['__ml_fw__']['__ml_cache'].push({
                                                type: 'request-http',
                                                value: request,
                                                func: element,
                                            })
                                        }
                                    }
                                } else {
                                    window['__ml_fw__']['__ml_cache'].push({
                                        type: 'request-http',
                                        value: this.property['request'],
                                        func: element,
                                    })
                                }
                            }
                        
                            return this.element
                        }
                        for (let index in childs) {
                            let properties = childs[index]
                            let elem = element(properties)
                            if (!!parent) parent.appendChild(elem)
                            else stack.push(elem)
                            undo(properties['child'], elem)
                        }
                    }
                    undo(map)

                    window['__ml_fw__']['__ml_cache'].push({
                        type: 'add-element',
                        value: stack,
                    })
                },
            }
            for (const [name, value] of Object.entries(afterInit))
                window['__ml_fw__'][name] = value
            delete window['__ml_fw__']['init']
            return true
        }
        console.error(`You don't have a Moonless-Loader, can't run it.`)
        return false
    },
}

;((ml, fw, tpl) => {
    try {window['__debug__']($ => {
        let style = [
            'padding-inline:0 2px',
            'color: hsl(242, 1%, 12%)',
            'background-color:hsl(259, 91%, 63%)',
        ]
        $(`%c| ${ml.version}`, style.join(';'))
    })} catch {}

    ;(function pageLanguage() {
        let mlLn = localStorage['_ml_lang']
        let html = document.querySelector('html')
        let lang = navigator.language.toLowerCase().replace(/(\w+)(-\w+)?/, '$1')
        html.lang = !mlLn ? lang : mlLn
    })()
    
    ml.loader(fw, tpl)
    ml.lslc()
})(window['__moonless'], window['__ml_fw__'], b => {
    b.init()
    b.styleMap([{
        rule: 'import',
        query: 'url(\'https://fonts.cdnfonts.com/css/cedora\')',
    }, {
        selector: '*',
        property: {
            scrollBehavior: 'smooth',
        },
    }, {
        selector: 'html',
        property: {
            fontFamily: 'Cedora,sans-serif',
        },
    }, {
        selector: 'html, body',
        property: {
            backgroundColor: 'hsl(258, 2%, 7%)',
            color: 'hsl(0, 0%, 68%)',
            overflow: 'hidden',
        },
    }, {
        selector: 'body, .app-mount--x1c9ec',
        property: {
            width: '100%',
            height: '100vh',
            margin: 'auto',
        },
    }, {
        selector: '.app-mount--x1c9ec',
        property: {
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
        },
    }, {
        selector: '::-moz-selection',
        property: {
            color: 'hsla(0, 0%, 89%, 100%)',
            backgroundColor: 'hsla(216, 45%, 40%, 100%)',
        },
    }, {
        selector: '::selection',
        property: {
            color: 'hsl(0, 0%, 13%)',
            backgroundColor: 'hsl(266, 2%, 43%)',
        },
    }, {
        selector: '::-webkit-scrollbar',
        property: {
            width: '0px',
            height: '0px',
        },
    }], { title: 'default' })
    b.styleMap([{
        selector: 'header',
        property: {
            display: 'flex',
            position: 'relative',
            overflow: 'hidden',
        },
    }, {
        selector: '.markdown-body',
        property: {
            color: 'hsl(0, 0%, 11%)',
            boxSizing: 'border-box',
        },
    }, {
        selector: '.markdown-body img',
        property: {
            width: '100%',
            height: 'auto',
            maxWidth: 'max-content',
            borderRadius: '4px',
            boxShadow: '0 4px 2em hsla(0, 0%, 0%, 21%)',
        },
    }, {
        selector: '.op--9ih2pc',
        property: {
            backgroundColor: 'hsla(0, 0%, 0%, 38%)',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
            position: 'fixed',
        },
    }, {
        selector: '.base--3dbif2',
        property: {
            display: 'flex',
            flex: '1 1 auto',
        },
    }, {
        selector: '.i-alert--jbvon4',
        property: {
            backgroundColor: 'hsl(0, 0%, 11%)',
            border: '1px solid hsl(0, 0%, 15%)',
            borderRadius: '4px',
            boxShadow: '0 6px 1em hsla(0, 0%, 0%, 26%)',
            minWidth: '8px',
            maxWidth: '392px',
            position: 'absolute',
            overflow: 'hidden',
            zIndex: 2,
        },
    }, {
        selector: '.i-alert--jbvon4 *::-moz-selection',
        property: {
            color: 'hsla(338, 3%, 55%, 100%) !important',
            backgroundColor: 'hsla(0, 0%, 0%, 37%) !important',
        },
    }, {
        selector: '.i-alert--jbvon4 *::selection',
        property: {
            color: 'hsla(338, 3%, 55%, 100%) !important',
            backgroundColor: 'hsla(0, 0%, 0%, 37%) !important',
        },
    }, {
        selector: '.center--h3vlic',
        property: {
            justifyItems: 'center',
            alignItems: 'center',
        },
    }, {
        selector: '.center--2ix3j9',
        property: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            margin: 'auto',
            width: 'max-content',
            height: 'max-content',
        },
    }, {
        selector: '.grid--vsewq0',
        property: {
            display: 'grid',
        },
    }, {
        selector: '.container--8b83k6',
        property: {
            display: 'flex',
            flexDirection: 'row-reverse',
            overflow: 'hidden',
        },
    }, {
        selector: '.container--f3fgp3',
        property: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'grid',
            position: 'absolute',
            gridTemplate: '1fr auto / 1fr',
        },
    }, {
        selector: '.container--euqabh',
        property: {
            height: '100%',
            position: 'relative',
        },
    }, {
        selector: '.wrapper--p5crbc',
        property: {
            display: 'flex',
            flexDirection: 'row',
        },
    }, {
        selector: '.wrapper--n62ezm',
        property: {
            padding: '4px',
        },
    }, {
        selector: '.wrapper--i88nh0',
        property: {
            backgroundColor: 'hsla(0, 0%, 0%, 0%)',
            border: '1px solid transparent',
            padding: '4px',
            borderRadius: '4px',
        },
    }, {
        selector: '.wrapper--i88nh0:hover',
        property: {
            backgroundColor: 'hsl(0, 0%, 10%)',
            border: '1px solid hsl(0, 0%, 13%)',
        },
    }, {
        selector: '.wrapper--5gk8nc',
        property: {
            paddingRight: '12px',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
            lineClamp: 3,
        },
    }, {
        selector: '.wrapper--104xne',
        property: {
            display: 'block',
            position: 'relative',
            listStyleType: 'none',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
        },
    }, {
        selector: '.wrapper--j9npez',
        property: {
            display: 'flex',
            position: 'relative',
            alignItems: 'flex-end',
        },
    }, {
        selector: '.wrapper--6h91vu, .wrapper--7kxayf',
        property: {
            right: 0,
            padding: '0.92em',
            color: 'hsl(0, 0%, 11%)',
            background: 'hsl(0, 0%, 50%)',
            boxShadow: '0 5px 1.7em hsla(0, 0%, 0%, 8%), 0 4px 2em hsla(0, 0%, 0%, 12%)',
            position: 'absolute',
            borderRadius: '4px',
            filter: 'brightness(1.45)',
            zIndex: 4,
        },
    }, {
        selector: '.layer--5fylua',
        property: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            position: 'absolute',
        },
    }, {
        selector: '.layer--z1dvjh',
        property: {
            position: 'relative',
        },
    }, {
        selector: '.layer--391h8c',
        property: {
            width: '100%',
            display: 'grid',
            gridTemplate: 'auto 1fr / 1fr',
        },
    }, {
        selector: '.layer--391h8c header',
        property: {
            backgroundColor: 'hsl(292, 2%, 10%)',
            border: '1px solid hsl(0, 0%, 15%)',
        },
    }, {
        selector: '.layout--266au3',
        property: {
            height: '100%',
            display: 'grid',
            position: 'relative',
            gridTemplate: '1fr / 1fr auto',
            overflow: 'hidden',
        },
    }, {
        selector: '.layout--3ew8px',
        property: {
            paddingTop: '1em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
        },
    }, {
        selector: '.content--3n5zzn',
        property: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            position: 'absolute',
            backgroundColor: 'hsl(274, 4%, 5%)',
            borderBottom: '1px solid hsl(0, 0%, 8%)',
            borderBottomRightRadius: '12px',
            overflow: 'hidden auto',
        },
    }, {
        selector: '.window-title--okhmu8',
        property: {
            backgroundColor: 'hsla(0, 0%, 0%, 21%)',
            borderLeft: '1px solid hsla(0, 0%, 0%, 9%)',
            borderRadius: '4px 0 4px',
        },
    }, {
        selector: '.window-content--80sh30',
        property: {
            marginLeft: '8px',
            padding: '8px 0',
            overflow: 'hidden',
        },
    }, {
        selector: '.pathfind--xpbiis',
        property: {
            left: 0,
            bottom: 0,
            padding: '0 4px',
            color: 'hsl(261, 66%, 58%)',
            backgroundColor: 'hsl(0, 0%, 8%)',
            borderTop: '1px solid hsl(261, 50%, 51%)',
            borderTopRightRadius: '4px',
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            fontSize: '14px',
            zIndex: 1024,
        },
    }, {
        selector: '.pathfind--xpbiis[pointer=unknown]',
        property: {
            borderTop: 0,
            borderRight: 0,
            transition: '',
        },
    }, {
        selector: '.helper-container--0k0gvb',
        property: {
            background: 'hsl(258, 2%, 7%)',
            borderBottom: '1px solid hsl(0, 0%, 49%)',
            position: 'relative',
            direction: 'ltr',
        },
    }, {
        selector: '.fraction--zyr4qj',
        property: {
            display: 'block',
            position: 'relative',
            overflow: 'hidden',
        },
    }, {
        selector: '.fraction--zyr4qj > header',
        property: {
            zIndex: 2,
        },
    }, {
        selector: '.button--iyf24r',
        property: {
            width: '21px',
            height: '21px',
            cursor: 'pointer',
        },
    }, {
        selector: '.paragraph--5e22lv',
        property: {
            padding: '0 10px',
            paddingTop: '0.37em',
            border: '1px solid hsl(0, 0%, 15%)',
            borderTop: 0,
        },
    }, {
        selector: '.paragraph--5e22lv *',
        property: {
            margin: 0,
        },
    }, {
        selector: '.paragraph--5e22lv :nth-last-child(1)',
        property: {
            marginBlock: '0 0.24em',
        },
    }, {
        selector: '.paragraph--5e22lv h1',
        property: {
            marginBlock: '0 0.56em',
            fontSize: '1.82em',
        },
    }, {
        selector: '.paragraph--5e22lv h2',
        property: {
            marginBlock: '0 0.43em',
            fontSize: '1.35em',
        },
    }, {
        selector: '.paragraph--5e22lv p',
        property: {
            marginBlock: '0 1.15em',
        },
    }, {
        selector: '.header--bleav0, .header--plp5zo',
        property: {
            paddingInline: '8px',
            color: 'hsl(0, 0%, 55%)',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            fontSize: '0.95em',
            fontWeight: 400,
            whiteSpace: 'pre',
            userSelect: 'none',
            transition: 'all 150ms cubic-bezier(.03,.34,.11,.64)',
        },
    }, {
        selector: '.header--bleav0:hover',
        property: {
            color: 'hsl(260, 46%, 52%)',
        },
    }, {
        selector: '.header--plp5zo:hover',
        property: {
            color: 'hsl(0, 0%, 78%)',
        },
    }, {
        selector: '.header--plp5zo[status=active]',
        property: {
            color: 'hsl(0, 0%, 71%)',
        },
    }, {
        selector: '.header--4gto90',
        property: {
            margin: '6px 10px',
            color: 'hsl(266, 2%, 60%)',
            fontSize: '0.91em',
        },
    }, {
        selector: '.padding--3j722v',
        property: {
            paddingInline: '12px',
        },
    }, {
        selector: '.padding--j2h3xh',
        property: {
            paddingBlock: '3px',
            paddingInline: '10px',
        },
    }, {
        selector: '.padding--84uh4e',
        property: {
            paddingInline: '12px',
        },
    }, {
        selector: '.margin--ffjz9r',
        property: {
            marginInline: '8px',
        },
    }, {
        selector: '.margin--aw9ebg',
        property: {
            marginBlockStart: '0.45em',
        },
    }, {
        selector: '.margin--tx4ago',
        property: {
            margin: 0,
            marginBlockStart: '8px',
        },
    }, {
        selector: '.margin--fi6tem',
        property: {
            marginBlock: '0.24em',
            marginInlineEnd: '0.6em',
        },
    }, {
        selector: '.margin--a41qul',
        property: {
            margin: 0,
            marginInlineEnd: '0.65em',
        },
    }, {
        selector: '.margin--4qajrg',
        property: {
            margin: '0 32px 32px 0',
        },
    }, {
        selector: '.scroll--2jdorf',
        property: {
            scrollbarWidth: 'none',
        },
    }, {
        selector: '.scroll--2jdorf::-webkit-scrollbar',
        property: {
            width: 0,
            height: 0,
            background: 'transparent',
        },
    }, {
        selector: '.list-style--qd0zwu',
        property: {
            width: '100%',
            height: '295px',
            overflowY: 'scroll',
        },
    }, {
        selector: '.list-style--qd0zwu',
        property: {
            width: 'auto',
            height: 0,
            display: 'flex',
            overflow: 'auto hidden',
        },
    }, {
        selector: '.link--b184gp, .unlink--kmxi1j',
        property: {
            width: 'inherit',
            borderRadius: '16px',
            color: 'hsl(251, 3%, 44%)',
            overflowWrap: 'anywhere',
            transition: 'all 80ms cubic-bezier(0.55, 0.06, 0.68, 0.19)',
            userSelect: 'none',
        },
    }, {
        selector: '.link--b184gp:hover',
        property: {
            color: 'hsl(0, 0%, 72%)',
            backgroundColor: 'hsl(260, 7%, 10%)',
        },
    }, {
        selector: '.link--ke056n',
        property: {
            marginRight: '12px',
            display: 'flex',
            cursor: 'pointer',
            filter: 'brightness(0.68)',
        },
    }, {
        selector: '.link--ke056n:hover',
        property: {
            textDecorationLine: 'underline',
            textDecorationThickness: '2px',
        },
    }, {
        selector: '.link--ke056n:last-child',
        property: {
            margin: 0,
        },
    }, {
        selector: '.link--wogl42',
        property: {
            paddingInline: '4px',
            color: 'hsl(264, 46%, 62%)',
            boxSizing: 'border-box',
            cursor: 'pointer',
        },
    }, {
        selector: '.link--wogl42:hover',
        property: {
            textDecoration: 'underline',
        },
    }, {
        selector: '.unlink--kmxi1j:hover',
        property: {
            color: 'hsl(0, 47%, 59%)',
            backgroundColor: 'hsl(0, 8%, 10%)',
        },
    }, {
        selector: '.copy--yoq0hn',
        property: {
            marginBlockEnd: '-4.5em',
            marginInline: '0.75em',
            padding: '0.125em 0.45em 0.85em',
            color: 'hsl(0, 0%, 14%)',
            background: 'hsl(0, 0%, 49%)',
            borderTopLeftRadius: '4px',
            borderTopRightRadius: '4px',
            fontSize: '10pt',
            whiteSpace: 'pre',
            zIndex: 16,
        },
    }, {
        selector: '.anmte--jvoajq',
        property: {
            transition: 'all 452ms cubic-bezier(0.4, 0, 0.2, 1)',
        },
    }, {
        selector: '.anmte--7hnquy',
        property: {
            transition: 'all 820ms cubic-bezier(0.4, 0, 0.2, 1)',
        },
    }, {
        selector: '.anmte--h78sho',
        property: {
            transition: 'all 125ms cubic-bezier(0, 0, 0.3, 1)',
        },
    }, {
        selector: '.anmte--d3lzy6',
        property: {
            transition: 'all 360ms cubic-bezier(0.74, 0.34, 0.13, 1.26)',
        },
    }, {
        selector: '.anmte--83vtkh',
        property: {
            animation: 'appearProject 150ms normal forwards cubic-bezier(0, 0, 0.81, 0.26)',
        },
    }, {
        selector: '.anmte--e23hhe',
        property: {
            transition: 'all 106ms cubic-bezier(0.55, 0.24, 0.26, 0.7)',
        },
    }, {
        selector: '[alert-hidden=true]',
        property: {
            pointerEvents: 'none',
        },
    }, {
        selector: '[status=disabled]',
        property: {
            color: 'hsl(0, 0%, 40%)',
            pointerEvents: 'none',
        },
    }, {
        selector: '[status=active]',
        property: {
            color: 'hsl(260, 72%, 60%)',
            fontSize: '13.5pt',
            fontWeight: '600',
            pointerEvents: 'none',
        },
    }, {
        selector: '[status=selected]',
        property: {
            color: 'hsl(264, 43%, 53%)',
            backgroundColor: 'hsl(264, 15%, 11%)',
            boxShadow: '0 4px 1.6em hsla(0, 0%, 0%, 21%)',
            transition: 'all 210ms cubic-bezier(0.09, 0.44, 0, 0.93)',
        },
    }, {
        selector: '[clip=main]',
        property: {
            padding: '1em',
            width: '100%',
            height: 'auto',
        },
    }, {
        selector: '[clip=article]',
        property: {
            marginRight: '2em',
            padding: '0.8em',
            color: 'hsl(0, 0%, 79%)',
            backgroundColor: 'hsl(0, 0%, 7%)',
            border: '1px solid hsl(213, 13%, 14%)',
            borderRadius: '4px',
            borderTopLeftRadius: 0,
            display: 'block',
            wordWrap: 'break-word',
            overflow: 'hidden',
        },
    }, {
        selector: '[clip=article]::selection',
        property: {
            color: 'hsl(0, 0%, 63%)',
            backgroundColor: 'hsl(266, 1%, 20%)',
        },
    }, {
        selector: '.markdown-body::before',
        property: {
            marginTop: '0.8em',
        },
    }, {
        selector: '[clip=layout]',
        property: {
            margin: 0,
            padding: 0,
            listStyleType: 'none',
            transition: 'all 90ms cubic-bezier(0.17, 0.09, 0.25, 1)',
        },
    }, {
        selector: '[clip=button]',
        property: {
            width: '32px',
            height: '32px',
            fill: 'hsl(0, 0%, 52%)',
            backgroundColor: 'hsl(0, 0%, 17%)',
            border: '1px solid hsl(0, 0%, 30%)',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
        },
    }, {
        selector: '[clip=button]:hover',
        property: {
            fill: 'hsl(270, 100%, 74%)',
            backgroundColor: 'hsl(259, 21%, 23%)',
            border: '1px solid hsl(267, 25%, 45%)',
        },
    }, {
        name: 'appearProject',
        rule: 'keyframes',
        block: {
            from: { opacity: 0 },
            to: { opacity: 1 },
        },
    }])
    b.styleMap([{
        selector: '.i-alert--jbvon4',
        property: {
            width: '100% !important',
        },
    }, {
        selector: '.container--8b83k6',
        property: {
            flexDirection: 'column-reverse',
        },
    }, {
        selector: '.window-title--okhmu8',
        property: {
            borderRadius: '0 4px',
            borderLeft: 0,
            direction: 'rtl',
        },
    }, {
        selector: '.wrapper--5gk8nc',
        property: {
            WebkitLineClamp: 4,
        },
    }], { media: 'all and (max-width: 768px)' })
    b.styleMap([{
        selector: '.wrapper--6h91vu, .wrapper--7kxayf',
        property: {
            left: 0,
            right: 0,
            bottom: 0,
            margin: '-1.6em',
            marginBottom: '-1.6em',
        },
    }, {
        selector: '.link--ke056n',
        property: {
            marginRight: '23px',
            transform: 'scale(1.3)',
        },
    }], { media: 'all and (max-width: 496px)' })
    b.styleMap([{
        selector: '.i-alert--jbvon4',
        property: {
            borderRadius: 0,
        },
    }], { media: 'all and (max-width: 392px)' })
    b.template([{
        tag: 'div',
        class: 'base--3dbif2',
        event: {
            loaded: {
                node: [{
                    selector: 'html',
                    callback: (e, a, t) => {
                        let nu = document.querySelector('[clip=notus]')
                        window.addEventListener('resize', () => {
                            nu.style.fontSize = (t.clientWidth < 310) ? '5.2vw' : '12pt'
                        })
                    },
                }],
            },
        },
        child: [{
            tag: 'div',
            class: 'layer--5fylua wrapper--p5crbc',
            child: [{
                tag: 'div',
                class: 'container--f3fgp3',
                child: [{
                    tag: 'div',
                    class: 'layer--z1dvjh',
                    child: [{
                        tag: 'div',
                        class: 'content--3n5zzn',
                        child: [{
                            tag: 'div',
                            class: 'container--euqabh',
                            child: [{
                                tag: 'div',
                                class: 'pathfind--xpbiis',
                                attr: { pointer: 'unknown' },
                                child: [{
                                    tag: 'span',
                                }],
                            }, {
                                tag: 'div',
                                attr: { clip: 'main' },
                                child: [{
                                    tag: 'span',
                                    attr: { clip: 'notus' },
                                    style: {
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        width: 'auto',
                                        marginInline: '24px',
                                        display: 'flex',
                                        position: 'absolute',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        whiteSpace: 'nowrap',
                                        transition: 'all 125ms cubic-bezier(0, 0, 0.3, 1)',
                                        pointerEvents: 'none',
                                    },
                                    lang: {
                                        en: { text: 'The main text is not in use yet' },
                                        ko: { text: '아직 본문은 사용되고 있지 않습니다' },
                                    },
                                    child: [{
                                        tag: 'svg',
                                        namespace: 'http://www.w3.org/2000/svg',
                                        attr: {
                                            width: 24,
                                            height: 24,
                                            viewBox: '0 0 24 24',
                                        },
                                        style: { marginLeft: '8px' },
                                        child: [{
                                            tag: 'path',
                                            namespace: 'http://www.w3.org/2000/svg',
                                            attr: {
                                                fill: 'currentColor',
                                                d: 'M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9M9.41,6L8,7.41L10.59,10L8,12.59L9.41,14L12,11.41L14.59,14L16,12.59L13.41,10L16,7.41L14.59,6L12,8.59L9.41,6Z',
                                            },
                                        }],
                                    }],
                                }],
                            }],
                        }],
                    }],
                }, {
                    tag: 'nav',
                    class: 'helper-container--0k0gvb',
                    child: [{
                        tag: 'div',
                        class: 'layout--266au3',
                        child: [{
                            tag: 'div',
                            class: 'fraction--zyr4qj margin--aw9ebg padding--84uh4e',
                            child: [{
                                tag: 'header',
                                child: [{
                                    tag: 'span',
                                    class: 'header--bleav0 margin--a41qul',
                                    attr: {
                                        'aria-labelledby': 'project',
                                        status: 'disabled',
                                    },
                                    text: 'Project',
                                    lang: {
                                        en: { text: 'Project' },
                                        ko: { text: '프로젝트' },
                                    },
                                    event: {
                                        clicked: {
                                            node: [{
                                                selector: '.list-style--qd0zwu',
                                                callback: (e, a, t) => {
                                                    while (t.firstChild) t.removeChild(t.lastChild)

                                                    function createChild(option = { cdname, description, author, keyword, github }) {
                                                        let el = document.createElement('li')
                                                        let ch = document.createElement('span')
                                                        el.classList.add(...['wrapper--104xne', 'margin--fi6tem'])
                                                        ch.classList.add(...['padding--j2h3xh', 'link--b184gp', 'anmte--83vtkh'])
                                                        ch.setAttribute('data-descript', option['description'])
                                                        ch.setAttribute('data-author', option['author'])
                                                        ch.setAttribute('data-keyword', option['keyword'])
                                                        ch.setAttribute('github', option['github'])
                                                        ch.setAttribute('status', 'normal')
                                                        ch.textContent = option['cdname']
                                                        el.appendChild(ch)
                                                        return el
                                                    }

                                                    let header = document.querySelector('.header--bleav0[aria-labelledby=\'project\']')
                                                    
                                                    for (let child of header.children) {
                                                        let cdname = child.querySelector('ml-name').dataset.value
                                                        let description = child.querySelector('ml-description').dataset.value
                                                        let author = child.querySelector('ml-author').dataset.value
                                                        let keyword = child.querySelector('ml-keyword').dataset.value
                                                        let github = child.querySelector('ml-github').dataset.value
                                                        let content = child.querySelector('ml-content').dataset.value

                                                        let ch = createChild({ cdname, description, author, keyword, github })
                                                        let pf = document.querySelector('.pathfind--xpbiis')

                                                        let sp = ch.querySelector('span')

                                                        sp.addEventListener('click', () => {
                                                            history.pushState({}, null, `/project/${cdname.toLowerCase()}`)

                                                            ch.style.cursor = 'default'
                                                            ch.style.pointerEvents = 'none'

                                                            t.querySelectorAll('[status=selected]').forEach(f => {
                                                                f.parentNode.removeAttribute('style')
                                                                f.removeAttribute('status')
                                                            })
                                                            sp.setAttribute('status', 'selected')

                                                            let main = document.querySelector('[clip=main]')
                                                            let notus = document.querySelector('[clip=notus]')
                                                            let mt = document.createElement('div')
                                                            let delay = 100

                                                            notus.style.opacity = 0

                                                            for (let child of main.children) {
                                                                if (child.getAttribute('clip') === 'article') {
                                                                    child.style.transform = 'translateY(-16px)'
                                                                    child.style.opacity = 0
                                                                    setTimeout(() => {
                                                                        child.remove()
                                                                    }, delay)
                                                                    delay += 100
                                                                }
                                                            }
                                                            
                                                            mt.setAttribute('clip', 'article')
                                                            mt.classList.add(...['markdown-body', 'anmte--e23hhe'])
                                                            mt.innerHTML = marked.parse(content)

                                                            mt.style.paddingTop = '16px'
                                                            mt.style.opacity = 0

                                                            main.appendChild(mt)

                                                            setTimeout(() => {
                                                                mt.style.paddingTop = 0
                                                                mt.style.opacity = 1
                                                            }, delay)
                                                            
                                                            let a = mt.querySelectorAll('a')
                                                            for (let e of a) {
                                                                let s = document.createElement('span')
                                                                s.classList.add(...['link--wogl42'])
                                                                s.dataset.url = e.href
                                                                s.textContent = e.textContent

                                                                e.parentNode.replaceChild(s, e)

                                                                s.addEventListener('click', () => window.open(e.href))
                                                                s.addEventListener('mouseenter', () => {
                                                                    if (!window['__qmod__']) return
                                                                    pf.setAttribute('pointer', 'VIII')
                                                                    pf.children[0].textContent = `npiu:redirect?to=${e.href}`
                                                                })
                                                                s.addEventListener('mouseleave', () => {
                                                                    if (!window['__qmod__']) return
                                                                    pf.setAttribute('pointer', 'unknown')
                                                                    pf.children[0].textContent = ''
                                                                })
                                                            }
                                                        })
                                                        sp.addEventListener('mouseenter', () => {
                                                            if (!window['__qmod__']) return
                                                            pf.setAttribute('pointer', 'VIII')
                                                            pf.children[0].textContent = `npiu:project/${cdname.toLowerCase()}`
                                                        })
                                                        sp.addEventListener('mouseleave', () => {
                                                            if (!window['__qmod__']) return
                                                            pf.setAttribute('pointer', 'unknown')
                                                            pf.children[0].textContent = ''
                                                        })

                                                        t.appendChild(ch)
                                                    }
                                                },
                                            }, {
                                                selector: '.header--bleav0[status=active]',
                                                callback: (e, a, t) => {
                                                    if (!!t) t.setAttribute('status', 'normal')
                                                },
                                            }, {
                                                selector: '.header--bleav0[aria-labelledby=project]',
                                                callback: (e, a, t) => {
                                                    t.setAttribute('status', 'active')
                                                    document.querySelector('.fraction--zyr4qj header').scrollLeft = t.offsetLeft
                                                },
                                            }],
                                        },
                                        mouseenter: {
                                            node: [{
                                                selector: '.pathfind--xpbiis',
                                                callback: (e, a, t) => {
                                                    if (!window['__qmod__']) return
                                                    t.setAttribute('pointer', 'VIII')
                                                    t.children[0].textContent = 'npiu:navigate#project'
                                                },
                                            }],
                                        },
                                        mouseleave: {
                                            node: [{
                                                selector: '.pathfind--xpbiis',
                                                callback: (e, a, t) => {
                                                    if (!window['__qmod__']) return
                                                    t.setAttribute('pointer', 'unknown')
                                                    t.children[0].textContent = ''
                                                },
                                            }],
                                        },
                                    },
                                }, {
                                    tag: 'span',
                                    class: 'header--bleav0 margin--a41qul',
                                    attr: {
                                        'aria-labelledby': 'recently_viewed',
                                        status: 'normal',
                                    },
                                    text: 'Recently Viewed',
                                    lang: {
                                        en: { text: 'Recently Viewed' },
                                        ko: { text: '최근 열람' },
                                    },
                                    event: {
                                        loaded: { style: { display: 'none' } },
                                        clicked: {
                                            node: [{
                                                selector: '.list-style--qd0zwu',
                                                callback: (e, a, t) => {
                                                    while (t.firstChild) t.removeChild(t.lastChild)

                                                    function createChild(content) {
                                                        let el = document.createElement('li')
                                                        let ch = document.createElement('span')
                                                        el.classList.add(...['wrapper--104xne', 'margin--fi6tem'])
                                                        ch.classList.add(...['padding--j2h3xh', 'unlink--kmxi1j', 'anmte--83vtkh'])
                                                        ch.textContent = content
                                                        el.appendChild(ch)
                                                        return el
                                                    }

                                                    t.appendChild(createChild('No recent history'))
                                                    t.appendChild(createChild('The feature has not been developed yet'))
                                                },
                                            }, {
                                                selector: '.header--bleav0[status=active]',
                                                callback: (e, a, t) => {
                                                    if (!!t) t.setAttribute('status', 'normal')
                                                },
                                            }, {
                                                selector: '.header--bleav0[aria-labelledby=recently_viewed]',
                                                callback: (e, a, t) => {
                                                    t.setAttribute('status', 'active')
                                                    document.querySelector('.fraction--zyr4qj header').scrollLeft = t.offsetLeft - 12
                                                },
                                            }],
                                        },
                                        mouseenter: {
                                            node: [{
                                                selector: '.pathfind--xpbiis',
                                                callback: (e, a, t) => {
                                                    if (!window['__qmod__']) return
                                                    t.setAttribute('pointer', 'VIII')
                                                    t.children[0].textContent = 'npiu:navigate#recent'
                                                },
                                            }],
                                        },
                                        mouseleave: {
                                            node: [{
                                                selector: '.pathfind--xpbiis',
                                                callback: (e, a, t) => {
                                                    if (!window['__qmod__']) return
                                                    t.setAttribute('pointer', 'unknown')
                                                    t.children[0].textContent = ''
                                                },
                                            }],
                                        },
                                    },
                                }, {
                                    tag: 'span',
                                    class: 'header--plp5zo margin--a41qul',
                                    attr: {
                                        'aria-labelledby': 'about',
                                        status: 'disabled',
                                    },
                                    text: 'About',
                                    lang: {
                                        en: { text: 'About' },
                                        ko: { text: '정보' },
                                    },
                                    event: {
                                        clicked: {
                                            node: [{
                                                selector: '.content--3n5zzn',
                                                callback: (e, a, t) => {
                                                    let el = document.createElement('div')
                                                    el.classList.add(...['wrapper--6h91vu', 'anmte--h78sho'])
                                                    el.style.bottom = '8px'
                                                    el.style.opacity = 0
                                                    el.style.transform = 'scale(0.78)'
                                                    setTimeout(() => {
                                                        el.style.bottom = '21px'
                                                        el.style.opacity = 1
                                                        el.style.transform = 'scale(0.84)'
                                                    }, 10)
                                                    t.appendChild(el)
                                                },
                                            }, {
                                                selector: '.header--plp5zo[status=active]',
                                                callback: (e, a, t) => {
                                                    if (!!t) t.setAttribute('status', 'normal')
                                                    
                                                    let ab = document.querySelectorAll('.wrapper--7kxayf')
                                                    for (let ch of ab) {
                                                        ch.style.bottom = '8px'
                                                        ch.style.opacity = 0
                                                        ch.style.transform = 'scale(0.78)'
                                                        setTimeout(() => {
                                                            ch.remove()
                                                        }, 100)
                                                    }
                                                },
                                            }, {
                                                selector: '.header--plp5zo[aria-labelledby=about]',
                                                callback: (e, a, t) => {
                                                    let pf = document.querySelector('.pathfind--xpbiis')
                                                    let mlAuthor = t.querySelector('ml-author')
                                                    let mlGithub = t.querySelector('ml-github')
                                                    let mlContent = t.querySelector('ml-content')
                                                    let lang = mlContent.dataset.lang, value = mlContent.dataset.value

                                                    let ab = document.querySelector('.wrapper--6h91vu')
                                                    let sp = document.createElement('span')
                                                    let content = (() => {
                                                        if (lang === 'markdown' && !!marked) {
                                                            return marked.parse(value)
                                                        } else return value
                                                    })()

                                                    sp.classList.add(...['markdown-body'])
                                                    sp.innerHTML = content
                                                    sp.dataset.language = lang
                                                    ab.dataset.abr = `${mlAuthor.dataset.value};${mlGithub.dataset.value}`

                                                    if (lang === 'markdown' && !!marked) {
                                                        let a = sp.querySelectorAll('a')
                                                        for (let e of a) {
                                                            let divUrl = e.href.replace(/http(s)?:\/\//, '').split(/\//)
                                                            let user = divUrl[1], repo = divUrl[2], minUrl = `${user}/${repo}`
                                                            let s = document.createElement('span')
                                                            s.classList.add(...['link--wogl42'])
                                                            s.dataset.url = minUrl
                                                            s.textContent = minUrl

                                                            s.style.color = 'hsl(0, 0%, 52%)'
                                                            s.style.backgroundColor = 'hsl(0, 0%, 11%)'

                                                            e.parentNode.replaceChild(s, e)

                                                            s.addEventListener('click', () => window.open(e.href))
                                                            s.addEventListener('mouseenter', () => {
                                                                if (!window['__qmod__']) return
                                                                pf.setAttribute('pointer', 'VIII')
                                                                pf.children[0].textContent = `npiu:github?to=${minUrl}`
                                                            })
                                                            s.addEventListener('mouseleave', () => {
                                                                if (!window['__qmod__']) return
                                                                pf.setAttribute('pointer', 'unknown')
                                                                pf.children[0].textContent = ''
                                                            })
                                                        }
                                                    }

                                                    t.setAttribute('status', 'active')

                                                    ab.appendChild(sp)
                                                }
                                            }, {
                                                selector: '.wrapper--6h91vu',
                                                callback: (e, a, t) => {
                                                    let pf = document.querySelector('.pathfind--xpbiis')
                                                    let abr = t.dataset.abr.split(/;/)
                                                    let author = abr[0], url = abr[1]

                                                    let el = document.createElement('div')
                                                    let cls = document.createElement('span')
                                                    let github = document.createElement('span')
                                                    let closeIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
                                                    let githubIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
                                                    let closePath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
                                                    let githubPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')

                                                    el.classList.add(...['layout--3ew8px'])
                                                    cls.classList.add(...['link--ke056n'])
                                                    github.classList.add(...['link--ke056n'])

                                                    closeIcon.setAttribute('width', 24)
                                                    closeIcon.setAttribute('height', 24)
                                                    closeIcon.setAttribute('viewBox', '0 0 24 24')
                                                    closeIcon.setAttribute('fill', 'currentColor')
                                                    closePath.setAttribute('d', 'M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z')

                                                    githubIcon.setAttribute('width', 24)
                                                    githubIcon.setAttribute('height', 24)
                                                    githubIcon.setAttribute('viewBox', '0 0 24 24')
                                                    githubIcon.setAttribute('fill', 'currentColor')
                                                    githubPath.setAttribute('d', 'M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z')

                                                    closeIcon.appendChild(closePath)
                                                    cls.appendChild(closeIcon)

                                                    githubIcon.appendChild(githubPath)
                                                    github.appendChild(githubIcon)

                                                    el.appendChild(github)
                                                    el.appendChild(cls)
                                                    t.appendChild(el)

                                                    cls.addEventListener('click', () => {
                                                        let ab = document.querySelectorAll('.wrapper--6h91vu')
                                                        for (let ch of ab) {
                                                            ch.style.bottom = '8px'
                                                            ch.style.opacity = 0
                                                            ch.style.transform = 'scale(0.78)'
                                                            setTimeout(() => {
                                                                ch.remove()
                                                            }, 100)
                                                        }

                                                        let h = document.querySelectorAll('.header--plp5zo')
                                                        for (let a of h) {
                                                            if (a.getAttribute('status') === 'active')
                                                                a.setAttribute('status', 'normal')
                                                        }
                                                    })
                                                    cls.addEventListener('mouseenter', () => {
                                                        if (!window['__qmod__']) return
                                                        pf.setAttribute('pointer', 'VIII')
                                                        pf.children[0].textContent = 'npiu:about#close?navigate'
                                                    })
                                                    cls.addEventListener('mouseleave', () => {
                                                        if (!window['__qmod__']) return
                                                        pf.setAttribute('pointer', 'unknown')
                                                        pf.children[0].textContent = ''
                                                    })
                                                    github.addEventListener('click', () => {
                                                        window.open(url)
                                                    })
                                                    github.addEventListener('mouseenter', () => {
                                                        if (!window['__qmod__']) return
                                                        pf.setAttribute('pointer', 'VIII')
                                                        pf.children[0].textContent = `npiu:github?to=${author}`
                                                    })
                                                    github.addEventListener('mouseleave', () => {
                                                        if (!window['__qmod__']) return
                                                        pf.setAttribute('pointer', 'unknown')
                                                        pf.children[0].textContent = ''
                                                    })
                                                },
                                            }],
                                        },
                                        mouseenter: {
                                            node: [{
                                                selector: '.pathfind--xpbiis',
                                                callback: (e, a, t) => {
                                                    if (!window['__qmod__']) return
                                                    t.setAttribute('pointer', 'VIII')
                                                    t.children[0].textContent = 'npiu:about'
                                                },
                                            }],
                                        },
                                        mouseleave: {
                                            node: [{
                                                selector: '.pathfind--xpbiis',
                                                callback: (e, a, t) => {
                                                    if (!window['__qmod__']) return
                                                    t.setAttribute('pointer', 'unknown')
                                                    t.children[0].textContent = ''
                                                },
                                            }],
                                        },
                                    },
                                }, {
                                    tag: 'span',
                                    class: 'header--plp5zo margin--a41qul',
                                    attr: {
                                        'aria-labelledby': 'settings',
                                        status: 'normal',
                                    },
                                    text: 'Settings',
                                    lang: {
                                        en: { text: 'Settings' },
                                        ko: { text: '설정' },
                                    },
                                    event: {
                                        loaded: { style: { display: 'none' } },
                                        clicked: {
                                            node: [{
                                                selector: '.content--3n5zzn',
                                                callback: (e, a, t) => {
                                                    let el = document.createElement('div')
                                                    el.classList.add(...['wrapper--7kxayf', 'anmte--h78sho'])
                                                    el.style.bottom = '8px'
                                                    el.style.opacity = 0
                                                    el.style.transform = 'scale(0.78)'
                                                    setTimeout(() => {
                                                        el.style.bottom = '21px'
                                                        el.style.opacity = 1
                                                        el.style.transform = 'scale(0.84)'
                                                    }, 10)
                                                    t.appendChild(el)
                                                },
                                            }, {
                                                selector: '.header--plp5zo[aria-labelledby=settings]',
                                                callback: (e, a, t) => {
                                                    let pf = document.querySelector('.pathfind--xpbiis')

                                                    let ab = document.querySelector('.wrapper--7kxayf')
                                                    let sp = document.createElement('span')
                                                    sp.classList.add(...['markdown-body'])

                                                    ;(conf => {
                                                        for (let [name, elemfunc] of Object.entries(conf)) {
                                                            let title = document.createElement('p')
                                                            title.textContent = name
                                                            
                                                            sp.appendChild(title)
                                                            sp.appendChild(elemfunc())
                                                        }
                                                    })({
                                                        'Language': () => {
                                                            let input = document.createElement('input')
                                                            return input
                                                        },
                                                        'Dark Mode': () => {
                                                            let input = document.createElement('input')
                                                            return input
                                                        },
                                                    })

                                                    ab.appendChild(sp)
                                                    t.setAttribute('status', 'active')
                                                },
                                            }, {
                                                selector: '.wrapper--7kxayf',
                                                callback: (e, a, t) => {
                                                    let pf = document.querySelector('.pathfind--xpbiis')

                                                    let el = document.createElement('div')
                                                    let cls = document.createElement('span')
                                                    let github = document.createElement('span')
                                                    let closeIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
                                                    let closePath = document.createElementNS('http://www.w3.org/2000/svg', 'path')

                                                    el.classList.add(...['layout--3ew8px'])
                                                    cls.classList.add(...['link--ke056n'])
                                                    github.classList.add(...['link--ke056n'])

                                                    closeIcon.setAttribute('width', 24)
                                                    closeIcon.setAttribute('height', 24)
                                                    closeIcon.setAttribute('viewBox', '0 0 24 24')
                                                    closeIcon.setAttribute('fill', 'currentColor')
                                                    closePath.setAttribute('d', 'M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z')

                                                    closeIcon.appendChild(closePath)
                                                    cls.appendChild(closeIcon)

                                                    el.appendChild(cls)
                                                    t.appendChild(el)

                                                    cls.addEventListener('click', () => {
                                                        let ab = document.querySelectorAll('.wrapper--7kxayf')
                                                        for (let ch of ab) {
                                                            ch.style.bottom = '8px'
                                                            ch.style.opacity = 0
                                                            ch.style.transform = 'scale(0.78)'
                                                            setTimeout(() => {
                                                                ch.remove()
                                                            }, 100)
                                                        }

                                                        let h = document.querySelectorAll('.header--plp5zo')
                                                        for (let a of h) {
                                                            if (a.getAttribute('status') === 'active')
                                                                a.setAttribute('status', 'normal')
                                                        }
                                                    })
                                                    cls.addEventListener('mouseenter', () => {
                                                        if (!window['__qmod__']) return
                                                        pf.setAttribute('pointer', 'VIII')
                                                        pf.children[0].textContent = 'npiu:about#close?navigate'
                                                    })
                                                    cls.addEventListener('mouseleave', () => {
                                                        if (!window['__qmod__']) return
                                                        pf.setAttribute('pointer', 'unknown')
                                                        pf.children[0].textContent = ''
                                                    })
                                                },
                                            }, {
                                                selector: '.header--plp5zo[status=active]',
                                                callback: (e, a, t) => {
                                                    if (!!t) t.setAttribute('status', 'normal')
                                                    
                                                    let ab = document.querySelectorAll('.wrapper--6h91vu')
                                                    for (let ch of ab) {
                                                        ch.style.bottom = '8px'
                                                        ch.style.opacity = 0
                                                        ch.style.transform = 'scale(0.78)'
                                                        setTimeout(() => {
                                                            ch.remove()
                                                        }, 100)
                                                    }
                                                },
                                            }],
                                        },
                                        mouseenter: {
                                            node: [{
                                                selector: '.pathfind--xpbiis',
                                                callback: (e, a, t) => {
                                                    if (!window['__qmod__']) return
                                                    t.setAttribute('pointer', 'VIII')
                                                    t.children[0].textContent = 'npiu:settings'
                                                },
                                            }],
                                        },
                                        mouseleave: {
                                            node: [{
                                                selector: '.pathfind--xpbiis',
                                                callback: (e, a, t) => {
                                                    if (!window['__qmod__']) return
                                                    t.setAttribute('pointer', 'unknown')
                                                    t.children[0].textContent = ''
                                                },
                                            }],
                                        },
                                    },
                                }],
                            }, {
                                tag: 'ul',
                                class: 'margin--tx4ago padding--3j722v list-style--qd0zwu scroll--2jdorf anmte--d3lzy6',
                                style: {
                                    height: 0,
                                },
                                event: {
                                    loaded: {
                                        node: [{
                                            selector: '.fraction--zyr4qj header',
                                            callback: (e, a, t) => {
                                                window.addEventListener('wheel', e => {
                                                    if (e.deltaY > 0) t.scrollLeft += 100
                                                    else t.scrollLeft -= 100
                                                })
                                            },
                                        }, {
                                            selector: '.list-style--qd0zwu',
                                            callback: (e, a, t) => {
                                                window.addEventListener('wheel', e => {
                                                    if (e.deltaY > 0) t.scrollLeft += 100
                                                    else t.scrollLeft -= 100
                                                })
                                            },
                                        }],
                                    },
                                    observe: {
                                        config: { childList: true },
                                        callback: list => {
                                            let wrap = document.querySelector('.wrapper--j9npez')
                                            let h = wrap.querySelector('.header--bleav0')

                                            for (let mutation of list) {
                                                if (mutation.type === 'childList') {
                                                    if (mutation.target.childElementCount > 0) {
                                                        mutation.target.style.height = '42px'
                                                        h.style.pointerEvents = 'all'
                                                        h.style.opacity = 1
                                                    } else {
                                                        mutation.target.removeAttribute('style')
                                                        h.style.pointerEvents = 'none'
                                                        h.style.opacity = 0
                                                    }
                                                }
                                            }
                                        },
                                    },
                                },
                                request: {
                                    url: 'https://api.github.com/users/u9pi/repos',
                                    stream: 'json',
                                    response: {
                                        allow: ['name', 'trees_url'],
                                        replace: {
                                            search: '{/sha}',
                                            value: '/main',
                                        },
                                        request: {
                                            get: 'trees_url',
                                            stream: 'json',
                                            response: {
                                                callback: response => {
                                                    (() => {
                                                        let tree = response[0]['tree'], url = `${response[0]['url']}`
                                                        let metaRule = ['meta.npiu'], readmeRule = ['readme.md', 'readme.markdown']
                                                        let filt = (rule => Array.from(tree.filter(({ path }) => rule.includes(path.toLowerCase()))))
    
                                                        let meta = ((meta) => {
                                                            let lines = meta.split(/\n/g), data = {}
                                                            for (let line of lines) {
                                                                let div = line.split(/:/)
                                                                let key = div[0].replace(/\s/g, '').toLowerCase(), value
                                                                delete div[0]
                                                                value = div.join('').trim()
                                                                if (key.length > 0 && 0 < value.length)
                                                                    data[key] = value
                                                            }
                                                            return data
                                                        })
    
                                                        if (filt(metaRule).length > 0) {
                                                            fetch(filt(metaRule)[0]['url'])
                                                            .then(res => res.json())
                                                            .then(da => {
                                                                let content = da['content']
                                                                if (da['encoding'] === 'base64') content = atob(content)
                                                                let metadata = meta(content), github = 'https://github.com/'
                                                                let divdPath = url.replace(/http(s)?:\/\//, '').split(/\//)
                                                                let divCount = 0
                                                                for (let i in divdPath) {
                                                                    if (divdPath[i] === metadata['author'] && divCount === 0) {
                                                                        divCount++
                                                                        github += `${metadata['author']}/${divdPath[parseInt(i) + 1]}`
                                                                    }
                                                                }
                                                                metadata['github'] = github
                                                                return metadata
                                                            })
                                                            .then(metadata => {
                                                                if (!metadata) return null

                                                                let header = (() => {
                                                                    if (metadata['name'].toLowerCase() === 'profile')
                                                                        return document.querySelector('.header--plp5zo[aria-labelledby=\'about\']')
                                                                    else return document.querySelector('.header--bleav0[aria-labelledby=\'project\']')
                                                                })()
                                                                let mlData = document.createElement('ml-data')

                                                                for (let [key, value] of Object.entries(metadata)) {
                                                                    if (key === 'descript') key = 'description'
                                                                    let mlUnit = document.createElement(`ml-${key}`)
                                                                    mlUnit.dataset.value = value
                                                                    mlData.appendChild(mlUnit)
                                                                }

                                                                header.appendChild(mlData)

                                                                let readmeUrl = filt(readmeRule)[0]['url']
                                                                fetch(readmeUrl)
                                                                .then(res => res.json())
                                                                .then(da => {
                                                                    let content = da['content']
                                                                    if (da['encoding'] === 'base64') content = atob(content)
                                                                    let mlUnit = document.createElement('ml-content')
                                                                    mlUnit.dataset.lang = 'markdown'
                                                                    mlUnit.dataset.value = content
                                                                    mlData.appendChild(mlUnit)
                                                                })

                                                                header.setAttribute('status', 'normal')
                                                            })
                                                        }
                                                    })()
                                                },
                                            },
                                        }
                                    },
                                },
                            }],
                        }, {
                            tag: 'div',
                            class: 'wrapper--j9npez',
                            child: [{
                                tag: 'span',
                                class: 'copy--yoq0hn anmte--d3lzy6',
                                text: '© 2022 u9pi',
                                event: {
                                    loaded: {
                                        delay: 110,
                                        style: {
                                            marginBlockEnd: '-0.25em',
                                        },
                                    },
                                },
                            }, {
                                tag: 'span',
                                class: 'header--bleav0 margin--a41qul',
                                style: {
                                    left: 0,
                                    right: 0,
                                    top: '8px',
                                    margin: 'auto',
                                    width: 'max-content',
                                    position: 'absolute',
                                    pointerEvents: 'none',
                                    opacity: 0,
                                },
                                text: 'Close',
                                lang: {
                                    en: { text: 'Close' },
                                    ko: { text: '닫기' },
                                },
                                event: {
                                    clicked: {
                                        node: [{
                                            selector: '.list-style--qd0zwu',
                                            callback: (e, a, t) => {
                                                if (!document.querySelector('[clip=article]')) {
                                                    t.removeAttribute('style')
                                                    setTimeout(() => {
                                                        while (t.firstChild) t.removeChild(t.lastChild)
                                                    }, 300)
                                                } else {
                                                    for (let child of t.children) {
                                                        child.removeAttribute('style')
                                                        child.querySelector('.link--b184gp').setAttribute('status', 'normal')
                                                    }
                                                }
                                            },
                                        }, {
                                            selector: '.header--bleav0[status=active]',
                                            callback: (e, a, t) => {
                                                if (!document.querySelector('[clip=article]')) {
                                                    if (!!t) t.removeAttribute('status')
                                                }
                                            },
                                        }, {
                                            selector: '[clip=main]',
                                            callback: (e, a, t) => {
                                                for (let child of t.children) {
                                                    if (child.getAttribute('clip') === 'notus') child.style.opacity = 1
                                                    else if (child.getAttribute('clip') === 'article') {
                                                        history.pushState({}, null, '/')

                                                        child.style.opacity = 0
                                                        setTimeout(() => {
                                                            child.remove()
                                                        }, 100)
                                                    }
                                                }
                                            },
                                        }],
                                    },
                                    mouseenter: {
                                        node: [{
                                            selector: '.pathfind--xpbiis',
                                            callback: (e, a, t) => {
                                                if (!window['__qmod__']) return
                                                t.setAttribute('pointer', 'VIII')
                                                if (!!document.querySelector('[clip=article]'))
                                                    t.children[0].textContent = 'npiu:project#close'
                                                else t.children[0].textContent = 'npiu:navigate#close'
                                            },
                                        }],
                                    },
                                    mouseleave: {
                                        node: [{
                                            selector: '.pathfind--xpbiis',
                                            callback: (e, a, t) => {
                                                if (!window['__qmod__']) return
                                                t.setAttribute('pointer', 'unknown')
                                                t.children[0].textContent = ''
                                            },
                                        }],
                                    },
                                },
                            }],
                        }],
                    }],
                }],
            }],
        }, {
            tag: 'div',
            class: 'i-alert--jbvon4 center--2ix3j9 anmte--jvoajq',
            style: {
                width: '8px',
                opacity: 0,
            },
            event: {
                loaded: {
                    check: localStorage.getItem('_ml_iart') !== '.r',
                    not: {
                        style: { pointerEvents: 'none' },
                    },
                    style: { opacity: 1 },
                    lang: {
                        en: { style: { width: '266px' }},
                        ko: { style: { width: '336px' }},
                    },
                },
            },
            child: [{
                tag: 'div',
                class: 'op--9ih2pc',
            }, {
                tag: 'div',
                class: 'container--8b83k6',
                child: [{
                    tag: 'div',
                    class: 'wrapper--n62ezm window-title--okhmu8',
                    child: [{
                        tag: 'div',
                        class: 'wrapper--i88nh0 grid--vsewq0 center--h3vlic button--iyf24r anmte--h78sho',
                        event: {
                            clicked: {
                                node: [{
                                    selector: '.i-alert--jbvon4',
                                    style: {
                                        opacity: 0,
                                        pointerEvents: 'none',
                                    },
                                    callback: e => { localStorage.setItem('_ml_iart', '.r') },
                                }],
                            },
                        },
                        child: [{
                            tag: 'svg',
                            namespace: 'http://www.w3.org/2000/svg',
                            attr: {
                                width: 19,
                                height: 19,
                                viewBox: '0 0 24 24',
                            },
                            child: [{
                                tag: 'path',
                                namespace: 'http://www.w3.org/2000/svg',
                                attr: {
                                    fill: 'hsl(0, 0%, 62%)',
                                    'fill-rule': 'evenodd',
                                    d: 'M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z',
                                },
                            }],
                        }],
                    }],
                }, {
                    tag: 'div',
                    class: 'window-content--80sh30',
                    child: [{
                        tag: 'div',
                        class: 'wrapper--5gk8nc',
                        lang: {
                            en: {
                                child: [{
                                    tag: 'span',
                                    text: 'The title of this site is not intended to be derogatory of any country or person.',
                                }],
                            },
                            ko: {
                                child: [{
                                    tag: 'span',
                                    text: '이 사이트의 제목은 어떤 국가나 사람을 비하하기 위한 것이 아닙니다.',
                                }],
                            },
                        },
                    }],
                }],
            }],
        }],
    }])
})
