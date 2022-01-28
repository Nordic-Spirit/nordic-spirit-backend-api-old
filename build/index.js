"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const AppRouter_1 = require("./AppRouter");
const config_1 = require("./config");
const ModelRepo_1 = require("./repos/ModelRepo");
const errors_1 = require("./errors");
const config_2 = require("./config");
require("./controllers");
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cors_1.default());
app.use(cookie_parser_1.default());
app.use(express_session_1.default(config_2.sessionConfig));
app.use(AppRouter_1.AppRouter.getInstance());
const repo = new ModelRepo_1.ModelRepo();
repo
    .query(`SELECT 1 + 1;`)
    .then(() => {
    console.log('Connected to database');
    app.listen(config_1.port, () => {
        console.log(`Server running on port : ${config_1.port}`);
    });
})
    .catch(err => {
    throw new errors_1.CustomError(err.message, errors_1.ErrorNames.databaseError);
});
