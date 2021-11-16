const Promise = require("bluebird")
const Redis = require("async-redis")
const redis = Redis.createClient({
    host: "127.0.0.1",
    port: 6379 
})

const floodDatabase = async () => {
    redis.del('user')
    for ( let i = 0; i < 8000; i++ ){
        const userName = 'user' + (Math.floor(Math.random() * 16000) + 1).toString()
        const alreadyMember = await redis.sismember('user', userName)
        if(alreadyMember == 1) --i;
        else{
            await redis.sadd('user', userName)
        }
    }
}

redis.on('connect', 
    function() {
        console.log("[Redis server connected]")
        floodDatabase().then(() => {
            console.log("database created")
        }).catch((err) => {console.log(err)})
    }
)
