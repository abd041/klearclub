"use client";

import dynamic from "next/dynamic";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { getProductCoas, type ProductCoaFile } from "@/data/coas";
import { cn } from "@/lib/cn";

const CoaPdfScrollView = dynamic(
  () => import("@/components/CoaPdfScrollView").then((module) => module.CoaPdfScrollView),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-0 flex-1 items-center justify-center bg-[#f6f6f6] text-[13px] text-[#666]">
        Loading certificate…
      </div>
    ),
  },
);

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

function useCoaDialogEffects(onClose: () => void) {
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [onClose]);
}

function useMobileCoaViewer() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)");
    const update = () => setMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return mobile;
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
  const [mounted, setMounted] = useState(false);
  const mobile = useMobileCoaViewer();

  useEffect(() => {
    setMounted(true);
  }, []);

  useCoaDialogEffects(onClose);

  const dialog = (
    <div
      className={cn(
        "fixed inset-0 z-[100]",
        mobile ? "flex flex-col bg-white" : "flex items-end justify-center sm:items-center",
      )}
      role="dialog"
      aria-modal="true"
    >
      {!mobile ? (
        <button type="button" className="absolute inset-0 bg-black/55" aria-label="Close certificate" onClick={onClose} />
      ) : null}

      <div
        className={cn(
          "relative z-10 flex w-full flex-col bg-white",
          mobile
            ? "h-[100dvh]"
            : "h-[92vh] max-w-[980px] overflow-hidden rounded-t-[22px] shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:h-[88vh] sm:rounded-[22px]",
        )}
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-[#ececec] px-4 py-3 sm:px-5">
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
          <div className="flex shrink-0 gap-2 overflow-x-auto border-b border-[#f0f0f0] px-4 py-2 sm:px-5">
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

        {mobile ? (
          <CoaPdfScrollView key={active} src={active} title={`${productName} certificate`} />
        ) : (
          <div className="relative min-h-0 flex-1">
            <iframe
              title={`${productName} certificate`}
              src={active}
              className="absolute inset-0 h-full w-full border-0 bg-[#f6f6f6]"
            />
          </div>
        )}
      </div>
    </div>
  );

  if (!mounted) return null;
  return createPortal(dialog, document.body);
}
