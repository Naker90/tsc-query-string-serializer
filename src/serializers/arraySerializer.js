"use strict";
exports.__esModule = true;
var objectSerializer_1 = require("./objectSerializer");
exports.arraySerializer = {
    serialize: function (key, values, preSquareBrackets) {
        var serializedKeysAndValues = [];
        recursiveSerialization(key, values);
        return serializedKeysAndValues;
        function recursiveSerialization(key, values) {
            values.forEach(function (value, index) {
                if (!exports.arraySerializer.isArray(value) && !objectSerializer_1.objectSerializer.isObject(value)) {
                    var squareBrackets = preSquareBrackets + '[]';
                    serializedKeysAndValues = serializedKeysAndValues.concat("" + key + squareBrackets + "=" + value);
                }
                else if (objectSerializer_1.objectSerializer.isObject(value)) {
                    var objectPreSquareBrackets = preSquareBrackets + ("[" + index + "]");
                    var serializedObject = objectSerializer_1.objectSerializer.format(key, value, objectPreSquareBrackets);
                    serializedKeysAndValues = serializedKeysAndValues.concat(serializedObject);
                }
                else {
                    preSquareBrackets = preSquareBrackets + ("[" + index + "]");
                    recursiveSerialization(key, value);
                }
            });
        }
    },
    isArray: function (value) { return Array.isArray(value); }
};
