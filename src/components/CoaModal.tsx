"use client";

import { createContext, useContext, useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { getProductCoas, type ProductCoaFile } from "@/data/coas";

type CoaContextValue = {
  openCoa: (href?: string) => void;
};

const CoaContext = createContext<CoaContextValue | null>(null);

export function useCoaModal() {
  const value = useContext(CoaContext);
  if (!value) {
    return { openCoa: () => undefined };
  }
  return value;
}

export function CoaOpenButton({
  className,
  children,
  href,
  style,
}: {
  className?: string;
  children: ReactNode;
  href?: string;
  style?: CSSProperties;
}) {
  const { openCoa } = useCoaModal();
  return (
    <button type="button" className={className} style={style} onClick={() => openCoa(href)}>
      {children}
    </button>
  );
}

export function CoaModalProvider({
  slug,
  productName,
  children,
}: {
  slug: string;
  productName: string;
  children: ReactNode;
}) {
  const files = useMemo(() => getProductCoas(slug), [slug]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(files[0]?.href ?? "");

  function openCoa(href?: string) {
    setActive(href || files[0]?.href || `/coas/${slug}.svg`);
    setOpen(true);
  }

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const current = files.find((file) => file.href === active) ?? files[0];

  return (
    <CoaContext.Provider value={{ openCoa }}>
      {children}
      {open ? (
        <CoaDialog
          productName={productName}
          files={files}
          current={current}
          active={active}
          onSelect={setActive}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </CoaContext.Provider>
  );
}

export function CoaDialog({
  productName,
  files,
  current,
  active,
  onSelect,
  onClose,
}: {
  productName: string;
  files: ProductCoaFile[];
  current?: ProductCoaFile;
  active: string;
  onSelect: (href: string) => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center" role="dialog" aria-modal="true">
      <button type="button" className="absolute inset-0 bg-black/55" aria-label="Close certificate" onClick={onClose} />
      <div className="relative flex h-[92vh] w-full max-w-[980px] flex-col overflow-hidden rounded-t-[22px] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:h-[88vh] sm:rounded-[22px]">
        <div className="flex items-center justify-between gap-3 border-b border-[#ececec] px-4 py-3 sm:px-5">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-[#8a8a8a] uppercase">
              Certificate of Analysis
            </p>
            <p className="truncate text-[15px] font-semibold text-[#131315]">
              {productName}
              {current?.lot ? <span className="font-normal text-[#8a8a8a]"> · LOT {current.lot}</span> : null}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={active}
              download
              className="inline-flex h-10 items-center rounded-full border border-[#e0e0e0] px-4 text-[13px] font-medium no-underline"
            >
              Download
            </a>
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e0e0e0] text-[#131315]"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>

        {files.length > 1 ? (
          <div className="flex gap-2 overflow-x-auto border-b border-[#f0f0f0] px-4 py-2 sm:px-5">
            {files.map((file) => {
              const on = file.href === active;
              return (
                <button
                  key={file.href}
                  type="button"
                  onClick={() => onSelect(file.href)}
                  className={
                    on
                      ? "h-8 shrink-0 rounded-full bg-[#131315] px-3 text-[12px] font-medium text-white"
                      : "h-8 shrink-0 rounded-full bg-[#f3f3f3] px-3 text-[12px] font-medium text-[#555]"
                  }
                  style={on ? { color: "#ffffff" } : undefined}
                >
                  {file.lot}
                </button>
              );
            })}
          </div>
        ) : null}

        <iframe title={`${productName} certificate`} src={active} className="min-h-0 w-full flex-1 bg-[#f6f6f6]" />
      </div>
    </div>
  );
}
