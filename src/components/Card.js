const Card = ({ data, error, url }) => {
  const time = new Date(data?.time).toLocaleTimeString();

  const title = url
    ?.substr(28)
    .substr(0, url?.substr(28).indexOf("/"))
    .toUpperCase();

  return (
    <figure className="card">
      <figcaption>
        <h2>{title}</h2>
        {data && (
          <>
            <h3>{data.message}</h3>
            <p>{data.hostname}</p>
            <p>{time}</p>
          </>
        )}
        {error && (
          <>
            <h3 className="error">Error</h3>
            <p>OUTAGE</p>
            <p>503</p>
            <p>Service Unavailable</p>
          </>
        )}
      </figcaption>
    </figure>
  );
};

export default Card;
