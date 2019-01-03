"use strict";
// vim: ts=2 sw=2 sts=2 et:
/*
 *=======================================================================
 *    Filename:serializable.ts
 *
 *     Version: 1.0
 *  Created on: November 15, 2018
 *
 *      Author: corvo
 *=======================================================================
 */

import { cheipr } from "./trans";

/**
 * This is the interface for serialize object, object should implements it to
 * enable transfer.
 */
interface ISerialize {
  encode(): any;
  decode(): void;
}

export {
  ISerialize,
  cheipr as model,
};
