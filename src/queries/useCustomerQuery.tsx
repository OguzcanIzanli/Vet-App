import backend from "../services/backend";
import { useQuery, useMutation, useQueryClient } from "react-query";

export const useCustomerQuery = () => {
  const queryClient = useQueryClient();

  const listCustomers = useQuery({
    queryKey: ["customers"],
    queryFn: () => backend.customerService.list().then((res) => res),
  });

  const addCustomer = useMutation({
    mutationKey: ["customer"],
    mutationFn: (newPost) => backend.customerService.post(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });

  const removeCustomer = useMutation({
    mutationKey: ["customer"],
    mutationFn: (id) => backend.customerService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });

  //   const find = useQuery({
  //     queryKey: ["animal", id],
  //     queryFn: () => backend.animalService.find(id).then((res) => res.data),
  //   });

  return { listCustomers, addCustomer, removeCustomer };
};
