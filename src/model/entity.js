import Stream from 'mithril-stream';

export default function(data, endpoint) {
    let streams = {}
    let _data = {}

    for (let propertyName in data) {
        streams[propertyName] = Stream(data[propertyName])
        Object.defineProperty(
            _data,
            propertyName,
            {
                set: streams[propertyName],
                get: streams[propertyName]
            }
        )
    }

    return {
        all: endpoint.all,
        custom: endpoint.custom,
        delete: endpoint.delete,
        data() {
            return _data
        },
        values () {
            let d = {}
            for (let propertyName in streams) {
                d[propertyName] = streams[propertyName]()
            }
            return d
        },
        id() {
            return _data[endpoint.identifier()];
        },
        one: endpoint.one,
        save(...args) {
            return endpoint.put(this.values(), ...args);
        },
        url: endpoint.url,
        stream: streams,
        prop(propertyName) {
            if (typeof streams[propertyName] === "undefined") {
                streams[propertyName] = Stream()
            }
            return streams[propertyName]
        }
    };
}
