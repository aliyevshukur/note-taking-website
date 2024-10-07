/**
 * Restricts the given transform to the bounding rectangle.
 *
 * @param {Object} transform - The transform object to restrict.
 * @param {Object} rect - The rectangle to restrict the transform to.
 * @param {Object} boundingRect - The bounding rectangle to restrict the transform to.
 * @return {Object} New coordinates of the restricted object.
 */

import useWindowSize from "./Hooks/useWindowSize";

export function restrictToBoundingRect(transform, rect, boundingRect) {
  let borderOffet = 40;

  const value = {
    ...transform,
  };

  if (rect.top + transform.y <= boundingRect.top + borderOffet) {
    value.y = boundingRect.top - rect.top + borderOffet;
  } else if (
    rect.bottom + transform.y >=
    boundingRect.top + boundingRect.height - borderOffet
  ) {
    value.y =
      boundingRect.top + boundingRect.height - rect.bottom - borderOffet;
  }

  if (rect.left + transform.x <= boundingRect.left + borderOffet) {
    value.x = boundingRect.left - rect.left + borderOffet;
  } else if (
    rect.right + transform.x >=
    boundingRect.left + boundingRect.width - borderOffet
  ) {
    value.x = boundingRect.left + boundingRect.width - rect.right - borderOffet;
  }

  return value;
}
