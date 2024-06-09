import { useState } from "react";
import backend from "../services/backend";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { CustomerType } from "../pages/Customer/types";

export const useCustomerQuery = (
  page: number,
  size: number,
  searchByName: string
) => {
  const queryClient = useQueryClient();

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const resetToast = () => {
    setToast(null);
  };

  // Get
  const listCustomers = useQuery({
    queryKey: ["customers", page, size, searchByName],
    queryFn: () =>
      searchByName
        ? backend.customerService.searchByName(searchByName)
        : backend.customerService.list(page, size),
  });

  // Post
  const addCustomer = useMutation({
    mutationFn: (newCustomer: CustomerType) =>
      backend.customerService.post(newCustomer),
    onSuccess: () => {
      queryClient.invalidateQueries(["customers", page, size, searchByName]);
      setToast({ message: "Müşteri başarıyla eklendi!", type: "success" });
    },
    onError: () => {
      setToast({
        message: "Müşteri eklenirken bir hata oluştu!",
        type: "error",
      });
    },
  });

  // Delete
  const removeCustomer = useMutation({
    mutationFn: (id: string) => backend.customerService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["customers", page, size, searchByName]);
      setToast({ message: "Müşteri başarıyla silindi!", type: "success" });
    },
    onError: () => {
      setToast({
        message: "Müşteri silinirken bir hata oluştu!",
        type: "error",
      });
    },
  });

  // Put
  const updateCustomer = useMutation({
    mutationFn: (updatedCustomer: { id: string; data: CustomerType }) =>
      backend.customerService.put(updatedCustomer.id, updatedCustomer.data),
    onSuccess: () => {
      queryClient.invalidateQueries(["customers", page, size, searchByName]);
      setToast({ message: "Müşteri bilgileri güncellendi!", type: "success" });
    },
    onError: () => {
      setToast({
        message: "Müşteri bilgileri güncellenirken bir hata oluştu!",
        type: "error",
      });
    },
  });

  return {
    listCustomers,
    addCustomer,
    removeCustomer,
    updateCustomer,
    toast,
    resetToast,
  };
};
