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
      has-arrow
      @popper:create="focus($refs.input)"
      @popper:close="focus($refs.anchorEl)"
    >
      <form @keydown.esc="hidePopper" @submit.prevent id="popper-content" class="aside-popper" ref="popper">
        <h2 style="margin-top: 0">🔑 Login</h2>
        <label for="input">
          Email
          <input id="input" class="focus-outline" type="email" ref="input">
        </label>
        <label for="input">
          Password
          <input id="password" class="focus-outline" type="password" ref="password">
        </label>
        <button class="submit" @click="hidePopper">Submit</button>
      </form>
    </Popper>
    <button style="margin-left: 50px;" ref="anchorEl2" @click="showPopper2">Toggle Popper 2</button>
    <Popper
      :is-open="show2"
      :anchor-el="$refs.anchorEl2"
      :popper-el="$refs.popper2"
      :on-close="hidePopper2"
      :placement="placement2"
      :usePortal="false"
      :has-arrow="false"
      @popper:create="focus($refs.input2)"
      @popper:close="focus($refs.anchorEl2)"
    >
      <form @keydown.esc="hidePopper2" @submit.prevent id="popper-content" class="aside-popper" ref="popper2">
        <h2 style="margin-top: 0">🔑 Login</h2>
        <label for="input2">
          Email
          <input id="input2" class="focus-outline" type="email" ref="input2">
        </label>
        <label for="input2">
          Password
          <input id="password2" class="focus-outline" type="password" ref="password">
        </label>
        <button class="submit" @click="hidePopper2">Submit</button>
      </form>
    </Popper>
  </div>
</template>

<script>
import { Popper } from './lib'

export default {
  name: 'app',
  components: {
    Popper
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
    description ? (document.content = descContent) : createDescription()
  },
  data () {
    return {
      show: false,
      usePortal: true,
      placement: 'auto',
      show2: false,
      placement2: 'auto'
    }
  },
  methods: {
    showPopper () {
      this.show = !this.show
    },
    hidePopper () {
      this.show = false
    },
    showPopper2 () {
      this.show2 = !this.show2
    },
    hidePopper2 () {
      this.show2 = false
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
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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
  color: #fff;
  background: darkslategray;
  border: none;
  font-weight: 700;
  font-size: 1em;
  transition: all 0.2s ease-in-out;
  outline: none;

  &.submit {
    padding: 0.5rem 0.9rem;
    width: 100%;
  }

  &:focus {
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.6);
  }
}

.focus-outline {
  &:focus {
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.6);
  }
}

.aside-popper {
  padding: 1.5rem;
  background: #efefef;
  border-radius: 3px;
  margin: 30px;
}

label {
  display: block;
  text-align: left;
  font-weight: bold;
  font-size: 0.8em;
  text-transform: uppercase;
  margin-bottom: 10px;

  input {
    display: block;
    outline: none;
    padding: 5px;
    border: #d2d2d2 2px solid;
    border-radius: 5px;
    font-size: 1.3rem;
    margin-bottom: 15px;
    transition: all 0.2s ease-in-out;
  }
}
</style>
