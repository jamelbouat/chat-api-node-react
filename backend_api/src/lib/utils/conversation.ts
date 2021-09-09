export const getConversationsAggregatePipeline = () => ([
    {
        $addFields: {
            'userIds': {
                '$map': {
                    'input': '$userIds',
                    'as': 'id',
                    'in': {
                        $toObjectId: '$$id'
                    }
                }
            },
            'messageIds': {
                '$map': {
                    'input': '$messageIds',
                    'as': 'id',
                    'in': {
                        $toObjectId: '$$id'
                    }
                }
            }
        }

    },
    {
        $lookup: {
            'from': 'users',
            'localField': 'userIds',
            'foreignField': '_id',
            'as': 'users'
        }
    },
    {
        $lookup: {
            'from': 'messages',
            'localField': 'messageIds',
            'foreignField': '_id',
            'as': 'messages',
        }
    },
    {
        $project: {
            'users._id': 1,
            'users.firstName': 1,
            'users.lastName': 1,
            'messages': 1,
            'createdAt': 1,
            'updatedAt': 1,
        }
    },
    {
        $sort: {
            updatedAt: -1
        }
    }
]);
