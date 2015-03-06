var React = require('react'),
    TopicSelect = require('./TopicSelect');

var TopicSelectionSection = React.createClass({

    propTypes: {
        topics: React.PropTypes.array,
        selectedTopic: React.PropTypes.string,
        onChange: React.PropTypes.func
    },

    render: function () {
        var selected,

            topics = this.props.topics.map(function (topic) {
                selected = (topic.base_id === this.props.selectedTopic);
                return (
                    <TopicSelect
                        key={topic.id}
                        baseId={topic.base_id}
                        name={topic.name}
                        selected={selected}
                        onChange={this.props.onChange}
                    />
                )
            }.bind(this));

        return (
            <div className="topic-selection-wrapper">
                <div className="topic-info">
                    Show only:
                </div>
                <div className="topic-selection">
                    {topics}
                </div>
            </div>
        )
    }
});

module.exports = TopicSelectionSection;