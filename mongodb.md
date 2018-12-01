# Installation and Maintenance

## Windows

Start MongoDB Serice

```bash
net start MongoDB
# OR
mongod --dbpath="C:\Program Files\MongoDB\Server\4.0\data"
# Flags
--port="27018"
```

Stop MongoDB Serice

```
net stop MongoDB
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
