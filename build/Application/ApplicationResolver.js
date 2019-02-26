"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var express = require("express");
var Containers_1 = require("../Infrastructure/DependencyInjection/Containers");
var Types_1 = __importDefault(require("../Infrastructure/DependencyInjection/Types"));
var ApplicationResolver = /** @class */ (function () {
    function ApplicationResolver() {
        this.port = 8080;
        this.app = express();
        this.InitializeComponents();
        this.InitializeServer();
    }
    ApplicationResolver.prototype.InitializeComponents = function () {
        Containers_1.Builder.Get(Types_1.default.IFileWatcher).Watch();
    };
    ApplicationResolver.prototype.InitializeServer = function () {
        var _this = this;
        this.app.get('/', function (req, res) {
            res.send('Hello World!');
        });
        this.app.listen(this.port, function () {
            console.log('MailinatorRouterService listening on port: ' + _this.port);
        });
    };
    ApplicationResolver = __decorate([
        inversify_1.injectable()
    ], ApplicationResolver);
    return ApplicationResolver;
}());
exports.ApplicationResolver = ApplicationResolver;
