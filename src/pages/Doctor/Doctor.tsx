import { useState, ChangeEvent, MouseEvent } from "react";
import { useDoctorQuery } from "../../queries/useDoctorQuery";
import { DoctorType, initialDoctor } from "./types";
import IconSend from "../../assets/icons/IconSend";
import IconDelete from "../../assets/icons/IconDelete";
import IconSave from "../../assets/icons/IconSave";
import Pagination from "../../components/Pagination";
import InputTextField from "../../components/InputTextField";
import Workday from "../Workday";

const Doctor = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const { listDoctors, addDoctor, removeDoctor, updateDoctor } = useDoctorQuery(
    page,
    size
  );

  const [newDoctor, setNewDoctor] = useState(initialDoctor);
  const [updatedDoctor, setUpdatedDoctor] = useState(initialDoctor);

  const doctors = listDoctors.data?.data.content;
  const totalPages = listDoctors.data?.data.totalPages;

  // REMOVE
  const handleRemove = (e: MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget;
    removeDoctor.mutate(id);
  };

  // ADD
  const handleDoctorAdd = () => {
    addDoctor.mutate(newDoctor);
    setNewDoctor(initialDoctor);
  };

  const doctorInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDoctor((prev) => ({ ...prev, [name]: value }));
  };

  // UPDATE
  const handleEdit = (item: DoctorType) => {
    setUpdatedDoctor(item);
  };

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (updatedDoctor) {
      const { name, value } = e.target;
      setUpdatedDoctor({
        ...updatedDoctor,
        [name]: value,
      });
    }
  };

  const handleUpdate = (e: MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.id;
    updateDoctor.mutate({ id, data: updatedDoctor });
    setUpdatedDoctor(initialDoctor);
  };

  // DATA SIZE ON PAGE
  const handleSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSize(Number(value));
  };

  return (
    <>
      <div className="pageHeader">Doktor Yönetimi</div>
      <div className="pageListHeader">Doktor Listesi</div>

      <div className="filterContainer">
        <div className="searchInput"></div>
        <div className="listSize">
          <p>Tabloda Gösterilecek Doktor Sayısı</p>
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
                  <button
                    className="iconSave"
                    id={item.id}
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
                    id={item.id}
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
          <button className="addBtn" onClick={handleDoctorAdd}>
            Doktor Ekle <IconSend />
          </button>
        </div>
        <Workday />
      </div>
    </>
  );
};

export default Doctor;
