"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CounterAPI = exports.OrderByTypes = exports.GroupByTypes = void 0;
var api_config_1 = require("./api.config");
var axios_1 = require("axios");
var counter_1 = require("./counter");
var hash_1 = require("./hash");
var GroupByTypes;
(function (GroupByTypes) {
    GroupByTypes["Hour"] = "hour";
    GroupByTypes["Day"] = "day";
    GroupByTypes["Week"] = "week";
    GroupByTypes["Month"] = "month";
    GroupByTypes["Year"] = "year";
})(GroupByTypes || (exports.GroupByTypes = GroupByTypes = {}));
var OrderByTypes;
(function (OrderByTypes) {
    OrderByTypes["ASC"] = "asc";
    OrderByTypes["DESC"] = "desc";
})(OrderByTypes || (exports.OrderByTypes = OrderByTypes = {}));
var CounterAPI = (function () {
    function CounterAPI() {
        this.axios = axios_1.default.create(api_config_1.apiConfig);
    }
    CounterAPI.prototype.up = function (name, hash) {
        if (hash === void 0) { hash = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (hash) {
                            name = hash_1.Hash.create(name);
                        }
                        return [4, this.axios
                                .get("up", {
                                params: {
                                    name: name,
                                },
                            })
                                .then(function (res) {
                                return new counter_1.Counter({
                                    ID: res.data.id,
                                    Name: res.data.name,
                                    Count: res.data.count,
                                    UpdatedAt: res.data.updated_at,
                                    CreatedAt: res.data.created_at,
                                });
                            })
                                .catch(function (err) {
                                throw new Error(err);
                            })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    CounterAPI.prototype.down = function (name, hash) {
        if (hash === void 0) { hash = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (hash) {
                            name = hash_1.Hash.create(name);
                        }
                        return [4, this.axios
                                .get("down", {
                                params: {
                                    name: name,
                                },
                            })
                                .then(function (res) {
                                return new counter_1.Counter({
                                    ID: res.data.id,
                                    Name: res.data.name,
                                    Count: res.data.count,
                                    UpdatedAt: res.data.updated_at,
                                    CreatedAt: res.data.created_at,
                                });
                            })
                                .catch(function (err) {
                                throw new Error(err);
                            })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    CounterAPI.prototype.get = function (name, hash) {
        if (hash === void 0) { hash = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (hash) {
                            name = hash_1.Hash.create(name);
                        }
                        return [4, this.axios
                                .get("get", {
                                params: {
                                    name: name,
                                },
                            })
                                .then(function (res) {
                                return new counter_1.Counter({
                                    ID: res.data.id,
                                    Name: res.data.name,
                                    Count: res.data.count,
                                    UpdatedAt: res.data.updated_at,
                                    CreatedAt: res.data.created_at,
                                });
                            })
                                .catch(function (err) {
                                throw new Error(err);
                            })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    CounterAPI.prototype.set = function (name, count, hash) {
        if (hash === void 0) { hash = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (hash) {
                            name = hash_1.Hash.create(name);
                        }
                        return [4, this.axios
                                .get("set", {
                                params: {
                                    name: name,
                                    count: count,
                                },
                            })
                                .then(function (res) {
                                return new counter_1.Counter({
                                    ID: res.data.id,
                                    Name: res.data.name,
                                    Count: res.data.count,
                                    UpdatedAt: res.data.updated_at,
                                    CreatedAt: res.data.created_at,
                                });
                            })
                                .catch(function (err) {
                                throw new Error(err);
                            })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    CounterAPI.prototype.counts = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (query.hash) {
                            query.name = hash_1.Hash.create(query.name);
                        }
                        return [4, this.axios
                                .get("counts", {
                                params: query,
                            })
                                .then(function (res) {
                                var counts = [];
                                res.data.forEach(function (row) {
                                    counts.push(new counter_1.Count({
                                        Count: row.count,
                                        Date: row.date,
                                    }));
                                });
                                return counts;
                            })
                                .catch(function (err) {
                                throw new Error(err);
                            })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    return CounterAPI;
}());
exports.CounterAPI = CounterAPI;
//# sourceMappingURL=counterAPI.js.map