import {Serializable} from './types/Serializable';
import {arraySerializer} from './serializers/arraySerializer';
import {objectSerializer} from './serializers/objectSerializer';
import {primitiveSerializer} from './serializers/primitiveSerializer';

const QUERY_PARAMS_DELIMITER = "&";

export const queryStringSerializer = {
    serialize: (obj: Object): string => {
      let keysAndValues: [string, Serializable][] = Object.entries(obj);
      let serializedKeysAndValues : string[] = [];
      keysAndValues
        .forEach(([key, value]: [string, Serializable]) => {
          if(arraySerializer.isArray(value)){
            serializedKeysAndValues = serializedKeysAndValues.concat(arraySerializer.serialize(key, value, ''));
          }else if(objectSerializer.isObject(value)){
            serializedKeysAndValues = serializedKeysAndValues.concat(objectSerializer.format(key, value, ''));
          }else{
            serializedKeysAndValues.push(primitiveSerializer.serialize(key, value));
          }
        });
      return serializedKeysAndValues.join(QUERY_PARAMS_DELIMITER);
    }
};
