import { SerializableArray } from './SerializableArray';

export type Serializable =
    | string
    | number
    | boolean
    | Object
    | SerializableArray;
