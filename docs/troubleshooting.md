# Troubleshooting

- Problem: Rendering lots of options is slow.
- Solution: If your select box only uses _primitive_ values, you do not need to use `<sb.Option>`, instead you can
  use a plain old `<option>` element [[Example](../tests/dummy/app/templates/fast-native-single-select.hbs)]. Which will be faster, because constructing components is expensive in Ember.
