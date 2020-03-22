import {arraySerializer} from "./arraySerializer";
import {Serializable} from "../types/Serializable";

export const objectSerializer = {
    format: (key: string, value: Object, preSquareBrackets: string = ""): Array<string> => {
      let serializedKeysAndValues : string[] = [];
      recursiveSerialization(key, value);
      return serializedKeysAndValues;

      function recursiveSerialization(key: string, value: Object) {
        const entries = Object.entries(value);
        entries.forEach(([innerKey, value]: [string, Object]) => {
          if (!objectSerializer.isObject(value) && !Array.isArray(value)) {
            const squareBrackets = preSquareBrackets + `[${innerKey}]`;
            serializedKeysAndValues = serializedKeysAndValues.concat(`${key}${squareBrackets}=${value}`);
          }else if(arraySerializer.isArray(value)){
            const arrayPreSquareBrackets = preSquareBrackets + `[${innerKey}]`;
            let serializedArray = arraySerializer.serialize(key, value, arrayPreSquareBrackets);
            serializedKeysAndValues = serializedKeysAndValues.concat(serializedArray)
          } else {
            preSquareBrackets = preSquareBrackets + `[${innerKey}]`;
            recursiveSerialization(key, value);
          }
        });
      }
  },
  isObject: (value: Serializable): value is Object =>
    typeof value === "object" && value.constructor === Object
};
