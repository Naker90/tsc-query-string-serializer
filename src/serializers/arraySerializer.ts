import { Serializable } from '../Serializable';
import { objectSerializer } from './objectSerializer';

export const arraySerializer = {
  serialize: (key: string, values: Array<string>, preSquareBrackets: string): Array<string> => {
    let serializedKeysAndValues : string[] = [];
    recursiveSerialization(key, values);
    return serializedKeysAndValues;

    function recursiveSerialization(key: string, values: Array<string>) {
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
