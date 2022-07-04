/**
 * ?required - svtOption: https://developer.mozilla.org/docs/Web/API/Fetch_API
 * ?required - svtq: URL including JavaScript file with x-version applied through Github Rest API
 */
;(async () => {
    const { target, version } = ((e) => {
        let tar = e.getAttribute('target'),
        ver = e.getAttribute('version')
        return {
            target: tar,
            version: ver,
        }
    })(document.currentScript),
    option = (!!svtOption) ? (e => {
        let option = e,
        auth = e['auth']
        if (auth) {
            delete option['auth']
            option['headers'] = {
                Authorization: `token ${auth}`,
            }
        }
        return option
    })(svtOption) : undefined
    const getVersion = async (e, o) => {
        let tver, dver = e.replace(/_/, '.').replace(/_/, '')
        await fetch(svtq[target], (!!o) ? o : option)
        .then(r => r.json())
        .then(j => j['tree'])
        .then(t => {
            let lva = []
            t.forEach(e => {
                if (e.type === 'blob') {
                    let path = e.path,
                    long = path.replace(/(.+x)?([0-9_]+).js/i, '$2'),
                    ver = long.replace(/_/, '.').replace(/_/, '')

                    lva.push({
                        name: path,
                        xver: ver,
                        url: e.url,
                    })
                }
            })
            let maxNum = Math.max.apply(null, lva.map(({ xver }) => parseFloat(xver)))
            if (e === '^') dver = maxNum.toString()
            
            tver = lva.find(f => f['xver'] === dver)
        })
        return tver
    }

    this['svt'] = { get: async (p) => { return await getVersion(version, p) }}
})()
