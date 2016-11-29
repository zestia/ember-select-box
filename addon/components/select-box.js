/* eslint-disable max-len */

import Component from 'ember-component';
import layout from '../templates/components/select-box';
import BaseSelectBox from '../mixins/select-box/base';
import SelectBoxAPI from '../mixins/select-box/select-box/api';
import Toggleable from '../mixins/select-box/general/toggleable';
import Disableable from  '../mixins/select-box/select-box/disableable';
import HasInput from '../mixins/select-box/registration/has-input';
import HasOptionsContainer from '../mixins/select-box/registration/has-options-container';
import HasSelectedOptions from '../mixins/select-box/registration/has-selected-options';
import HasSelectedOptionsContainer from '../mixins/select-box/registration/has-selected-options-container';
import Inputtable from '../mixins/select-box/select-box/inputtable';
import Searchable from  '../mixins/select-box/select-box/searchable';
import ActivatableOptions from '../mixins/select-box/select-box/activatable-options';
import KeyboardEvents from '../mixins/select-box/select-box/keyboard-events';
import ClickOutsideEvent from '../mixins/select-box/select-box/click-outside-event';
import ActivatableSelectedOptions from '../mixins/select-box/select-box/activatable-selected-options';
import SelectActiveOption from '../mixins/select-box/select-box/select-active-option';
import SelectActiveOptionOnEnter from '../mixins/select-box/select-box/select-active-option-on-enter';

export default Component.extend(
  BaseSelectBox,
  Toggleable,
  Disableable,
  SelectBoxAPI,
  ClickOutsideEvent,
  KeyboardEvents,
  HasInput,
  HasOptionsContainer,
  HasSelectedOptions,
  HasSelectedOptionsContainer,
  Inputtable,
  Searchable,
  ActivatableOptions,
  ActivatableSelectedOptions,
  SelectActiveOption,
  SelectActiveOptionOnEnter, {

  layout,
  ariaRole: 'listbox',
  attributeBindings: [
    'aria-label',
    'isOpen:aria-expanded',
    'isDisabled:aria-disabled'
  ],
  classNameBindings: [
    'isOpen',
    'isFocused',
    'isDisabled',
    'isSearching',
    'isSlowSearch'
  ]
});
