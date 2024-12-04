import type { SchemaObj } from "convict";

/**
 * When defining convict schema objects inline, this can be used to specify the type for
 * its properties - this simply returns the object you pass to it, using the specified
 * type parameter.
 */
export function schemaObj<T>(obj: SchemaObj<T>) {
  return obj;
}
