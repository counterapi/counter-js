"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hello = void 0;
var Hello = (function () {
    function Hello(world) {
        this.world = world;
    }
    Hello.prototype.say = function () {
        return 'Hello ' + this.world.hi();
    };
    return Hello;
}());
exports.Hello = Hello;
//# sourceMappingURL=hello.js.map