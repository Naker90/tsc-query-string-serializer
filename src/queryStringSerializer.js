"use strict";
exports.__esModule = true;
var arraySerializer_1 = require("./serializers/arraySerializer");
var objectSerializer_1 = require("./serializers/objectSerializer");
var primitiveSerializer_1 = require("./serializers/primitiveSerializer");
var QUERY_PARAMS_DELIMITER = "&";
exports.queryStringSerializer = {
    serialize: function (obj) {
        var keysAndValues = Object.entries(obj);
        var serializedKeysAndValues = [];
        keysAndValues
            .forEach(function (_a) {
            var key = _a[0], value = _a[1];
            if (arraySerializer_1.arraySerializer.isArray(value)) {
                serializedKeysAndValues = serializedKeysAndValues.concat(arraySerializer_1.arraySerializer.serialize(key, value, ''));
            }
            else if (objectSerializer_1.objectSerializer.isObject(value)) {
                serializedKeysAndValues = serializedKeysAndValues.concat(objectSerializer_1.objectSerializer.format(key, value, ''));
            }
            else {
                serializedKeysAndValues.push(primitiveSerializer_1.primitiveSerializer.serialize(key, value));
            }
        });
        return serializedKeysAndValues.join(QUERY_PARAMS_DELIMITER);
    }
};
