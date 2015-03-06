var React = require('react');

var TopicSelect = React.createClass({

    propTypes: {
        name: React.PropTypes.string,
        discussion: React.PropTypes.array,
        participants: React.PropTypes.object,
        baseId: React.PropTypes.string,
        selected: React.PropTypes.bool
    },

    render: function () {
        var classes = ['topic-select'];

        if (this.props.selected) {
            classes.push('selected');
        }

        return (
            <div onClick={this._onClick} className={classes.join(" ")}>
                {this.props.name}
            </div>
        )
    },

    _onClick: function() {
        this.props.onChange(this.props.baseId);
    }
});

module.exports = TopicSelect;