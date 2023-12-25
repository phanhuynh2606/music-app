"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    fullName: String,
    avatar: String,
    status: String,
    dob: Date,
    token: String,
    gender: {
        type: String,
        default: "Khác"
    },
    phone: String,
    address: String,
    peopleId: String,
    decription: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date,
}, {
    timestamps: true
});
const User = mongoose_1.default.model("User", userSchema, "users");
exports.default = User;
