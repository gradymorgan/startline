//! app.js
//! 
//! version : 0.1
//! homegrownmarine.com

var _ = require('lodash');
var moment = require('moment');

exports.load = function(server, boatData, settings) {
    var timings = {
        sequence: 5, //minutes
        distance: 30;
    };

    var start = {

    };

    function setStart(time) {
        start.time = time;
    }

    function timeToStart() {
        return start.time.diff( moment() ) / 60000;
    }

    function bow() {
        var location = _.pick(boatData.now(), ['lat', 'lon', 'hdg']);
        return pointFromPoint(lat, lon, hdg);
    }


    function pointFromPoint(lat, lon, hdg) {

    }

    function closestPoint(start, end, me) {

    }

    function distanceTo() {

    }

    function vmgTo() {

    }

    var msgTimer = null;
    function startTimer() {
        if (msgTimer) 
            cancelInterval(msgTimer);

        //@1Hz
        msgTimer = setInterval(function() {
            var data = {
                timeLeft: timeToStart(),
                distance: distanceTo(),
                timeTo: distanceTo()/vmgTo()
            };

            broadCast(data);

        }, 1000);
    }

    server.use('/startline', express.static(path.join(__dirname, 'www')));

    server.post('/startline/time/set', function(req, res) {
        setStart( moment().add(timings.sequence, 'minutes') );
    });

    server.post('/startline/time/stop', function(req, res) {
        delete start.time;
    });

    server.post('/startline/time/sync', function(req, res) {
        var min = Math.floor(timeToStart());
        setStart( moment().add(min, 'minutes') );
    });

    server.post('/startline/ping', function(req, res) {
        var pin = req.body.pin;
        var location = bow();

        var end = pin?'pin':'boat';
        start[end] = location;
    });

    return {url:'/startline/', title:'StartLine', priority: 1};
};
