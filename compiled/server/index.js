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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
var koa_1 = __importDefault(require("koa"));
var koa_router_1 = __importDefault(require("koa-router"));
var apollo_server_koa_1 = require("apollo-server-koa");
var pubsub_1 = __importDefault(require("./pubsub"));
var cors_1 = __importDefault(require("@koa/cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var gql_files_1 = require("./gql-files");
dotenv_1.default.config();
var errorHandler = function (err) {
    console.log("Error while running resolver", {
        error: err
    });
    return err.message;
};
function createServer() {
    return __awaiter(this, void 0, void 0, function () {
        var app, corsOptions, router, server, httpServer;
        return __generator(this, function (_a) {
            app = new koa_1.default();
            corsOptions = {
                origin: "*",
                credentials: true
            };
            app.use(cors_1.default(corsOptions));
            router = new koa_router_1.default();
            server = new apollo_server_koa_1.ApolloServer({
                typeDefs: apollo_server_koa_1.gql("\n    type Query\n    type Mutation\n    type Subscription\n\n    schema {\n      query: Query\n      mutation: Mutation\n      subscription: Subscription\n    }\n\n    " + gql_files_1.querySchema + "\n    " + gql_files_1.mutationSchema + "\n    " + gql_files_1.subscriptionSchema + "\n  "),
                context: function (_a) {
                    var ctx = _a.ctx;
                    return ({ ctx: ctx, pubsub: pubsub_1.default });
                },
                formatError: errorHandler,
                resolvers: {
                    Query: gql_files_1.queryResolvers,
                    Mutation: gql_files_1.mutationResolvers,
                    Subscription: gql_files_1.subscriptionResolvers
                }
            });
            router.post("/graphql", server.getMiddleware());
            router.get("/graphql", server.getMiddleware());
            app.use(router.routes());
            app.use(router.allowedMethods());
            httpServer = app.listen(process.env.PORT_REST_EXPOSE);
            server.installSubscriptionHandlers(httpServer);
            console.log("API Gateway listening on " + process.env.PORT_REST_EXPOSE + "/graphql");
            return [2 /*return*/];
        });
    });
}
exports.createServer = createServer;
//# sourceMappingURL=index.js.map