import { useMutation } from "@tanstack/react-query";

function useShopifyCreateProduct() {
    const mutation = useMutation({
        mutationKey: "createProduct",
        mutationFn: async (product) => {
            const formData  = new FormData();

            for(const key in product) {
                if (product[key] === null || product[key] === undefined) {
                    continue;
                }
                formData.append(key, product[key]);
            }

            // send product as dform data
            const response = await fetch("https://apps.ecomeasy.io/tss-genie/tss-oem-colors/create-update-oem-color-products.php", {
                method: "POST",
                body: formData,
            });

            return response.json();
        },
        onSuccess: (data) => {
            if (data.status === "success") {
                window.location.href=data.basecoat_product_url;
            } else {
                alert("Something went wrong.");
            }
        }
    });

    return mutation;
}

export { useShopifyCreateProduct };