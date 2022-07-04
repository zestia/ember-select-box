# Components

## Native Select box

<details>
  <summary>Example</summary>

```handlebars
<NativeSelectBox as |sb|>
  <sb.Option @value="1">One</sb.Option>
  <sb.Option @value="2">Two</sb.Option>
  <sb.Option @value="3">Three</sb.Option>
</NativeSelectBox>
```

</details>

## Select box

<details>
  <summary>Example</summary>

```handlebars
<SelectBox as |sb|>
  <sb.Option @value="1">One</sb.Option>
  <sb.Option @value="2">Two</sb.Option>
  <sb.Option @value="3">Three</sb.Option>
</SelectBox>
```

</details>

<details>
  <summary>Arguments</summary>
  <table width="100%">
    <tr>
      <td><code>@disabled</code></td>
      <td>If true, the component will be unfocusable, and if it contained an input, then that too will be disabled</td>
    </tr>
    <tr>
      <td><code>@multiple</code></td>
      <td>If true, <code>@value</code> is expected to be an array.</td>
    </tr>
    <tr>
      <td><code>@searchDelayTime</code></td>
      <td>Milliseconds to debounce the <code>@onSearch</code> action from firing (default 100)</td>
    </tr>
    <tr>
      <td><code>@searchMinChars</code></td>
      <td>Prevents the <code>@onSearch</code> action from firing until there are enough chars (default 1)</td>
    </tr>
    <tr>
      <td><code>@searchSlowTime</code></td>
      <td>Milliseconds before a search is considered to be taking too long (default 500)</td>
    </tr>
    <tr>
      <td><code>@value</code></td>
      <td>Used to determine which option(s) are selected, can be a promise</td>
    </tr>
  </table>
</details>

<details>
  <summary>Actions</summary>
  <table width="100%">
    <tr>
      <td><code>@onSelect</code></td>
      <td>
        Fired when an option is clicked, or enter is pressed regardless as
        to whether the value changed or not.
      </td>
    </tr>
    <tr>
      <td><code>@onUpdate</code></td>
      <td>
        Fired whenever the value changes, either because a new <code>@value</code> argument was received, or a selection was made by the user that resulted in the value changing.
      </td>
    </tr>
    <tr>
      <td><code>@onBuildSelection</code></td>
      <td>
        Fired whenever a selection is made. This function receives the value most recently
        selected, and the currently selected value(s). The return value is used as the final selection.
        This is primarily used to customise the default behaviour of a multiple select box, where this behaviour is undefined by default and totally depends on your use-case.
      </td>
    </tr>
    <tr>
      <td><code>@onSearch</code></td>
      <td>Fired when the select box decides to run a search</td>
    </tr>
    <tr>
      <td><code>@onSearched</code></td>
      <td>Fired after the <em>last succesful</em> search attempt</td>
    </tr>
    <tr>
      <td><code>@onSearchError</code></td>
      <td>Fired if a search attempt failed</td>
    </tr>
    <tr>
      <td><code>@onReady</code></td>
      <td>Fired when the select box is ready. A useful opportunity to get access to the select box's API which is passed as a parameter.</td>
    </tr>
    <tr>
      <td><code>@onFocusLeave</code></td>
      <td>This is fired when the select box is no longer being interacted with. For example, the user clicks outside it, or tabs away. </td>
    </tr>
    <tr>
      <td><code>@onOpen</code></td>
      <td>
        Fired when the select box is opened
      </td>
    </tr>
    <tr>
      <td><code>@onClose</code></td>
      <td>
        Fired when the select box is closed
      </td>
    </tr>
    <tr>
      <td><code>@onPressBackspace</code></td>
      <td></td>
    </tr>
    <tr>
      <td><code>@onPressDown</code></td>
      <td></td>
    </tr>
    <tr>
      <td><code>@onPressEnter</code></td>
      <td></td>
    </tr>
    <tr>
      <td><code>@onPressEscape</code></td>
      <td></td>
    </tr>
    <tr>
      <td><code>@onPressKey</code></td>
      <td></td>
    </tr>
    <tr>
      <td><code>@onPressLeft</code></td>
      <td></td>
    </tr>
    <tr>
      <td><code>@onPressRight</code></td>
      <td></td>
    </tr>
    <tr>
      <td><code>@onPressTab</code></td>
      <td></td>
    </tr>
    <tr>
      <td><code>@onPressUp</code></td>
      <td></td>
    </tr>
  </table>
</details>

<details>
  <summary>API</summary>
  <table width="100%">
    <caption>Actions</caption>
    <tr>
      <td><code>sb.select</code></td>
      <td>
        Selects arbitrary value(s). This mimics making a selection, and so <code>@onSelect</code> will fire.  <code>@onUpdate</code> will also fire if the value is different.
      </td>
    </tr>
    <tr>
      <td><code>sb.update</code></td>
      <td>
        Updates the select box with a new value(s). This is subtly different from <code>sb.select</code>. It will not fire <code>@onSelect</code>. It is useful for resetting the select box after a selection is made.
        <code>@onUpdate</code> will fire.
      </td>
    </tr>
    <tr>
      <td><code>sb.selectActiveOption</code></td>
      <td>Selects the value of whichever option is currently active</td>
    </tr>
    <tr>
      <td><code>sb.activateNextOption</code></td>
      <td>
        Activates the next option.
        If <code>scrollIntoView</code> is false, the option won't be scrolled to.
      </td>
    </tr>
    <tr>
      <td><code>sb.activatePreviousOption</code></td>
      <td>
        Activates the previous option.
        If <code>scrollIntoView</code> is false, the option won't be scrolled to.
      </td>
    </tr>
    <tr>
      <td><code>sb.activateOptionForValue</code></td>
      <td>
        Activates the first option that matches the given value.
        If <code>scrollIntoView</code> is false, the option won't be scrolled to.
      </td>
    </tr>
    <tr>
      <td><code>sb.activateOptionAtIndex</code></td>
      <td>
        Activates the option at the given index.
        If <code>scrollIntoView</code> is false, the option won't be scrolled to.
      </td>
    </tr>
    <tr>
      <td><code>sb.activateOptionForKeyCode</code></td>
      <td>
        Mimics native select box behaviour by jumping to an appropriate option based on the <code>textContent</code> of the options. <a href="https://zestia.github.io/ember-select-box/#/simple-select">Demo</a>.
        If <code>scrollIntoView</code> is false, the option won't be scrolled to.
      </td>
    </tr>
    <tr>
      <td><code>sb.deactivateOptions</code></td>
      <td>Makes no option be active</td>
    </tr>
    <tr>
      <td><code>sb.search</code></td>
      <td>Runs an arbitrary search using the search function provided by <code>@onSearch</code></td>
    </tr>
    <tr>
      <td><code>sb.cancelSearch</code></td>
      <td>
        Cancels searches currently in progress
      </td>
    </tr>
    <tr>
      <td><code>sb.setInputValue</code></td>
      <td>
        Update the input value. Useful for prefilling the input with the active option text for example.
      </td>
    </tr>
    <tr>
      <td><code>sb.focusInput</code></td>
      <td>Focuses the input associated with the select box</td>
    </tr>
    <tr>
      <td><code>sb.blurInput</code></td>
      <td>Unfocuses the input associated with the select box</td>
    </tr>
    <tr>
      <td><code>sb.open</code></td>
      <td>Opens the select box</td>
    </tr>
    <tr>
      <td><code>sb.toggle</code></td>
      <td>Opens or closes the select box</td>
    </tr>
    <tr>
      <td><code>sb.close</code></td>
      <td>Closes the select box</td>
    </tr>
  </table>

  <table width="100%">
    <caption>Properties</caption>
    <tr>
      <td><code>sb.element</code></td>
      <td>The element of the select box</td>
    </tr>
    <tr>
      <td><code>sb.value</code></td>
      <td>The selected value(s) of the select box</td>
    </tr>
    <tr>
      <td><code>sb.isFulfilled</code></td>
      <td>True if <code>@value</code> resolved</td>
    </tr>
    <tr>
      <td><code>sb.isPending</code></td>
      <td>True whilst <code>@value</code> is being resolved</td>
    </tr>
    <tr>
      <td><code>sb.isRejected</code></td>
      <td>True if <code>@value</code> failed to resolve</td>
    </tr>
    <tr>
      <td><code>sb.isSettled</code></td>
      <td>True once <code>@value</code> has resolved or rejected</td>
    </tr>
    <tr>
      <td><code>sb.isBusy</code></td>
      <td>True if the select box is resolving the <code>@value</code> argument, or it is waiting for a search to finish</td>
    </tr>
    <tr>
      <td><code>sb.isDisabled</code></td>
      <td>Whether or not the select box is currently disabled</td>
    </tr>
    <tr>
      <td><code>sb.isMultiple</code></td>
      <td>Whether the select box allows selecting multiple values</td>
    </tr>
    <tr>
      <td><code>sb.isOpen</code></td>
      <td>Whether the select box is open</td>
    </tr>
    <tr>
      <td><code>sb.isSlowSearch</code></td>
      <td>Whether the promised search results are taking longer than expected</td>
    </tr>
  </table>
</details>

## Option

<details>
  <summary>Example</summary>

```handlebars
<sb.Option @value={{this.model}} as |o|>
  {{o.value.name}}
</sb.Option>
```

</details>

<details>
  <summary>Arguments</summary>
  <table width="100%">
    <tr>
      <td><code>@disabled</code></td>
      <td>Prevents the option from being selected</td>
    </tr>
    <tr>
      <td><code>@selected</code></td>
      <td>
        For manually specifying that this option is selected.
        Preferably, allow selection to be automatically computed by just setting <code>@value</code>
      </td>
    </tr>
    <tr>
      <td><code>@value</code></td>
      <td>Can be anything, including a promise</td>
    </tr>
  </table>
</details>

<details>
  <summary>Actions</summary>
  <table width="100%">
    <tr>
      <td><code>@onActivate</code></td>
      <td>Fired when an individual option is activated (by mousing over, or via keyboard control, or the api)</td>
    </tr>
    <tr>
      <td><code>@onSelect</code></td>
      <td>Fired when an individual option is selected (by clicking, or pressing Enter, or the api)</td>
    </tr>
  </table>
</details>

<details>
  <summary>API</summary>
  <table width="100%">
    <caption>Template only properties</caption>
    <tr>
      <td><code>o.element</code></td>
      <td>The DOM element of the option component</td>
    </tr>
    <tr>
      <td><code>o.value</code></td>
      <td>The value of the option</td>
    </tr>
    <tr>
      <td><code>o.isFulfilled</code></td>
      <td>True if <code>@value</code> resolved</td>
    </tr>
    <tr>
      <td><code>o.isPending</code></td>
      <td>True whilst <code>@value</code> is being resolved</td>
    </tr>
    <tr>
      <td><code>o.isRejected</code></td>
      <td>True if <code>@value</code> failed to resolve</td>
    </tr>
    <tr>
      <td><code>o.isSettled</code></td>
      <td>True once <code>@value</code> has resolved or rejected</td>
    </tr>
    <tr>
      <td><code>o.index</code></td>
      <td>The index of the option amongst the options</td>
    </tr>
    <tr>
      <td><code>o.isActive</code></td>
      <td>True if the option is active</td>
    </tr>
    <tr>
      <td><code>o.isDisabled</code></td>
      <td>Whether or not the option is currently disabled</td>
    </tr>
    <tr>
      <td><code>o.isSelected</code></td>
      <td>Whether or not the option is currently selected</td>
    </tr>
  </table>
</details>

## Group

<details>
  <summary>Example</summary>

```handlebars
<sb.Group @label="Things">
  {{!-- Render options here --}}}
</sb.Group>
```

</details>

## Options

<details>
  <summary>Example</summary>

```handlebars
<sb.Options>
  {{!-- Render options here --}}
</sb.Options>
```

</details>

## Input

<details>
  <summary>Example</summary>

```handlebars
<sb.Input />
```

</details>

<details>
  <summary>Actions</summary>
  <table width="100%">
    <tr>
      <td><code>@onClear</code></td>
      <td>Fired when text is cleared completely</td>
    </tr>
    <tr>
      <td><code>@onDelete</code></td>
      <td>Fired when there is no text present, but backspace is pressed.</td>
    </tr>
  </table>
</details>

## Selected option

<details>
  <summary>Example</summary>

```handlebars
<sb.SelectedOption>
  {{!-- Render the select box's value here --}}
</sb.SelectedOption>
```

## Selected options

<details>
  <summary>Example</summary>

```handlebars
<sb.SelectedOptions>
  {{!-- Render the select box's values here --}}
</sb.SelectedOptions>
```

</details>
