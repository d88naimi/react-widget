import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ChuckNorris.css";

function ChuckNorris() {
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [query, setQuery] = useState("");

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (query === null) return;

    const { response } = await axios.get(
      `https://api.chucknorris.io/jokes/search?query=${query}`
    );

    setData(response);
  };

  useEffect(() => {
    setIsLoading(true);

    const onloadRandom = async () => {
      const { data } = await axios.get(
        "https://api.chucknorris.io/jokes/random"
      );

      setData(data);
      setIsLoading(false);
    };

    onloadRandom();
  }, []);

  if (isLoading && !data) {
    return <h1>Loading...</h1>;
  }

  if (data?.length === 0 && !isLoading) {
    return <h1>Sorry No Data was found</h1>;
  }

  return (
    <>
      <div>
        <div style={{ textAlign: "center" }}>
          <h1>Chuck Norris Random Facts</h1>
          <img src={data?.icon_url} alt="Chucky" />
        </div>
        <div className="container">
          <div>
            <h1>Did you know?</h1>
            <p>{data?.value}</p>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <label>
                Search for Facts
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChuckNorris;
