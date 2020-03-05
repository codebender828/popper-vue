import PopperJS from 'popper.js'
import Portal from '../Portal'
import ClickOutside from '../ClickOutside'
import './popper-vue.styles.scss'
import { createChainedFunction, useId } from '../utils'

const PopperArrow = {
  name: 'PopperArrow',
  render (h) {
    return h('div', {
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
    modifiers: {
      type: Object,
      default: () => {}
    },
    anchorEl: [HTMLElement, Object],
    popperEl: [HTMLElement, Object],
    eventsEnabled: {
      type: Boolean,
      default: true
    },
    positionFixed: Boolean,
    hasArrow: {
      type: Boolean,
      default: true
    },
    usePortalTarget: String
  },
  data () {
    return {
      popper: null
    }
  },
  computed: {
    portalTarget () {
      return this.usePortalTarget || `#popper-vue-portal-${useId(4)}`
    }
  },
  methods: {
    /**
     * Wrapped handler for close events
     */
    wrapClose () {
      if (this.popper) {
        if (this.onClose) this.onClose()
        this.$emit('popper:close', {})
      }
    },
    /**
     * Handle's popper updates when update is called
     * @param {Object} payload
     */
    handlePopperUpdate (payload) {
      this.$emit('popper:update', payload)
    },
    /**
     * Handle's popper updates when update is called
     * @param {Object} payload
     */
    handlePopperCreated (payload) {
      this.$emit('popper:create', payload)
    },
    /**
     * Binds Arrow class to VNode data before rendering
     * @param {Vue.VNode} node
     * @returns {Vue.VNode}
     */
    bindArrowClass (node) {
      if (node[0].data['staticClass']) node[0].data['staticClass'] += ' popper-vue'
      else node[0].data['staticClass'] = 'popper-vue'
      return node
    }
  },
  mounted () {
    this.$watch(vm => [vm.placement], () => {
      if (this.popper) {
        this.popper.options.placment = this.placement
        this.popper.scheduleUpdate()
      }
    })

    this.$watch(() => {
      if (this.isOpen) {
        if (this.popper) {
          this.popper.scheduleUpdate()
        } else {
          this.popper = new PopperJS(this.anchorEl, this.popperEl, {
            placement: this.placement,
            modifiers: {
              ...(this.usePortal && {
                preventOverflow: {
                  boundariesElement: 'window'
                }
              }),
              ...this.modifiers
            },
            onUpdate: createChainedFunction(
              this.handlePopperUpdate
            ),
            onCreate: createChainedFunction(
              this.handlePopperCreated
            ),
            eventsEnabled: this.eventsEnabled,
            positionFixed: this.positionFixed
          })
        }
      } else {
        if (this.popper) {
          this.popper.destroy()
          this.popper = null
          this.$emit('popper:close', {})
        }
      }
    })
  },
  render (h) {
    const children = this.$slots.default
    if (children.length > 1) {
      // eslint-disable-next-line
        return console.error(`[PopperVue]: The <Popper> component expects only one child element at it's root. You passed ${children.length} child nodes.`)
    }

    /**
       * Add arrow element to children list if hasArrow props is to be shown
       */
    if (this.hasArrow && this.isOpen) {
      children[0].children.push(h(PopperArrow))
      this.bindArrowClass(children, h)
    }

    return this.usePortal ? h(Portal, {
      props: {
        append: true,
        target: this.portalTarget,
        disabled: !this.usePortal,
        slim: true,
        unmountOnDestroy: true,
        targetSlim: true
      },
      attrs: {
        disabled: !this.usePortal
      }
    }, [h('div', {
      style: {
        display: this.isOpen ? 'unset' : 'none'
      }
    }, [
      h(ClickOutside, {
        props: {
          whitelist: [this.anchorEl],
          active: this.closeOnClickAway,
          do: this.wrapClose
        }
      }, children) ])]) : h('div', {
      style: {
        display: this.isOpen ? 'unset' : 'none'
      }
    }, [h(ClickOutside, {
      props: {
        whitelist: [this.anchorEl],
        active: this.closeOnClickAway,
        do: this.wrapClose
      }
    }, children)])
  }
}

export {
  Popper,
  PopperArrow
}
