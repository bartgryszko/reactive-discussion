var React = require('react');

var Topic = React.createClass({

    propTypes: {
        speaker: React.PropTypes.object,
        text: React.PropTypes.string
    },

    render: function () {
        var speaker = this.props.speaker;

        return (
            <div className="note">
                <div className="avatar-wrap">
                    <img src={speaker.avatar} alt={speaker.name} />
                </div>
                <div className="text-wrap">
                    <span className="name">{speaker.name}:</span> {this.props.text}
                </div>
            </div>
        )
    }
});

module.exports = Topic;