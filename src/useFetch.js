import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [dane, setDane] = useState(null);
  const [czekanieNaSerwer, setCzekanieNaSerwer] = useState(true);
  const [blad, setBlad] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(url, { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error("Nie można pobrać danych z bazy turnieje");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setDane(data);
        setCzekanieNaSerwer(false);
        setBlad(null);
      })
      .catch((er) => {
        if (er.name === "AbortError") {
          console.log("fetch ");
        } else {
          setCzekanieNaSerwer(false);
          setBlad(er.message);
        }
      });
    return () => abortCont.abort();
  }, [url]);
  return { dane, czekanieNaSerwer, blad };
};

export default useFetch;
