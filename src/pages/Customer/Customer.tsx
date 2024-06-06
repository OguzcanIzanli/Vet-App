import { useState, ChangeEvent, MouseEvent } from "react";
import { useCustomerQuery } from "../../queries/useCustomerQuery";
import { CustomerType, initialCustomer } from "./types";
import IconSend from "../../assets/icons/IconSend";
import IconDelete from "../../assets/icons/IconDelete";
import IconSave from "../../assets/icons/IconSave";
import Pagination from "../../components/Pagination";
import InputTextField from "../../components/InputTextField";

const Customer = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [newCustomer, setNewCustomer] = useState(initialCustomer);
  const [updatedCustomer, setUpdatedCustomer] = useState(initialCustomer);
  const [searchByName, setSearchByName] = useState("");

  const { listCustomers, addCustomer, removeCustomer, updateCustomer } =
    useCustomerQuery(page, size, searchByName);

  const customers = listCustomers.data?.data.content;
  const totalPages = listCustomers.data?.data.totalPages;

  // REMOVE
  const handleRemove = (e: MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.id;
    removeCustomer.mutate(id);
  };

  // ADD
  const handleAdd = () => {
    addCustomer.mutate(newCustomer);
    setNewCustomer(initialCustomer);
  };

  const customerInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCustomer((prev) => ({ ...prev, [name]: value }));
  };

  // UPDATE
  const handleEdit = (item: CustomerType) => {
    setUpdatedCustomer(item);
  };

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedCustomer({
      ...updatedCustomer,
      [name]: value,
    });
  };

  const handleUpdate = (e: MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.id;
    updateCustomer.mutate({ id, data: updatedCustomer });
    setUpdatedCustomer(initialCustomer);
  };

  // DATA SIZE ON PAGE
  const handleSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSize(Number(e.target.value));
  };

  // SEARCH
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchByName(value);
  };

  return (
    <>
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
        <div className="listSize">
          <p>Tabloda Gösterilecek Müşteri Sayısı</p>
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
                    type="number"
                    onChange={handleFieldChange}
                  />
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
                <td onClick={() => handleEdit(item)}>{item.name}</td>
                <td onClick={() => handleEdit(item)}>{item.email}</td>
                <td onClick={() => handleEdit(item)}>{item.address}</td>
                <td onClick={() => handleEdit(item)}>{item.city}</td>
                <td onClick={() => handleEdit(item)}>{item.phone}</td>
                <td>
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
          type="number"
          onChange={customerInputChange}
        />
        <button className="addBtn" onClick={handleAdd}>
          Ekle <IconSend />
        </button>
      </div>
    </>
  );
};

export default Customer;
