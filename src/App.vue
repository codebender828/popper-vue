<template>
  <div id="app">
    <button ref="referenceEl" @click="toggle">Toggle portal</button>
    <Popper
      :is-open="show"
      :reference-element="$refs.referenceEl"
      :content-element="$refs.popperContent"
      placement="bottom"
    >
      <aside id="popper-content" style="width: 100px; height: 60px; background: coral;" ref="popperContent">
      </aside>
    </Popper>
  </div>
</template>

<script>
import Popper from './components/Popper'

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
  created () {
    const target = document.createElement('div')
    target.id = 'widget'
    document.body.appendChild(target)
  },
  methods: {
    toggle () {
      this.show = !this.show
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
