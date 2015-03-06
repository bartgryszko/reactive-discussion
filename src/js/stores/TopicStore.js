var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/Constants').ActionTypes,
    EventEmmiter = require('events').EventEmitter,
    assign = require('object-assign'),
    SearchStore = require('./SearchStore'),
    WebApiUtils = require('../utils/WebApiUtils');

var CHANGE_EVENT = 'change';

var _topics = false,
    _filtered_topics = false,
    _topics_to_select = false,
    _selected_topic = "-1";


/**
 * Generates and inserts random hash for future use as a key. See more at:
 * http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
 *
 * Hash is generated only once and than natural order of object is used.
 * It is used to allow server-side filtering – if we want client side filtering
 * only, only natural order of initial objects could be used (without hash).
 *
 * *.base_id is used as an id for server-side filtering on FireBase. See more at:
 * https://www.firebase.com/docs/web/guide/understanding-data.html#section-arrays-in-firebase
 *
 * @param topics
 * @returns {*}
 * @private
 */
function _generateIdentitiesForTopicsAndNotes(topics) {
    var i, j, discussion, note, hash;

    // Generate unique hash
    hash = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);

    // Loop through topics
    for (i = 0; i < topics.length; i += 1) {
        discussion = topics[i].discussion;

        // ID for topics ie. UNIQ_HASH-1, UNIQ_HASH-2
        topics[i].id = hash + "-" + i.toString();
        topics[i].base_id = i.toString();

        // Loop through discussions in topic
        for (j = 0; j < discussion.length; j += 1) {
            note = discussion[j];

            // ID for notes ie. UNIQ_HASH-1-1, UNIQ_HASH-1-2
            note.id = hash + "-" + i.toString() + "-" + j.toString();
            note.base_id = j.toString();
        }
    }

    return topics;
}

/**
 * Generates selectable topics object during initial load of data.
 * @param topics
 * @private
 */
function _generateTopicsToSelect(topics) {
    var i, topics_to_select = [];

    for (i = 0; i < topics.length; i += 1) {
        topics_to_select.push({
            id: topics[i].id,
            base_id: topics[i].base_id,
            name: topics[i].name
        });
    }

    return topics_to_select;
}

/**
 * Function used for escaping *str* before use in regular expressions as
 * a string.
 *
 * @param str
 * @returns {*}
 * @private
 */
function _escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

/**
 * Filters topic based on *search* attribute provided by user.
 *
 * @param search
 * @private
 */
function _filterTopics(search) {
    var i, j, discussion, note, filtered_discussion,
        searchRegex = new RegExp(_escapeRegExp(search), "ig");

    // Clear previous result
    _filtered_topics = [];

    // Loop through topics
    for (i = 0; i < _topics.length; i += 1) {
        discussion = _topics[i].discussion;
        filtered_discussion = [];

        // Loop through discussions in topic
        for (j = 0; j < discussion.length; j += 1) {
            note = discussion[j];

            // If @search is found in note, add to filtered_discussion list
            if (searchRegex.test(note.text)) {
                filtered_discussion.push(note);
            }
        }

        // Only add topic if there is minimum one note
        // in filtered_discussion list
        if (filtered_discussion.length > 0) {
            _filtered_topics.push(
                {
                    id: _topics[i].id,
                    base_id: _topics[i].base_id,
                    name: _topics[i].name,
                    discussion: filtered_discussion
                }
            );
        }
    }
}

/**
 * Receives server data and attributes it to the store's data
 *
 * @param data
 * @param is_child (optional)
 * @private
 */
function _topicsReceive(data, is_child) {
    _topics = _generateIdentitiesForTopicsAndNotes(data);

    // Get topics to select only on initial load
    if (is_child !== true) {
        _topics_to_select = _generateTopicsToSelect(_topics);
    }
    _filterTopics(SearchStore.getValue());
}

/**
 * Updates current topics to Child only.
 *
 * @param id
 * @param data
 * @private
 */
function _topicChildReceive(id, data) {
    if (id === _selected_topic) {
        _topicsReceive([data], true);
    }
}

/**
 * When deselecting current topic, load all data. When selecting one child,
 * load child data only.
 *
 * @param id
 * @private
 */
function _selectTopic(id) {
    _topics = false;
    _filtered_topics = false;

    if (id === _selected_topic) {
        _selected_topic = "-1";
        WebApiUtils.loadInitialData();
    } else {
        _selected_topic = id;
        WebApiUtils.loadChildData(id);
    }
}

var TopicStore = assign({}, EventEmmiter.prototype, {

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
        return _topics;
    },

    getFiltered: function () {
        return _filtered_topics;
    },

    getTopicsToSelect: function () {
        return _topics_to_select;
    },

    getSelectedTopicId: function () {
        return _selected_topic;
    }
});

TopicStore.dispatchToken = AppDispatcher.register(
    function (payload) {
        var action = payload.action;

        switch (action.type) {

        case ActionTypes.TOPICS_RECEIVE_SUCCESS:
            _topicsReceive(action.data);
            TopicStore.emitChange();
            break;

        case ActionTypes.TOPICS_CHILD_SELECT:
            _selectTopic(action.id);
            TopicStore.emitChange();
            break;

        case ActionTypes.TOPICS_RECEIVE_CHILD_SUCCESS:
            _topicChildReceive(action.id, action.data);
            TopicStore.emitChange();
            break;

        case ActionTypes.SEARCH_UPDATE_VALUE:
            AppDispatcher.waitFor([SearchStore.dispatchToken]);
            _filterTopics(SearchStore.getValue());
            TopicStore.emitChange();
            break;

        }

        return true;
    }
);

module.exports = TopicStore;