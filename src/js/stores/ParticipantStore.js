var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/Constants').ActionTypes,
    EventEmmiter = require('events').EventEmitter,
    assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _participants = false;

/**
 * Receives participants data from server.
 *
 * @param data
 * @private
 */
function _participantsReceive(data) {
    _participants = data;
}

var ParticipantStore = assign({}, EventEmmiter.prototype, {

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getAll: function () {
        return _participants;
    },

    get: function (id) {
        return _participants[id];
    }
});

ParticipantStore.dispatchToken = AppDispatcher.register(
    function (payload) {
        var action = payload.action;

        switch (action.type) {

        case ActionTypes.PARTICIPANTS_RECEIVE_SUCCESS:
            _participantsReceive(action.data);
            ParticipantStore.emitChange();
            break;
        }

        return true;
    }
);

module.exports = ParticipantStore;