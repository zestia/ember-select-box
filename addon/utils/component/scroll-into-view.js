export function maybeScrollIntoView(component, config = {}) {
  if (!config.scrollIntoView) {
    return;
  }

  scrollIntoView(component);
}

export default function scrollIntoView(component) {
  component.element.scrollIntoView({
    block: 'nearest'
  });
}
