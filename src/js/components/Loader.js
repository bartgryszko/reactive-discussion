var React = require('react');

var Loader = React.createClass({
    render: function () {
        return (
            <div className="loader">
                <img src="img/loading.svg" alt="Loading" />
            </div>
        )
    }
});

module.exports = Loader;