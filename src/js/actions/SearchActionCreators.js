var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/Constants').ActionTypes;

module.exports = {
    updateValue: function (search) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.SEARCH_UPDATE_VALUE,
            search: search
        });
    }
};