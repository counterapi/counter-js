"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hash = void 0;
var crypto = require("crypto");
var Hash = (function () {
    function Hash() {
    }
    Hash.create = function (str) {
        return crypto.createHash("sha256").update(str).digest("hex");
    };
    return Hash;
}());
exports.Hash = Hash;
//# sourceMappingURL=hash.js.map