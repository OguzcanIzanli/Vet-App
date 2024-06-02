import { useState, ChangeEvent, MouseEvent } from "react";
import { useCustomerQuery } from "../../queries/useCustomerQuery";
import { CustomerType, initialCustomer } from "./types";
import IconSend from "../../assets/icons/IconSend";
import IconDelete from "../../assets/icons/IconDelete";

const Customer = () => {
  const { data } = useCustomerQuery().listCustomers;
  const { mutate: addCustomer } = useCustomerQuery().addCustomer;
  const { mutate: removeCustomer } = useCustomerQuery().removeCustomer;

  const [newCustomer, setNewCustomer] = useState(initialCustomer);

  const handleRemove = (e: MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.id;
    removeCustomer(id);
  };

  const handleAdd = () => {
    addCustomer(newCustomer);
    setNewCustomer(initialCustomer);
  };

  const customerInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCustomer((prev) => ({ ...prev, [name]: value }));
    console.log(newCustomer);
  };

  return (
    <>
      <h2>Müşteri Yönetimi</h2>

      <h2>Müşteri Listesi</h2>

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
          {data?.data.content.map((item: CustomerType) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.address}</td>
              <td>{item.city}</td>
              <td>{item.phone}</td>
              <td>
                <button id={item.id} onClick={handleRemove}>
                  <IconDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Müşteri Ekle</h2>

      <input
        name="name"
        value={newCustomer.name}
        type="text"
        placeholder="Ad"
        onChange={customerInputChange}
      />
      <input
        name="email"
        value={newCustomer.email}
        type="text"
        placeholder="Email"
        onChange={customerInputChange}
      />
      <input
        name="address"
        value={newCustomer.address}
        type="text"
        placeholder="Adres"
        onChange={customerInputChange}
      />
      <input
        name="city"
        value={newCustomer.city}
        type="text"
        placeholder="Yaşadığı Şehir"
        onChange={customerInputChange}
      />
      <input
        name="phone"
        value={newCustomer.phone}
        type="text"
        placeholder="Telefon"
        onChange={customerInputChange}
      />
      <button onClick={handleAdd}>
        Ekle <IconSend />
      </button>
    </>
  );
};

export default Customer;
