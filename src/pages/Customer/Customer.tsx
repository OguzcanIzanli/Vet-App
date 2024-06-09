import { useState, ChangeEvent, MouseEvent } from "react";

//Queries
import { useCustomerQuery } from "../../queries/useCustomerQuery";

// Types
import { CustomerType, initialCustomer } from "./types";

// Components
import Pagination from "../../components/Pagination";
import InputTextField from "../../components/MUI/InputTextField";
import OperationButton from "../../components/OperationButton";
import Toast from "../../components/Toast";
import ListSizeSelector from "../../components/ListSizeSelector";

const Customer = () => {
  // States
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [newCustomer, setNewCustomer] = useState(initialCustomer);
  const [updatedCustomer, setUpdatedCustomer] = useState(initialCustomer);
  const [searchByName, setSearchByName] = useState("");

  //Queries
  const {
    listCustomers,
    addCustomer,
    removeCustomer,
    updateCustomer,
    toast,
    resetToast,
  } = useCustomerQuery(page, size, searchByName);

  const customers = listCustomers.data?.data.content;
  const totalPages = listCustomers.data?.data.totalPages;

  // Remove
  const handleRemove = (e: MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget;
    removeCustomer.mutate(id);
  };

  // Add
  const handleAdd = () => {
    addCustomer.mutate(newCustomer);
    setNewCustomer(initialCustomer);
  };

  const customerInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const newValue =
      value.slice(0, 1).toLocaleUpperCase() +
      value.slice(1).toLocaleLowerCase();

    setNewCustomer((prev) => ({ ...prev, [name]: newValue }));
  };

  // Update
  const handleEdit = (item: CustomerType) => {
    setUpdatedCustomer(item);
  };

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const newValue =
      value.slice(0, 1).toLocaleUpperCase() +
      value.slice(1).toLocaleLowerCase();

    setUpdatedCustomer({
      ...updatedCustomer,
      [name]: newValue,
    });
  };

  const handleUpdate = (e: MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget;
    updateCustomer.mutate({ id, data: updatedCustomer });
    setUpdatedCustomer(initialCustomer);
  };

  // Search
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    const newValue =
      value.slice(0, 1).toLocaleUpperCase() +
      value.slice(1).toLocaleLowerCase();

    setSearchByName(newValue);
  };

  return (
    <div className="pageContainer">
      <div className="pageHeader">Müşteri Yönetimi</div>
      <div className="pageListHeader">Müşteri Listesi</div>

      <div className="filterContainer">
        <div className="searchInput">
          <input
            type="text"
            placeholder="Müşteri Adına Göre Arama"
            value={searchByName}
            onChange={handleSearchChange}
          />
        </div>
        <ListSizeSelector size={size} onSizeChange={setSize} label="Müşteri" />
      </div>

      <table id="table">
        <thead>
          <tr>
            <th>Müşteri Adı</th>
            <th>Müşteri Email</th>
            <th>Müşteri Adres</th>
            <th>Müşteri Yaşadığı Şehir</th>
            <th>Müşteri Telefon</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {customers?.map((item: CustomerType) =>
            updatedCustomer?.id === item.id ? (
              <tr key={item.id}>
                <td>
                  <input
                    type="text"
                    name="name"
                    value={updatedCustomer.name}
                    onChange={handleFieldChange}
                  />
                </td>
                <td>
                  <input
                    name="email"
                    value={updatedCustomer.email}
                    type="email"
                    onChange={handleFieldChange}
                  />
                </td>
                <td>
                  <input
                    name="address"
                    value={updatedCustomer.address}
                    type="text"
                    onChange={handleFieldChange}
                  />
                </td>
                <td>
                  <input
                    name="city"
                    value={updatedCustomer.city}
                    type="text"
                    onChange={handleFieldChange}
                  />
                </td>
                <td>
                  <input
                    name="phone"
                    value={updatedCustomer.phone}
                    type="text"
                    onChange={handleFieldChange}
                  />
                </td>
                <td>
                  <OperationButton
                    className="saveBtn"
                    id={item.id?.toString()}
                    icon="save"
                    onClick={handleUpdate}
                  />
                </td>
              </tr>
            ) : (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.address}</td>
                <td>{item.city}</td>
                <td>{item.phone}</td>
                <td className="operationBtns">
                  <OperationButton
                    className="editBtn"
                    onClick={() => handleEdit(item)}
                    icon="edit"
                  />
                  <OperationButton
                    className="deleteBtn"
                    id={item.id?.toString()}
                    icon="delete"
                    onClick={handleRemove}
                  />
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />

      <div className="inputContainer">
        <div className="pageInputsHeader">Müşteri Ekle</div>
        <InputTextField
          label="Müşteri Adı"
          name="name"
          value={newCustomer.name}
          type="text"
          onChange={customerInputChange}
        />
        <InputTextField
          label="Müşteri Email"
          name="email"
          value={newCustomer.email}
          type="email"
          onChange={customerInputChange}
        />
        <InputTextField
          label="Müşteri Adres"
          name="address"
          value={newCustomer.address}
          type="text"
          onChange={customerInputChange}
        />
        <InputTextField
          label="Müşteri Yaşadığı Şehir"
          name="city"
          value={newCustomer.city}
          type="text"
          onChange={customerInputChange}
        />
        <InputTextField
          label="Müşteri Telefon"
          name="phone"
          value={newCustomer.phone}
          type="text"
          onChange={customerInputChange}
        />

        <OperationButton className="addBtn" onClick={handleAdd} icon="send">
          Ekle
        </OperationButton>

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={resetToast}
          />
        )}
      </div>
    </div>
  );
};

export default Customer;
