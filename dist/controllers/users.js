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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.postUser = exports.getUser = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.findAll();
    res.json({ users });
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_1.default.findByPk(id);
    if (!user) {
        res.status(404).json({
            msg: `User with id : ${id} not found`
        });
    }
    else {
        res.json({ user });
    }
});
exports.getUser = getUser;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const found = yield user_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (found) {
            return res.status(400).json({
                msg: `There's already an account created with ${body.email}. Try another one.`
            });
        }
        else {
            const newUser = yield user_1.default.create(body);
            return res.json(newUser);
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Something went wrong. Talk to the administrator'
        });
    }
});
exports.postUser = postUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const found = yield user_1.default.findByPk(id);
        if (!found)
            return res.status(404).json({ msg: `User with id : ${id} not found` });
        yield found.update(body);
        res.json(found);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Something went wrong. Talk to the administrator'
        });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const found = yield user_1.default.findByPk(id);
    if (!found)
        return res.status(404).json({ msg: `User with id : ${id} not found` });
    yield found.update({ status: false });
    yield user_1.default.destroy({
        where: {
            id: id
        }
    });
    return res.send('User succesfully deleted');
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=users.js.map