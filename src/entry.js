import { log } from "debug";
/** Resolve
 * TODO: add to ETK
 *  import {resolve, main} from ETK; */
export const resolveTarget: Function<string> = function (targetRequest: string) {
  const target = document.querySelector(targetRequest);
  return { target };
};
/**
 *
 */
export const main = async function (app, config) {
  log(new (await app).default(resolveTarget(config.target)));
};
