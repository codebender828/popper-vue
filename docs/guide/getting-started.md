---
  title: Getting Started
---

## Introduction

`popper-vue` neatly and snugly implements Popper.js into a simple `<Popper>` component that you can use to wrap it's children inside of a popper around an anchor element in your Vue applications.

## ⚡️ Installation

You can istall `popper-vue` and it's dependency - `popper.js` via either NPM or yarn:

``` sh
  $ npm install popper-vue popper.js
```
OR

``` sh
  $ yarn add popper-vue popper.js
```

::: tip Note
  Please note that popper-vue assumes that you already have Vue.js installed in your application. If you not have Vue installed. Install it by running npm install vue --save
:::

## Usage

You can now use `popper-vue` in your template:

``` js
  <template>
    <div id="app">
      <button ref="anchorEl" @click="showPopper">Toggle portal</button>
      <Popper
        :is-open="show"
        :anchor-el="$refs.anchorEl"
        :popper-el="$refs.popper"
        :on-close="hidePopper"
      >
        <aside id="popper-content" ref="popper">
          I am a Happy Popper 😀
        </aside>
      </Popper>
    </div>
  </template>

  <script lang="js">
  import { Popper } from 'popper-vue'

  export default {
    name: 'App',
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
```

## ⚠️ Caveats
 * The `popper:close` event is sometimes emitted twice when the popper is being closed when the `closeOnClickAway` props is truthy. Currently there are no implemented workarounds for this yet, so while using this component make sure to be careful of it. It's also worth pointing out that this may not be that big of a problem for most consumer use cases
