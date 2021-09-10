# Task Manager

Task Manager is a REST API I created during Node.js course by [Andrew Mead](https://github.com/andrewjmead). You can address to users and tasks resourses to play with GET, POST, DELETE and PATCH requests.

## Getting Started

Download this repository on your machine and the soft listed below and run. 

Also, you would need a config directory with **dev.env** and **test.env** files. Inside of them set the PORT, SENDGRID_API_KEY, MONGODB_URL and JWT_SECRET.

All the endpoints for task resourses are described in [task.js](src/routers/task.js) and for user resourses in [user.js](src/routers/user.js).

### Prerequisites

Nice to have on your machine the next software:
- [MongoDB](https://www.mongodb.com/) NoSQL Database
- [Robo 3T](https://robomongo.org/) GUI for MongoDB
- [Postman](https://www.postman.com/) application for API testing 

## Running the tests

Run the command `npm tun test`