"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
require("reflect-metadata");
var Types_1 = __importDefault(require("./Types"));
var ApplicationResolver_1 = require("../../Application/ApplicationResolver");
var Service_1 = require("../../Tests/Service");
var FileWatcher_1 = require("../../Application/Services/FileWatcher");
var Builder = /** @class */ (function () {
    function Builder() {
        this.InitializeBindings(Builder._container);
        this.InitializeApplicationResolver(Builder._container);
    }
    Builder.Boostrap = function () {
        return new Builder();
    };
    Builder.Get = function (templateString) {
        return Builder._container.get(templateString);
    };
    Builder.prototype.InitializeApplicationResolver = function (builder) {
        builder.bind(Types_1.default.IApplicationResolver).toConstantValue(new ApplicationResolver_1.ApplicationResolver);
    };
    Builder.prototype.InitializeBindings = function (builder) {
        builder.bind(Types_1.default.IFileWatcher).to(FileWatcher_1.FileWatcher);
        builder.bind(Types_1.default.IService).to(Service_1.Service);
    };
    Builder._container = new inversify_1.Container();
    return Builder;
}());
exports.Builder = Builder;
Builder.Boostrap();
