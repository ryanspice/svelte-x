/** @flow */
import { resolveTarget, main } from "./entry";
/** Config */
const config = {
  name: "SearchX",
  dir: "./com/",
  target: "body",
  structure: {
    authenticate: true,
    globals: ["store/reducers"],
  },
};
/** Component */
const app = import(config.dir + config.name + ".svelte");
export default main(app, config);
