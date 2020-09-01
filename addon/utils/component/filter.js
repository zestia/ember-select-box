import collapseWhitespace from '../general/collapse-whitespace';

export function filterComponentsByTextContent(components, query) {
  return components.filter((component) => {
    return (
      collapseWhitespace(component.element.textContent.toLowerCase()).indexOf(
        query.toLowerCase()
      ) !== -1
    );
  });
}
