import { createContainer } from 'awilix';

/**
 * Using Awilix, the following files and folders (glob patterns)
 * will be loaded.
 */
const modulesToLoad = [
  'src/services/*.js',
  'src/repositories/*.js',
  'src/db/db.js'
];

/**
 * Configures a new container.
 *
 * @return {Object} The container.
 */
export default async function getConfiguredContainer() {
  const container = createContainer();
  await container.loadModules(modulesToLoad);
  //const { userService } = container;
  return container;
}
