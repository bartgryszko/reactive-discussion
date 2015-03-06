var Promise = require('es6-promise').Promise,
    ServerActionCreators = require('../actions/ServerActionCreators'),
    $ = require('jquery'),
    Firebase = require('firebase'),
    firebaseRef = new Firebase('https://interview-bolster.firebaseio.com/');

var DATA_URL = "data.json";

module.exports = {
    /**
     * Load initial data from Firebase.
     */
    loadInitialData: function () {
        firebaseRef.once('value',
            function (snapshot) {
                var data = snapshot.val();

                if (!data.hasOwnProperty('participants') || !data.hasOwnProperty('topics')) {
                    throw new Error("Loaded data doesn't have participants or topics property");
                }

                ServerActionCreators.receiveParticipants(data.participants);
                ServerActionCreators.receiveTopics(data.topics);

            },
            function (error) {
                alert("There was an error while loading data from server. " +
                    "Details are in the log. Please reload the page.");

                console.log("Reading from server failed.", error);
            });
    },

    loadChildData: function (id) {
        firebaseRef.child('topics/' + id).once('value',
            function (snapshot) {
                var data = snapshot.val();

                ServerActionCreators.receiveChildTopic(id, data);
            },

            function (error) {
                alert("There was an error while loading data from server. " +
                    "Details are in the log. Please try again.");

                console.log("Reading child from server failed.", error);
            });
    },

    /**
     * For testing purpose only – loading local data.json.
     */
    test_loadInitialData: function () {
        this._promiseLoadJSONData(DATA_URL)
            .then(function (data) {

                if (!data.hasOwnProperty('participants') || !data.hasOwnProperty('topics')) {
                    throw new Error('Loaded data doesn\'t have participants or topics property');
                }

                ServerActionCreators.receiveParticipants(data.participants);
                ServerActionCreators.receiveTopics(data.topics);

            }, function (err) {

                alert("There was an error while loading data from server. " +
                "Details are in the log. Please reload the page.");

                console.log(err);

            });
    },

    _promiseLoadJSONData: function (url) {
        return new Promise(function (resolve, reject) {
            $.getJSON(url, function (data) {
                resolve(data);
            }).fail(function (err) {
                reject(err);
            });
        });
    }
};