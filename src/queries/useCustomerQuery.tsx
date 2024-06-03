import backend from "../services/backend";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { CustomerType } from "../pages/Customer/types";

export const useCustomerQuery = (id: string) => {
  const queryClient = useQueryClient();

  const listCustomers = useQuery({
    queryKey: ["customers"],
    queryFn: () => backend.customerService.list().then((res) => res),
  });

  const findCustomer = useQuery({
    queryKey: ["customer", id],
    queryFn: () => backend.customerService.find(id).then((res) => res),
  });

  const addCustomer = useMutation({
    mutationFn: (newCustomer: CustomerType) =>
      backend.customerService.post(newCustomer),
    onSuccess: () => {
      queryClient.invalidateQueries(["customers"]);
    },
  });

  const removeCustomer = useMutation({
    mutationFn: (id: string) => backend.customerService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["customers"]);
    },
  });

  const updateCustomer = useMutation({
    mutationFn: (updatedCustomer: { id: string; data: CustomerType }) =>
      backend.customerService.put(updatedCustomer.id, updatedCustomer.data),
    onSuccess: () => {
      queryClient.invalidateQueries(["customers"]);
    },
  });

  return {
    listCustomers,
    addCustomer,
    removeCustomer,
    updateCustomer,
    findCustomer,
  };
};
