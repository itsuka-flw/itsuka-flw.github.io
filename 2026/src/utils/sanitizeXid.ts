/**
 * X (Twitter) のユーザーIDをサニタイズする
 * - 先頭の @ を削除
 * - 英数字とアンダースコアのみを許可
 * - 15文字を超える場合は切り捨て（Xの仕様）
 *
 * @param xid ユーザーが入力したX ID
 * @returns サニタイズされたX ID（空の場合は空文字）
 */
export function sanitizeXid(xid: string): string {
  if (!xid) return "";

  // @を削除
  let cleaned = xid.replace(/^@+/, "");

  // 英数字とアンダースコアのみ許可
  cleaned = cleaned.replace(/[^a-zA-Z0-9_]/g, "");

  // 15文字制限（Xのユーザー名の最大長）
  cleaned = cleaned.substring(0, 15);

  return cleaned;
}

/**
 * サニタイズされたX IDからX.comのURLを生成
 *
 * @param xid X ID（@付きまたは@なし）
 * @returns X.comのURL（xidが空の場合は空文字）
 */
export function createXUrl(xid: string): string {
  const sanitized = sanitizeXid(xid);
  return sanitized ? `https://x.com/${sanitized}` : "";
}
