var React = require('react');

var Search = React.createClass({

    propTypes: {
        value: React.PropTypes.string,
        onChange: React.PropTypes.func
    },

    render: function () {
        return (
            <div className="search-wrap input-group input-group-md">
                <span className="input-group-addon">
                    <span className="glyphicon glyphicon-search"></span>
                </span>
                <input className="search-field form-control"
                    placeholder="Search..."
                    value={this.props.value}
                    onChange={this._handleSearch} />
            </div>
        )
    },

    _handleSearch: function (e) {
        this.props.onChange(e.target.value);
    }
});

module.exports = Search;