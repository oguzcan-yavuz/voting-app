# voting-app
Freecodecamp Dynamic Web Application Project: Build a Voting App

[Freecodecamp Link](https://www.freecodecamp.org/challenges/build-a-voting-app)

[Heroku Link]()

### Notes:

- While using [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch), don't forget to include `Content-Type` to the headers if you are using `POST` method.
- If you want to update a model and return the updated model with mongoose, use [findOneAndUpdate()](http://mongoosejs.com/docs/api.html#findoneandupdate_findOneAndUpdate) function and `{ new: true }` option.
- Use [array filters](http://thecodebarbarian.com/a-nodejs-perspective-on-mongodb-36-array-filters.html) for updating specific fields in array elements in a model in MongoDB.