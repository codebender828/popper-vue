<template>
  <div id="app">
    <button ref="anchorEl" @click="showPopper">Toggle portal</button>
    <Popper
      :is-open="show"
      :anchor-el="$refs.anchorEl"
      :popper-el="$refs.popper"
      :on-close="hidePopper"
      :closeOnClickAway="false"
    >
      <aside id="popper-content" ref="popper">
        I am a Happy Popper 😀
      </aside>
    </Popper>
  </div>
</template>

<script>
import { Popper } from './components/Popper'

export default {
  name: 'app',
  components: {
    Popper
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    showPopper () {
      this.show = !this.show
    },
    hidePopper () {
      this.show = false
    }
  }
}
</script>

<style>
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
</style>
