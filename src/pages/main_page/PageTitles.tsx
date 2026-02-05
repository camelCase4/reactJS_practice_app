interface PageTitlesProps {
  h3Title: string;
  h6Title: string;
}

function PageTitles({ h3Title, h6Title }: PageTitlesProps) {
  return (
    <>
      <h3>
        <small>
          Welcome to the <span className="gradient-text">{h3Title}</span>
        </small>
      </h3>
      <h6 className="mb-4">
        <small>{h6Title}</small>
      </h6>
    </>
  );
}

export default PageTitles;
