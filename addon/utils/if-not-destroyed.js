/**
 * Attempts to run block of code,
 * silently fails if the object has been destroyed.
 */
export default function ifNotDestroyed(object, func) {
  if (object.isDestroyed) {
    return;
  }

  func.call(object);
}
