<template>
  <div id="app">
    <button ref="anchorEl" @click="showPopper">Toggle Popper</button>
    <Popper
      :is-open="show"
      :anchor-el="$refs.anchorEl"
      :popper-el="$refs.popper"
      :on-close="hidePopper"
      :placement="placement"
      :usePortal="usePortal"
      @popper:create="focus($refs.input)"
      @popper:close="focus($refs.anchorEl)"
    >
      <form id="popper-content" class="aside-popper" ref="popper">
        <Loader />
        <label for="input">Name</label>
        <input @keydown.esc="hidePopper" id="input" class="focus-outline" value="I ❤️ Popper Vue 😍" type="text" ref="input">
      </form>
    </Popper>
  </div>
</template>

<script>
import { Popper } from './lib'
import Loader from './components/Loader'

console.log(Popper)

export default {
  name: 'app',
  components: {
    Popper,
    Loader
  },
  created () {
    const descContent = 'A lightweight Popper for Vue.js'
    const createDescription = () => {
      const desc = document.createElement('meta')
      desc.setAttribute('name', 'description')
      desc.setAttribute('content', descContent)
      return document.head.appendChild(desc)
    }
    const description = document.head.querySelector('meta[name=description]')
    document.title = '🎊 PopperVue'
    description ? document.content = descContent
      : createDescription()
  },
  data () {
    return {
      show: false,
      usePortal: true,
      placement: 'auto'
    }
  },
  methods: {
    showPopper () {
      this.show = !this.show
    },
    hidePopper () {
      this.show = false
    },
    focus (el) {
      this.$nextTick(() => {
        el && el.focus()
      })
    }
  }
}
</script>

<style lang="scss">
html,
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height: 100vh;
  width: 100vw;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

button {
  padding: 0.9rem 1.5rem;
  border-radius: 3px;
  color:#fff;
  background: darkslategray;
  border: none;
  font-weight: 700;
  font-size: 1em;
  transition: all 0.2s ease-in-out;
  outline: none;

  &:focus {
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.6)
  }
}

.focus-outline {

  &:focus {
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.6)
  }
}

.aside-popper {
  padding: 2rem;
  background: #efefef;
  border-radius: 3px;

  input {
    margin-left: 5px;
    outline: none;
    padding: 5px;
    border: #d2d2d2 2px solid;
    border-radius: 5px;
    font-size: 1.3rem;
  }
}
</style>
