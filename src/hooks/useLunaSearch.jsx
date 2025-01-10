import axios from "axios";
import { useQuery } from "@tanstack/react-query";

function useLunaSearch(searchTerms, searchBy) {
  // console.log(searchTerms);
  // console.log(searchBy);
  const query = useQuery({
    queryKey: ["search", searchTerms, searchBy],
    queryFn: async () => {
      const q = searchTerms || "";

      const response = await axios.get(
        `https://luna-paint-api-m67qj3xqea-uc.a.run.app/search/?q=${q}&by=${searchBy}`
      );

      return response.data;
    },
    enabled: Boolean(searchTerms),
    placeholderData: (previousValue) => previousValue || [],
    refetchOnWindowFocus: false,
  });

  return query;
}

export default useLunaSearch;
