"use client";

import { useIllusts } from "@/hooks/useIllusts";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import PageTopLink from "@/components/PageTopLink";

export default function IllustPage() {
  const {
    illusts,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
    selectedImage,
    setSelectedImage,
  } = useIllusts();
  const sentinelRef = useInfiniteScroll(loadMore, hasMore, loadingMore);

  return (
    <>
      <h2>お祝いフォト🌸</h2>
      <div className="illust">
        <ul className="illust-list">
          {loading ? (
            <li className="loading">読み込み中...</li>
          ) : error ? (
            <li className="error">読み込みに失敗しました。時間をおいて再度お試しください。</li>
          ) : illusts.length === 0 ? (
            <li className="no-illust">まだフォトがありません</li>
          ) : (
            <>
              {illusts.map((illust, index) => (
                <li
                  key={index}
                  className="illust-card"
                  onClick={() => setSelectedImage(illust)}
                >
                  <img
                    src={illust.src}
                    alt={`生誕祭イラスト（by ${illust.name}）`}
                    className="illust-thumb"
                    loading="lazy"
                  />
                  <p className="illust-caption">
                    Photo by{" "}
                    {illust.xLink ? (
                      <a href={illust.xLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>{illust.name}</a>
                    ) : illust.name}
                  </p>
                </li>
              ))}
              {loadingMore && <li className="loading">読み込み中...</li>}
              {hasMore && <div ref={sentinelRef} />}
            </>
          )}
        </ul>
        <PageTopLink />
      </div>

      {selectedImage && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedImage(null)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            <img
              src={selectedImage.src}
              alt={`生誕祭イラスト（by ${selectedImage.name}）`}
              className="modal-image"
            />
            <p className="modal-caption">
              Photo by{" "}
              {selectedImage.xLink ? (
                <a href={selectedImage.xLink} target="_blank" rel="noopener noreferrer">{selectedImage.name}</a>
              ) : selectedImage.name}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
