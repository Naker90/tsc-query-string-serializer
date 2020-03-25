import { Serializable } from '../types/Serializable';

export const primitiveSerializer = {
    serialize: (key: string, value: Serializable) => `${key}=${value}`,
};
