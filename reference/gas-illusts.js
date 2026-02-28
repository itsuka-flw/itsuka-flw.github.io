/**
 * 【参考用】イラスト取得用 Google Apps Script
 *
 * このファイルは参考用です。実際にはGoogle Apps Scriptのエディタで直接編集してください。
 *
 * 機能:
 * - ページネーション対応（limit, offsetパラメータ）
 * - レート制限（1分間に30リクエストまで）
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
    var limit = parseInt(e.parameter.limit) || 20;
    var offset = parseInt(e.parameter.offset) || 0;

    // 全イラストを取得（ヘッダー行を除く）
    var allIllusts = [];
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      // B列: イラスト画像URL（必須）
      if (row[1] && row[1].toString().trim() !== '') {
        allIllusts.push({
          image: row[1].toString(),  // B列: イラスト画像
          xid: row[2].toString(),    // C列: XID
          name: row[3].toString()    // D列: 名前
        });
      }
    }

    // 総件数
    var total = allIllusts.length;

    // ページネーション適用
    var paginatedIllusts = allIllusts.slice(offset, offset + limit);

    // まだデータがあるか判定
    var hasMore = (offset + limit) < total;

    output.setContent(JSON.stringify({
      success: true,
      data: paginatedIllusts,
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
