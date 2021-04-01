"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hash = void 0;
var js_sha256_1 = require("js-sha256");
var Hash = (function () {
    function Hash() {
    }
    Hash.create = function (str) {
        var hash = js_sha256_1.sha256.update(str);
        return hash.hex();
    };
    return Hash;
}());
exports.Hash = Hash;
//# sourceMappingURL=hash.js.map