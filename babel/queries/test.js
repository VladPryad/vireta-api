"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  Query: {
    hello: function hello(root, args, context) {
      return "Hello " + args.name;
    }
  }
};