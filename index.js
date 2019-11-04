var http = require('http');
var Datastore = require('nedb');
//var db = new Datastore( { inMemoryOnly: true });

/*var db = new Datastore({ filename: 'users.json' })
db.loadDatabase(function(err) {
    // Start issuing commands after callback...
});*/

var users = new Datastore();

var people = [];

var scott = {
    name: 'Scott Robinson',
    age: 28,
    twitter: '@ScottWRobinson'
};

var elon = {
    name: 'Elon Musk',
    age: 44,
    twitter: '@elonmusk'
};

var jack = {
    name: 'Jack Dorsey',
    age: 39,
    twitter: '@jack'
};

people.push(scott, elon, jack);

users.insert(people, function(err, docs) {
    docs.forEach(function(d) {
        console.log('Saved user:', d.name);
    });
});

var ODataServer = require('simple-odata-server');
var Adapter = require('simple-odata-server-nedb');
 
var model = {
    namespace: "jsreport",
    entityTypes: {
        "UserType": {
            "_id": {"type": "Edm.String", key: true},
            "test": {"type": "Edm.String"},            
        }
    },   
    entitySets: {
        "users": {
            entityType: "jsreport.UserType"
        }
    }
};
 
var odataServer = ODataServer("http://localhost:1337")
    .model(model)
    .adapter(Adapter(function(es, cb) { cb(null, db)}));
 
 
http.createServer(odataServer.handle.bind(odataServer)).listen(process.env.PORT||3000);
console.log(process.env.PORT);