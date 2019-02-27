import express = require("express");

export interface IApplicationResolver {
    app: express.Application;
    OnStart(): void;
    InitializeServer(): void;
}