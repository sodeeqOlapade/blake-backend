"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
//@routes     GET api/auth
//@desc       Test route
//@access     Public
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
//@routes     POST api/users
//@desc       Register new user
//@access     Public
router.post('/', (req, res) => {
});
module.exports = router;
//# sourceMappingURL=users.js.map