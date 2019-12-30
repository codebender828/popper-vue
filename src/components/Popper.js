import { createElement as h, watch } from '@vue/composition-api'
import PopperJS from 'popper.js'
import VisuallyHidden from './VisuallyHidden'

const Popper = {
  name: 'Popper',
  props: {
    isOpen: Boolean,
    referenceElement: [HTMLElement, Object],
    contentElement: [HTMLElement, Object]
  },
  setup (props, context) {
    let popper = null

    watch(() => {
      if (props.isOpen) {
        if (popper) {
          popper.scheduleUpdate()
        } else {
          popper = new PopperJS(props.referenceElement, props.contentElement, {
            placement: 'top'
          })
        }
      } else {
        if (popper) {
          popper.destroy()
          popper = null
        }
      }
    })

    return () => h('MountingPortal', {
      props: {
        mountTo: '#widget',
        append: true
      }
    }, [h(VisuallyHidden, {}, context.slots.default())])
  }
}

export default Popper
