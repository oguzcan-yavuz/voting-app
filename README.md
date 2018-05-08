# voting-app
Freecodecamp Dynamic Web Application Project: Build a Voting App

[Freecodecamp Link](https://www.freecodecamp.org/challenges/build-a-voting-app)

[Heroku Link](https://polar-meadow-19866.herokuapp.com/)

### My Notes:

- While using [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch), don't forget to include `Content-Type` to the headers if you are using `POST` method.
- If you want to update a model and return the updated model with mongoose, use [findOneAndUpdate()](http://mongoosejs.com/docs/api.html#findoneandupdate_findOneAndUpdate) function and `{ new: true }` option.
- Use [array filters](http://thecodebarbarian.com/a-nodejs-perspective-on-mongodb-36-array-filters.html) for updating specific fields in array elements in a model in MongoDB.
- Don't forget to include `credentials` while using Fetch API if you need to pass user info.
- Use React more efficiently next time.
- I didn't pay much attention to the front-end of this project, just tried to complete user stories.
- If something went wrong after deploying, check the versions of the dependencies.