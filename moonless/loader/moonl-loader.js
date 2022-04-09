/*
 * ************************************************************************************** *
 * *****     ****     ******         ********         *******     ****  ****   *****   ** *
 * *****  *   **   *  ****      ***    ****    *****    *****  *   ***  *****  ******* ** *
 * *****  **  *   **  ****       ****  ****  *********  *****  **   **  *****  ********** *
 * *****  ***    ***  ****      ***    ****    *****    *****  ***   *  *****  ********** *
 * ****   **********  ******         ********         ******   *****    *****        **** *
 * ************************************************************************************** *
 */

window['__moonless'] = {
    version: 'Project;Moonless/1.2',
    loader: new Function('fw', 'tm', 'tm(fw)'),
    lslc() {
        if (/base\;moonless\/framework\/(\d+\.)?(\d+\.)?(\d+\.)?(\*|\d+)?/i.test(window['__ml_fw__']['__version'])) {
            ;((...selector) => {
                for (let s of selector) document.body.querySelectorAll(s).forEach(s => s.remove())
            })('script')
            let appMount = (() => {
                let _am = document.querySelector('#app-mount')
                let _ = (!_am) ? (() => {
                    let _e = document.createElement('div');
                    _e.id = 'app-mount'
                    return _e
                })() : _am
                document.body.appendChild(_)
                return _
            })()
            window['__ml_fw__']['render'](appMount)
        }
    },
}
