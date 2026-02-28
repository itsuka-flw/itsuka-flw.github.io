"use client";

import { useEffect, useState } from "react";
import { useFontsLoaded } from "./useFontsLoaded";
import { prefetchData, prefetchBackgroundData } from "@/utils/prefetch";

// グローバル変数でランタイムキャッシュ
let hasVisitedGlobal = false;
const VISITED_KEY = "sakura_aoi_visited_2026";

/**
 * 初回アクセスかどうかをチェック
 */
function hasVisited(): boolean {
  // 開発用: 環境変数でローディング画面を強制表示
  if (process.env.NEXT_PUBLIC_FORCE_LOADING === "true") {
    return false; // 常に初回として扱う
  }

  // メモリキャッシュをチェック
  if (hasVisitedGlobal) {
    return true;
  }

  // sessionStorageをチェック
  if (typeof window !== "undefined") {
    try {
      const visited = sessionStorage.getItem(VISITED_KEY);
      if (visited) {
        hasVisitedGlobal = true;
        return true;
      }
    } catch (error) {
      // sessionStorageが使えない環境でもエラーにならないように
      console.warn("sessionStorage not available:", error);
    }
  }

  return false;
}

/**
 * 訪問済みとしてマーク
 */
export function markAsVisited(): void {
  // 強制表示モードの場合はマークしない（毎回表示するため）
  if (process.env.NEXT_PUBLIC_FORCE_LOADING === "true") {
    return;
  }

  hasVisitedGlobal = true;
  if (typeof window !== "undefined") {
    try {
      sessionStorage.setItem(VISITED_KEY, "true");
    } catch (error) {
      console.warn("sessionStorage not available:", error);
    }
  }
}

export interface InitialLoadState {
  showLoading: boolean;
  isReady: boolean;
}

/**
 * 初回ロード判定とデータプリフェッチを管理するフック
 */
export function useInitialLoad(): InitialLoadState {
  const [isFirstVisit, setIsFirstVisit] = useState<boolean | null>(null);
  // 初期値を計算: 初回アクセスの場合はtrueで開始
  const [showLoading, setShowLoading] = useState(() => {
    if (typeof window === "undefined") return false; // SSR時はfalse
    return !hasVisited(); // クライアントサイドでは初回判定
  });
  const [dataPrefetched, setDataPrefetched] = useState(false);
  const fontsLoaded = useFontsLoaded();

  useEffect(() => {
    Promise.resolve().then(() => {
      setIsFirstVisit(!hasVisited());
    });
  }, []);

  useEffect(() => {
    if (isFirstVisit === true) {
      Promise.resolve().then(() => {
        setShowLoading(true);
      });
      // 初期プリフェッチ（ローディング画面中）
      prefetchData()
        .then(() => {
          setDataPrefetched(true);
          // バックグラウンドプリフェッチ（ローディング終了後）
          setTimeout(() => {
            prefetchBackgroundData().catch((error) => {
              console.error("Background prefetch failed:", error);
            });
          }, 1000);
        })
        .catch((error) => {
          console.error("Prefetch failed:", error);
          setDataPrefetched(true);
        });
    } else if (isFirstVisit === false) {
      Promise.resolve().then(() => {
        setDataPrefetched(true);
      });
    }
  }, [isFirstVisit]);

  // showLoadingはアニメーション完了まで維持する
  // 非表示のタイミングはRootClientLayout側でアニメーション完了後に制御

  return {
    showLoading,
    isReady: dataPrefetched && fontsLoaded,
  };
}
