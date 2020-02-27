import { guidFor } from '@ember/object/internals';

export default function id(selectBox) {
  return guidFor(selectBox).replace('ember', 'select-box-el-');
}
