"use client";

import { useEffect, useState, useCallback } from "react";
import { prefetchCache } from "@/utils/prefetch";

interface FetchResult<T> {
  data: T[];
  loading: boolean;
  loadingMore: boolean;
  error: boolean;
  hasMore: boolean;
  loadMore: () => void;
}

interface CacheEntry<T> {
  data: T[];
  hasMore: boolean;
  timestamp: number;
}

// グローバルキャッシュ（セッション中保持）
const cache = new Map<string, CacheEntry<any>>();
const CACHE_DURATION = (parseInt(process.env.NEXT_PUBLIC_CACHE_DURATION || '600')) * 1000;

export function useFetch<T>(url: string, limit: number = 20): FetchResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  const fetchData = useCallback(
    async (currentOffset: number, append: boolean) => {
      // 初回読み込み時はプリフェッチキャッシュをチェック
      if (!append && currentOffset === 0 && url === "/api/illusts") {
        const isCacheValid =
          prefetchCache.illusts.length > 0 &&
          Date.now() - prefetchCache.timestamp < CACHE_DURATION;

        if (isCacheValid) {
          const hasMoreData = prefetchCache.illusts.length > limit;
          setData(prefetchCache.illusts.slice(0, limit) as T[]);
          setHasMore(hasMoreData);
          setLoading(false);
          return;
        }
      }

      // 2回目以降の読み込み時はプリフェッチキャッシュから取得
      if (append && currentOffset > 0 && url === "/api/illusts") {
        const isCacheValid =
          prefetchCache.illusts.length > 0 &&
          Date.now() - prefetchCache.timestamp < CACHE_DURATION;

        if (isCacheValid && currentOffset < prefetchCache.illusts.length) {
          setLoadingMore(true);
          const paginatedData = prefetchCache.illusts.slice(
            currentOffset,
            currentOffset + limit
          ) as T[];
          setData((prev) => [...prev, ...paginatedData]);
          setHasMore(currentOffset + limit < prefetchCache.illusts.length);
          setLoadingMore(false);
          return;
        }
      }

      // 通常のキャッシュをチェック（プリフェッチキャッシュがない場合）
      if (!append && currentOffset === 0) {
        const cacheKey = `${url}_${limit}`;
        const cached = cache.get(cacheKey);

        if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
          // キャッシュが有効な場合
          setData(cached.data);
          setHasMore(cached.hasMore);
          setLoading(false);
          return;
        }
      }

      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      try {
        const separator = url.includes("?") ? "&" : "?";
        const response = await fetch(
          `${url}${separator}limit=${limit}&offset=${currentOffset}`
        );
        const result = await response.json();

        if (result.success) {
          setData((prev) => (append ? [...prev, ...result.data] : result.data));
          setHasMore(result.hasMore ?? false);

          // 初回読み込み時のみキャッシュに保存
          if (!append && currentOffset === 0) {
            const cacheKey = `${url}_${limit}`;
            cache.set(cacheKey, {
              data: result.data,
              hasMore: result.hasMore ?? false,
              timestamp: Date.now(),
            });
          }
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(true);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [url, limit]
  );

  useEffect(() => {
    setData([]);
    setOffset(0);
    setHasMore(true);
    fetchData(0, false);
  }, [url, fetchData]);

  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;
    const newOffset = offset + limit;
    setOffset(newOffset);
    fetchData(newOffset, true);
  }, [offset, limit, loadingMore, hasMore, fetchData]);

  return { data, loading, loadingMore, error, hasMore, loadMore };
}
