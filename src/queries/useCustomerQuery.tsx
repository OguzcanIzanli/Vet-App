import backend from "../services/backend";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { CustomerType } from "../pages/Customer/types";

export const useCustomerQuery = () => {
  const queryClient = useQueryClient();

  const listCustomers = useQuery({
    queryKey: ["customers"],
    queryFn: () => backend.customerService.list().then((res) => res),
  });

  const addCustomer = useMutation({
    mutationKey: ["customer"],
    mutationFn: (newCustomer: CustomerType) =>
      backend.customerService.post(newCustomer),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });

  const removeCustomer = useMutation({
    mutationKey: ["customer"],
    mutationFn: (id: string) => backend.customerService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });

  return { listCustomers, addCustomer, removeCustomer };
};
