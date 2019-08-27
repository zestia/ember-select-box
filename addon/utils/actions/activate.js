import invokeAction from './invoke';
import { get } from '@ember/object';

export default function activateAction(option) {
  invokeAction(option, '_onActivate', get(option, 'index'));
  invokeAction(option, 'onActivate', option.resolvedValue, option.api());
}
