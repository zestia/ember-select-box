# Updating to version 16

Up until version 15, this addon provided the tools to build something akin to a native select box using just divs to allow for flexible styling. However, when creating a select box it was easy to be lax and not fully flesh out the expected behaviour of a select box. For example one might omit hooking up `@onPressUpArrow` to `activatePreviousOption`. Additionally, there were some crucial mistakes with regards to where the aria attributes were set. Which meant screen readers did not work with the addon very well.

Version 16 removes a large set of the API surface, meaning that now you no longer have to hook up the capabilities to build a select box. Things like the arrow keys just work as expected. This has been done in such a way that it should be easy to migrate to and still be flexible to customise behaviour.

Here is a list of all the things that have been removed and what they have been replaced with (if anything).

- Removed: `NativeSelectBox`<br>
  There is no replacement in this addon. The reason is, native select boxes can now be achieved in Ember very easily. The only drawback is the lack of support for non-primitive values. But this is easily worked around. Since the main purpose of this addon is to provide a faux-select box, there seemed little point in supporting this any more.
- Removed: `@onUpdate`
  This was changed to `@onChange` to more closely align with native select boxes. `@onSelect` remains, but is not the preferred action to use day to day. `@onChange` fires when the value changes, whereas `@onSelect` fires when ever a selection is made. This is still useful in addition to `@onChange`, for occasions when you might need to reset a value or something.
- Removed: All `@onPress` actions.<br>
  Now, pressing up/down/escape/enter/space all do what one would expect of those keys. So there is no longer a need to hook them up manually using the API.
- Removed: `@onFocusLeave`<br>
  This was originally provided so you could close the select box when focus left the interactive element. Whereas now, this behaviour is handled automatically.
- Removed: `@onSearched`, `@onSearchError`, `@searchDelayTime`, `@searchSlowTime`, `cancelSearch`, `isSlowSearch`.<br>
  The search action still fires when inputting text into the Input as it did before.
  If you previously used `@onSearched` to capture and display the search results, to migrate to the new version the results will automatically be available on `sb.options`. Debouncing has been removed and so will have to be handled outside of this addon.
- Removed: `selectActiveOption`, `activateNextOption`, `activatePreviousOption`, `activateOptionForValue`, `activateOptionAtIndex`, `activateOptionForKeyCode`, `deactivateOptions`, `setInputValue`, `focusInput`, `blurInput`.<br>
  There is no replacement for these API functions, since all of these things are handled automatically.
- Removed: `isFulfilled`, `isPending`, `isRejected`, `isSettled`.<br>
  Support for promises originally existed so that Ember Data async relationships could be resolved and compared. It is easier to resolve any data ahead of time, or use an `await` helper instead.
- Removed: `@selected` from individual options.
- Removed: `@onActivate` from individual options. <br>`@onActivate` now exists at the SelectBox level.
- Removed `@onSelect` from individual options.<br>
  This was originally added because some UI's require a select box with a set of options, and then perhaps a couple of extra options, which themselves did not provide a `@value`, and so could not be 'selected' as such, but were still useful e.g: "Foo", "Bar', "Baz", "Add another". The latter option being selectable, but not having a value. So `@onSelect` would allow you to hook into the click handler, and enter key handler in-one go. There is no replacement for this, but it is easily worked around in many ways. One of which is by providing a value like `@value="ADD_ANOTHER"`, and then responding to that being selected.
- Removed: `SelectedOption`.<br>
  Originally, this was an area where you would render the selected option and frequently that would be hooked up to `sb.toggle`. This has been replaced with `Trigger`, which has does the toggling anyway.
