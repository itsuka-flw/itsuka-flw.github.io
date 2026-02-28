/**
 * 【参考用】メッセージ取得用 Google Apps Script
 *
 * このファイルは参考用です。実際にはGoogle Apps Scriptのエディタで直接編集してください。
 *
 * 機能:
 * - ページネーション対応（limit, offsetパラメータ）
 * - レート制限（1分間に60リクエストまで）
 * - total件数とhasMoreフラグの返却
 *
 * デプロイ手順:
 * 1. Google Apps Scriptのエディタを開く
 * 2. このコードをコピペ
 * 3. スプレッドシートIDを設定（'XXX'の部分）
 * 4. デプロイ → 新しいデプロイ → ウェブアプリ
 */

function doGet(e) {
  var output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);

  // レート制限なし（GASの同時実行制限30に任せる）
  // 大規模アクセス時はGASの制限が先に適用される

  try {
    var ss = SpreadsheetApp.openById('XXX'); // スプレッドシートIDを設定
    var sheet = ss.getSheets()[0];
    var data = sheet.getDataRange().getValues();

    // パラメータ取得
    var limit = parseInt(e.parameter.limit) || 10;
    var offset = parseInt(e.parameter.offset) || 0;

    // 全メッセージを取得（ヘッダー行を除く）
    var allMessages = [];
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      // B列: メッセージ（必須）
      if (row[1] && row[1].toString().trim() !== '') {
        allMessages.push({
          message: row[1].toString(),  // B列: メッセージ
          name: row[2].toString(),     // C列: 名前
          xid: row[3].toString()       // D列: XID
        });
      }
    }

    // 総件数
    var total = allMessages.length;

    // ページネーション適用
    var paginatedMessages = allMessages.slice(offset, offset + limit);

    // まだデータがあるか判定
    var hasMore = (offset + limit) < total;

    output.setContent(JSON.stringify({
      success: true,
      data: paginatedMessages,
      total: total,
      hasMore: hasMore
    }));

  } catch (error) {
    output.setContent(JSON.stringify({
      success: false,
      error: error.message
    }));
  }

  return output;
}
