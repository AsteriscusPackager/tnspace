/*
 * ************************************************************************************** *
 * *****     ****     ******         ********         *******     ****  ****   *****   ** *
 * *****  *   **   *  ****     ****    ****    ***      *****  *   ***  *****  ******* ** *
 * *****  **  *   **  ****    *******  ****  ****       *****  **   **  *****  ********** *
 * *****  ***    ***  ****     ****    ****    ***      *****  ***   *  *****  ********** *
 * ****   **********  ******         ********         ******   *****    *****        **** *
 * ************************************************************************************** *
 */

window['__ml_fw__'] = {
    __version: 'Base;Moonless/Framework/0.2',
    init: function() {
        if (/project\;moonless\/(\d+\.)?(\d+\.)?(\d+\.)?(\*|\d+)?/i.test(window['__moonless']['version'])) {
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
                            let rule = m['rule'].toLowerCase()
                            switch (rule) {
                                case 'charset':
                                case 'import':
                                case 'namespace':
                                    let query = m['query']
                                    mapping.push(`@${rule} ${query};`)
                                break
                                case 'font-face':
                                    let entries = Object.entries(m['queries'])
                                    mapping.push(`@${rule} { ${getLine(entries)} }`)
                                break
                                case 'keyframes':
                                    let name = m['name']
                                    let block = m['block'], line = []
                                    for (let [offset, identifier] of Object.entries(block)) {
                                        let entrie = Object.entries(identifier)
                                        if (!!name || !!rule || entrie.length > 0)
                                            line.push(`${offset} { ${getLine(entrie)} }`)
                                    }
                                    mapping.push(`@${rule} ${name} { ${line.join(' ')} }`)
                                break
                                case 'media':
                                case 'supports':
                                case 'document':
                                case 'page':
                                case 'viewport':
                                case 'counter-style':
                                case 'font-feature-values':
                                default: break
                            }
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