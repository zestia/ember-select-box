# Class names

By default the select box will render using [BEM](http://getbem.com) class names.

To customise the prefix used for BEM:

```handlebars
<SelectBox @classNamePrefix="my-select" />
```

If you do not want to use BEM, implement the `@onBuildClassName` action, here is an example:

```handlebars
<SelectBox @onBuildClassName={{this.buildClassName}} />
```

```javascript
export default class MyComponent extends Component {
  @action
  buildClassName(child, state) {
    switch (child) {
      case 'option':
      // return ...;
      case 'options':
      // return ...;
      case 'selected-option':
      // return ...;
      case 'selected-options':
      // return ...;
      case 'group':
      // return ...;
      case 'group-label':
      // return ...;
      case 'group-options':
      // return ...;
      case 'input':
      // return ...;
      default:
      // return ...;
    }
  }
}
```

In the above example `buildClassName` will be called with a `child` parameter to so you can target the child element. And a `state` parameter so you can target the elemen's state. For example: a disabled option would receive `("option", "disabled")`
