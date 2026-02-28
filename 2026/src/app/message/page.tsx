"use client";

import { useState, useMemo } from "react";
import { useMessages } from "@/hooks/useMessages";
import { useFontsLoaded } from "@/hooks/useFontsLoaded";
import { PAGINATION } from "@/constants/pagination";
import PageTopLink from "@/components/PageTopLink";
import Pagination from "@/components/Pagination";

export default function MessagePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const fontsLoaded = useFontsLoaded();

  const { messages, loading, error, total } = useMessages(currentPage);

  const totalPages = useMemo(() => {
    return total !== undefined ? Math.ceil(total / PAGINATION.MESSAGES_LIMIT) : 1;
  }, [total]);

  // データとフォントの両方が読み込まれているかチェック
  const showLoading = loading || !fontsLoaded;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const messageSection = document.getElementById("message-section");
    if (messageSection) {
      messageSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <h2 id="message-section">花びらからメッセージ🌸</h2>
      <div className="message">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        <ul className="message-list">
          {showLoading ? (
            <li className="loading">読み込み中...</li>
          ) : error ? (
            <li className="error">読み込みに失敗しました。時間をおいて再度お試しください。</li>
          ) : messages.length === 0 ? (
            <li className="no-message">まだメッセージがありません</li>
          ) : (
            messages.map((item, index) => (
              <li key={index} className={item.fontClass}>
                <p
                  className="message-text"
                  dangerouslySetInnerHTML={{ __html: item.message }}
                />
                <p className="message-sign">
                  from {item.xLink ? (
                    <a href={item.xLink} target="_blank" rel="noopener noreferrer">
                      {item.name}
                    </a>
                  ) : item.name}
                </p>
              </li>
            ))
          )}
        </ul>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        <PageTopLink />
      </div>
    </>
  );
}
