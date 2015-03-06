module.exports = {
    ActionTypes: {
        TOPICS_RECEIVE_SUCCESS : "TOPICS_RECEIVE_SUCCESS",
        TOPICS_FILTER : "TOPICS_FILTER",
        TOPICS_RECEIVE_CHILD_SUCCESS : "TOPICS_RECEIVE_CHILD_SUCCESS",
        TOPICS_CHILD_SELECT : "TOPICS_CHILD_SELECT",

        PARTICIPANTS_RECEIVE_SUCCESS : "PARTICIPANTS_RECEIVE_SUCCESS",

        SEARCH_UPDATE_VALUE : "SEARCH_UPDATE_VALUE"
    },

    PayloadSources: {
        SERVER_ACTION: "SERVER_ACTION",
        VIEW_ACTION: "VIEW_ACTION"
    },

    viewPayload: function (action) {
        var self = this;

        return {
            source: self.PayloadSources.VIEW_ACTION,
            action: action
        };
    },

    serverPayload: function (action) {
        var self = this;

        return {
            source: self.PayloadSources.SERVER_ACTION,
            action: action
        };
    }
};