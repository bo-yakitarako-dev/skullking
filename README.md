# SkullKingのゲームを作るぞぉ！
作れたらいいね。

## 環境構築
Macでの環境構築方法だよ

### 1. このリポジトリをcloneする
Gitが無い場合は[こことか](https://tracpath.com/bootcamp/git-install-to-mac.html)参考に入れといてくなんせ

Gitの設定確認しておく
```shell
$ git config --list --global
```
ここで`user.name`と`user.email`が無いとアレなので追加しときましょ。あったら多分大丈夫

```shell
$ git config --global user.name [GitHubのユーザー名]
$ git config --global user.email [GitHubのユーザー名]@users.noreply.github.com
```

Gitの設定再確認して`user.name`と`user.email`が追加されてたらOK
```shell
$ git config --list --global
```

したら好きなフォルダでこのリポジトリをcloneしようね
```shell
$ git clone https://github.com/bo-yakitarako-dev/skullking.git
```

OK
したら`skullking`フォルダーをVS Codeで開いておきまひょ
VS Code開いたら<br>
`ファイル > 開く`からのフォルダ選択でOK

今後はこのフォルダで作業するぞい！

### 2. Node.js入れる
Node.jsのバージョンを簡単に変えられるnvmってやつ入れて、そっからNode.jsをインストールするぞい。

VS Codeでターミナル開いて

```shell
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
$ source ~/.zshrc
$ nvm install v14.18.1
$ node --version # v14.18.1って出ればおk
```

### 3. パッケージインストールする
必要なやつ入れていくぜ

```shell
$ npm install --global yarn
$ yarn install
```

これで完璧だ...

### 4. 開発サーバー立てる
Docker環境を構築するので、[Docker Desktop for Mac](https://hub.docker.com/editions/community/docker-ce-desktop-mac/)をダウンロードして実行しておきましょ

できたら以下のコマンド打ってしばし松
```shell
$ yarn docker
$ yarn docker-stop # これはDocker終了用コマンド
```

なんか色々終わると`root@*:/usr/app#`的なのがコマンドラインに出てくるので、そしたらDocker構築は完了でつ

あとはそのまま
```shell
$ yarn dev
```

で開発用サーバーが立つので https://skullking/ にアクセスしてみましょう。なんも出てきません。は？

### 5. hostsファイルを編集する
当然`skullking`なんてドメイン無いので、ローカルで名前解決してやる必要があります。

**別のターミナル開いて**、以下のコマンドで`/etc/hosts`にドメイン情報を追記しましょう

```shell
$ echo '\n# SkullKing Web\n127.0.0.1 skullking' >> /etc/hosts
```

これで名前解決できたので https://skullking/ にアクセスしてHello, Skullkingって言おう！警告出ます。は？

### 6. オレオレ認証局を信頼する
このプロジェクト独自にSSL証明書作ってhttps化してんだけど、デフォルトだと認証局が登録されてなくてhttpsに行けないので認証局を登録しやす

```shell
$ yarn open-ca
```

キーチェーンアクセスが開いて`skullking-ca`がどっかに追加されます。
`skullking-ca`をダブルクリックで開いて、`信頼`のタブを開いた後に`この証明書を使用するとき`で`常に信頼`を選んでおきます。

これで全ての準備が完了！
https://skullking/ にアクセスしてみよう！
Hello, SkullKing!!!

## テスト
**サーバーサイドでなんか作ったら必ずテストで確認しとこうね**

`server/tests`以下がテストファイルをしまっておくところ。

テスト実行するときは

```shell
$ yarn test
$ yarn test server/tests/testModule.test.ts # モジュール指定版
```

テストの書き方は以下のとことか参考になるかも
- https://qiita.com/okazuki/items/991a068892e946531612
- https://zenn.dev/296u/articles/7175641f1c4492
