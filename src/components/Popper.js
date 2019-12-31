import { createElement as h, watch, ref } from '@vue/composition-api'
import PopperJS from 'popper.js'
import VisuallyHidden from './VisuallyHidden'

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

    return () => props.usePortal ? h('MountingPortal', {
      props: {
        mountTo: '#widget',
        append: true,
        disabled: props.usePortal
      }
    }, [h(VisuallyHidden, {}, context.slots.default())]) : h(VisuallyHidden, {}, context.slots.default())
  }
}

export default Popper
