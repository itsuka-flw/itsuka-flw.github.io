"use client";

import { useState, useEffect } from "react";
import { escapeHtml } from "@/utils/escapeHtml";
import { createXUrl } from "@/utils/sanitizeXid";
import { validateMessageResponse } from "@/utils/validateApiResponse";
import { PAGINATION } from "@/constants/pagination";
import { prefetchCache } from "@/utils/prefetch";

export interface Message {
  message: string;
  name: string;
  xid: string;
}

export interface MessageViewItem {
  message: string;
  name: string;
  xLink: string;
  fontClass: string;
}

const FONT_CLASSES = ["font-uzura", "font-yomogi", "font-kiloji"];

function getRandomFont(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return FONT_CLASSES[Math.abs(hash) % FONT_CLASSES.length];
}

const CACHE_DURATION = (parseInt(process.env.NEXT_PUBLIC_CACHE_DURATION || '600')) * 1000;

export function useMessages(page: number = 1) {
  const [messages, setMessages] = useState<MessageViewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      setError(false);

      try {
        const offset = (page - 1) * PAGINATION.MESSAGES_LIMIT;

        // キャッシュをチェック（ローディング画面でプリフェッチされたデータ）
        const isCacheValid =
          prefetchCache.messages.length > 0 &&
          Date.now() - prefetchCache.timestamp < CACHE_DURATION;

        // リクエストされたページがキャッシュ内に存在するかチェック
        const isPageInCache = offset < prefetchCache.messages.length;

        if (isCacheValid && isPageInCache) {
          // キャッシュからページング
          const paginatedMessages = prefetchCache.messages.slice(
            offset,
            offset + PAGINATION.MESSAGES_LIMIT
          );

          const viewMessages: MessageViewItem[] = paginatedMessages.map((item) => ({
            message: escapeHtml(item.message).replace(/\n/g, "<br>"),
            name: escapeHtml(item.name) || "花びら",
            xLink: createXUrl(item.xid),
            fontClass: getRandomFont(item.message + item.name),
          }));

          setMessages(viewMessages);
          setTotal(prefetchCache.messagesTotal);
          setLoading(false);
          return;
        }

        // キャッシュがない場合はAPIから取得
        const response = await fetch(
          `/api/messages?limit=${PAGINATION.MESSAGES_LIMIT}&offset=${offset}`
        );

        if (!response.ok) {
          throw new Error("ネットワークエラーが発生しました");
        }

        const result = await response.json();

        // success: false の場合はエラーとして扱う
        if (!result.success) {
          // 詳細はコンソールのみ、ユーザーには汎用メッセージ
          console.warn("API error:", result.error);
          throw new Error("データの取得に失敗しました");
        }

        // APIレスポンスをバリデーション（不正なデータは自動除外）
        const validatedResult = validateMessageResponse(result);
        const rawMessages = validatedResult.data;

        const viewMessages: MessageViewItem[] = rawMessages.map((item) => ({
          message: escapeHtml(item.message).replace(/\n/g, "<br>"),
          name: escapeHtml(item.name) || "花びら",
          xLink: createXUrl(item.xid),
          fontClass: getRandomFont(item.message + item.name),
        }));

        setMessages(viewMessages);
        setTotal(validatedResult.total);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(true);
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [page]);

  return { messages, loading, error, total };
}
