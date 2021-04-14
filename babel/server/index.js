"use strict";

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.array.reduce.js");

require("core-js/modules/es.string.replace.js");

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createServer = void 0;

var koa_1 = __importDefault(require("koa"));

var koa_router_1 = __importDefault(require("koa-router"));

var apollo_server_koa_1 = require("apollo-server-koa");

var fs_1 = require("fs");

var path_1 = require("path");

var errorHandler = function errorHandler(err) {
  console.log("Error while running resolver", {
    error: err
  });
  return new Error("Internal server error");
};

function createServer() {
  var app = new koa_1.default();
  var router = new koa_router_1.default();
  var schemaFiles = fs_1.readdirSync(path_1.join(process.cwd(), "src/schema")).filter(function (file) {
    return file.indexOf(".graphql") > 0;
  });
  var schema = schemaFiles.map(function (file) {
    return fs_1.readFileSync(path_1.join(process.cwd(), "src/schema/" + file)).toString();
  }).join();
  var queryResolvers = schemaFiles.map(function (file) {
    return file.replace(".graphql", "");
  }).map(function (file) {
    var query = require(path_1.join(process.cwd(), "src/queries/" + file)).default;

    return query;
  }).reduce(function (initial, current) {
    return __assign(__assign({}, initial), current.Query);
  }, {});
  var server = new apollo_server_koa_1.ApolloServer({
    typeDefs: apollo_server_koa_1.gql("\n    type Query\n\n    schema {\n      query: Query\n    }\n\n    " + schema + "\n  "),
    context: function context(_a) {
      var ctx = _a.ctx;
      return ctx;
    },
    formatError: errorHandler,
    resolvers: {
      RootQuery: queryResolvers,
      RootMutation: {}
    }
  });
  router.get("/healthz", function (ctx) {
    ctx.body = "ok";
  });
  router.post("/graphql", server.getMiddleware());
  router.get("/graphql", server.getMiddleware());
  app.use(router.routes());
  app.use(router.allowedMethods());
  return app;
}

exports.createServer = createServer;