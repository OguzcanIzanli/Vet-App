import { useState } from "react";
import backend from "../services/backend";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { AnimalType } from "../pages/Animal/types";

export const useAnimalQuery = (
  page: number,
  size: number,
  searchByName: string,
  searchByCustomer: string
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
  const listAnimals = useQuery({
    queryKey: ["animals", page, size, searchByName, searchByCustomer],
    queryFn: () =>
      searchByName
        ? backend.animalService.searchByName(searchByName)
        : searchByCustomer
        ? backend.animalService.searchByCustomer(searchByCustomer)
        : backend.animalService.list(page, size),
  });

  // Post
  const addAnimal = useMutation({
    mutationFn: (newAnimal: AnimalType) =>
      backend.animalService.post(newAnimal),
    onSuccess: () => {
      queryClient.invalidateQueries([
        "animals",
        page,
        size,
        searchByName,
        searchByCustomer,
      ]);
      setToast({ message: "Hayvan başarıyla eklendi!", type: "success" });
    },
    onError: () => {
      setToast({
        message: "Hayvan eklenirken bir hata oluştu!",
        type: "error",
      });
    },
  });

  // Delete
  const removeAnimal = useMutation({
    mutationFn: (id: string) => backend.animalService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries([
        "animals",
        page,
        size,
        searchByName,
        searchByCustomer,
      ]);
      setToast({ message: "Hayvan başarıyla silindi!", type: "success" });
    },
    onError: () => {
      setToast({
        message: "Hayvan silinirken bir hata oluştu!",
        type: "error",
      });
    },
  });

  // Put
  const updateAnimal = useMutation({
    mutationFn: (updatedAnimal: { id: string; data: AnimalType }) =>
      backend.animalService.put(updatedAnimal.id, updatedAnimal.data),
    onSuccess: () => {
      queryClient.invalidateQueries([
        "animals",
        page,
        size,
        searchByName,
        searchByCustomer,
      ]);
      setToast({ message: "Hayvan bilgileri güncellendi!", type: "success" });
    },
    onError: () => {
      setToast({
        message: "Hayvan bilgileri güncellenirken bir hata oluştu!",
        type: "error",
      });
    },
  });

  return {
    listAnimals,
    addAnimal,
    removeAnimal,
    updateAnimal,
    toast,
    resetToast,
  };
};
