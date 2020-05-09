---
title : GCPスタートアップ
date  : "2020-05-09"
tags  : [tech, gcp]
--- 

趣味用途でならVPSをレンタルするよりもGCPのVMの方が費用が掛からないようだったので
実際に立ててみた時の備忘録です。

---

## VMインスタンス作成する

### アカウントを以下より登録する

https://cloud.google.com/

* 無料トライアルを使用
* Google Account/ Credit Cardが必要

### プロジェクトを作成

デフォルトで作成されていたので、それを利用する。

### VMインスタンスを作成

1. ログイン後の画面左のメニューより「Compute Engine」から「VM インスタンスを作成」を選択
2. 表示される画面から「作成」を選択（少し時間がかかる）
3. 以下の項目を編集する
    * 名前
    * リージョン(オレゴン、アイオワあたりを選択)
    * マシン(f1-microを選択)
    * ディスク(標準永続ディスクで30GBに変更)
    * OS(Debianを選択)

## Google Cloud SDK でインスタンスにSSH接続する

### 作業環境

* OS: ArchLinux(64bit)

### Google Cloud SDK をインストールする

参考リンク
https://cloud.google.com/sdk/docs?hl=ja

今回の手順は以下の流れで実施。

1. パッケージをダウンロード/展開
```
wget https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-280.0.0-linux-x86_64.tar.gz
tar zxf google-cloud-sdk-280.0.0-linux-x86_64.tar.gz
```

2. インストール
```
./google-cloud-sdk/install.sh
```

3. 初期化
```
./google-cloud-sdk/bin/gcloud init
```

### gcloud コマンドでSSH接続

gcloudコマンドで接続するためのコマンドはVMインスタンスの管理画面から「接続」-「gcloudコマンドを表示」から確認できる

## インスタンス内の接続設定をする

gcloud ssh コマンドで接続している状態で実施する。

### sshのポートを変更する

1. sshdのポートを変更する
```
sudo cp -p /etc/ssh/sshd_config /etc/ssh/sshd_config.org
sudo vi /etc/ssh/sshd_config #portを変更
sudo systemctl restart sshd
```
2. Firewall(GCP側の設定)を変更後のSSHポートに合わせる
以下のファイアウォール設定をWebで変更する

    * default-allow-ssh

3. gcloud ssh コマンドの接続ポート指定を行う
これまでに実行しているgcloud sshコマンドに以下のオプションを追加する
```
--ssh-flag="-p ポート"

```

