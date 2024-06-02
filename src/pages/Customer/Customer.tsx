import { useState } from "react";
import { useCustomerQuery } from "../../queries/useCustomerQuery";

const initialValue = {
  address: "",
  city: "",
  email: "",
  name: "",
  phone: "",
};

const Customer = () => {
  const { data } = useCustomerQuery().listCustomers;
  const { mutate: addCustomer } = useCustomerQuery().addCustomer;
  const { mutate: removeCustomer } = useCustomerQuery().removeCustomer;

  const [newCustomer, setNewCustomer] = useState(initialValue);

  const handleRemove = (e) => {
    const { id } = e.target;
    removeCustomer(id);
  };

  const handleAdd = () => {
    addCustomer(newCustomer);
    setNewCustomer(initialValue);
  };

  const customerInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer((prev) => ({ ...prev, [name]: value }));
    console.log(newCustomer);
  };

  return (
    <>
      {data?.data.content.map((item) => (
        <div key={item.id}>
          {item.id}-{item.name}-{item.email}-{item.address}-{item.city}-
          {item.phone}
          <button id={item.id} onClick={handleRemove}>
            Delete
          </button>
        </div>
      ))}

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
      <button onClick={handleAdd}>ekle</button>
    </>
  );
};

export default Customer;
