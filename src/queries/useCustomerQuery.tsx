import backend from "../services/backend";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { CustomerType } from "../pages/Customer/types";

export const useCustomerQuery = (
  page: number,
  size: number,
  searchByName: string
) => {
  const queryClient = useQueryClient();

  const listCustomers = useQuery({
    queryKey: ["customers", page, size, searchByName],
    queryFn: () =>
      searchByName
        ? backend.customerService.searchByName(searchByName)
        : backend.customerService.list(page, size),
  });

  // const findCustomer = useQuery({
  //   queryKey: ["customer", id],
  //   queryFn: () => backend.customerService.find(id).then((res) => res),
  // });

  const addCustomer = useMutation({
    mutationFn: (newCustomer: CustomerType) =>
      backend.customerService.post(newCustomer),
    onSuccess: () => {
      queryClient.invalidateQueries(["customers", page, size, searchByName]);
    },
  });

  const removeCustomer = useMutation({
    mutationFn: (id: string) => backend.customerService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["customers", page, size, searchByName]);
    },
  });

  const updateCustomer = useMutation({
    mutationFn: (updatedCustomer: { id: string; data: CustomerType }) =>
      backend.customerService.put(updatedCustomer.id, updatedCustomer.data),
    onSuccess: () => {
      queryClient.invalidateQueries(["customers", page, size, searchByName]);
    },
  });

  return {
    listCustomers,
    addCustomer,
    removeCustomer,
    updateCustomer,
  };
};
