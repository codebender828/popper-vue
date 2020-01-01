import { createElement as h, watch, ref } from '@vue/composition-api'
import PopperJS from 'popper.js'
import VisuallyHidden from './VisuallyHidden'
import './popper-vue.styles.scss'
import { createChainedFunction } from '../utils'
const Portal = () => import(/* webpackChunkName: "Portal-component" */'./Portal')
const ClickOutside = () => import(/* webpackChunkName: "ClickOutside-component" */'./ClickOutside')

export const PopperArrow = {
  name: 'PopperArrow',
  setup () {
    return () => h('div', {
      style: {
        background: 'inherit'
      },
      attrs: {
        'x-arrow': true,
        role: 'presentation'
      }
    })
  }
}

export const Popper = {
  name: 'Popper',
  props: {
    isOpen: Boolean,
    placement: {
      type: String,
      default: 'bottom'
    },
    usePortal: {
      type: Boolean,
      default: true
    },
    onClose: {
      type: Function,
      default: () => null
    },
    closeOnClickAway: {
      type: Boolean,
      default: true
    },
    modifiers: {
      type: Object,
      default: () => {}
    },
    anchorEl: [HTMLElement, Object],
    popperEl: [HTMLElement, Object],
    eventsEnabled: Boolean,
    positionFixed: Boolean,
    removeOnDestroy: Boolean,
    hasArrow: {
      type: Boolean,
      default: true
    }
  },
  setup (props, context) {
    const popperRef = ref(null)

    /**
     * Wrapped handler for close events
     */
    const wrapClose = () => {
      if (popperRef.value) {
        if (props.onClose) props.onClose()
        context.emit('popper:close', {})
      }
    }

    /**
     * Handle's popper updates when update is called
     * @param {Object} payload
     */
    const handlePopperUpdate = (payload) => {
      context.emit('popper:update', payload)
    }

    /**
     * Handle's popper updates when update is called
     * @param {Object} payload
     */
    const handlePopperCreated = (payload) => {
      context.emit('popper:create', payload)
    }

    /**
     * Binds Arrow class to VNode data before rendering
     * @param {Vue.VNode} node
     * @returns {Vue.VNode}
     */
    const bindArrowClass = (node) => {
      if (node[0].data['staticClass']) node[0].data['staticClass'] += ' popper-vue'
      else node[0].data['staticClass'] = 'popper-vue'
      return node
    }

    watch(() => {
      if (props.isOpen) {
        if (popperRef.value) {
          popperRef.value.scheduleUpdate()
        } else {
          // props.popperEl && props.popperEl.classList.add('popper-vue')
          popperRef.value = new PopperJS(props.anchorEl, props.popperEl, {
            placement: props.placement,
            modifiers: {
              ...(props.usePortal && {
                preventOverflow: {
                  boundariesElement: 'window'
                }
              }),
              ...props.modifiers
            },
            onUpdate: createChainedFunction(
              handlePopperUpdate
            ),
            onCreate: createChainedFunction(
              handlePopperCreated
            ),
            eventsEnabled: props.eventsEnabled,
            positionFixed: props.positionFixed,
            removeOnDestroy: props.removeOnDestroy
          })
        }
      } else {
        if (popperRef.value) {
          popperRef.value.destroy()
          popperRef.value = null
          context.emit('popper:close', {})
        }
      }
    })

    return () => {
      const children = context.slots.default()
      if (children.length > 1) {
        return console.error(`[PopperVue]: The <Popper> component expects only one child element at it's root. You passed ${children.length} child nodes.`)
      }

      // Add arrow if arrow is to be shown
      if (props.hasArrow) {
        children[0].children.push(h(PopperArrow))
        bindArrowClass(children, h)
      }

      return props.usePortal ? h(Portal, {
        props: {
          target: '#popper-vue',
          append: true
        },
        attrs: {
          disabled: !props.usePortal
        }
      }, [h(VisuallyHidden, {}, [
        h(ClickOutside, {
          props: {
            whitelist: [props.anchorEl],
            active: props.closeOnClickAway,
            do: wrapClose
          }
        }, children) ])]) : h(VisuallyHidden, {}, [h(ClickOutside, {
        props: {
          whitelist: [props.anchorEl],
          active: props.closeOnClickAway,
          do: wrapClose
        }
      }, children)])
    }
  }
}
