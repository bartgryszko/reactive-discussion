var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/Constants').ActionTypes,
    EventEmmiter = require('events').EventEmitter,
    assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _search_value = "";

/**
 * Updates search value.
 *
 * @param search
 * @private
 */
function _updateSearch(search) {
    _search_value = search;
}

var SearchStore = assign({}, EventEmmiter.prototype, {

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getValue: function () {
        return _search_value;
    }
});

SearchStore.dispatchToken = AppDispatcher.register(
    function (payload) {
        var action = payload.action;

        switch (action.type) {

        case ActionTypes.SEARCH_UPDATE_VALUE:
            _updateSearch(action.search);
            SearchStore.emitChange();
            break;
        }

        return true;
    }
);

module.exports = SearchStore;