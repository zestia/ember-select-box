import setValue from './set-value';
import afterRender from './general/after-render';
import updateAction from './actions/update';

export default async function update(selectBox, value) {
  await setValue(selectBox, value);
  await afterRender();
  updateAction(selectBox);
}
