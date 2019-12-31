import { createElement as h, watch, ref } from '@vue/composition-api'
import PopperJS from 'popper.js'
import VisuallyHidden from './VisuallyHidden'
import Portal from './Portal'

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
    referenceElement: [HTMLElement, Object],
    contentElement: [HTMLElement, Object]
  },
  setup (props, context) {
    const popperRef = ref(null)

    watch(() => {
      if (props.isOpen) {
        if (popperRef.value) {
          popperRef.value.scheduleUpdate()
        } else {
          popperRef.value = new PopperJS(props.referenceElement, props.contentElement, {
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
      }, [h(VisuallyHidden, {}, children)]) : h(VisuallyHidden, {}, children)
    }
  }
}

export default Popper
