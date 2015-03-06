var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/Constants').ActionTypes;

module.exports = {
    filterTopics: function (search) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.TOPICS_FILTER,
            search: search
        });
    },

    topicSelectChange: function (id) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.TOPICS_CHILD_SELECT,
            id: id
        });
    }
};