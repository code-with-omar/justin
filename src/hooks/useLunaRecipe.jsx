import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../constants";

function useLunaRecipe(colorId) {
  // console.log(colorId)
  const query = useQuery({
    queryKey: ["colorId", colorId],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/recipe/${colorId}`);
      return response.data;
    },
    enabled: Boolean(colorId),
    placeholderData: {},
    retry: false,
  });

  return query;
}

export default useLunaRecipe;
