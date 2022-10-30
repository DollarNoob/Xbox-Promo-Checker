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
        while (_) try {
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
exports.__esModule = true;
var node_fetch_1 = require("node-fetch");
var fs = require("fs");
var readline = require("readline/promises");
var rl = readline.createInterface({ "input": process.stdin, "output": process.stdout });
process.title = "Xbox Promo Checker | Telegram @DollarNoob";
(function () {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function () {
        var auth, codes, _loop_1, codeInfo, _i, codes_1, code, _;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    if (!!fs.existsSync("codes.txt")) return [3 /*break*/, 2];
                    console.log("[-] No codes.txt found!");
                    return [4 /*yield*/, rl.question("").then(function () { return rl.close(); })];
                case 1:
                    _f.sent();
                    process.exit(1);
                    _f.label = 2;
                case 2: return [4 /*yield*/, rl.question("\x1b[1m\x1b[34m[?] Please Enter Your Authorization Header: ")];
                case 3:
                    auth = _f.sent();
                    rl.close();
                    console.clear();
                    codes = fs.readFileSync("codes.txt", "utf-8").trim().split(/\r?\n/);
                    _loop_1 = function (code) {
                        var _loop_2, state_1, _g, _1;
                        return __generator(this, function (_h) {
                            switch (_h.label) {
                                case 0:
                                    _loop_2 = function () {
                                        var _j, _2, _k, _l, _m, _o, _3;
                                        return __generator(this, function (_p) {
                                            switch (_p.label) {
                                                case 0: return [4 /*yield*/, (0, node_fetch_1["default"])("https://purchase.mp.microsoft.com/v7.0/tokenDescriptions/".concat(code, "?market=US&language=en-US"), {
                                                        "headers": {
                                                            "authorization": auth
                                                        }
                                                    })];
                                                case 1:
                                                    codeInfo = _p.sent();
                                                    _j = codeInfo.status;
                                                    switch (_j) {
                                                        case 200: return [3 /*break*/, 2];
                                                        case 403: return [3 /*break*/, 2];
                                                        case 401: return [3 /*break*/, 3];
                                                        case 404: return [3 /*break*/, 5];
                                                        case 429: return [3 /*break*/, 6];
                                                    }
                                                    return [3 /*break*/, 8];
                                                case 2: return [3 /*break*/, 11];
                                                case 3:
                                                    console.log("\x1b[31m[-] Bad Authorization Header");
                                                    _2 = readline.createInterface({ "input": process.stdin, "output": process.stdout });
                                                    return [4 /*yield*/, _2.question("").then(function () { return _2.close(); })];
                                                case 4:
                                                    _p.sent();
                                                    process.exit(1);
                                                    _p.label = 5;
                                                case 5:
                                                    console.log("\x1b[31m[-] " + code);
                                                    return [3 /*break*/, 11];
                                                case 6:
                                                    fs.appendFileSync("errors.txt", code + "\n");
                                                    console.log("\x1b[33m[!] Rate Limited, retrying in 30 seconds");
                                                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 60000); })];
                                                case 7:
                                                    _p.sent();
                                                    return [3 /*break*/, 11];
                                                case 8:
                                                    _l = (_k = console).log;
                                                    _o = (_m = "\u001B[31m[-] ".concat(codeInfo.status, " - ")).concat;
                                                    return [4 /*yield*/, codeInfo.text()];
                                                case 9:
                                                    _l.apply(_k, [_o.apply(_m, [_p.sent()])]);
                                                    _3 = readline.createInterface({ "input": process.stdin, "output": process.stdout });
                                                    return [4 /*yield*/, _3.question("").then(function () { return _3.close(); })];
                                                case 10:
                                                    _p.sent();
                                                    process.exit(1);
                                                    _p.label = 11;
                                                case 11:
                                                    if (codeInfo.status !== 429)
                                                        return [2 /*return*/, "break"];
                                                    return [2 /*return*/];
                                            }
                                        });
                                    };
                                    _h.label = 1;
                                case 1:
                                    if (!true) return [3 /*break*/, 3];
                                    return [5 /*yield**/, _loop_2()];
                                case 2:
                                    state_1 = _h.sent();
                                    if (state_1 === "break")
                                        return [3 /*break*/, 3];
                                    return [3 /*break*/, 1];
                                case 3:
                                    if (codeInfo.status === 404)
                                        return [2 /*return*/, "continue"];
                                    _h.label = 4;
                                case 4:
                                    _h.trys.push([4, 6, , 7]);
                                    return [4 /*yield*/, codeInfo.text()];
                                case 5:
                                    codeInfo = _h.sent();
                                    codeInfo = JSON.parse(codeInfo);
                                    return [3 /*break*/, 7];
                                case 6:
                                    _g = _h.sent();
                                    return [3 /*break*/, 7];
                                case 7:
                                    if (!(typeof codeInfo !== "object")) return [3 /*break*/, 9];
                                    console.log("\x1b[31m[-] - " + codeInfo);
                                    _1 = readline.createInterface({ "input": process.stdin, "output": process.stdout });
                                    return [4 /*yield*/, _1.question("").then(function () { return _1.close(); })];
                                case 8:
                                    _h.sent();
                                    process.exit(1);
                                    _h.label = 9;
                                case 9:
                                    if (codeInfo.tokenState === "Active") {
                                        if (codeInfo.assetId !== "PGP-00047") {
                                            console.log("\x1b[33m[!] Code is not a Xbox Gamepass code!");
                                            return [2 /*return*/, "continue"];
                                        }
                                        console.log("\x1b[32m[+] 1 Month - " + code);
                                        fs.appendFileSync("1month.txt", code + "\n");
                                    }
                                    else if (codeInfo.tokenState === "Redeemed") {
                                        console.log("\x1b[31m[-] " + code);
                                    }
                                    else if (codeInfo.code === "Forbidden") {
                                        if (((_b = (_a = codeInfo.innererror) === null || _a === void 0 ? void 0 : _a.details[0]) === null || _b === void 0 ? void 0 : _b.message) !== "PGP-00016") {
                                            console.log("\u001B[31m[-] ".concat((_c = codeInfo.innererror) === null || _c === void 0 ? void 0 : _c.message, " - ").concat((_d = codeInfo.innererror) === null || _d === void 0 ? void 0 : _d.data[0], " - ").concat(((_e = codeInfo.innererror) === null || _e === void 0 ? void 0 : _e.data) ? codeInfo.innererror.data[codeInfo.innererror.data.length - 1] : ""));
                                            return [2 /*return*/, "continue"];
                                        }
                                        console.log("\x1b[32m[+] 3 Month - " + code);
                                        fs.appendFileSync("3month.txt", code + "\n");
                                    }
                                    else
                                        console.log("\x1b[31m[-] " + JSON.stringify(codeInfo));
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, codes_1 = codes;
                    _f.label = 4;
                case 4:
                    if (!(_i < codes_1.length)) return [3 /*break*/, 7];
                    code = codes_1[_i];
                    return [5 /*yield**/, _loop_1(code)];
                case 5:
                    _f.sent();
                    _f.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 4];
                case 7:
                    console.log("\n\x1b[33m[!] Finished All Tasks!\x1b[0m");
                    _ = readline.createInterface({ "input": process.stdin, "output": process.stdout });
                    return [4 /*yield*/, _.question("").then(function () { return _.close(); })];
                case 8:
                    _f.sent();
                    process.exit(0);
                    return [2 /*return*/];
            }
        });
    });
})();
