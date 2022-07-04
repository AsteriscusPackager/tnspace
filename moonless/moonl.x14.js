window['__debug__'] = new Function('callback', 'if(/127\.0\.0\.1|localhost/.test(location.hostname))callback(console.log)')
window['__qmod__'] = new Function('return !(navigator.userAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i)!=null||navigator.userAgent.match(/LG|SAMSUNG|Samsung/)!=null)')()
window['__params__'] = _=>{var t=location.pathname.replace(/^\/|\/$/g,'');if(!t)return;let e=t.split(/\//g),i=[];function n(h,t,s,i){this.type=h,this.path=t,this.hash=s,this.search=i}for(let t=0;t<e.length;t++)0===t?i.push(new n('first-dir',e[t])):t===e.length-1?i.push(new n('last-dir',e[t],location.hash,location.search)):i.push(new n(`${t+1}th-dir`,e[t]));return i}

;((ml, fw, tpl) => {
    try {window['__debug__']($ => {
        let style = [
            'padding-inline:0 2px',
            'color: hsl(242, 1%, 12%)',
            'background-color:hsl(259, 91%, 63%)',
        ]
        $(`%c| Project;Moonless`, style.join(';'))
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
    const opts = {
        method: 'GET',
        mode: 'cors',
        headers: {
            Authorization: 'token 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',
        },
    }

    b.init()

    b.styleMap([{
        rule: 'font-face',
        queries: {
            fontFamily: 'Cedora',
            fontStyle: 'normal',
            fontWeight: 400,
            src: 'local(\'Cedora\'), url(\'https://pkg.owop.xyz/fonts/Cedora/Regular.woff2\') format(\'woff2\'), local(\'Cedora\'), url(\'https://pkg.owop.xyz/fonts/Cedora/rStd.woff2\') format(\'woff\')',
        },
    }, {
        rule: 'font-face',
        queries: {
            fontFamily: 'Cedora',
            fontStyle: 'italic',
            fontWeight: 400,
            src: 'local(\'Cedora\'), url(\'https://pkg.owop.xyz/fonts/Cedora/Italic.woff2\') format(\'woff2\'), local(\'Cedora\'), url(\'https://pkg.owop.xyz/fonts/Cedora/riStd.woff2\') format(\'woff\')',
        },
    }, {
        rule: 'font-face',
        queries: {
            fontFamily: 'Cedora',
            fontStyle: 'normal',
            fontWeight: 700,
            src: 'local(\'Cedora\'), url(\'https://pkg.owop.xyz/fonts/Cedora/Bold.woff2\') format(\'woff2\'), local(\'Cedora\'), url(\'https://pkg.owop.xyz/fonts/Cedora/bStd.woff2\') format(\'woff\')',
        },
    }, {
        rule: 'font-face',
        queries: {
            fontFamily: 'Cedora',
            fontStyle: 'italic',
            fontWeight: 700,
            src: 'local(\'Cedora\'), url(\'https://pkg.owop.xyz/fonts/Cedora/BoldItalic.woff2\') format(\'woff2\'), local(\'Cedora\'), url(\'https://pkg.owop.xyz/fonts/Cedora/biStd.woff2\') format(\'woff\')',
        },
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
        selector: '.markdown-body .highlight pre',
        property: {
            backgroundColor: 'hsl(240, 4%, 10%)',
        },
    }, {
        selector: '.markdown-body .footnotes-sep',
        property: {
            display: 'none',
        },
    }, {
        selector: '.markdown-body .footnote-ref > a, .markdown-body .footnote-backref',
        property: {
            display: 'none',
            color: 'hsl(264, 46%, 62%)',
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
        selector: '.load--0u0v35',
        property: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'hsl(300, 4%, 5%)',
            position: 'absolute',
            opacity: 1,
            zIndex: 1961,
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
            top: '-22px',
            left: 0,
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
            fontWeight: 700,
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
                        let nu = document.querySelector('[clip=notus]'),
                        copy = document.querySelector('.copy--yoq0hn'),
                        fontP = (style, weight) => { copy.style.fontStyle = style; copy.style.fontWeight = weight }

                        setTimeout(() => {
                            fontP('italic', 700)
                            setTimeout(() => {
                                fontP('normal', 700)
                                setTimeout(() => {
                                    fontP('italic', 400)
                                    setTimeout(() => {
                                        fontP('normal', 400)
                                    }, 10)
                                }, 10)
                            }, 10)
                        }, 10)

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
                                                callback: async (e, a, t) => {
                                                    while (t.firstChild) t.removeChild(t.lastChild)

                                                    function createChild(content) {
                                                        let el = document.createElement('li')
                                                        let ch = document.createElement('span')
                                                        el.classList.add(...['wrapper--104xne', 'margin--fi6tem'])
                                                        ch.classList.add(...['padding--j2h3xh', 'link--b184gp', 'anmte--83vtkh'])
                                                        ch.setAttribute('aria-labelledby', content)
                                                        ch.setAttribute('status', 'normal')
                                                        ch.textContent = content
                                                        el.appendChild(ch)
                                                        return el
                                                    }

                                                    let header = document.querySelector('.header--bleav0[aria-labelledby=\'project\']')
                                                    
                                                    for (let child of header.children) {
                                                        let repoName = child.querySelector('ml-name').dataset.value,
                                                        descript = child.querySelector('ml-description').dataset.value,
                                                        keyword = child.querySelector('ml-keyword').dataset.value,
                                                        author = child.querySelector('ml-author').dataset.value,
                                                        content,
                                                        ch = createChild(repoName),
                                                        sp = ch.querySelector('span')

                                                        for (let index = 0;; index++) {
                                                            let _content = child.querySelector('ml-content')
                                                            if (!!_content) content = _content.dataset.value

                                                            await (m => new Promise(r => setTimeout(r, m)))(200)

                                                            if (index >= 36 || !!content) break
                                                        }

                                                        sp.addEventListener('click', () => {
                                                            let head = document.head

                                                            document.title = repoName
                                                            head.querySelector('meta[name=description]').content = descript
                                                            head.querySelector('meta[name=keyword]').content = keyword
                                                            head.querySelector('meta[name=author]').content = author
                                                            head.querySelector('meta[property=\'og:title\']').content = repoName
                                                            head.querySelector('meta[property=\'og:description\']').content = descript
                                                            head.querySelector('meta[property=\'og:url\']').content
                                                            = `${location.origin}/project/${repoName.toLowerCase()}`

                                                            history.pushState({}, null, `/project/${repoName.toLowerCase()}`)

                                                            ch.style.cursor = 'default'
                                                            ch.style.pointerEvents = 'none'

                                                            t.querySelectorAll('[status=selected]').forEach(f => {
                                                                f.parentNode.removeAttribute('style')
                                                                f.removeAttribute('status')
                                                            })
                                                            sp.setAttribute('status', 'selected')

                                                            let main = document.querySelector('[clip=main]'),
                                                            notus = document.querySelector('[clip=notus]'),
                                                            mt = document.createElement('div'),
                                                            delay = 100

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

                                                            let md = markdownit().use(markdownitFootnote)

                                                            content = md.render(content)
                                                                .replace(/&lt;/g, '<')
                                                                .replace(/&gt;/g, '>')
                                                                .replace(/&quot;/g, '\"')
                                                            mt.innerHTML = content

                                                            mt.style.paddingTop = '16px'
                                                            mt.style.opacity = 0

                                                            main.appendChild(mt)

                                                            setTimeout(() => {
                                                                mt.style.paddingTop = 0
                                                                mt.style.opacity = 1
                                                            }, delay)
                                                            
                                                            let lnk = mt.querySelectorAll('a')
                                                            for (let e of lnk) {
                                                                if (!(e.href.indexOf("#") != -1)) {
                                                                    let s = document.createElement('span')
                                                                    s.classList.add(...['link--wogl42'])
                                                                    s.dataset.url = e.href
                                                                    s.textContent = e.textContent

                                                                    e.parentNode.replaceChild(s, e)

                                                                    s.addEventListener('click', () => window.open(e.href))
                                                                } else {
                                                                    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                                                                        if (e.href.split(/#/)[1] === 'gh-light-mode-only')
                                                                            e.remove()
                                                                    } else {
                                                                        if (e.href.split(/#/)[1] === 'gh-dark-mode-only')
                                                                            e.remove()
                                                                    }
                                                                }
                                                            }
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
                                        observe: {
                                            config: { childList: true },
                                            callback: list => {
                                                for (let mutation of list) {
                                                    if (mutation.type === 'childList'
                                                    && mutation.target.childElementCount <= 1) {
                                                        let params = window['__params__']()
                                                        if (!params) return
                                                        for (let i = 0; i < params.length; i++) {
                                                            setTimeout(() => {
                                                                let h = mutation.target.getAttribute('aria-labelledby')
                                                                if (i === 0 && params[i].type === 'first-dir') {
                                                                    if (params[i].path === h) mutation.target.click()
                                                                }
                                                                if (i === 1 && params[i].type === 'last-dir') {
                                                                    let count = 0,
                                                                    n = setInterval(() => {
                                                                        let q = document.querySelector(`[aria-labelledby='${params[i].path}']`)
                                                                        if (count < 22) count++
                                                                        if (count >= 22 || !!q) {
                                                                            if (!!q) q.click()
                                                                            else history.pushState({}, null, `/project`)
                                                                            clearInterval(n)
                                                                        }
                                                                    }, 100)
                                                                }
                                                            }, 100)
                                                        }
                                                    }
                                                }
                                            },
                                        }
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
                                                selector: '.layer--z1dvjh',
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
                                                        }, 120)
                                                    }
                                                },
                                            }, {
                                                selector: '.header--plp5zo[aria-labelledby=about]',
                                                callback: (e, a, t) => {
                                                    var md = markdownit()

                                                    let content = t.querySelector('ml-content'),
                                                    value = content.dataset.value

                                                    let ab = document.querySelector('.wrapper--6h91vu'),
                                                    sp = document.createElement('span')

                                                    sp.classList.add(...['markdown-body'])
                                                    sp.innerHTML = md.render(value)

                                                    let lnk = sp.querySelectorAll('a')
                                                    for (let e of lnk) {
                                                        let divUrl = e.href.replace(/http(s)?:\/\//, '').split(/\//),
                                                        user = divUrl[1], repo = divUrl[2], minUrl = `${user}/${repo}`,
                                                        s = document.createElement('span')
                                                        s.classList.add(...['link--wogl42'])
                                                        s.dataset.url = minUrl
                                                        s.textContent = minUrl

                                                        s.style.color = 'hsl(0, 0%, 52%)'
                                                        s.style.backgroundColor = 'hsl(0, 0%, 11%)'

                                                        e.parentNode.replaceChild(s, e)

                                                        s.addEventListener('click', () => window.open(e.href))
                                                    }

                                                    t.setAttribute('status', 'active')

                                                    ab.appendChild(sp)
                                                }
                                            }, {
                                                selector: '.wrapper--6h91vu',
                                                callback: (e, a, t) => {
                                                    let el = document.createElement('div'),
                                                    cls = document.createElement('span'),
                                                    closeIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
                                                    closePath = document.createElementNS('http://www.w3.org/2000/svg', 'path')

                                                    el.classList.add(...['layout--3ew8px'])
                                                    cls.classList.add(...['link--ke056n'])

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
                                                        let ab = document.querySelectorAll('.wrapper--6h91vu')
                                                        for (let ch of ab) {
                                                            ch.style.bottom = '8px'
                                                            ch.style.opacity = 0
                                                            ch.style.transform = 'scale(0.78)'
                                                            setTimeout(() => {
                                                                ch.remove()
                                                            }, 120)
                                                        }

                                                        let h = document.querySelectorAll('.header--plp5zo')
                                                        for (let a of h) {
                                                            if (a.getAttribute('status') === 'active')
                                                                a.setAttribute('status', 'normal')
                                                        }
                                                    })
                                                },
                                            }],
                                        },
                                        observe: {
                                            config: { childList: true },
                                            callback: list => {
                                                for (let mutation of list) {
                                                    if (mutation.type === 'childList'
                                                    && mutation.target.childElementCount <= 1) {
                                                        let params = window['__params__']()
                                                        if (!params) return
                                                        for (let i = 0; i < params.length; i++) {
                                                            setTimeout(() => {
                                                                let h = mutation.target.getAttribute('aria-labelledby')
                                                                if (i === 0 && params[i].type === 'first-dir') {
                                                                    if (params[i].path === h) mutation.target.click()
                                                                }
                                                            }, 100)
                                                        }
                                                    }
                                                }
                                            },
                                        }
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
                                        }, {
                                            selector: '.scroll--2jdorf',
                                            callback: (e, a, t) => {
                                                var option = opts
                                                function createMoonlElement(repos) {
                                                    for (const repo of repos) {
                                                        fetch(repo.treesUrl, option)
                                                        .then(res => res.json())
                                                        .then(trees => {
                                                            let metaRule = ['meta.npiu'], readmeRule = ['readme.md', 'readme.markdown'],
                                                            filt = (rule => Array.from(trees.tree.filter(({ path }) => rule.includes(path.toLowerCase()))))
                                                
                                                            if (filt(metaRule).length > 0) {
                                                                fetch(filt(metaRule)[0].url, option)
                                                                .then(res => res.json())
                                                                .then(json => {
                                                                    function meta(text, ignore = []) {
                                                                        let ls = text.split(/\n/), rs = {}
                                                                        for (let ln of ls) {
                                                                            if (!!ln) {
                                                                                let dv = ln.split(/:/)
                                                                                let key = dv[0].replace(/\s/g, '').toLowerCase(), value = dv[1].replace(/^\s|\s$/g, '')
                                                                                for (let keyword of ignore) {
                                                                                    if (keyword !== key)
                                                                                        rs[key] = value
                                                                                }
                                                                            }
                                                                        }
                                                                        return rs
                                                                    }
                                                                    return meta(atob(json.content), ['github'])
                                                                })
                                                                .then(metadata => {
                                                                    if (!metadata) return null
    
                                                                    let type = (metadata['name'].toLowerCase() === 'profile') ? {
                                                                        selector: '.header--plp5zo',
                                                                        aria: 'about',
                                                                    } : {
                                                                        selector: '.header--bleav0',
                                                                        aria: 'project',
                                                                    },
                                                                    header = document.querySelector(`${type.selector}[aria-labelledby=\'${type.aria}\']`)
                                                                    
                                                                    let mlData = (() => {
                                                                        var elem = document.createElement('ml-data')
                                                                        header.appendChild(elem)
                                                                        return elem
                                                                    })()
                                                
                                                                    for (let [key, value] of Object.entries(metadata)) {
                                                                        if (key === 'descript') key = 'description'
                                                                        let mlUnit = document.createElement(`ml-${key}`)
                                                                        mlUnit.dataset.value = value
                                                                        mlData.appendChild(mlUnit)
                                                                    }

                                                                    return { header, mlData }
                                                                })
                                                                .then(elem => {
                                                                    fetch(filt(readmeRule)[0].url, option)
                                                                    .then(res => res.json())
                                                                    .then(json => {
                                                                        let content = atob(json.content),
                                                                        mlUnit = document.createElement('ml-content')
                                                                        mlUnit.dataset.value = content
                                                                        elem.mlData.appendChild(mlUnit)
                                                                    })
                                                
                                                                    elem.header.setAttribute('status', 'normal')
                                                                })
                                                            }
                                                        })
                                                    }
                                                }
                                                function getRepos() {
                                                    return fetch('https://api.github.com/users/u9pi/repos', option)
                                                    .then(res => res.json())
                                                    .then(json => json.map(f => {
                                                        return {
                                                            name: f.name,
                                                            treesUrl: f.trees_url.replace(/\{\/sha\}/, '/main'),
                                                        }
                                                    }))
                                                }
                                                (async () => createMoonlElement(await getRepos()))()
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
                                                        let head = document.head

                                                        document.title = 'owop'
                                                        head.querySelector('meta[name=description]').content = 'Nice to meet you, pioneer.'
                                                        head.querySelector('meta[name=keyword]').content = 'owop.xyz, owop, u9pi, profile'
                                                        head.querySelector('meta[name=author]').content = 'u9pi'
                                                        head.querySelector('meta[property=\'og:title\']').content = 'owop'
                                                        head.querySelector('meta[property=\'og:description\']').content = 'Nice to meet you, pioneer.'
                                                        head.querySelector('meta[property=\'og:url\']').content = `${location.origin}`

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