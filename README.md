# ServerClientTestNodeJSRedis

## How to run
* Start a redis server. (Head over [here](https://redis.io/topics/quickstart) if you are new in redis)
* Run ```npm i socket.io redis socket.io-client bluebird async-redis```
* Run ```npm run database``` 
* Run ```npm run server```
* Run ```npm run loadtester```
#

## Overview

* **server.js:**&nbsp;&nbsp;&nbsp;&nbsp;It creates a server on port 3000 and gets connected to the running redis-server. Upon a new connection it receives a user-name. Then check if that user-name exists in the 'user' set on running redis-server. If yes it sends "hellos ${user-name}", else it sends "Oops..." to the connected client. **It prints number of connected clients every second**.
* **client.js:**&nbsp;&nbsp;&nbsp;&nbsp;This is simple client code. It creates a client that connects to the server on "localhost:3000". Upon successful connection it sends a user-name to the server. 
* **createDatabase.js:**&nbsp;&nbsp;&nbsp;&nbsp;Firstly it deletes any set named 'user' on the running redis-server. Then it floods a new 'user' set with 8000 random user-name in 'user{$user-no}' format (where user-no is a random number in range 1 to 16000).
* **loadTester.js:**&nbsp;&nbsp;&nbsp;&nbsp;It creates 8000 clients in a loop, counts new clients on connect and prints number of connected clients (to the server) every second.
