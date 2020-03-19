"use strict";
exports.__esModule = true;
var arraySerializer_1 = require("./arraySerializer");
exports.objectSerializer = {
    format: function (key, value, preSquareBrackets) {
        var serializedKeysAndValues = [];
        recursiveSerialization(key, value);
        return serializedKeysAndValues;
        function recursiveSerialization(key, value) {
            var entries = Object.entries(value);
            entries.forEach(function (_a) {
                var innerKey = _a[0], value = _a[1];
                if (!exports.objectSerializer.isObject(value) && !Array.isArray(value)) {
                    var squareBrackets = preSquareBrackets + ("[" + innerKey + "]");
                    serializedKeysAndValues = serializedKeysAndValues.concat("" + key + squareBrackets + "=" + value);
                }
                else if (arraySerializer_1.arraySerializer.isArray(value)) {
                    var arrayPreSquareBrackets = preSquareBrackets + ("[" + innerKey + "]");
                    var serializedArray = arraySerializer_1.arraySerializer.serialize(key, value, arrayPreSquareBrackets);
                    serializedKeysAndValues = serializedKeysAndValues.concat(serializedArray);
                }
                else {
                    preSquareBrackets = preSquareBrackets + ("[" + innerKey + "]");
                    recursiveSerialization(key, value);
                }
            });
        }
    },
    isObject: function (value) {
        return typeof value === 'object' && value.constructor === Object;
    }
};
