# How it works

## TL;DR

This addon just renders a div, with other divs inside it. One or more of those divs is automatically flagged a _selected_.

## More detail

### Options

1. When the select box component is rendered, it does not know what options are available yet, because its child components (aka options) are still be being rendered. During this phase, the child components are registered in an array on the select box.

2. After render, the array of options is sorted to match the order of the elements in the DOM. This sorting is important, because as an addon, we [cannot know](https://ember-twiddle.com/ddae8f58d5175e64577e79d720013cf2) what order the options are in until rendering has finished.

3. The value given to the select box component is resolved.

4. The values given to the option components are resolved.

5. Each option component computes whether or not it is **selected** by comparing _its value_ to the value of its select box.

6. Each option component computes whether or not it is **active** by comparing _its index_, to the active index of the select box.

This simple pattern means that the options are the _components_ and _not_ the _values_. This is a crucial difference between this addon and others like it (e.g. Ember Power Select) which rely on the data structure passed in to define the options.

### Selecting

When Enter is pressed, or an option is clicked - it will be selected. All that this does, is set the value of that option component as a property on the select box. Thereby causing re-computation of what is selected. (See point 3 above).

### Form behaviour

Browser forms submit when Enter is pressed inside a text field. If your select box has an associated text field, and Enter is pressed - it too will submit the form. This is just how browsers work. However, if there is an **active** option, then this addon will call `preventDefault` on the keydown event - because in this case, we want the _option to be selected_ and _not_ the form to be submitted. Focus will remain in the text field, so a subsequent press of the Enter key will indeed submit the form as normal.
