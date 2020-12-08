import { guidFor } from '@ember/object/internals';

export default function id(object) {
  return guidFor(object).replace('ember', 'select-box-el-');
}
