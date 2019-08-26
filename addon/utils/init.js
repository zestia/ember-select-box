import invokeAction from './invoke-action';

export default function init(component) {
  invokeAction(component, '_onInit', component);
}
