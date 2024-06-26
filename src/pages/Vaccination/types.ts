import { AnimalType, initialAnimal } from "../Animal/types";

export interface animalWithoutCustomerType {
  id?: number;
  name: string;
  species: string;
  breed: string;
  gender: string;
  dateOfBirth?: string;
  colour: string;
}

export interface VaccinationType {
  id?: number;
  name: string;
  code: string;
  protectionStartDate?: string;
  protectionFinishDate?: string;
  animalWithoutCustomer: animalWithoutCustomerType;
}

export interface VaccinationGetType {
  id?: number;
  name: string;
  code: string;
  protectionStartDate?: string;
  protectionFinishDate?: string;
  animal: AnimalType;
}

export const initialAnimalWithoutCustomer: animalWithoutCustomerType = {
  name: "",
  species: "",
  breed: "",
  gender: "",
  dateOfBirth: "",
  colour: "",
};

export const initialVaccination: VaccinationType = {
  name: "",
  code: "",
  protectionStartDate: "",
  protectionFinishDate: "",
  animalWithoutCustomer: initialAnimalWithoutCustomer,
};

export const initialVaccinationGet: VaccinationGetType = {
  name: "",
  code: "",
  protectionStartDate: "",
  protectionFinishDate: "",
  animal: initialAnimal,
};

export const initialSearchByVaccinationRange = {
  start: "2000-01-01",
  end: "2100-01-01",
  page: 0,
  size: 10,
};
