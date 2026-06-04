import { useEffect, useState } from "react";

export function useMediaQuery(queryText: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(queryText);
    const update = () => setMatches(query.matches);

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, [queryText]);

  return matches;
}
