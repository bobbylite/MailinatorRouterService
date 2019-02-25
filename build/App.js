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
var express_1 = __importDefault(require("express"));
var inversify_1 = require("inversify");
var App = /** @class */ (function () {
    function App() {
        this.port = 8080;
        this.app = express_1.default();
        this.InitializeContainers();
        this.InitializeServer();
    }
    App_1 = App;
    App.Bootstrap = function () {
        return new App_1();
    };
    App.prototype.InitializeContainers = function () {
    };
    App.prototype.InitializeServer = function () {
        this.app.get('/', function (req, res) {
            res.send('Hello World!');
        });
        this.app.listen(this.port, function () {
            console.log('Example app listening on port 3000!');
        });
    };
    var App_1;
    App = App_1 = __decorate([
        inversify_1.injectable()
    ], App);
    return App;
}());
exports.App = App;
