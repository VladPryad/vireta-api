"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
var koa_1 = __importDefault(require("koa"));
var koa_router_1 = __importDefault(require("koa-router"));
var apollo_server_koa_1 = require("apollo-server-koa");
var fs_1 = require("fs");
var path_1 = require("path");
var errorHandler = function (err) {
    console.log("Error while running resolver", {
        error: err
    });
    return new Error("Internal server error");
};
function createServer() {
    var app = new koa_1.default();
    var router = new koa_router_1.default();
    var querySchemaFiles = fs_1.readdirSync(path_1.join(process.cwd(), "src/schema/queries"))
        .filter(function (file) { return file.indexOf(".graphql") > 0; });
    var querySchema = querySchemaFiles
        .map(function (file) { return fs_1.readFileSync(path_1.join(process.cwd(), "src/schema/queries/" + file)).toString(); })
        .join();
    var queryResolvers = querySchemaFiles
        .map(function (file) { return file.replace(".graphql", ".js"); })
        .map(function (file) {
        var query = require(path_1.join(process.cwd(), "compiled/resolvers/queries/" + file)).default;
        return query;
    })
        .reduce(function (initial, current) { return (__assign(__assign({}, initial), current.Query)); }, {});
    var mutationSchemaFiles = fs_1.readdirSync(path_1.join(process.cwd(), "src/schema/mutations"))
        .filter(function (file) { return file.indexOf(".graphql") > 0; });
    var mutationSchema = mutationSchemaFiles
        .map(function (file) { return fs_1.readFileSync(path_1.join(process.cwd(), "src/schema/mutations/" + file)).toString(); })
        .join();
    var mutationResolvers = mutationSchemaFiles
        .map(function (file) { return file.replace(".graphql", ".js"); })
        .map(function (file) {
        var mutation = require(path_1.join(process.cwd(), "compiled/resolvers/mutations/" + file)).default;
        return mutation;
    })
        .reduce(function (initial, current) { return (__assign(__assign({}, initial), current.Mutation)); }, {});
    var server = new apollo_server_koa_1.ApolloServer({
        typeDefs: apollo_server_koa_1.gql("\n    type Query\n    type Mutation\n\n    schema {\n      query: Query\n      mutation: Mutation\n    }\n\n    " + querySchema + "\n    " + mutationSchema + "\n  "),
        context: function (_a) {
            var ctx = _a.ctx;
            return ctx;
        },
        formatError: errorHandler,
        resolvers: {
            Query: queryResolvers,
            Mutation: mutationResolvers
        }
    });
    router.post("/graphql", server.getMiddleware());
    router.get("/graphql", server.getMiddleware());
    app.use(router.routes());
    app.use(router.allowedMethods());
    return app;
}
exports.createServer = createServer;
//# sourceMappingURL=index.js.map