import { useQueries } from "@tanstack/react-query";

function useRecipeImages(colors) {
  //   console.log(colors);
  const filteredColors = colors.filter((color) => color["parentId"]);

  const queries = useQueries({
    queries: filteredColors.map((color) => ({
      queryKey: ["recipe", color["id"]],
      queryFn: async () => {
        const response = await fetch(
          `https://spectro-images.e-mixing.eu/api.php?color_id=${color["parentId"]}`
        );
        const data = await response.json();
        const { path } = data;

        return {
          id: color["id"],
          path,
        };
      },
    })),
  });

  return queries;
}

export default useRecipeImages;
