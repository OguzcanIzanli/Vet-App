import { useState, ChangeEvent, MouseEvent } from "react";
import { useAnimalQuery } from "../../queries/useAnimalQuery";
import { AnimalType, initialAnimal } from "./types";
import IconSend from "../../assets/icons/IconSend";
import IconDelete from "../../assets/icons/IconDelete";
import IconSave from "../../assets/icons/IconSave";
import Pagination from "../../components/Pagination";
import InputTextField from "../../components/InputTextField";

import { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useCustomerQuery } from "../../queries/useCustomerQuery";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { CustomerType } from "../Customer/types";

import dayjs from "dayjs";
import IconEdit from "../../assets/icons/IconEdit";

const Animal = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [newAnimal, setNewAnimal] = useState(initialAnimal);
  const [updatedAnimal, setUpdatedAnimal] = useState(initialAnimal);
  const [searchByName, setSearchByName] = useState("");
  const [searchByCustomer, setSearchByCustomer] = useState("");

  const { listAnimals, addAnimal, removeAnimal, updateAnimal } = useAnimalQuery(
    page,
    size,
    searchByName,
    searchByCustomer
  );

  const { listCustomers } = useCustomerQuery(0, 99, "");

  const animals = listAnimals.data?.data.content;
  const totalPages = listAnimals.data?.data.totalPages;
  const customers = listCustomers.data?.data.content;
  const localDate = new Date().toISOString().split("T")[0];

  // REMOVE
  const handleRemove = (e: MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.id;
    removeAnimal.mutate(id);
  };

  // ADD
  const handleAdd = () => {
    addAnimal.mutate(newAnimal);
    setNewAnimal(initialAnimal);
  };

  const animalInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAnimal((prev) => ({ ...prev, [name]: value }));
  };

  const dateSelectionChange = (e: Dayjs | null) => {
    const formattedDate = e?.format().slice(0, e?.format().indexOf("T"));
    setNewAnimal({
      ...newAnimal,
      dateOfBirth: formattedDate,
    });
  };

  const customerSelectionChange = (e: SelectChangeEvent<string>) => {
    const selectedCustomer = customers.find(
      (item: { id: number }) => item.id === Number(e.target.value)
    );
    setNewAnimal({ ...newAnimal, customer: selectedCustomer });
  };

  // UPDATE
  const handleEdit = (item: AnimalType) => {
    setUpdatedAnimal(item);
  };

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedAnimal({
      ...updatedAnimal,
      [name]: value,
    });
  };

  const handleSelectChange = (value: string) => {
    const newCustomer = customers.find(
      (item: { id: number }) => item.id === +value
    );
    const updatedCustomer = { ...newCustomer, name: value };
    setUpdatedAnimal({ ...updatedAnimal, customer: updatedCustomer });
  };

  const handleUpdate = (e: MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.id;
    updateAnimal.mutate({ id, data: updatedAnimal });
    setUpdatedAnimal(initialAnimal);
  };

  // DATA SIZE ON PAGE
  const handleSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSize(Number(e.target.value));
  };

  // SEARCH
  const handleCustomerSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchByCustomer(value);
  };

  const handleAnimalSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchByName(value);
  };

  return (
    <>
      <div className="pageHeader">Hayvan Yönetimi</div>
      <div className="pageListHeader">Hayvan Listesi</div>

      <div className="filterContainer">
        <div className="searchContainer">
          <div className="searchInput">
            <input
              type="text"
              placeholder="Müşteri Adına Göre Arama"
              value={searchByCustomer}
              onChange={handleCustomerSearchChange}
            />
          </div>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Hayvan Adına Göre Arama"
              value={searchByName}
              onChange={handleAnimalSearchChange}
            />
          </div>
        </div>
        <div className="listSize">
          <p>Tabloda Gösterilecek Hayvan Sayısı</p>
          <select value={size} onChange={handleSizeChange}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      <table id="table">
        <thead>
          <tr>
            <th>Adı</th>
            <th>Türü</th>
            <th>Cinsi</th>
            <th>Cinsiyeti</th>
            <th>Rengi</th>
            <th>Doğum Tarihi</th>
            <th>Müşteri</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {animals?.map((item: AnimalType) =>
            updatedAnimal?.id === item.id ? (
              <tr key={item.id}>
                <td>
                  <input
                    name="name"
                    value={updatedAnimal.name}
                    type="text"
                    onChange={handleFieldChange}
                  />
                </td>
                <td>
                  <input
                    name="species"
                    value={updatedAnimal.species}
                    type="text"
                    onChange={handleFieldChange}
                  />
                </td>
                <td>
                  <input
                    name="breed"
                    value={updatedAnimal.breed}
                    type="text"
                    onChange={handleFieldChange}
                  />
                </td>
                <td>
                  <input
                    name="gender"
                    value={updatedAnimal.gender}
                    type="text"
                    onChange={handleFieldChange}
                  />
                </td>
                <td>
                  <input
                    name="colour"
                    value={updatedAnimal.colour}
                    type="text"
                    onChange={handleFieldChange}
                  />
                </td>
                <td>
                  <input
                    name="dateOfBirth"
                    value={updatedAnimal.dateOfBirth}
                    type="date"
                    onChange={handleFieldChange}
                  />
                </td>
                <td>
                  <select
                    value={updatedAnimal.customer.id}
                    name="customer"
                    onChange={(e) => handleSelectChange(e.target.value)}
                  >
                    {customers.map((item: CustomerType) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button
                    className="iconSave"
                    id={item.id?.toString()}
                    onClick={handleUpdate}
                  >
                    <IconSave />
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.species}</td>
                <td>{item.breed}</td>
                <td>{item.gender}</td>
                <td>{item.colour}</td>
                <td>{item.dateOfBirth}</td>
                <td>{item.customer.name}</td>
                <td className="operationBtns">
                  <button className="iconEdit" onClick={() => handleEdit(item)}>
                    <IconEdit />
                  </button>
                  <button
                    className="iconDelete"
                    id={item.id?.toString()}
                    onClick={handleRemove}
                  >
                    <IconDelete />
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />

      <div className="inputContainer">
        <div className="pageInputsHeader">Hayvan Ekle</div>
        <InputTextField
          label="Hayvan Adı"
          name="name"
          value={newAnimal.name}
          type="text"
          onChange={animalInputChange}
        />
        <InputTextField
          label="Hayvan Türü"
          name="species"
          value={newAnimal.species}
          type="text"
          onChange={animalInputChange}
        />
        <InputTextField
          label="Hayvan Cinsi"
          name="breed"
          value={newAnimal.breed}
          type="text"
          onChange={animalInputChange}
        />
        <InputTextField
          label="Hayvan Cinsiyeti"
          name="gender"
          value={newAnimal.gender}
          type="text"
          onChange={animalInputChange}
        />
        <InputTextField
          label="Hayvan Rengi"
          name="colour"
          value={newAnimal.colour}
          type="text"
          onChange={animalInputChange}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              value={null}
              label="Hayvan Doğum Tarihi"
              maxDate={dayjs(localDate)}
              onChange={dateSelectionChange}
            />
          </DemoContainer>
        </LocalizationProvider>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Müşteri Seçiniz
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={newAnimal.customer.id?.toString() || ""}
              label="Müşteri Seçiniz"
              onChange={customerSelectionChange}
            >
              {customers?.map((item: CustomerType) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <button className="addBtn" onClick={handleAdd}>
          Ekle <IconSend />
        </button>
      </div>
    </>
  );
};

export default Animal;
