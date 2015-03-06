var React = require('react'),
    Note = require('./Note');

var Topic = React.createClass({

    propTypes: {
        name: React.PropTypes.string,
        discussion: React.PropTypes.array,
        participants: React.PropTypes.object
    },

    render: function () {
        var notes = this.props.discussion.map(function (note) {
            var speaker_id = note.speaker,
                speaker = this.props.participants[speaker_id];

            return (
                <Note
                    key={note.id}
                    speaker={speaker}
                    text={note.text}
                />
            )
        }.bind(this));

        return (
            <div className="topic">
                <h2>{this.props.name}</h2>
                {notes}
            </div>
        )
    }
});

module.exports = Topic;