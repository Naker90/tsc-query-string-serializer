import {Serializable } from '../types/Serializable';
import {objectSerializer} from './objectSerializer';
import {SerializableArray} from "../types/SerializableArray";

export const arraySerializer = {
  serialize: (key: string, values: SerializableArray, preSquareBrackets: string = ''): Array<string> => {
    let serializedKeysAndValues : string[] = [];
    recursiveSerialization(key, values);
    return serializedKeysAndValues;

    function recursiveSerialization(key: string, values: SerializableArray) {
      values.forEach((value, index) => {
        if (!arraySerializer.isArray(value) && !objectSerializer.isObject(value)) {
          let squareBrackets = preSquareBrackets + '[]';
          serializedKeysAndValues = serializedKeysAndValues.concat(`${key}${squareBrackets}=${value}`);
        } else if (objectSerializer.isObject(value)){
          let objectPreSquareBrackets = preSquareBrackets + `[${index}]`;
          let serializedObject = objectSerializer.format(key, value, objectPreSquareBrackets);
          serializedKeysAndValues = serializedKeysAndValues.concat(serializedObject)
        } else {
          preSquareBrackets = preSquareBrackets + `[${index}]`;
          recursiveSerialization(key, value);
        }
      });
    }
  },
  isArray: (value: Serializable): value is [] => Array.isArray(value)
};
