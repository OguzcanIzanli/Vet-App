import { useState, ChangeEvent, MouseEvent } from "react";
import { useCustomerQuery } from "../../queries/useCustomerQuery";
import { CustomerType, initialCustomer } from "./types";
import IconSend from "../../assets/icons/IconSend";
import IconDelete from "../../assets/icons/IconDelete";

const Customer = () => {
  // FETCH DATA
  const { data } = useCustomerQuery("").listCustomers;
  const customers = data?.data.content;

  // REMOVE
  const { mutate: removeCustomer } = useCustomerQuery("").removeCustomer;

  const handleRemove = (e: MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.id;
    removeCustomer(id);
  };

  // ADD
  const { mutate: addCustomer } = useCustomerQuery("").addCustomer;
  const [newCustomer, setNewCustomer] = useState(initialCustomer);

  const handleAdd = () => {
    addCustomer(newCustomer);
    setNewCustomer(initialCustomer);
  };

  const customerInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const [updatedCustomer, setUpdatedCustomer] = useState(initialCustomer);

  // const [editingCustomer, setEditingCustomer] = useState({
  //   id: "",
  //   field: "",
  //   value: "",
  // });
  // const { mutate: updateCustomer } = useCustomerQuery("").updateCustomer;

  // console.log(useCustomerQuery(editingCustomer.id).findCustomer);

  // const handleUpdate = (id: string, field: string, value: string) => {
  //   const updatedData = { ...was.data, [field]: value };

  //   updateCustomer({ id, data: updatedData });
  //   console.log(updatedData);
  //   setEditingCustomer({ id: "", field: "", value: "" });
  // };

  // const handleEdit = (
  //   id: string,
  //   field: string,
  //   value: string,
  //   index: number
  // ) => {
  //   console.log(customers[index]);
  //   setEditingCustomer({ id, field, value });
  // };

  // const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (editingCustomer) {
  //     setEditingCustomer((prev) =>
  //       prev ? { ...prev, value: e.target.value } : prev
  //     );
  //   }
  // };

  const handleEdit = (item: CustomerType) => {
    setUpdatedCustomer(item);
  };

  const handleField = (field: string) => {
    console.log(field);
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
          {customers?.map((item: CustomerType) => (
            // <tr onClick={() => handleEdit(item)} key={item.id}>
            //   <td onClick={() => handleField(item.name)}>{item.name}</td>
            //   <td onClick={() => handleField(item.email)}>{item.email}</td>
            //   <td onClick={() => handleField(item.address)}>{item.address}</td>
            //   <td onClick={() => handleField(item.city)}>{item.city}</td>
            //   <td onClick={() => handleField(item.phone)}>{item.phone}</td>
            //   <td>
            //     <button id={item.id} onClick={handleRemove}>
            //       <IconDelete />
            //     </button>
            //   </td>
            // </tr>
            <tr onClick={() => handleEdit(item)} key={item.id}>
              {["name", "email", "address", "city", "phone"].map((field) => (
                <td key={field}>
                  {/* {editingCustomer?.id === item.id &&
                  editingCustomer?.field === field ? (
                    <input
                      type="text"
                      value={editingCustomer.value}
                      onChange={handleFieldChange}
                      onBlur={() =>
                        handleUpdate(item.id, field, editingCustomer.value)
                      }
                    />
                  ) : ( */}
                  {item[field]}
                  {/* )} */}
                </td>
              ))}
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
