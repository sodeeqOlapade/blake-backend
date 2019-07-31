"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
//@routes     GET api/
//@desc       Index route
//@access     Public
router.get('/', function (req, res, next) {
    res.send('Hello world.....');
});
module.exports = router;
//# sourceMappingURL=index.js.map