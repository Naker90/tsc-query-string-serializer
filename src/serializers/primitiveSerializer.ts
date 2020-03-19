import { Serializable } from '../Serializable';

export const primitiveSerializer = {
    serialize: (key: string, value: Serializable) => `${key}=${value}`
};
