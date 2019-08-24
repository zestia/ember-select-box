import Component from '@ember/component';
import ActivatableOptions from '../mixins/select-box/activatable-options';
import ActivatableSelectedOptions from '../mixins/select-box/activatable-selected-options';
import BaseSelectBox from '../mixins/select-box/base';
import BuildSelection from '../mixins/select-box/build-selection';
import ClickOutsideEvent from '../mixins/select-box/click-outside-event';
import Disableable from '../mixins/select-box/disableable';
import Focusable from '../mixins/select-box/focusable';
import HasInput from '../mixins/select-box/registration/has-input';
import HasOptions from '../mixins/select-box/registration/has-options';
import HasOptionsContainer from '../mixins/select-box/registration/has-options-container';
import HasSelectedOptions from '../mixins/select-box/registration/has-selected-options';
import HasSelectedOptionsContainer from '../mixins/select-box/registration/has-selected-options-container';
import HasDomElement from '../mixins/select-box/registration/has-dom-element';
import Inputtable from '../mixins/select-box/inputtable';
import KeyboardEvents from '../mixins/select-box/keyboard-events';
import layout from '../templates/components/select-box';
import Searchable from '../mixins/select-box/searchable';
import SelectActiveOption from '../mixins/select-box/select-active-option';
import SelectActiveOptionOnEnter from '../mixins/select-box/select-active-option-on-enter';
import SelectBoxAPI from '../mixins/select-box/api';
import Toggleable from '../mixins/select-box/toggleable';
import { or } from '@ember/object/computed';

const mixins = [
  ActivatableOptions,
  ActivatableSelectedOptions,
  BaseSelectBox,
  BuildSelection,
  ClickOutsideEvent,
  Disableable,
  Focusable,
  HasInput,
  HasOptions,
  HasOptionsContainer,
  HasSelectedOptions,
  HasSelectedOptionsContainer,
  HasDomElement,
  Inputtable,
  KeyboardEvents,
  Searchable,
  SelectActiveOption,
  SelectActiveOptionOnEnter,
  SelectBoxAPI,
  Toggleable
];

export default Component.extend(...mixins, {
  layout,
  tagName: '',

  isBusy: or('isPending', 'isSearching')
});
