# jojoss-html-gasya

- GitHubでissueを切る
- 実装する
- issueを実装できたら以下のコマンドでtagを付ける(いずれバージョンごとの動作を確認できるUIにする)
    - `npm version patch`

## localテスト環境構築手順（スマホからもつなげる）
1. スマホとPCを同一WiFiでつなげる
1. wslのローカルIP確認
    - wsl$ ifconfig
        ```
        eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
            inet 172.xx.xx.xx <-これ ....
        ```
1. winのローカルIP確認
    - cmd$ ipconfig
        ```
        Wireless LAN adapter Wi-Fi:
        ....中略....
        IPv4 アドレス . . . . . . . . . . . .: 192.168.0.xx<-これ
        ........
        ```
1. windows側でport-forward  
    - cmd(管理者権限)$ netsh.exe interface portproxy add v4tov4 listenaddress=<winのIP> listenport=8080 connectaddress=<wslのIP> connectport=8080  
    ※8080だけでlambda側も接続できた(9000いらなかった)
1. スマホから<winのIP>:8080で接続！
- port-forwardの確認  
    $ netsh.exe interface portproxy show v4tov4
- port-forwardの削除  
    $ netsh.exe interface portproxy delete v4tov4 listenport=8080 listenaddress=<winのIP>

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
