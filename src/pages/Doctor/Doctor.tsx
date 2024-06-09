import { useState, ChangeEvent, MouseEvent } from "react";

//Queries
import { useDoctorQuery } from "../../queries/useDoctorQuery";

// Types
import { DoctorType, initialDoctor } from "./types";

// Components
import Pagination from "../../components/Pagination";
import InputTextField from "../../components/MUI/InputTextField";
import OperationButton from "../../components/OperationButton";
import Toast from "../../components/Toast";
import Workday from "../Workday";
import ListSizeSelector from "../../components/ListSizeSelector";

const Doctor = () => {
  // States
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [newDoctor, setNewDoctor] = useState(initialDoctor);
  const [updatedDoctor, setUpdatedDoctor] = useState(initialDoctor);

  // Queries
  const {
    listDoctors,
    addDoctor,
    removeDoctor,
    updateDoctor,
    toast,
    resetToast,
  } = useDoctorQuery(page, size);

  const doctors = listDoctors.data?.data.content;
  const totalPages = listDoctors.data?.data.totalPages;

  // Remove
  const handleRemove = (e: MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget;
    removeDoctor.mutate(id);
  };

  // Add
  const handleAdd = () => {
    addDoctor.mutate(newDoctor);
    setNewDoctor(initialDoctor);
  };

  const doctorInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const newValue =
      value.slice(0, 1).toLocaleUpperCase() +
      value.slice(1).toLocaleLowerCase();

    setNewDoctor((prev) => ({ ...prev, [name]: newValue }));
  };

  // Update
  const handleEdit = (item: DoctorType) => {
    setUpdatedDoctor(item);
  };

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const newValue =
      value.slice(0, 1).toLocaleUpperCase() +
      value.slice(1).toLocaleLowerCase();

    setUpdatedDoctor({
      ...updatedDoctor,
      [name]: newValue,
    });
  };

  const handleUpdate = (e: MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget;
    updateDoctor.mutate({ id, data: updatedDoctor });
    setUpdatedDoctor(initialDoctor);
  };

  return (
    <div className="pageContainer">
      <div className="pageHeader">Doktor Yönetimi</div>
      <div className="pageListHeader">Doktor Listesi</div>

      <div className="filterContainer">
        <div className="searchInput"></div>
        <ListSizeSelector size={size} onSizeChange={setSize} label="Doktor" />
      </div>

      <table id="table">
        <thead>
          <tr>
            <th>Doktor Adı</th>
            <th>Doktor Email</th>
            <th>Doktor Adres</th>
            <th>Doktor Yaşadığı Şehir</th>
            <th>Doktor Telefon</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {doctors?.map((item: DoctorType) =>
            updatedDoctor?.id === item.id ? (
              <tr key={item.id}>
                <td>
                  <input
                    type="text"
                    name="name"
                    value={updatedDoctor.name}
                    onChange={handleFieldChange}
                  />
                </td>
                <td>
                  <input
                    name="email"
                    value={updatedDoctor.email}
                    type="email"
                    onChange={handleFieldChange}
                  />
                </td>
                <td>
                  <input
                    name="address"
                    value={updatedDoctor.address}
                    type="text"
                    onChange={handleFieldChange}
                  />
                </td>
                <td>
                  <input
                    name="city"
                    value={updatedDoctor.city}
                    type="text"
                    onChange={handleFieldChange}
                  />
                </td>
                <td>
                  <input
                    name="phone"
                    value={updatedDoctor.phone}
                    type="number"
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

      <div className="inputsContainer">
        <div className="inputContainer">
          <div className="pageInputsHeader">Doktor Ekle</div>
          <InputTextField
            label="Doktor Adı"
            name="name"
            value={newDoctor.name}
            type="text"
            onChange={doctorInputChange}
          />
          <InputTextField
            label="Doktor Email"
            name="email"
            value={newDoctor.email}
            type="email"
            onChange={doctorInputChange}
          />
          <InputTextField
            label="Doktor Adres"
            name="address"
            value={newDoctor.address}
            type="text"
            onChange={doctorInputChange}
          />
          <InputTextField
            label="Doktor Yaşadığı Şehir"
            name="city"
            value={newDoctor.city}
            type="text"
            onChange={doctorInputChange}
          />
          <InputTextField
            label="Doktor Telefon"
            name="phone"
            value={newDoctor.phone}
            type="number"
            onChange={doctorInputChange}
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
        <Workday />
      </div>
    </div>
  );
};

export default Doctor;
