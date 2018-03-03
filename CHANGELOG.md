# Changelog

4.2.3

* Internal changes
* One way value attributes

4.2.2

* Remove `invokeAction` util

4.2.1

* `value` for a multiple select can now be a promise for an array, whereas originally it was always
expecting an array.
* Removes `on-build-selection` from native select component

4.2.0

* Previously, the behaviour of selecting multiple options with the faux-select component was
undefined. With the intention that developers use `sb.update(myValues)` to implement the multiple
behaviour they want. But, it is rare you want anything other than to mimic a native select, by
toggling the selected item from the array of values. Hence this is now the default behaviour.
More info: https://github.com/zestia/ember-select-box/pull/15. A new action `on-build-selection`
allows you to customise this.

* When using a multiple select box, the `on-select` action will fire with an array of the selected
values. This array is frozen, and is not the same as the one passed into the select box originally.

4.1.0

* Changes `scrollIntoView` signature. Now finds the first scrollable parent, and scrolls that
  rather than assuming the select box options will be the scrollable element.

4.0.1

* Make select box support style attribute

4.0.0

* Yield the main select box element on the api
* Run [codemod](https://github.com/rwjblue/ember-qunit-codemod) on test sutie
* Change path to certain mixins

3.0.10

* Fix travis builds
* Fix dependencies

3.0.9

* Lint everything

3.0.7

* Add `blurInput` to API

3.0.6

* Minor changes to tests

3.0.5

* Update tests to work with Ember 2.15x as per https://github.com/emberjs/ember.js/issues/15569

3.0.4

* Adds a `on-init` action, useful for getting the select box's api

3.0.3

* Don't try to re-render if destroyed

3.0.2

* Adds `is-multiple` class to faux select box when `multiple=true`

3.0.1

* Adds ability to disable a faux option

3.0.0

* Make input way one again (accidently introduced two-way binding in 2.0.0)

2.0.0

* Phases out some use of jQuery
* Select box input extends Ember's built-in text field helper

1.2.1

* Don't use jQuery's trim

1.2.0

* Adds `on-open` and `on-close` actions
* Update dependancies
* Use new imports

1.1.19

* Add better `trySet` whilst issue is still open

1.1.18

* Only set property if component not destroyed

1.1.17

* Make more reliable when toggling visibilty of options container

1.1.16

* Make sure toggle uses open and close actions

1.1.15

* Yield open state

1.1.14

* move ember-improved-cp to dependancies

1.1.13

* Eslint

1.1.12

* Remove use of `getAttr`

1.1.11

* Upgrade dependancies (babel 6 etc..)

1.1.10

* Upgrade dependancies

1.1.9

* Allow more attributes on the select box input

1.1.8

* Fastboot fixes

1.1.7

* Upgrade ember-cli

1.1.6

* Upgrade ember-cli

1.1.5

* Small bug fix

1.1.4

* Add support for options with promise values

1.1.3

* A few improvements around promises

1.1.2

* Add fix and regression test to make sure `on-update` is firing correctly

1.1.1

* Make sure there is no error if select box is destroyed

1.1.0

* Adds support for promise values

1.0.6

* Add support for plain `<option>`'s on native select. [Read more](README.md#native-select-box-info)

1.0.5

* Update for Glimmer 2 compat

1.0.4

* Fix adding class to `classNames` (which is frozen in future versions of Ember)

1.0.3

* Add `required` attribute binding for native select box

1.0.2

* Add `autofocus` attribute binding for native select box

1.0.1

* Bug fix `open` action not working in combination with `is-open` attr

1.0.0

* Add title attribute to native select box

0.2.3

* Make compatible with Glimmer Alpha

0.2.1

* Adds ability to set `selected` attribute of options

0.1.18

* Upgrade ember-cli

0.1.17

* Upgrade ember-cli

0.1.16

* Dodgy build

0.1.15

* Phase out use of `didInitAttrs`

0.1.14

* Bugfix - make sure `on-update` only fires when `value` changes

0.1.13

* Add `name` attribute to native select box

0.1.12

* Upgrade addon to ember-cli 2.3.0

0.1.11

* Add more aria attributes

0.1.10

* Prevent content security warnings in test suite

0.1.9

* Upgrade devDependencies

0.1.8

* Improve slow search detection

0.1.7

* Add `stopSearching`

0.1.6

* Remove `on-activate` from selected options
* Fix `on-activate` usage for exposed api

0.1.5

* Add `on-activate` to options and selected options

0.1.4

* `setInputValue` no longer triggers input event

0.1.3

* Add `autocomplete="off"` to search input

0.1.2

* Improve `scrollIntoView`

0.1.1

* Fix `setInputValue` not working correctly

0.1.0

* Remove `on-ready` and `on-after-update` in favour of `on-update`

0.0.1

* Initial release
