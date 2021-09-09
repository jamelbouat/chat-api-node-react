"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const conversationSchema = new mongoose_1.Schema({
    userIds: [{
            type: String,
            required: true
        }],
    messages: [{
            from: {
                type: String,
                required: true
            },
            content: {
                type: String,
                required: true
            },
            time: {
                type: String,
                required: true
            },
            read: {
                type: Boolean,
                required: true
            }
        }]
}, { timestamps: true });
const ConversationModel = mongoose_1.model('Conversation', conversationSchema);
exports.default = ConversationModel;
