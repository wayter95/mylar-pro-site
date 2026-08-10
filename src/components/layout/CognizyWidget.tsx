"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const WIDGET_ID = "cognizy-widget-frame";
const WIDGET_SRC = "https://cognizy.ai/widget?org=cmnnt9j2j00013smq9tyin6ct";
const HIDDEN_PREFIXES = ["/studio"];

function isHiddenPath(pathname: string) {
  return HIDDEN_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function CognizyWidget() {
  const pathname = usePathname();

  useEffect(() => {
    if (isHiddenPath(pathname)) {
      document.getElementById(WIDGET_ID)?.remove();
      return;
    }

    if (document.getElementById(WIDGET_ID)) {
      return;
    }

    const frame = document.createElement("iframe");
    frame.id = WIDGET_ID;
    frame.src = WIDGET_SRC;
    frame.allow = "microphone";
    frame.setAttribute("allowtransparency", "true");
    frame.setAttribute("title", "Atendimento MyLar Pro");
    frame.style.cssText =
      "position:fixed;bottom:0;right:0;border:none;z-index:9999;width:100px;height:100px;background:transparent;pointer-events:none;max-width:100vw;max-height:100vh;";
    frame.onload = () => {
      frame.style.pointerEvents = "auto";
    };
    document.body.appendChild(frame);

    let isOpen = false;

    function applySize() {
      if (!isOpen) {
        frame.style.width = "100px";
        frame.style.height = "100px";
        return;
      }

      const isMobile = window.innerWidth < 480;
      frame.style.width = isMobile ? "100vw" : "440px";
      frame.style.height = isMobile ? "100dvh" : "620px";
      frame.style.bottom = "0";
      frame.style.right = "0";
    }

    function handleMessage(event: MessageEvent) {
      if (event.data?.type === "conversa-widget-resize") {
        isOpen = Boolean(event.data.isOpen);
        applySize();
      }
    }

    window.addEventListener("message", handleMessage);
    window.addEventListener("resize", applySize);

    return () => {
      window.removeEventListener("message", handleMessage);
      window.removeEventListener("resize", applySize);
    };
  }, [pathname]);

  return null;
}
