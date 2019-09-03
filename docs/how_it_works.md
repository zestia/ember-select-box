# How it works

- When the select box component is rendered, it does not know what options are available yet, because child components (options) could still be being rendered. During this phase, child components are registered with the select box.

- Each option component computes whether or not it is selected by comparing its value to the value of its select box.

- Each option component computes whether or not it is active by comparing its index amongst the other options, to the active index of the select box.
