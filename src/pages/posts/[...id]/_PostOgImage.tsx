export const PostOgImage = (props: { title: string; site: string }) => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex" }}>
      <div>{props.site}</div>
      <div>{props.title}</div>
    </div>
  );
};
