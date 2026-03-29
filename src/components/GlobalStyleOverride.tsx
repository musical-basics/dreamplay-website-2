"use client";

export function GlobalStyleOverride() {
    return (
        <style jsx global>{`
      html, body {
        overflow-x: visible !important;
        overflow: visible !important;
      }
    `}</style>
    );
}
