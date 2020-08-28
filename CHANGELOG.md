# Changelog

## 15.0.0-beta.3

- Removed `data-` attributes, `@classNamePrefix` and `@onBuildClassName` in a bid to reduce API surface
- Removed stateful BEM class names, like `select-box__option--selected` in favour of aria attributes
- Removed `onInsertElement`
- Removed `sb.Group` for native select box. `optgroup` can be used instead
- Removed `@onInput` from `sb.Input` component. This action wasn't providing anything different than what can be acheived by using `{{on "input"}}`
- Removed ability to set a `@value` on a selected option, and activate that selected option.
- `SelectedOption`, `SelectedOptions`, `Group` and `Options` are now just dumb template only components. They weren't removed altogether, because they still prove useful for higher order components with the component helper.
- Upgrade dependencies

## 15.0.0-beta.2

- Fix debounced searched attempts if `@searchDelayTime` is 0

## 15.0.0-beta.1

- Small internal refactor around focusing

## 15.0.0-beta.0

- Remove `onFocusIn` and `onFocusOut` actions, these don't provide anything different than what can be acheived by using `{{on "focusin"}}` and `{{on "focusout"}}`.
- Add `onFocusLeave` which fires when focus leaves the select box. This is useful for closing the select box when tabbing away.
- Remove `onClickOutside` in favour of `onFocusLeave`. (This removed the need for event listeners on the document).

## 14.0.4

- Upgrade dependencies

## 14.0.3

- Upgrade dependencies
- Activating options no longer waits for render before attempting to scroll into view
  (this responsibility is shifted to the user of the addon)

## 14.0.2

- Support setting type of input when used with component helper
- Support setting role of selected option when used with component helper

## 14.0.1

- Remove custom scroll into view code, in favour of browsers' own version
- Run prettier
- Upgrade dependencies

## 14.0.0

- Release changes from 14.0.0-beta

## 14.0.0-beta.1

- Fix API be re-computed during teardown causing rendering issue

## 14.0.0-beta.0

- Glimmerise component
- Drop support for Ember < 3.16

## 13.0.9

- Allow tabindex to be set on selected options with a temporary fix, due to: https://github.com/emberjs/rfcs/issues/497

## 13.0.8

- Upgrade dependencies

## 13.0.7

- Use capture on document listener for detecting when something outside of a select box is clicked.
  (This fixes an issue where it wasn't possible to close a select box onClickOutside, but also open it with a button outside of itself)
- Upgade dependencies

## 13.0.6

- Upgrade dependencies

## 13.0.5

- Add [`@onBuildClassName`](docs/class-names.md)

## 13.0.4

- Prevent errors if API is used and select box is destroyed

## 13.0.3

- Improvement: Options's indexes are stable against the correct DOM order
- Internal: Add data attribute to distinguish between types of child components registered with parent select box.
- Internal: Register components on insert rather than init to ensure DOM node available

## 13.0.2

- Only prevent default if target of Enter key-down event was a select box component.
  (This allows children, typically hyperlinks inside options to still work by pressing Enter)

## 13.0.1

- Apply same fix for focus-in as focus-out.

## 13.0.0

- Drop support for < Ember 3.11
- Key down event is now `defaultPrevented` if pressing Enter resulted in an option being selected.
  (Forms can still be submitted by pressing Enter).

## 12.2.1

- Upgrade dependencies

## 12.2.0

- Adds `activateOptionForValue`
- API methods that accepted a boolean option, signifying whether to scroll to an option, now accept an object with a property `{ scrollIntoView: bool }` instead.

## 12.1.0

- Rename `@onInit` to `@onReady`

## 12.0.0

- Switch to BEM syntax for markup
- Remove `class-name-prefix` helper

## 11.0.1

- Unpin render modifier dependancy

## 11.0.0

- Release changes from version 10.0.9-beta

## 10.0.9-beta.5

- Fix performance regression
- Add regression test

## 10.0.9-beta.4

- Correct use of `scheduleOnce`
- Fix calling `set` on destroyed select box

## 10.0.9-beta.3

- Fix use with Promise Proxy Objects

## 10.0.9-beta.2

- Make sure options have element IDs so that aria-activedescendant works correctly

## 10.0.9-beta.1

- Remove use of `{{on}}` helper due to lack of splattributes forwarding.

## 10.0.9-beta.0

- Internal refactoring removing use of `Mixin.create()`
- Internal refactoring to Angle Bracket components / splattributes
- Removed `is-searching` class name in favour of `is-busy` and/or aria attribute
- Rename `stopSearching` to `cancelSearch`
- Removed `@open` argument. (Please use the API instead)
- Change signature of `onUpdate`, now receives API as first argument
- Normalise API properties with template properties

## 10.0.8

- Upgrade deps

## 10.0.7

- Add missing test case for finding matching options

## 10.0.6

- Collapse whitespace when finding matching options using `sb.activateOptionForKeyCode`

## 10.0.5

- Upgrade dependencies

## 10.0.4

- Fix restroring tabindex, when disabling, then un-disabling a select box.

## 10.0.3

- Upgrade dependencies

## 10.0.2

- Add style attribute binding support for those who still use classic components

## 10.0.1

- Only attempt `activateOptionForKeyCode` if the key pressed resulted in a character being input

## 10.0.0

- `@onPressKey` is now backed by a key press event, rather than an abstracted key down event
- Deprecated `@onPressAlphanum`. If you were using this, please swap it to `@onPressKey`
- [Improved](https://github.com/zestia/ember-select-box/blob/5006a7033e1df514a8979fce205b21b77e5ee69d/tests/integration/components/select-box/activating-options-test.js#L146-L282) `activateOptionForKeyCode` to behave more like native select boxes.

## 9.0.1

- Upgrade dependencies
- Remove jQuery from dummy test app

## 9.0.0

- Remove support for automatic escaping of style attribute, this no longer makes sense after the
  move to named arguments / angle bracket components. Please swap `@style=` to `style=`

## 8.0.5

- Add isDestroying guard

## 8.0.4

- Move location of test helpers to proper ember-cli location. See readme for import.
- Use alternative approach for [backtracking](tests/acceptance/backtracking-test.js) [issue](https://github.com/emberjs/ember.js/issues/18043)

## 8.0.3

- Make input actions more fail silently if no input present

## 8.0.2

- Make sure tabindex updates automatically if `<sb.Input />` is present or not

## 8.0.1

- Fix backracking regression

## 8.0.0

- Switches from snake case arguments to camel case,<br>
  Upgrading should be an easy find-and-replace. For example: `sb.selected-option` → `sb.SelectedOption`
- `class-prefix` renamed to `@classNamePrefix`

## 7.2.3

- Use get/set helpers
- Guard more cases where component might set when destroyed

## 7.2.2

- ARIA: Make sure input knows it controls combo box
- ARIA: Make sure attributes are _strings_

## 7.2.1

- Send event out with `on-click-outside` action

## 7.2.0

- Rename `@is-open` argument to `@open` to align with other args.

## 7.1.0

- Phase out internal method's like `press<Key>() {}` in favour of actions, like `on-press-<key>={{action "doSomething"}}`.
- Add `on-press-alphanum` action

## 7.0.5

- Listen for touchstart so that clicking _outside_ a select box can be detected on mobile devices.

## 7.0.4

- Upgrade ember-cli

## 7.0.3

- Add missing `on-activate` action to selected options

## 7.0.2

- Fix error if no active option available to scroll into view

## 7.0.1

- Fix typo

## 7.0.0

- Move native selectbox from `{{select-box/native}}` to `{{native-select-box}}` for nicer integration
  with angle bracket components.

## 6.1.3

- Upgrade deps
- Fix support for Ember 2.10
- Fixes to the demos

## 6.1.2

- Use named arguments and fix no implicit this

## 6.1.0

- Update to use named arguments
- Fix use of `.send` on destroyed/ing component

## 6.0.4

- Expose `isOpen` state on the yielded API as well as the template API.

## 6.0.3

- Fix an issue introduced in 6.0.2 where mousing over an option would cause it to be scrolled to.
- Updated readme to better explain the behaviour of the `activate` actions.

## 6.0.2

- `activateNextOption` and `activatePreviousOption` default to scrolling the parent element.
  So there is no longer the requirement to pass in `true`, like `sb.activateNextOption(true)`. But,
  you can of course send in false if you don't want this behaviour.

- Adds a new API function `activateOptionForKeyCode` which will make your select box behave more
  like a native selectbox, in that by typing characters an option whose `textContent` matches will be
  activated. It may not be suitable to use this feature if the selectbox also has an input field as the
  behaviours will likely conflict, but this will depend on your usecase.

## 6.0.1

- Fixes test helpers that select multiple options

## 6.0.0

- Improvements to aria attributes
  (Corrects listbox role. Adds combobox role when appropriate. Adds aria-busy)
- Changes to mixin file locations
- Exposes some test helpers for selecting values
- Removes jQuery from test suite

## 5.0.0

- Option's yielded properties are now prefixed with `is`, e.g. `{{o.isSelected}}`

- Option label attribute has been removed to align better with native select boxes. To migrate, change `{{sb.option label="Foo"}}` to `{{#sb.option}}Foo{{/sb.option}}`. [More](https://github.com/zestia/ember-select-box/issues/9#issuecomment-370250705).

- Selected box now yields promise state of the value, e.g. `isPending`, `isRejected`, `isFulfilled`, `isSettled`

- Native select box option now uses same template as Faux select box option template.

## 4.2.3

- Internal changes
- One way value attributes

## 4.2.2

- Remove `invokeAction` util

## 4.2.1

- `value` for a multiple select can now be a promise for an array, whereas originally it was always
  expecting an array.
- Removes `on-build-selection` from native select component

## 4.2.0

- Previously, the behaviour of selecting multiple options with the faux-select component was
  undefined. With the intention that developers use `sb.update(myValues)` to implement the multiple
  behaviour they want. But, it is rare you want anything other than to mimic a native select, by
  toggling the selected item from the array of values. Hence this is now the default behaviour.
  More info: https://github.com/zestia/ember-select-box/pull/15. A new action `on-build-selection`
  allows you to customise this.

- When using a multiple select box, the `on-select` action will fire with an array of the selected
  values. This array is frozen, and is not the same as the one passed into the select box originally.

## 4.1.0

- Changes `scrollIntoView` signature. Now finds the first scrollable parent, and scrolls that
  rather than assuming the select box options will be the scrollable element.

## 4.0.1

- Make select box support style attribute

## 4.0.0

- Yield the main select box element on the api
- Run [codemod](https://github.com/rwjblue/ember-qunit-codemod) on test sutie
- Change path to certain mixins

## 3.0.10

- Fix travis builds
- Fix dependencies

## 3.0.9

- Lint everything

## 3.0.7

- Add `blurInput` to API

## 3.0.6

- Minor changes to tests

## 3.0.5

- Update tests to work with Ember 2.15x as per https://github.com/emberjs/ember.js/issues/15569

## 3.0.4

- Adds a `on-init` action, useful for getting the select box's api

## 3.0.3

- Don't try to re-render if destroyed

## 3.0.2

- Adds `is-multiple` class to faux select box when `multiple=true`

## 3.0.1

- Adds ability to disable a faux option

## 3.0.0

- Make input way one again (accidently introduced two-way binding in 2.0.0)

## 2.0.0

- Phases out some use of jQuery
- Select box input extends Ember's built-in text field helper

## 1.2.1

- Don't use jQuery's trim

## 1.2.0

- Adds `on-open` and `on-close` actions
- Update dependencies
- Use new imports

## 1.1.19

- Add better `trySet` whilst issue is still open

## 1.1.18

- Only set property if component not destroyed

## 1.1.17

- Make more reliable when toggling visibilty of options container

## 1.1.16

- Make sure toggle uses open and close actions

## 1.1.15

- Yield open state

## 1.1.14

- move ember-improved-cp to dependencies

## 1.1.13

- Eslint

## 1.1.12

- Remove use of `getAttr`

## 1.1.11

- Upgrade dependencies (babel 6 etc..)

## 1.1.10

- Upgrade dependencies

## 1.1.9

- Allow more attributes on the select box input

## 1.1.8

- Fastboot fixes

## 1.1.7

- Upgrade ember-cli

## 1.1.6

- Upgrade ember-cli

## 1.1.5

- Small bug fix

## 1.1.4

- Add support for options with promise values

## 1.1.3

- A few improvements around promises

## 1.1.2

- Add fix and regression test to make sure `on-update` is firing correctly

## 1.1.1

- Make sure there is no error if select box is destroyed

## 1.1.0

- Adds support for promise values

## 1.0.6

- Add support for plain `<option>`'s on native select. [Read more](README.md#native-select-box-info)

## 1.0.5

- Update for Glimmer 2 compat

## 1.0.4

- Fix adding class to `classNames` (which is frozen in future versions of Ember)

## 1.0.3

- Add `required` attribute binding for native select box

## 1.0.2

- Add `autofocus` attribute binding for native select box

## 1.0.1

- Bug fix `open` action not working in combination with `is-open` attr

## 1.0.0

- Add title attribute to native select box

## 0.2.3

- Make compatible with Glimmer Alpha

## 0.2.1

- Adds ability to set `selected` attribute of options

## 0.1.18

- Upgrade ember-cli

## 0.1.17

- Upgrade ember-cli

## 0.1.16

- Dodgy build

## 0.1.15

- Phase out use of `didInitAttrs`

## 0.1.14

- Bugfix - make sure `on-update` only fires when `value` changes

## 0.1.13

- Add `name` attribute to native select box

## 0.1.12

- Upgrade addon to ember-cli 2.3.0

## 0.1.11

- Add more aria attributes

## 0.1.10

- Prevent content security warnings in test suite

## 0.1.9

- Upgrade devDependencies

## 0.1.8

- Improve slow search detection

## 0.1.7

- Add `stopSearching`

## 0.1.6

- Remove `on-activate` from selected options
- Fix `on-activate` usage for exposed api

## 0.1.5

- Add `on-activate` to options and selected options

## 0.1.4

- `setInputValue` no longer triggers input event

## 0.1.3

- Add `autocomplete="off"` to search input

## 0.1.2

- Improve `scrollIntoView`

## 0.1.1

- Fix `setInputValue` not working correctly

## 0.1.0

- Remove `on-ready` and `on-after-update` in favour of `on-update`

## 0.0.1

- Initial release
