var React = require('react'),
    Search = require('./Search'),
    TopicSelection = require('./TopicSelectionSection'),
    DiscussionDisplay = require('./DiscussionDisplay'),
    Loader = require('./Loader'),
    TopicStore = require('../stores/TopicStore'),
    ParticipantStore = require('../stores/ParticipantStore'),
    SearchStore = require('../stores/SearchStore'),
    SearchActionCreators = require('../actions/SearchActionCreators'),
    TopicActionCreators = require('../actions/TopicActionCreators');

function getStateFromStores() {
    return {
        filteredTopics: TopicStore.getFiltered(),
        topicsToSelect: TopicStore.getTopicsToSelect(),
        selectedTopic: TopicStore.getSelectedTopicId(),
        participants: ParticipantStore.getAll(),
        searchValue: SearchStore.getValue()
    };
}

var TopicsApp = React.createClass({

    propTypes: {
        header: React.PropTypes.string
    },

    getInitialState: function () {
        return getStateFromStores();
    },

    componentDidMount: function () {
        TopicStore.addChangeListener(this._stateChange);
        ParticipantStore.addChangeListener(this._stateChange);
        SearchStore.addChangeListener(this._stateChange);
    },

    componentWillUnmount: function () {
        TopicStore.removeChangeListener(this._stateChange);
        ParticipantStore.removeChangeListener(this._stateChange);
        SearchStore.removeChangeListener(this._stateChange);
    },

    render: function () {
        var body = [];

        if (this.state.topicsToSelect === false) {
            body = <Loader />;
        } else {
            body = (
                <div>
                    <Search
                        value={this.state.searchValue}
                        onChange={this._onSearchChange} />
                    <TopicSelection
                        selectedTopic={this.state.selectedTopic}
                        topics={this.state.topicsToSelect}
                        onChange={this._onTopicSelectChange} />
                    <DiscussionDisplay
                        participants={this.state.participants}
                        topics={this.state.filteredTopics} />
                </div>
            );
        }

        return (
            <div className="topics-app">
                <h1>{this.props.header}</h1>
                {body}
            </div>
        )
    },

    _stateChange: function () {
        this.setState(getStateFromStores());
    },

    _onTopicSelectChange: function (id) {
        TopicActionCreators.topicSelectChange(id);
    },

    _onSearchChange: function (value) {
        SearchActionCreators.updateValue(value);
    }
});

module.exports = TopicsApp;