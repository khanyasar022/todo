"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_2 = require("@trpc/server/adapters/express");
const router_1 = require("./router");
const context_1 = require("./context");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/trpc', (0, express_2.createExpressMiddleware)({
    router: router_1.appRouter,
    createContext: context_1.createContext,
}));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
