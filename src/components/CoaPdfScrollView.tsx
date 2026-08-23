"use client";

import { useEffect, useState } from "react";

type Props = {
  src: string;
  title: string;
};

function isPdfSource(src: string) {
  return src.toLowerCase().endsWith(".pdf");
}

export function CoaPdfScrollView({ src, title }: Props) {
  const [pages, setPages] = useState<Array<{ src: string; alt: string }>>([]);
  const [loading, setLoading] = useState(isPdfSource(src));
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!isPdfSource(src)) {
      setPages([]);
      setLoading(false);
      setError(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(false);
    setPages([]);

    (async () => {
      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

        const pdf = await pdfjs.getDocument({ url: src }).promise;
        const rendered: Array<{ src: string; alt: string }> = [];
        const scale = Math.min(window.devicePixelRatio > 1 ? 2 : 1.5, 2);

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
          if (cancelled) return;

          const page = await pdf.getPage(pageNumber);
          const viewport = page.getViewport({ scale });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");

          if (!context) continue;

          canvas.width = viewport.width;
          canvas.height = viewport.height;

          await page.render({ canvas, canvasContext: context, viewport }).promise;

          rendered.push({
            src: canvas.toDataURL("image/jpeg", 0.9),
            alt: `${title} page ${pageNumber}`,
          });
        }

        if (!cancelled) {
          setPages(rendered);
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [src, title]);

  if (!isPdfSource(src)) {
    return (
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain bg-[#f6f6f6] [-webkit-overflow-scrolling:touch]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={title} className="block w-full" draggable={false} />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-0 flex-1 items-center justify-center bg-[#f6f6f6] text-[13px] text-[#666]">
        Loading certificate…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 bg-[#f6f6f6] px-6 text-center">
        <p className="text-[13px] text-[#666]">Couldn&apos;t load preview on this device.</p>
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center rounded-full bg-[#131315] px-5 text-[13px] font-medium text-white no-underline"
        >
          Open PDF
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain bg-[#f6f6f6] [-webkit-overflow-scrolling:touch]">
      {pages.map((page, index) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={`${src}-${index}`} src={page.src} alt={page.alt} className="block w-full" draggable={false} />
      ))}
    </div>
  );
}
