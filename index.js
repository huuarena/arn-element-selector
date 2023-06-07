/**
 * HELPER GENERATE SELECTOR - LINK STYLESHEET
 */

function generateQuerySelector(el) {
    let selector = el.tagName.toLowerCase()
    const attrs = el.attributes
    for (var i = 0; i < attrs.length; i++) {
        let attr = attrs.item(i)
        if (attr.name === 'id') {
            return (selector = '' + `#${attr.value}`)
        }
    }
    return selector
}

/**
 * RENDER PANEL
 */

function renderPanel() {
    const body = document.body

    const divEl = document.createElement('div')
    const buttonEl = document.createElement('button')
    const bEl = document.createElement('b')

    bEl.textContent = 'Click on any element to apply font'
    buttonEl.textContent = 'Exit'
    divEl.classList.add('afontify-panel')

    divEl.append(bEl, buttonEl)

    /**
     * css for p
     */
    bEl.style.fontSize = '13px'

    /**
     * css for div
     */
    divEl.style.width = '100%'
    divEl.style.height = '50px'
    divEl.style.borderBottom = '1px solid rgba(0,0,0,.1)'
    divEl.style.backgroundColor = 'white'
    divEl.style.padding = '30px 30px'
    divEl.style.marginBottom = '15px'

    divEl.style.position = 'fixed'
    divEl.style.top = '0'
    divEl.style.zIndex = '999999999999'

    divEl.style.display = 'flex'
    divEl.style.alignItems = 'center'
    divEl.style.justifyContent = 'space-between'

    /**
     * css for button
     */

    buttonEl.style.backgroundColor = 'rgb(0, 128, 96)'
    buttonEl.style.border = '1px solid rgb(186, 191, 195)'
    buttonEl.style.border = 'none'
    buttonEl.style.padding = '10px 20px'
    buttonEl.style.borderRadius = '3px'
    buttonEl.style.cursor = 'pointer'
    buttonEl.style.transition = '0.3s all'
    buttonEl.style.color = 'white'

    body.append(divEl)

    // attach on event when click destroy mode get element
    buttonEl.addEventListener('click', (e) => {
        // handle discard post message
        window.close()
    })
}

/**
 * RENDER TOAST MESSAGE
 */

function renderToast() {
    let textHtml = `
    <div class="afontify-toast">
      <div class="toast-content">
        <div class="afontify-message">
          <span class="afontify-text"></span>
        </div>
      </div>
    </div>
    `

    const el = new DOMParser().parseFromString(textHtml, 'text/html').body.firstChild
    document.body.appendChild(el)
}

/**
 * RENDER BUTTON REMOVE APPLY FONT
 */

function renderButtonRemove() {
    const id = 'insertButtonRemove'

    document.getElementById(id)?.remove()

    const button = document.createElement('button')
    button.setAttribute('id', id)
    button.textContent = 'Remove'

    document.body.insertAdjacentElement('beforeend', button)

    button.addEventListener('click', (e) => {
        e.preventDefault()
        const toast = document.querySelector('.afontify-toast')
        const toastMessage = toast.querySelector('.afontify-text')
        toastMessage.textContent = 'Remove Element Apply'

        let findPath = currentTarget
        let path = [generateQuerySelector(findPath)]
        while (findPath != document.body) {
            findPath = findPath.parentElement
            if (findPath.id) {
                path.push(generateQuerySelector(findPath))
                break
            } else {
                path.push(generateQuerySelector(findPath))
            }
        }

        let generatePath = path.reverse().join(' > ')

        if (listSelector.length) {
            for (let i = 0; i < listSelector.length; i++) {
                let element = listSelector[i]

                if (element === generatePath) {
                    let el = document.querySelector(element)
                    el.style.fontFamily = 'inherit'
                    listSelector.splice(i, 1)
                }
            }
        }

        if (timer) {
            clearTimeout(timer)
        }
        toast.classList.add('active')

        timer = setTimeout(() => {
            toast.classList.remove('active')
        }, 1000)

        window.opener.postMessage(
            { action: mode, selector: generatePath, type: 'remove' },
            window.originDomain
        )
    })

    return button
}

/**
 * RENDER BUTTON SELECT APPLY FONT
 */

function renderButtonSelect() {
    const id = 'insertButton'

    document.getElementById(id)?.remove()

    const button = document.createElement('button')
    button.setAttribute('id', id)
    button.textContent = 'Select'

    document.body.insertAdjacentElement('beforeend', button)

    button.addEventListener('click', (e) => {
        e.preventDefault()

        const toast = document.querySelector('.afontify-toast')
        const toastMessage = toast.querySelector('.afontify-text')
        toastMessage.textContent = 'The element added to apply'
        let findPath = currentTarget
        let path = [generateQuerySelector(findPath)]
        while (findPath != document.body) {
            findPath = findPath.parentElement
            if (findPath.id) {
                path.push(generateQuerySelector(findPath))
                break
            } else {
                path.push(generateQuerySelector(findPath))
            }
        }

        let generatePath = path.reverse().join(' > ')
        currentElementActive = generatePath

        if (timer) {
            clearTimeout(timer)
        }
        toast.classList.add('active')

        timer = setTimeout(() => {
            toast.classList.remove('active')
        }, 1000)

        window.opener.postMessage(
            { action: mode, selector: generatePath, type: 'select' },
            window.originDomain
        )
    })

    return button
}

/**
 * RENDER SHAPE
 */

function renderDiv() {
    const div = document.createElement('div')
    div.id = 'insertShape'
    div.innerHTML = `
  <style>
      .fc-element{ }
      #insertButton{border-top-left-radius: 36px;border-top-right-radius: 36px;opacity:0;padding: 10px 25px; background: #ededed; color: #000000; cursor: pointer;position: absolute; z-index: 999;top: var(--insertTop); transform: translateY(-45px) ;left: var(--insertLeft);border:none !important; outline:none !important}
      #insertButton:hover{ background: red; color:white;transition:0.1s all; transform: translateY(0)}
      #insertButtonRemove{ border-bottom-left-radius: 36px;border-bottom-right-radius: 36px;opacity:0;padding: 10px 20px; background: #ededed; color: #000000; cursor: pointer;position: absolute; z-index: 999;top: var(--insertBottom); transform: translateY(-45px); left:var(--insertRight) ;border:none !important; outline:none !important}
      #insertButtonRemove:hover{ background: red;color:white;transition:0.1s all; transform: translateY(0)}
      #insertShape{ transition:0.1s all; box-shadow: 0px 0px 1px 2px rgb(186, 191, 195); width: var(--widthShape); height: var(--heightShape);pointer-events: none; position: absolute; z-index: 999;top: var(--topShape); left: var(--leftShape);}
  </style>
  `

    document.body.insertAdjacentElement('beforeend', div)

    return div
}

/**
 * HANDLE MOUSE EVENT
 */

function handleMouseOverElement(e) {
    currentTarget = e.target
    const insertButtonElement = document.getElementById('insertButton')
    const insertButtonRemoveElement = document.getElementById('insertButtonRemove')

    insertButtonElement.style.transform = 'translateY(0)'
    insertButtonRemoveElement.style.transform = 'translateY(0)'
    const { width, left, top, height, bottom, right } = currentTarget.getBoundingClientRect()
    const newTop = top + window.scrollY - Button.clientHeight
    const newLeft = left + (width / 2 + Button.clientWidth / 2) - Button.clientWidth

    const newBottom = bottom + window.scrollY
    const newRight = right - width / 2 - ButtonRemove.clientWidth / 2

    Button.style.setProperty('--insertTop', newTop + 'px')
    Button.style.setProperty('--insertLeft', newLeft + 'px')

    ButtonRemove.style.setProperty('--insertBottom', newBottom + 'px')
    ButtonRemove.style.setProperty('--insertRight', newRight + 'px')

    Div.style.setProperty('--widthShape', width + 'px')
    Div.style.setProperty('--heightShape', height + 'px')
    Div.style.setProperty('--topShape', top + window.scrollY + 'px')
    Div.style.setProperty('--leftShape', left + 'px')
}

/**
 * HANDLE
 */

function onHandle(e) {
    ButtonRemove.style.opacity = 1
    Button.style.opacity = 1

    let waiting
    if (
        e.target.closest('#insertButton') ||
        e.target.closest('#insertButtonRemove') ||
        e.target.closest('.afontify-panel') ||
        !VALID_ELEMENTS.includes(e.target.tagName.toLowerCase())
    )
        return

    if (waiting) {
        clearTimeout(waiting)
    } else {
        waiting = setTimeout(() => {
            handleMouseOverElement(e)
            // waiting = null;
        }, 100)
    }
}

/**
 * CHECK ORIGIN AND DESTROY POST MESSAGE
 */

function onHandleCheckOrigin(event) {
    if (event.data.action === 'destroy') {
        window.removeEventListener('mouseover', onHandle)
        return
    }

    if (event.data.action === 'desktop_connected') {
        mode = event.data.action
        /**
         * check field "kind" in object
         * if has kind => google font
         * upload font if not
         */

        renderPanel()
    }

    if (event.data.action === 'mobile_connected') {
        mode = event.data.action

        renderPanel()
    }

    if (event.origin !== window.location.origin || event.origin.action === 'destroy') {
        return
    }
}

/**
 * GET ORIGIN DOMAIN FROM URL
 */

function getOriginDomain() {
    return window.location.href
        .split('?')[1]
        ?.split('&')
        ?.find((item) => item.includes('originDomain='))
        ?.split('=')?.[1]
}

/**
 * INIT DATA
 */
const VALID_ELEMENTS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'li', 'a']
const Button = renderButtonSelect()
const ButtonRemove = renderButtonRemove()
const Div = renderDiv()
const Toast = renderToast()

let listSelector = []
let currentTarget
let currentElementActive = null
let timer
let mode = null

/**
 * MAIN
 */
;(() => {
    if (window.opener === null) return

    window.originDomain = window.originDomain || getOriginDomain()
    if (!window.originDomain) throw new Error('Invalid origin domain')

    window.addEventListener('message', onHandleCheckOrigin, false)
    window.addEventListener('mouseover', onHandle)

    /**
     * *******************************************************************************************
     *                                                                                           *
     * when loading file js success, window send message to parent alert file js loaded.         *
     * after parent can send message to child while action "ready"                               *
     *                                                                                           *
     * *******************************************************************************************
     */

    window.opener.postMessage({ action: 'ready' }, originDomain)
})()

/**
 *
 * @param {className} host
 * @param {String} host
 * @param {String} originDomain
 * @param {Function} callback
 */
window.ARN_ELS_MAIN = ({ className, host, originDomain, callback = () => {} }) => {
    const buttonEl = document.getElementById(className)

    if (!buttonEl) throw new Error('Element selector button not found')

    let opener = undefined
    let url = host.includes('?')
        ? `${host}&originDomain=${originDomain}`
        : `${host}?originDomain=${originDomain}`

    buttonEl.addEventListener('click', (e) => {
        opener = window.open(url, '_blank', true)
    })

    window.addEventListener('message', (e) => {
        if (!opener) return

        if (e.data.action === 'ready') {
            opener.postMessage({ action: 'desktop_connected', originDomain })
        }

        /**
         * HANDLE DATA RECEIVED FROM POST MESSAGE
         */
        callback(e.data)
    })
}
