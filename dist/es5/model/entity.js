'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mithrilStream = require('mithril-stream');

var _mithrilStream2 = _interopRequireDefault(_mithrilStream);

exports['default'] = function (data, endpoint) {
    var streams = {};
    var _data = {};

    for (var propertyName in data) {
        streams[propertyName] = (0, _mithrilStream2['default'])(data[propertyName]);
        Object.defineProperty(_data, propertyName, {
            set: streams[propertyName],
            get: streams[propertyName]
        });
    }

    return {
        all: endpoint.all,
        custom: endpoint.custom,
        'delete': endpoint['delete'],
        data: function data() {
            return _data;
        },
        values: function values() {
            var d = {};
            for (var propertyName in data) {
                d[propertyName] = streams[propertyName]();
            }
            return d;
        },
        id: function id() {
            return _data[endpoint.identifier()];
        },
        one: endpoint.one,
        save: function save() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return endpoint.put.apply(endpoint, [this.values()].concat(args));
        },
        url: endpoint.url,
        stream: streams
    };
};

module.exports = exports['default'];