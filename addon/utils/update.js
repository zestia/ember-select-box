import setSelectBoxValue from './set-select-box-value';
import afterRender from './after-render';
import updated from './updated';

export default async function update(selectBox, value) {
  await setSelectBoxValue(selectBox, value);
  await afterRender();
  updated(selectBox);
}
