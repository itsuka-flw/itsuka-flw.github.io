"use client";

import { useEffect, useState } from "react";

// グローバルにフォント読み込み状態をキャッシュ
let fontsLoadedCache = false;
let fontsLoadingPromise: Promise<void> | null = null;

/**
 * カスタムフォントの読み込み状態を監視するフック
 * サイト全体で1回だけフォントを読み込む
 */
export function useFontsLoaded() {
  const [fontsLoaded, setFontsLoaded] = useState(fontsLoadedCache);

  useEffect(() => {
    // すでに読み込み済みの場合は即座に返す
    if (fontsLoadedCache) {
      setFontsLoaded(true);
      return;
    }

    if (typeof document === "undefined") {
      return;
    }

    // すでに読み込み中の場合は、そのPromiseを待つ
    if (fontsLoadingPromise) {
      fontsLoadingPromise.then(() => setFontsLoaded(true));
      return;
    }

    // タイムアウト設定（3秒後には必ず表示）
    const timeout = setTimeout(() => {
      console.log("Font loading timeout - showing content anyway");
      fontsLoadedCache = true;
      setFontsLoaded(true);
    }, 3000);

    // フォント読み込み処理
    fontsLoadingPromise = (async () => {
      try {
        if (!document.fonts) {
          // Font Loading APIが利用できない場合は即座に表示
          fontsLoadedCache = true;
          setFontsLoaded(true);
          clearTimeout(timeout);
          return;
        }

        // メッセージで使用する全てのフォントを明示的に読み込む
        await Promise.all([
          document.fonts.load("400 16px kiloji"),
          document.fonts.load("400 16px uzura"),
          document.fonts.load("400 16px Yomogi"),
        ]);

        // 少し待ってからレンダリング（フォントが確実に適用されるまで）
        await new Promise((resolve) => setTimeout(resolve, 100));

        console.log("Fonts loaded successfully");
        fontsLoadedCache = true;
        setFontsLoaded(true);
        clearTimeout(timeout);
      } catch (error) {
        console.warn("Font loading error:", error);
        fontsLoadedCache = true;
        setFontsLoaded(true);
        clearTimeout(timeout);
      }
    })();

    return () => clearTimeout(timeout);
  }, []);

  return fontsLoaded;
}
