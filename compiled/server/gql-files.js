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
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutationResolvers = exports.mutationSchema = exports.mutationSchemaFiles = exports.subscriptionResolvers = exports.subscriptionSchema = exports.subscriptionSchemaFiles = exports.queryResolvers = exports.querySchema = exports.querySchemaFiles = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
exports.querySchemaFiles = fs_1.readdirSync(path_1.join(process.cwd(), "src/schema/queries"))
    .filter(function (file) { return file.indexOf(".graphql") > 0; });
exports.querySchema = exports.querySchemaFiles
    .map(function (file) { return fs_1.readFileSync(path_1.join(process.cwd(), "src/schema/queries/" + file)).toString(); })
    .join();
exports.queryResolvers = exports.querySchemaFiles
    .map(function (file) { return file.replace(".graphql", ".js"); })
    .map(function (file) {
    var query = require(path_1.join(process.cwd(), "compiled/resolvers/queries/" + file)).default;
    return query;
})
    .reduce(function (initial, current) { return (__assign(__assign({}, initial), current.Query)); }, {});
exports.subscriptionSchemaFiles = fs_1.readdirSync(path_1.join(process.cwd(), "src/schema/subscriptions"))
    .filter(function (file) { return file.indexOf(".graphql") > 0; });
exports.subscriptionSchema = exports.subscriptionSchemaFiles
    .map(function (file) { return fs_1.readFileSync(path_1.join(process.cwd(), "src/schema/subscriptions/" + file)).toString(); })
    .join();
exports.subscriptionResolvers = exports.subscriptionSchemaFiles
    .map(function (file) { return file.replace(".graphql", ".js"); })
    .map(function (file) {
    var subscription = require(path_1.join(process.cwd(), "compiled/resolvers/subscriptions/" + file)).default;
    return subscription;
})
    .reduce(function (initial, current) { return (__assign(__assign({}, initial), current.Subscription)); }, {});
exports.mutationSchemaFiles = fs_1.readdirSync(path_1.join(process.cwd(), "src/schema/mutations"))
    .filter(function (file) { return file.indexOf(".graphql") > 0; });
exports.mutationSchema = exports.mutationSchemaFiles
    .map(function (file) { return fs_1.readFileSync(path_1.join(process.cwd(), "src/schema/mutations/" + file)).toString(); })
    .join();
exports.mutationResolvers = exports.mutationSchemaFiles
    .map(function (file) { return file.replace(".graphql", ".js"); })
    .map(function (file) {
    var mutation = require(path_1.join(process.cwd(), "compiled/resolvers/mutations/" + file)).default;
    return mutation;
})
    .reduce(function (initial, current) { return (__assign(__assign({}, initial), current.Mutation)); }, {});
//# sourceMappingURL=gql-files.js.map