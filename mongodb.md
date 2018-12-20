# Installation and Maintenance

## Windows

Start and Stop MongoDB Service

```bash
net start MongoDB
# OR
mongod --dbpath="C:\Program Files\MongoDB\Server\4.0\data"
# Flags
--port="27018"
--dbpath "/var/lib/mongodb" #specify database path

net stop MongoDB
```

## Database commands

```js
db.users.findOneAndUpdate({email: '4@4.com'},{"$set":{lockAccountCounter:3}})
db.users.find({email:'4@4.com'})
db.users.deleteMany({email:'4@4.com'})
use database-name
```

## Backups
### Create database backup
While Mongodb is running
```bash
mongodump

# Flags
--host mongodb.example.net
--port 27017
--out /data/backup #output directory
--collection myCollection --db test #backup specific database collection
--username user --password "pass" #used when backingup an external database
```

### Restoring a backup
While Mongodb is running
```bash
mongorestore --port <port number> <path to the backup>
```

## Delpoying Mongodb to MLab
* Create new MongoDB Deployments
* Create new user
* Connect using a driver via the standard MongoDB URI:
```
mongodb://<dbuser>:<dbpassword>@ds247690.mlab.com:47690/test-prod
```

Build database.js config file for app:
```js
if (process.env.NODE_ENV === 'production') {
module.exports = {mongoURI: 'mongodb://<dbuser>:<dbpassword>@ds247690.mlab.com:47690/test-prod'}
} else {
module.exports = {mongoURI: 'mongodb://localhost/temp'}
}
```

app.js file:
```js
// Import DB Config
const db = require('./config/database')

// Connect to Mongoose
mongoose.connect(db.mongoURI, {
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));
```

# Resources

- https://codeburst.io/things-i-wish-i-new-before-i-started-working-with-mongodb-c089d4b593db

```js
db.userdata
  .aggregate([
    { $match: { "user._id": 12345 } },
    {
      $project: {
        data: {
          $filter: { input: "$data", cond: { $eq: ["$$this.week", "46"] } }
        },
        _id: 0,
        stats: 1
      }
    }
  ])
  .toArray();

db.userdata.findOne({ "user._id": 12347 }, { "data.w46y2018": 1 });
```
