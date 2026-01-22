interface PageTitlesProps {
  h3Title: string;
  h6Title: string;
}

function PageTitles({ h3Title, h6Title }: PageTitlesProps) {
  return (
    <>
      <h3>
        Welcome to the <span className="gradient-text">{h3Title}</span>
      </h3>
      <h6 className="mb-4">{h6Title}</h6>
    </>
  );
}

export default PageTitles;
