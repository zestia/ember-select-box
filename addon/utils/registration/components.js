const { assign } = Object;

export default function registerComponents(component, components) {
  assign(component, components);
}
