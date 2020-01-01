import { createElement as h, watch, ref } from '@vue/composition-api'
import PopperJS from 'popper.js'
import VisuallyHidden from './VisuallyHidden'
import './popper-vue.styles.scss'
const Portal = () => import(/* webpackChunkName: "Portal-component" */'./Portal')
const ClickOutside = () => import(/* webpackChunkName: "ClickOutside-component" */'./ClickOutside')

const Popper = {
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
    anchorEl: [HTMLElement, Object],
    contentEl: [HTMLElement, Object]
  },
  setup (props, context) {
    const popperRef = ref(null)

    watch(() => {
      if (props.isOpen) {
        if (popperRef.value) {
          popperRef.value.scheduleUpdate()
        } else {
          popperRef.value = new PopperJS(props.anchorEl, props.contentEl, {
            placement: props.placement
          })
        }
      } else {
        if (popperRef.value) {
          popperRef.value.destroy()
          popperRef.value = null
        }
      }
    })

    return () => {
      const children = context.slots.default()
      return props.usePortal ? h(Portal, {
        props: {
          target: '#popper-vue',
          append: true
        },
        attrs: {
          disabled: !props.usePortal
        }
      }, [h(VisuallyHidden, {}, [h(ClickOutside, {
        props: {
          whitelist: [props.anchorEl],
          active: props.closeOnClickAway,
          do: props.onClose
        }
      }, children)])]) : h(VisuallyHidden, {}, [h(ClickOutside, {
        props: {
          whitelist: [props.anchorEl],
          active: props.closeOnClickAway,
          do: props.onClose
        }
      }, children)])
    }
  }
}

export default Popper
