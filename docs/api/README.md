---
  title: API
---

# 🏋🏼‍♀️ API

`popper-vue` provides a few components that allow to render custom popper components.

## 🧤 Props

| Props             | Description                                                                                                                   | Values       | Default |
| :----------------:|-------------------------------------------------------------------------------------------------------------------------------|--------------------------------- | ---------- |
| anchorEl          | Anchor element around which popper is positioned                                                                              | `HTMLElement`                    |  N/A       |
| popperEl          | Element/Component to render inside popper                                                                                     | `HTMLElement`                    |  N/A       |
| placement         | Default position where `popperEl` should be placed when Popper is open                                                        | *top*, *right*, *bottom*, *left* |  `bottom`  |
| modifiers         | Modifier options for `popper.js`. See [popper.js docs](https://popper.js.org/popper-documentation.html) for more information  | `Object`                         |  `{}`      |
| isOpen            | Determines whether the Popper is open or not                                                                                  | `Boolean`                        |  `false`   |
| onClose           | Handler function to be called when the popper is to be closed                                                                 | `Function`                       |  `null`    |
| closeOnClickAway  | Determines whether popper should close when other elements are clicked                                                        | `Boolean`                        |  `true`    |
| usePortal         | Determines whether popper should mount `popperEl` in portal before positioning it around anchor.                              | `Boolean`                        |  `true`    |
| hasArrow          | Determines whether popper should possess arrow when shown                                                                     | `Boolean`                        |  `true`    |

