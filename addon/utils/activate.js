import invokeAction from './invoke-action';
import { get } from '@ember/object';

export default function activate(component) {
  invokeAction(component, '_onActivate', get(component, 'index'));
}
