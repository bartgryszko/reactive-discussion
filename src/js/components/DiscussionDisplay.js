var React = require('react'),
    Topic = require('./Topic'),
    Loader = require('./Loader');

var DiscussionDisplay = React.createClass({

    propTypes: {
        topics: React.PropTypes.oneOfType([
            React.PropTypes.array,
            React.PropTypes.bool
        ]),
        participants: React.PropTypes.object
    },

    render: function () {
        var body;

        if (this.props.topics === false) {
            body = <Loader />
        } else {
            body = this.props.topics.map(function (topic) {
                return (
                    <Topic
                        key={topic.id}
                        name={topic.name}
                        participants={this.props.participants}
                        discussion={topic.discussion} />
                );
            }.bind(this));

            if (body.length == 0) {
                body = (
                    <div className="no-topics">
                        Sorry, there are no topics that match the selection criteria.
                    </div>
                );
            }
        }

        return (
            <div className="discussion-display">
                {body}
            </div>
        )
    }
});

module.exports = DiscussionDisplay;