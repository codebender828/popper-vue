import { createElement as h } from '@vue/composition-api'

const VisuallyHidden = {
  name: 'VisuallyHidden',
  setup (_props, context) {
    return () => h('div', {
      style: {
        border: '0px',
        clip: 'rect(0px, 0px, 0px, 0px)',
        height: '0px',
        width: '0px',
        margin: '-1px',
        padding: '0px',
        overflow: 'hidden',
        'white-space': 'nowrap'
      }
    }, context.slots.default())
  }
}

export default VisuallyHidden
