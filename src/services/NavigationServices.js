import {createNavigationContainerRef} from '@react-navigation/native';

/**
 * Global navigation reference used to navigate outside of components.
 */
export const navigationRef = createNavigationContainerRef();

/**
 * Navigate to a route from anywhere (e.g., Redux, services).
 *
 * @param {string} name - The name of the route to navigate to.
 * @param {object} params - Optional parameters to pass to the route.
 */
export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
