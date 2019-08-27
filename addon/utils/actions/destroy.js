import invokeAction from './invoke';

export default function destroyAction(component) {
  invokeAction(component, '_onDestroy', component);
}
