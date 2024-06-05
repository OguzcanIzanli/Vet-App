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

  const listAnimals = useQuery({
    queryKey: ["animals", page, size, searchByName, searchByCustomer],
    queryFn: () =>
      searchByName
        ? backend.animalService.searchByName(searchByName)
        : searchByCustomer
        ? backend.animalService.searchByCustomer(searchByCustomer)
        : backend.animalService.list(page, size),
  });

  // const findAnimal = useQuery({
  //   queryKey: ["animal", id],
  //   queryFn: () => backend.animalService.find(id).then((res) => res),
  // });

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
    },
  });

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
    },
  });

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
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return {
    listAnimals,
    addAnimal,
    removeAnimal,
    updateAnimal,
  };
};
