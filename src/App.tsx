import "./App.css";
import { useCustomerQuery } from "./queries/useCustomerQuery";

const obj = {
  address: "asdasd",
  city: "asd",
  email: "dsads",
  name: "4",
  phone: "123",
};

function App() {
  const { data } = useCustomerQuery().listCustomers;
  const { mutate: addCustomer } = useCustomerQuery().addCustomer;
  const { mutate: removeCustomer } = useCustomerQuery().removeCustomer;

  const handleRemove = (e) => {
    const { id } = e.target;
    removeCustomer(id);
    console.log(data?.data.content);
  };

  return (
    <>
      {data?.data.content.map((item) => (
        <div key={item.id}>
          {item.id} - {item.name} - {item.email} - {item.city} -{" "}
          <button id={item.id} onClick={handleRemove}>
            Delete
          </button>
        </div>
      ))}
      <button onClick={() => addCustomer(obj)}>ekle</button>
    </>
  );
}

export default App;
