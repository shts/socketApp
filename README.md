# socketApp

https://qiita.com/n0bisuke/items/c248af316ca3f27daf92

socket.io-redis と ioredis の pub/sub のサンプル

# How

redis server を起動
```
$ redis-server
```


a のプロセスをポート3001番で起動

```
$ node server.js 3001
```

b のプロセスをポート3001番で起動

```
$ node server.js 3002
```

console から redis の publish を実行

```
$ redis-cli publish "Test Channel" "publish テスト"
```
