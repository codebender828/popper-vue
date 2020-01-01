
<h1 align="center"><code>🎊 popper-vue (WIP)</code></h1>
<h4 align="center">A lightweight bring-your-own-component(BYOC) Popper for Vue.js</h4>

### 🌟 Features
`popper-vue` neatly and snugly implements Popper.js into a simple `<Popper>` component that you can use to wrap it's children inside of a popper around an anchor element in your Vue applications.
- **Render whatever you want:** Utilize the render callback to create entirely custom poppers.
- **Functional default styles:** Import the provided css for some nice styling defaults or write your own styles.
- **Portal your poppers anywhere in the DOM:** You can use a portal element to render your popper, or if you want to yet, use direct child.

### ⚡️ Installation (🚨 This package has not been published yet)
```bash
$ npm install popper-vue popper.js
```
> Please note that `popper-vue` assumes that you already have Vue.js installed in your application. If you not have Vue installed. Install it by running `npm install vue --save`


In your templates:
```html
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

### 🏋🏼‍♀️ API
`popper-vue` provides a few components that allow to render custom popper components.

#### 🧤 Props
| Props         | Description   | Values | Default |
| :-------------: |-------------| ----- | --- |
| anchorEl      | Anchor element around which popper is positioned | `HTMLElement` |  N/A  |
| popperEl      | Element/Component to render inside popper | `HTMLElement` |  N/A  |
| placement      | Default position where `popperEl` should be placed when Popper is open | `top`, `right`, `bottom`, `left` |  `bottom`  |
| modifiers      | Modifier options for `popper.js`. See [popper.js docs]() for more information | `Object` |  `{}`  |
| isOpen      | Determines whether the Popper is open or not | `Boolean` |  `false`  |
| onClose  | Handler function to be called when the popper is to be closed | `Function` |  `null`  |
| closeOnClickAway  | Determines whether popper should close when other elements are clicked | `Boolean` |  `true`  |
| usePortal  | Determines whether popper should mount `popperEl` in portal before positioning it around anchor. | `Boolean` |  `true`  |
| hasArrow  | Determines whether popper should possess arrow when shown | `Boolean` |  `true`  |


#### 📅 Events
| Events        | Description   | Payload |
| ------------- |---------------| ----- |
| `popper:create`     | Emitted when `popperEl` is open and has been mounted by `popper.js` | `{ el: popperEl<HTMLElement> }` |
| `popper:update`     | Emitted when Popper.js instance undergoes an update | `{ el: HTMLElement }` |
| `popper:close`     | Emitted when `popperEl` is closed and has been unmounted by `popper.js` | `{}` |

### ⚠️ Caveats
- The `popper:close` event is sometimes emitted **twice** when the popper is being closed when the `closeOnClickAway` props is **truthy**. Currently there are no implemented workarounds for this yet, so while using this component make sure to be careful of it. It's also worth pointing out that this may not be that big of a problem for most consumer use cases

### 📚TODO
 - [ ] Add support for JS and CSS transitions
 - [ ] Docs site
 - [ ] Codesandbox examples
 - [ ] Articles to illustrate how to use `popper-vue` in component library
 - [ ] Type declaration files
 - [ ] Publish to NPM
 - [ ] Create Vue plugin to register components



### 🦑 Contributors
- [Jonathan Bakebwa](https://twitter.com/codebender828)
- This could be you :)

#### 🤝 Contributing
Here's our contribution [guide.](./.github/CONTRIBUTING.md)

#### ❤️ Support this project
If you like this project, please consider supporting it by buying my a coffee!

<a style="background: #FF813F; color: white; padding: 10px 20px; border-radius: 3px; display: inline-flex;" target="_blank" href="https://www.buymeacoffee.com/dIlWof6x5">
  <img style="margin-right: 10px; height: 20px;" src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="Buy me a coffee">
  <span>Buy me a coffee</span>
</a>

<center>
  <br>
  Made with ❤️ by <a target="_blank" href="https://twitter.com/codebender828">Jonathan Bakebwa 🇺🇬</a>
</center>

