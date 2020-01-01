import { onMounted, onBeforeUnmount } from '@vue/composition-api'

const ClickOutside = {
  name: 'ClickOutside',
  props: {
    whitelist: Array,
    active: Boolean,
    do: Function
  },
  setup (props, context) {
    const listener = (e, el) => {
      if (e.target === el || el.contains(e.target) || props.whitelist.includes(e.target)) return
      if (props.do) props.do()
    }

    onMounted(function () {
      if (props.active) {
        document.addEventListener('click', (e) => listener(e, this.$el))
      }
    })

    onBeforeUnmount(function () {
      if (props.active) {
        document.removeEventListener('click', (e) => listener(e, this.$el))
      }
    })

    return () => context.slots.default()[0]
  }
}

export default ClickOutside
