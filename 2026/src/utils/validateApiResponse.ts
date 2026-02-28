/**
 * API レスポンスのバリデーション
 * Googleフォームの制限に合わせた検証を行う
 */

interface Message {
  message: string;
  name: string;
  xid: string;
}

interface MessageResponse {
  data: Message[];
  total: number;
}

interface Illust {
  image: string;
  xid: string;
  name: string;
}

interface IllustResponse {
  data: Illust[];
  total?: number;
}

/**
 * Googleフォームの文字数制限
 */
const LIMITS = {
  MESSAGE_MAX: 400, // メッセージの最大文字数
  NAME_MAX: 40, // 名前の最大文字数
  XID_MAX: 16, // X ID の最大文字数（@含む）
};

/**
 * メッセージデータのバリデーション
 */
export function validateMessage(item: unknown): item is Message {
  if (typeof item !== "object" || item === null) return false;

  const obj = item as Record<string, unknown>;

  // 型チェック
  if (typeof obj.message !== "string") return false;
  if (typeof obj.name !== "string") return false;
  if (obj.xid !== undefined && typeof obj.xid !== "string") return false;

  // 長さチェック（Googleフォームの制限）
  if (obj.message.length > LIMITS.MESSAGE_MAX) return false;
  if (obj.name.length > LIMITS.NAME_MAX) return false;
  if (obj.xid && obj.xid.length > LIMITS.XID_MAX) return false;

  return true;
}

/**
 * メッセージAPIレスポンスのバリデーション
 */
export function validateMessageResponse(data: unknown): MessageResponse {
  if (typeof data !== "object" || data === null) {
    throw new Error("レスポンスの形式が不正です");
  }

  const obj = data as Record<string, unknown>;

  // data配列のチェック
  if (!Array.isArray(obj.data)) {
    throw new Error("データが配列ではありません");
  }

  // total のチェック
  if (typeof obj.total !== "number" || obj.total < 0) {
    throw new Error("総件数が不正です");
  }

  // 各メッセージをバリデーション（不正なものは除外）
  const validMessages = obj.data.filter(validateMessage);

  // 不正データがあった場合は警告
  if (validMessages.length !== obj.data.length) {
    console.warn(
      `不正なメッセージを ${obj.data.length - validMessages.length} 件除外しました`
    );
  }

  return {
    data: validMessages,
    total: obj.total,
  };
}

/**
 * イラストデータのバリデーション
 */
export function validateIllust(item: unknown): item is Illust {
  if (typeof item !== "object" || item === null) return false;

  const obj = item as Record<string, unknown>;

  // 型チェック
  if (typeof obj.image !== "string") return false;
  if (typeof obj.name !== "string") return false;
  if (obj.xid !== undefined && typeof obj.xid !== "string") return false;

  // 長さチェック
  if (obj.image.length === 0) return false; // 画像URLは必須
  if (obj.name.length > LIMITS.NAME_MAX) return false;
  if (obj.xid && obj.xid.length > LIMITS.XID_MAX) return false;

  return true;
}

/**
 * イラストAPIレスポンスのバリデーション
 */
export function validateIllustResponse(data: unknown): IllustResponse {
  if (typeof data !== "object" || data === null) {
    throw new Error("レスポンスの形式が不正です");
  }

  const obj = data as Record<string, unknown>;

  // data配列のチェック
  if (!Array.isArray(obj.data)) {
    throw new Error("データが配列ではありません");
  }

  // total のチェック（オプショナル）
  let total: number | undefined;
  if (obj.total !== undefined) {
    if (typeof obj.total !== "number" || obj.total < 0) {
      throw new Error("総件数が不正です");
    }
    total = obj.total;
  }

  // 各イラストをバリデーション（不正なものは除外）
  const validIllusts = obj.data.filter(validateIllust);

  // 不正データがあった場合は警告
  if (validIllusts.length !== obj.data.length) {
    console.warn(
      `不正なイラストを ${obj.data.length - validIllusts.length} 件除外しました`
    );
  }

  return {
    data: validIllusts,
    total,
  };
}
