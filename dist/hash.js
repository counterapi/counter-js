"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hash = void 0;
var crypto_js_1 = require("crypto-js");
var Hash = (function () {
    function Hash() {
    }
    Hash.create = function (str) {
        return crypto_js_1.default.createHash("sha256").update(str).digest("hex");
    };
    return Hash;
}());
exports.Hash = Hash;
//# sourceMappingURL=hash.js.map