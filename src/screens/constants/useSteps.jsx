import { useQuery } from "@tanstack/react-query";

function useBrands() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const response = await fetch(
        "https://luna-paint-api-298547824318.us-central1.run.app/brands"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  return { data, error, isLoading };
}

function useModels({ brand }) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["models", brand],
    queryFn: async () => {
      const response = await fetch(
        `https://luna-paint-api-m67qj3xqea-uc.a.run.app/models/?brand=${brand?.name}`
      );
      if (!response.ok) {
        throw new Error("error");
      }
      return response.json();
    },
  });

  return { data, error, isLoading };
}

function useColorGroup() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["colors"],
    queryFn: async () => {
      const response = await fetch(
        `https://luna-paint-api-m67qj3xqea-uc.a.run.app/colour-groups/`
      );
      if (!response.ok) {
        throw new Error("error");
      }
      return response.json();
    },
  });

  return { data, error, isLoading };
}

function useAdvanceSearch({ modelId }) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["advanceSearch", modelId],
    queryFn: async () => {
      const response = await fetch(
        `https://luna-paint-api-m67qj3xqea-uc.a.run.app/advanced-search/?model_id=${modelId}`
      );
      if (!response.ok) {
        throw new Error("error");
      }
      return response.json();
    },
  });

  return { data, error, isLoading };
}

export { useBrands, useModels, useColorGroup, useAdvanceSearch };
