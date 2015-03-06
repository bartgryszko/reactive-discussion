var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/Constants').ActionTypes;

module.exports = {
    receiveParticipants: function (data) {
        AppDispatcher.handleServerAction({
            type: ActionTypes.PARTICIPANTS_RECEIVE_SUCCESS,
            data: data
        });
    },

    receiveTopics: function (data) {
        AppDispatcher.handleServerAction({
            type: ActionTypes.TOPICS_RECEIVE_SUCCESS,
            data: data
        });
    },

    receiveChildTopic: function (id, data) {
        AppDispatcher.handleServerAction({
            type: ActionTypes.TOPICS_RECEIVE_CHILD_SUCCESS,
            id: id,
            data: data
        });
    }
};