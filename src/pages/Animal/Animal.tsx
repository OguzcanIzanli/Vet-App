// import { useState, ChangeEvent, MouseEvent } from "react";
// import { useAnimalQuery } from "../../queries/useAnimalQuery";
// import { AnimalType, initialAnimal } from "./types";
// import IconSend from "../../assets/icons/IconSend";
// import IconDelete from "../../assets/icons/IconDelete";
// import IconSave from "../../assets/icons/IconSave";
// import Pagination from "../../components/Pagination";
// import Input from "../../components/Input";

const Animal = () => {
  return <div>Animal</div>;
};

export default Animal;

// const Animal = () => {
//   const [page, setPage] = useState(0);
//   const [size, setSize] = useState(10);

//   const { listAnimals, addAnimal, removeAnimal, updateAnimal } =
//     useAnimalQuery(page, size);

//   const [newAnimal, setNewAnimal] = useState(initialAnimal);
//   const [updatedAnimal, setUpdatedAnimal] = useState(initialAnimal);

//   const animals = listAnimals.data?.data.content;
//   const totalPages = listAnimals.data?.data.totalPages;

//   // REMOVE
//   const handleRemove = (e: MouseEvent<HTMLButtonElement>) => {
//     const id = e.currentTarget.id;
//     removeAnimal.mutate(id);
//   };

//   // ADD
//   const handleAdd = () => {
//     addAnimal.mutate(newAnimal);
//     setNewAnimal(initialAnimal);
//   };

//   const animalInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setNewAnimal((prev) => ({ ...prev, [name]: value }));
//   };

//   // UPDATE
//   const handleEdit = (item: AnimalType) => {
//     setUpdatedAnimal(item);
//   };

//   const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (updatedAnimal) {
//       const { name, value } = e.target;
//       setUpdatedAnimal({
//         ...updatedAnimal,
//         [name]: value,
//       });
//     }
//   };

//   const handleUpdate = (e: MouseEvent<HTMLButtonElement>) => {
//     const id = e.currentTarget.id;
//     updateAnimal.mutate({ id, data: updatedAnimal });
//     setUpdatedAnimal(initialAnimal);
//   };

//   // DATA SIZE ON PAGE
//   const handleSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
//     setSize(Number(e.target.value));
//   };

//   return (
//     <>
//       <div className="pageHeader">Müşteri Yönetimi</div>
//       <div className="pageListHeader">Müşteri Listesi</div>
//       <div className="listSize">
//         <p>Sayfada Gösterilecek Müşteri Sayısı</p>
//         <select value={size} onChange={handleSizeChange}>
//           <option value={10}>10</option>
//           <option value={20}>20</option>
//           <option value={50}>50</option>
//         </select>
//       </div>
//       <table id="table">
//         <thead>
//           <tr>
//             <th>Müşteri Adı</th>
//             <th>Müşteri Email</th>
//             <th>Müşteri Adres</th>
//             <th>Müşteri Yaşadığı Şehir</th>
//             <th>Müşteri Telefon</th>
//             <th>İşlemler</th>
//           </tr>
//         </thead>
//         <tbody>
//           {animals?.map((item: AnimalType) =>
//             updatedAnimal?.id === item.id ? (
//               <tr key={item.id}>
//                 <td>
//                   <input
//                     type="text"
//                     name="name"
//                     value={updatedAnimal.name}
//                     onChange={handleFieldChange}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     name="email"
//                     value={updatedAnimal.email}
//                     type="email"
//                     onChange={handleFieldChange}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     name="address"
//                     value={updatedAnimal.address}
//                     type="text"
//                     onChange={handleFieldChange}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     name="city"
//                     value={updatedAnimal.city}
//                     type="text"
//                     onChange={handleFieldChange}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     name="phone"
//                     value={updatedAnimal.phone}
//                     type="number"
//                     onChange={handleFieldChange}
//                   />
//                 </td>
//                 <td>
//                   <button
//                     className="iconSave"
//                     id={item.id}
//                     onClick={handleUpdate}
//                   >
//                     <IconSave />
//                   </button>
//                 </td>
//               </tr>
//             ) : (
//               <tr key={item.id}>
//                 <td onClick={() => handleEdit(item)}>{item.name}</td>
//                 <td onClick={() => handleEdit(item)}>{item.email}</td>
//                 <td onClick={() => handleEdit(item)}>{item.address}</td>
//                 <td onClick={() => handleEdit(item)}>{item.city}</td>
//                 <td onClick={() => handleEdit(item)}>{item.phone}</td>
//                 <td>
//                   <button
//                     className="iconDelete"
//                     id={item.id}
//                     onClick={handleRemove}
//                   >
//                     <IconDelete />
//                   </button>
//                 </td>
//               </tr>
//             )
//           )}
//         </tbody>
//       </table>
//       <Pagination page={page} totalPages={totalPages} setPage={setPage} />

//       <div className="inputContainer">
//         <div className="pageInputsHeader">Müşteri Ekle</div>
//         <Input
//           label="Müşteri Adı"
//           name="name"
//           value={newAnimal.name}
//           type="text"
//           onChange={animalInputChange}
//         />
//         <Input
//           label="Müşteri Email"
//           name="email"
//           value={newAnimal.email}
//           type="email"
//           onChange={animalInputChange}
//         />
//         <Input
//           label="Müşteri Adres"
//           name="address"
//           value={newAnimal.address}
//           type="text"
//           onChange={animalInputChange}
//         />
//         <Input
//           label="Müşteri Yaşadığı Şehir"
//           name="city"
//           value={newAnimal.city}
//           type="text"
//           onChange={animalInputChange}
//         />
//         <Input
//           label="Müşteri Telefon"
//           name="phone"
//           value={newAnimal.phone}
//           type="number"
//           onChange={animalInputChange}
//         />
//         <button className="addBtn" onClick={handleAdd}>
//           Ekle <IconSend />
//         </button>
//       </div>
//     </>
//   );
// };

// export default Animal;
