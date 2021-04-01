# How it works

## TL;DR

This addon just renders a div, with other divs inside it. One or more of those divs is automatically flagged a _selected_.

## More detail

### Options

1. When the select box component is rendered, it does not know what options are available yet, because its child components (aka options) are still be being rendered. During this phase, the child components are registered in an array on the select box.

2. The value given to the select box component is resolved.

3. The values given to the option components are resolved.

4. Each option component computes whether or not it is **selected** by comparing _its value_ to the value of its select box.

5. Each option component computes whether or not it is **active** by comparing _its index_, to the active index of the select box.

Using _components_ to represent a value is much more flexible than other select box addons - which rely on a data structure to be passed in to define the options.

### Selecting

When an option is selected it sets the value of that option component as a property on the select box. Thereby causing re-computation of what is selected. (See point 4 above).

### Form behaviour

Browser forms are submitted when Enter is pressed inside a text field. So if your select box has an associated text field, and Enter is pressed - it too will submit the form. This is just how browsers work.

If there is an **active** option and Enter is pressed, then this addon will call `preventDefault` on the event - because in this case, we want the _option to be selected_ and _not_ the form to be submitted! Focus will remain in the text field, so a subsequent press of the Enter key will indeed submit the form as normal.

### Accessibility

The select box addon defines itself as a `listbox` by default. But, if your select box renders an input inside it, then it will automatically be defined as a `combobox` (A combination of an input, and a list of options)

Other aria attributes are provided automatically to make sure Screen Readers correctly announce each option and the selected option(s).

But, as this addon only provides an ultra basic select box, it is still up to you the developer to flesh out the behaviour.
