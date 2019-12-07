# Troubleshooting

- Problem: When I navigate using the arrow keys, the wrong option becomes active
- Solution: This may happen when you change the options that are displayed, because Ember will try to
  re-use components. You can fix this by adding `key="@index"` to your `#each`.

- Problem: Rendering lots of options is slow.
- Solution: If your select box only uses _primitive_ values, you do not need to use `<sb.Option>`, instead you can
  use a plain old `<option>` element [[Example](tests/dummy/app/templates/fast-native-single-select.hbs)]. Which will be faster, because constructing components is expensive in Ember.
