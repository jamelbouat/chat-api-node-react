"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConversationsAggregatePipeline = void 0;
const getConversationsAggregatePipeline = () => ([
    {
        '$addFields': {
            'userIds': {
                '$map': {
                    'input': '$userIds',
                    'as': 'id',
                    'in': {
                        '$toObjectId': '$$id'
                    }
                }
            }
        }
    },
    {
        '$lookup': {
            'from': 'users',
            'localField': 'userIds',
            'foreignField': '_id',
            'as': 'users'
        }
    },
    {
        '$project': {
            'messages': 1,
            'createdAt': 1,
            'updatedAt': 1,
            'users._id': 1,
            'users.firstName': 1,
            'users.lastName': 1
        }
    },
    {
        '$sort': {
            createdAt: -1
        }
    }
]);
exports.getConversationsAggregatePipeline = getConversationsAggregatePipeline;
