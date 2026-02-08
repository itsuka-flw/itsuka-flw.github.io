"use client";

import { useMessages } from "@/hooks/useMessages";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import PageTopLink from "@/components/PageTopLink";

export default function MessagePage() {
  const { messages, loading, loadingMore, error, hasMore, loadMore } =
    useMessages();
  const sentinelRef = useInfiniteScroll(loadMore, hasMore, loadingMore);

  return (
    <>
      <h2>花びらからメッセージ🌸</h2>
      <div className="message">
        <ul className="message-list">
          {loading ? (
            <li className="loading">読み込み中...</li>
          ) : error ? (
            <li className="error">読み込みに失敗しました</li>
          ) : messages.length === 0 ? (
            <li className="no-message">まだメッセージがありません</li>
          ) : (
            <>
              {messages.map((item, index) => (
                <li key={index} className={item.fontClass}>
                  <p
                    className="message-text"
                    dangerouslySetInnerHTML={{ __html: item.message }}
                  />
                  <p className="message-sign">from {item.name}</p>
                </li>
              ))}
              {loadingMore && <li className="loading">読み込み中...</li>}
              {hasMore && <div ref={sentinelRef} />}
            </>
          )}
        </ul>
        <PageTopLink />
      </div>
    </>
  );
}
