// Shared design tokens across all OG images.
// Edit here to keep every variant in sync.
const FONT_FAMILY = '"Manrope", "Noto Sans JP"';
const BG = "bg-zinc-900";
const ACCENT = "bg-indigo-400";
const TEXT_PRIMARY = "text-white font-bold";
const TEXT_MUTED = "text-zinc-400";

export const SiteOgImage = (props: { site: string }) => {
  return (
    <div
      tw={`w-full h-full flex flex-col items-center justify-center ${BG}`}
      style={{ fontFamily: FONT_FAMILY }}
    >
      <div tw="flex flex-col items-center">
        <div tw={`w-16 h-1 ${ACCENT} rounded-full mb-10`} />

        <p tw={`${TEXT_PRIMARY} tracking-tight m-0`} style={{ fontSize: "72px" }}>
          {props.site}
        </p>
      </div>
    </div>
  );
};

export const PostOgImage = (props: { title: string; site: string }) => {
  return (
    <div tw={`w-full h-full flex flex-col ${BG} p-16`} style={{ fontFamily: FONT_FAMILY }}>
      <div tw={`w-12 h-1 ${ACCENT} rounded-full mb-10`} />

      <div tw="flex flex-1 items-start">
        <p
          tw={`${TEXT_PRIMARY} leading-snug m-0`}
          style={{ fontSize: "56px", wordBreak: "break-word" }}
        >
          {props.title}
        </p>
      </div>

      <div tw="flex items-center justify-between">
        <span tw={`${TEXT_MUTED} text-2xl`}>{props.site}</span>
        <div tw={`w-2 h-2 rounded-full ${ACCENT}`} />
      </div>
    </div>
  );
};
