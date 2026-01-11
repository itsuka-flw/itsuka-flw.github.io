"use client";

import { useEffect, useState } from "react";

interface Message {
  message: string;
  name: string;
  image?: string;
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

function escapeHtml(text: string): string {
  if (!text) return "";
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function convertDriveUrl(url: string): string {
  if (!url) return "";
  let fileId = "";

  const openMatch = url.match(/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/);
  if (openMatch) {
    fileId = openMatch[1];
  }
  const fileMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) {
    fileId = fileMatch[1];
  }

  if (fileId) {
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }
  return "";
}

export default function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await fetch("/api/messages");
        const result = await response.json();

        if (result.success) {
          setMessages(result.data);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchMessages();
  }, []);

  if (loading) {
    return (
      <ul className="message-list">
        <li className="loading">メッセージを読み込み中...</li>
      </ul>
    );
  }

  if (error) {
    return (
      <ul className="message-list">
        <li className="error">メッセージの読み込みに失敗しました</li>
      </ul>
    );
  }

  if (messages.length === 0) {
    return (
      <ul className="message-list">
        <li className="no-message">まだメッセージがありません</li>
      </ul>
    );
  }

  return (
    <ul className="message-list">
      {messages.map((item, index) => {
        const fontClass = getRandomFont(item.message + item.name + index);
        const imageUrl = item.image ? convertDriveUrl(item.image) : "";
        return (
          <li key={index} className={fontClass}>
            {imageUrl && (
              <img
                src={imageUrl}
                alt="添付画像"
                className="message-image"
                loading="lazy"
              />
            )}
            <p
              className="message-text"
              dangerouslySetInnerHTML={{
                __html: escapeHtml(item.message).replace(/\n/g, "<br>"),
              }}
            />
            <p className="message-sign">
              from {escapeHtml(item.name) || "花びら"}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
