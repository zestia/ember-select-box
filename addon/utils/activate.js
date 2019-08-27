import invokeAction from './invoke-action';
import { get } from '@ember/object';

export default function activate(option) {
  invokeAction(option, '_onActivate', get(option, 'index'));
}
