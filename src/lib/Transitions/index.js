import anime from 'animejs'

const enterEasing = 'spring(1, 100, 50, 0)'
const leaveEasing = 'spring(1, 100, 70, 0)'

const Scale = {
  name: 'Scale',
  props: {
    in: Boolean,
    initialScale: {
      type: Number,
      default: 0.97
    },
    duration: {
      type: Number,
      default: 150
    }
  },
  methods: {
    enter (el, complete) {
      anime({
        targets: el,
        opacity: [0, 1],
        scale: [this.initialScale, 1],
        easing: enterEasing,
        complete
      })
    },
    leave (el, complete) {
      anime({
        targets: el,
        opacity: [1, 0],
        scale: [1, this.initialScale],
        easing: leaveEasing,
        complete
      })
    }
  },
  render (h) {
    const children = this.$slots.default
    const TransitionElement = children.length > 1 ? 'TransitionGroup' : 'Transition'
    return h(TransitionElement, {
      props: {
        css: false
      },
      on: {
        beforeEnter (el) {
          el && el.style.setProperty('will-change', 'opacity, transform')
        },
        enter: this.enter,
        leave: this.leave
      }
    }, this.in && this.$slots.default)
  }
}

const SlideIn = {
  name: 'SlideIn',
  props: {
    in: Boolean,
    offset: {
      type: String,
      default: '10px'
    },
    duration: {
      type: Number,
      default: 150
    }
  },
  methods: {
    enter (el, complete) {
      anime({
        targets: el,
        opacity: [0, 1],
        translateY: [this.offset, '0px'],
        easing: enterEasing,
        complete
      })
    },
    leave (el, complete) {
      anime({
        targets: el,
        opacity: [1, 0],
        translateY: ['0px', this.offset],
        easing: leaveEasing,
        complete
      })
    }
  },
  render (h) {
    const children = this.$slots.default
    const TransitionElement = children.length > 1 ? 'TransitionGroup' : 'Transition'
    return h(TransitionElement, {
      props: {
        css: false
      },
      on: {
        beforeEnter (el) {
          el && el.style.setProperty('will-change', 'opacity, transform')
        },
        enter: this.enter,
        leave: this.leave
      }
    }, this.in && this.$slots.default)
  }
}

export {
  SlideIn,
  Scale
}
