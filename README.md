# 碧依さくら生誕祭 2026 - 非公式ファンサイト

碧依さくらさんのお誕生日をお祝いする非公式ファンサイトです。

---

# 開発者向け

## 必要なもの

- Node.js（v18以上）
- npm（Node.jsに付属）

### Node.jsのインストール

まだインストールしていない場合は、以下からダウンロードしてください。

https://nodejs.org/ja

「LTS」と書いてある方をダウンロードしてください。

---

## ローカルで動かす方法

### 1. 依存パッケージをインストール

ターミナル（Macの場合）またはコマンドプロンプト（Windowsの場合）を開き、このフォルダに移動して以下を実行：

```bash
npm install
```

### 2. 開発サーバーを起動

```bash
npm run dev
```

ブラウザで http://localhost:3000 を開くとサイトが表示されます。

※環境変数が未設定の場合、メッセージページにはダミーデータが表示されます。

### 3. 環境変数の設定（任意）

実際のデータを取得したい場合は、`.env.local` ファイルを作成：

```
GOOGLE_APPS_SCRIPT_MESSAGES_URL=https://script.google.com/macros/s/xxxxx/exec
GOOGLE_APPS_SCRIPT_ILLUSTS_URL=https://script.google.com/macros/s/xxxxx/exec
```

---

## ファイル構成

```
2026/
├── public/              # 画像・フォント
│   ├── images/
│   └── fonts/
├── src/
│   ├── app/             # ページ・API
│   │   ├── page.tsx            # トップページ
│   │   ├── message/page.tsx    # メッセージページ
│   │   ├── illust/page.tsx     # イラストページ
│   │   ├── thanks/page.tsx     # サンクスページ
│   │   └── api/                # APIエンドポイント
│   │       ├── messages/route.ts
│   │       └── illusts/route.ts
│   ├── components/      # 共通コンポーネント
│   ├── hooks/           # カスタムフック
│   ├── utils/           # ユーティリティ関数
│   └── data/            # ダミーデータ
├── .env.local           # 環境変数（Git管理外）
└── package.json
```

---

## カスタマイズ

### 画像を変更する

`public/images/` 内の画像を差し替えてください。

### 色やデザインを変更する

`src/app/globals.css` を編集してください。
色は `:root` 内で指定してください。

---

# プロジェクト初期設定

## Vercelにデプロイする方法（無料）

### 1. GitHubにリポジトリをプッシュ

まだの場合は、GitHubにリポジトリを作成してプッシュしてください。

### 2. Vercelにサインアップ

https://vercel.com にアクセスし、GitHubアカウントでサインアップします。

### 3. プロジェクトをインポート

1. Vercelのダッシュボードで「Add New...」→「Project」をクリック
2. GitHubリポジトリを選択
3. 「Root Directory」に `2026` を入力（リポジトリのルートにある場合）
4. 「Environment Variables」をクリックし、以下を追加：
   - Name: `GOOGLE_APPS_SCRIPT_MESSAGES_URL`
   - Value: メッセージ用Google Apps ScriptのデプロイURL
   - Name: `GOOGLE_APPS_SCRIPT_ILLUSTS_URL`
   - Value: イラスト用Google Apps ScriptのデプロイURL
5. 「Deploy」をクリック

数分でデプロイが完了し、URLが発行されます。

---

## Google Formsとの連携（イラスト機能）

### 1. Googleフォームを作成

以下の質問を作成してください：
- イラスト画像（ファイルのアップロード）
- X ID（記述式）
- 名前（記述式）

### 2. 回答をスプレッドシートに保存

フォームの「回答」タブ → スプレッドシートアイコンをクリック

### 3. Google Apps Scriptを設定

スプレッドシートを開き、「拡張機能」→「Apps Script」で以下のコードを貼り付け：

```javascript
function doGet(e) {
  var output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);

  try {
    var ss = SpreadsheetApp.openById('ここにスプレッドシートIDを貼る');
    var sheet = ss.getSheets()[0];
    var data = sheet.getDataRange().getValues();

    var illusts = [];
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      if (row[1] && row[1].toString().trim() !== '') {
        illusts.push({
          src: row[1].toString(),  // B列: イラスト画像
          id: row[2].toString(),   // C列: X ID
          name: row[3].toString()  // D列: 名前
        });
      }
    }

    output.setContent(JSON.stringify({ success: true, data: illusts }));
  } catch (error) {
    output.setContent(JSON.stringify({ success: false, error: error.message }));
  }

  return output;
}
```

**スプレッドシートIDの確認方法：**
スプレッドシートのURLの `https://docs.google.com/spreadsheets/d/【ここがID】/edit` の部分をコピーしてください。

### 4. デプロイ

1. 右上の「デプロイ」→「新しいデプロイ」
2. 歯車アイコン → 「ウェブアプリ」を選択
3. 「アクセスできるユーザー」を「全員」に変更
4. 「デプロイ」をクリック
5. 表示されたURLをコピー

### 5. 環境変数を設定

`.env.local` ファイルを作成し、コピーしたURLを設定：

```
GOOGLE_APPS_SCRIPT_ILLUSTS_URL=https://script.google.com/macros/s/xxxxx/exec
```

### 6. 画像の共有設定

Google Driveで、フォームの回答フォルダを「リンクを知っている全員」に共有してください。

---

## トラブルシューティング

### 「npm: command not found」と出る

Node.jsがインストールされていません。上記のリンクからインストールしてください。

### ポート3000が使用中と出る

```bash
lsof -ti :3000 | xargs kill -9
```

を実行してから再度 `npm run dev` を試してください。

### 画像が表示されない

Google Driveの共有設定を「リンクを知っている全員」に変更してください。
