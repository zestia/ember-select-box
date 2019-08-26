import invokeAction from './invoke-action';

export default function destroy(component) {
  invokeAction(component, '_onDestroy', component);
}
