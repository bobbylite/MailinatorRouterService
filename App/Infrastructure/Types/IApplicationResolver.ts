import express = require("express");

export interface IApplicationResolver {
    app: express.Application;
    InitializeServer(): void;
}