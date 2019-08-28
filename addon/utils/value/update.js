import resolveValue from './resolve';
import afterRender from '../general/after-render';
import updateAction from '../actions/update';

export default async function update(selectBox, value) {
  await resolveValue(selectBox, value);
  await afterRender();
  updateAction(selectBox);
}
