export const PostOgImage = (props: { title: string; site: string }) => {
  return (
    <div
      tw="w-full h-full flex flex-col bg-zinc-900 p-16"
      style={{ fontFamily: '"Manrope", "Noto Sans JP"' }}
    >
      {/* Accent bar */}
      <div tw="w-12 h-1 bg-indigo-400 rounded-full mb-10" />

      {/* Title */}
      <div tw="flex flex-1 items-start">
        <p
          tw="text-white font-bold leading-snug m-0"
          style={{ fontSize: "56px", wordBreak: "break-word" }}
        >
          {props.title}
        </p>
      </div>

      {/* Footer */}
      <div tw="flex items-center justify-between">
        <span tw="text-zinc-400 text-2xl">{props.site}</span>
        <div tw="w-2 h-2 rounded-full bg-indigo-400" />
      </div>
    </div>
  );
};
