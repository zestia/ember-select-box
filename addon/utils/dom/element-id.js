import { guidFor } from '@ember/object/internals';

export default function domElementId(element) {
  return guidFor(element).replace('ember', 'select-box-el-');
}
