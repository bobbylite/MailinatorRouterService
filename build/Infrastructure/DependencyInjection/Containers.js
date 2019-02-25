"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var App_1 = require("../../App");
var Types_1 = __importDefault(require("./Types"));
var Builder = /** @class */ (function () {
    function Builder() {
    }
    Builder.Boostrap = function () {
        var _container = new inversify_1.Container();
        return Builder.Bind(_container);
    };
    Builder.Bind = function (builder) {
        builder.bind(Types_1.default.IApp).toConstantValue(new App_1.App);
        return builder;
    };
    return Builder;
}());
exports.Builder = Builder;
Builder.Boostrap();
