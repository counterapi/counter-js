"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hash = void 0;
var Hash = (function () {
    function Hash() {
    }
    Hash.create = function (str) {
        var SHA256 = require("crypto-js/sha256");
        return SHA256(str).toString();
    };
    return Hash;
}());
exports.Hash = Hash;
//# sourceMappingURL=hash.js.map