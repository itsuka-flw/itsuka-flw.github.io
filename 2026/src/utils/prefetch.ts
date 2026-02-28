/**
 * データプリフェッチのヘルパー関数
 * 2段階プリフェッチ: 初期ロード時に最低限、その後バックグラウンドで残りを読み込み
 */

import type { Message } from "@/hooks/useMessages";
import type { Illust } from "@/hooks/useIllusts";
import { PAGINATION } from "@/constants/pagination";

const PREFETCH_TIMEOUT = 10000; // 10秒
const INITIAL_PAGES = 5; // ローディング中に読み込むページ数
const MESSAGE_LIMIT = PAGINATION.MESSAGES_LIMIT;
const ILLUST_LIMIT = PAGINATION.ILLUSTS_LIMIT;

// プリロードする画像
const PRELOAD_IMAGES = [
  '/images/header.png',
  '/images/title-logo.png',
];

export interface PrefetchResult {
  success: boolean;
  error?: Error;
}

/**
 * 画像をプリロード
 */
function preloadImages(): Promise<void[]> {
  return Promise.all(
    PRELOAD_IMAGES.map((src) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve(); // エラーでも続行
        img.src = src;
      });
    })
  );
}

// グローバルキャッシュ: ページング用に全データを保持
export const prefetchCache = {
  messages: [] as Message[],
  illusts: [] as Illust[],
  messagesTotal: 0,
  illustsTotal: 0,
  timestamp: 0,
};

/**
 * 初期プリフェッチ: ローディング画面中に最低限のデータを読み込み
 */
export async function prefetchInitialData(): Promise<PrefetchResult> {
  try {
    // 画像のプリロードを開始
    const imagePreload = preloadImages();

    // タイムアウト処理を追加
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), PREFETCH_TIMEOUT);

    // 初期ページ分のリクエストを並列実行
    const messageRequests = Array.from({ length: INITIAL_PAGES }, (_, i) =>
      fetch(`/api/messages?limit=${MESSAGE_LIMIT}&offset=${i * MESSAGE_LIMIT}`, {
        signal: controller.signal,
      })
        .then((res) => res.json())
        .catch((err) => {
          console.warn(`Messages initial page ${i + 1} prefetch failed:`, err);
          return null;
        })
    );

    const illustRequests = Array.from({ length: INITIAL_PAGES }, (_, i) =>
      fetch(`/api/illusts?limit=${ILLUST_LIMIT}&offset=${i * ILLUST_LIMIT}`, {
        signal: controller.signal,
      })
        .then((res) => res.json())
        .catch((err) => {
          console.warn(`Illusts initial page ${i + 1} prefetch failed:`, err);
          return null;
        })
    );

    // 全リクエストと画像プリロードを並列実行
    const results = await Promise.all([
      Promise.allSettled(messageRequests),
      Promise.allSettled(illustRequests),
      imagePreload,
    ]);
    const messageResults = results[0];
    const illustResults = results[1];

    clearTimeout(timeoutId);

    // メッセージデータを結合
    const allMessages: Message[] = [];
    let messagesTotal = 0;
    messageResults.forEach((result) => {
      if (result.status === 'fulfilled' && result.value?.success) {
        allMessages.push(...result.value.data);
        if (result.value.total) {
          messagesTotal = result.value.total;
        }
      }
    });

    // イラストデータを結合
    const allIllusts: Illust[] = [];
    let illustsTotal = 0;
    illustResults.forEach((result) => {
      if (result.status === 'fulfilled' && result.value?.success) {
        allIllusts.push(...result.value.data);
        if (result.value.total) {
          illustsTotal = result.value.total;
        }
      }
    });

    // グローバルキャッシュに保存
    prefetchCache.messages = allMessages;
    prefetchCache.illusts = allIllusts;
    prefetchCache.messagesTotal = messagesTotal;
    prefetchCache.illustsTotal = illustsTotal;
    prefetchCache.timestamp = Date.now();

    if (allMessages.length > 0 || allIllusts.length > 0) {
      return { success: true };
    } else {
      console.warn('All initial prefetch requests failed');
      return { success: false, error: new Error('すべてのリクエストが失敗しました') };
    }
  } catch (error) {
    console.error('Initial prefetch error:', error);
    return {
      success: false,
      error: error instanceof Error ? error : new Error('不明なエラーが発生しました'),
    };
  }
}

/**
 * バックグラウンドプリフェッチ: ローディング終了後に残りのデータを読み込み
 */
export async function prefetchBackgroundData(): Promise<PrefetchResult> {
  try {
    // totalから残りのページ数を計算
    const messageTotalPages = Math.ceil(prefetchCache.messagesTotal / MESSAGE_LIMIT);
    const illustTotalPages = Math.ceil(prefetchCache.illustsTotal / ILLUST_LIMIT);

    const messageRemainingPages = messageTotalPages - INITIAL_PAGES;
    const illustRemainingPages = illustTotalPages - INITIAL_PAGES;

    if (messageRemainingPages <= 0 && illustRemainingPages <= 0) {
      return { success: true };
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), PREFETCH_TIMEOUT);

    // 残りのページをバックグラウンドで読み込み
    const messageRequests =
      messageRemainingPages > 0
        ? Array.from({ length: messageRemainingPages }, (_, i) =>
            fetch(
              `/api/messages?limit=${MESSAGE_LIMIT}&offset=${(i + INITIAL_PAGES) * MESSAGE_LIMIT}`,
              { signal: controller.signal }
            )
              .then((res) => res.json())
              .catch((err) => {
                console.warn(
                  `Messages background page ${i + INITIAL_PAGES + 1} prefetch failed:`,
                  err
                );
                return null;
              })
          )
        : [];

    const illustRequests =
      illustRemainingPages > 0
        ? Array.from({ length: illustRemainingPages }, (_, i) =>
            fetch(
              `/api/illusts?limit=${ILLUST_LIMIT}&offset=${(i + INITIAL_PAGES) * ILLUST_LIMIT}`,
              { signal: controller.signal }
            )
              .then((res) => res.json())
              .catch((err) => {
                console.warn(
                  `Illusts background page ${i + INITIAL_PAGES + 1} prefetch failed:`,
                  err
                );
                return null;
              })
          )
        : [];

    const [messageResults, illustResults] = await Promise.all([
      Promise.allSettled(messageRequests),
      Promise.allSettled(illustRequests),
    ]);

    clearTimeout(timeoutId);

    // 既存のキャッシュに追加
    messageResults.forEach((result) => {
      if (result.status === 'fulfilled' && result.value?.success) {
        prefetchCache.messages.push(...result.value.data);
      }
    });

    illustResults.forEach((result) => {
      if (result.status === 'fulfilled' && result.value?.success) {
        prefetchCache.illusts.push(...result.value.data);
      }
    });

    return { success: true };
  } catch (error) {
    console.error('Background prefetch error:', error);
    return {
      success: false,
      error: error instanceof Error ? error : new Error('不明なエラーが発生しました'),
    };
  }
}

/**
 * 後方互換性のため: prefetchData は prefetchInitialData のエイリアス
 */
export const prefetchData = prefetchInitialData;
