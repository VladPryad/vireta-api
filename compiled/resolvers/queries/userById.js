"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    Query: {
        userById: function (_, args) {
            return {
                name: "Hello " + args.id,
                googleId: "",
                password: ""
            };
        }
    }
};
//# sourceMappingURL=userById.js.map