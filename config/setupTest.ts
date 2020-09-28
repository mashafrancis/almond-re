import '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import matchMediaPolyfill from 'mq-polyfill'
import { jsdom } from 'jsdom'

Object.defineProperty(global, 'Node', {
  value: { firstElementChild: 'firstElementChild' },
})

const window = jsdom().defaultView
matchMediaPolyfill(window)
window.resizeTo = function resizeTo(width, height) {
  Object.assign(this, {
    innerWidth: width,
    innerHeight: height,
    outerWidth: width,
    outerHeight: height,
  }).dispatchEvent(new this.Event('resize'))
}
