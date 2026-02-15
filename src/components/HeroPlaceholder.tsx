import Image from "next/image";

interface HeroPlaceholderProps {
  title: string;
  tagline?: string;
  abstract?: string;
  size?: "full" | "mini";
  imageUrl?: string;
  imageAlt?: string;
  /** Resmin çerçeve içinde hizası: "top" = üst, "center" = tam orta, "centerUpper" = ortanın biraz üstü (örn. BUSINESS yazısı) */
  imagePosition?: "top" | "center" | "centerUpper";
}

export function HeroPlaceholder({ 
  title, 
  tagline, 
  abstract, 
  size = "full",
  imageUrl,
  imageAlt = "Hero image",
  imagePosition = "center"
}: HeroPlaceholderProps) {
  const isMini = size === "mini";
  const objectPos =
    imagePosition === "top"
      ? "object-top"
      : imagePosition === "centerUpper"
        ? "object-[center_35%]"
        : "object-center";

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-zinc-200/80 ${
        imageUrl ? "" : "bg-gradient-to-br from-zinc-100 via-zinc-50 to-white"
      } ${isMini ? "py-8 md:py-12" : "py-16 md:py-24"}`}
    >
      {imageUrl ? (
        <>
          <div className="absolute inset-0">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className={`object-cover ${objectPos}`}
              priority
              sizes="100vw"
              unoptimized={imageUrl.startsWith("http")}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative mx-auto max-w-3xl px-4 text-center md:px-8">
            <h1 className={`font-semibold text-white ${isMini ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl lg:text-5xl"}`}>
              {title}
            </h1>
            {tagline && (
              <p className={`mt-3 text-white/90 ${isMini ? "text-base md:text-lg" : "text-lg md:text-xl"}`}>
                {tagline}
              </p>
            )}
            {abstract && (
              <p className="mt-4 text-sm text-white/80 md:text-base">{abstract}</p>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="absolute inset-0 opacity-30">
            <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-zinc-300/50 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-zinc-400/30 blur-2xl" />
          </div>
          <div className="relative mx-auto max-w-3xl px-4 text-center md:px-8">
            <h1 className={`font-semibold text-zinc-900 ${isMini ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl lg:text-5xl"}`}>
              {title}
            </h1>
            {tagline && (
              <p className={`mt-3 text-zinc-600 ${isMini ? "text-base md:text-lg" : "text-lg md:text-xl"}`}>
                {tagline}
              </p>
            )}
            {abstract && (
              <p className="mt-4 text-sm text-zinc-500 md:text-base">{abstract}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
