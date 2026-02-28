"use client";

import { useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { convertDriveUrl } from "@/utils/driveUrl";
import { createXUrl } from "@/utils/sanitizeXid";
import { validateIllust } from "@/utils/validateApiResponse";
import { PAGINATION } from "@/constants/pagination";

export interface Illust {
  image: string;
  xid: string;
  name: string;
}

export interface IllustViewItem {
  src: string;
  name: string;
  xLink: string;
}

export function useIllusts() {
  const { data: illusts, loading, loadingMore, error, hasMore, loadMore } =
    useFetch<Illust>("/api/illusts", PAGINATION.ILLUSTS_LIMIT);
  const [selectedImage, setSelectedImage] = useState<IllustViewItem | null>(
    null
  );

  // 不正なデータを除外してからマッピング
  const viewIllusts: IllustViewItem[] = illusts
    .filter(validateIllust)
    .map((item) => ({
      src: convertDriveUrl(item.image),
      name: item.name,
      xLink: createXUrl(item.xid),
    }));

  return {
    illusts: viewIllusts,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
    selectedImage,
    setSelectedImage,
  };
}
