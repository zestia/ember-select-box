# How it works

## Options

1. When the select box component is rendered, it does not know what options are available yet, because child components (options) could still be being rendered. During this phase, child components are registered in an array on the select box.

2. After render, the array of options is sorted to match the order of the elements in the DOM. This sorting is important, because as an addon, we [cannot know](https://ember-twiddle.com/ddae8f58d5175e64577e79d720013cf2) what order the options are in until rendering has finished.

3. Each option component computes whether or not it is **selected** by comparing its value to the value of its select box.

4. Each option component computes whether or not it is **active** by comparing its index, to the active index of the select box.

This simple pattern means that the options themselves are the _components_ and _not_ the _values_. This is because it is perfectly valid to have more than one option with the same value.

## Selecting

When Enter is pressed, or an option is clicked - it will be selected. All that this does, is set the value of that option as a property on the select box. (See point 3 above)

## Form behaviour

Forms submit if Enter is pressed inside a text field. If your select box has an associated text field, and Enter is pressed - it too will submit the form. This is just how browsers work. However, if there is an **active** option, then this addon will call `preventDefault` on the keydown event - because in this case, we want the _option to be selected_ and _not_ the form to be submitted. Focus remains in the text field, so a subsequent press of the Enter key will indeed submit the form.
