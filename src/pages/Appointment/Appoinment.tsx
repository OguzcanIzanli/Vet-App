import { useState, ChangeEvent, MouseEvent } from "react";
import { useAppointmentQuery } from "../../queries/useAppointmentQuery";
import { AppointmentType, initialAppointment } from "./types";
import IconSend from "../../assets/icons/IconSend";
import IconDelete from "../../assets/icons/IconDelete";
import IconSave from "../../assets/icons/IconSave";
import Pagination from "../../components/Pagination";
import InputTextField from "../../components/InputTextField";

const Appointment = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [newAppointment, setNewAppointment] = useState(initialAppointment);
  const [updatedAppointment, setUpdatedAppointment] =
    useState(initialAppointment);
  const [searchByName, setSearchByName] = useState("");

  const {
    listAppointments,
    addAppointment,
    removeAppointment,
    updateAppointment,
  } = useAppointmentQuery(page, size, searchByName);

  const appointments = listAppointments.data?.data.content;
  const totalPages = listAppointments.data?.data.totalPages;

  // REMOVE
  const handleRemove = (e: MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.id;
    removeAppointment.mutate(id);
  };

  // ADD
  const handleAdd = () => {
    addAppointment.mutate(newAppointment);
    setNewAppointment(initialAppointment);
  };

  const appointmentInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => ({ ...prev, [name]: value }));
  };

  // UPDATE
  const handleEdit = (item: AppointmentType) => {
    setUpdatedAppointment(item);
  };

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedAppointment({
      ...updatedAppointment,
      [name]: value,
    });
  };

  const handleUpdate = (e: MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.id;
    updateAppointment.mutate({ id, data: updatedAppointment });
    setUpdatedAppointment(initialAppointment);
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
          {appointments?.map((item: AppointmentType) =>
            updatedAppointment?.id === item.id ? (
              <tr key={item.id}>
                <td>
                  <input
                    type="text"
                    name="name"
                    value={updatedAppointment.name}
                    onChange={handleFieldChange}
                  />
                </td>
                <td>
                  <input
                    name="email"
                    value={updatedAppointment.email}
                    type="email"
                    onChange={handleFieldChange}
                  />
                </td>
                <td>
                  <input
                    name="address"
                    value={updatedAppointment.address}
                    type="text"
                    onChange={handleFieldChange}
                  />
                </td>
                <td>
                  <input
                    name="city"
                    value={updatedAppointment.city}
                    type="text"
                    onChange={handleFieldChange}
                  />
                </td>
                <td>
                  <input
                    name="phone"
                    value={updatedAppointment.phone}
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

      <div className="inputContainer">
        <div className="pageInputsHeader">Müşteri Ekle</div>
        <InputTextField
          label="Müşteri Adı"
          name="name"
          value={newAppointment.name}
          type="text"
          onChange={appointmentInputChange}
        />
        <InputTextField
          label="Müşteri Email"
          name="email"
          value={newAppointment.email}
          type="email"
          onChange={appointmentInputChange}
        />
        <InputTextField
          label="Müşteri Adres"
          name="address"
          value={newAppointment.address}
          type="text"
          onChange={appointmentInputChange}
        />
        <InputTextField
          label="Müşteri Yaşadığı Şehir"
          name="city"
          value={newAppointment.city}
          type="text"
          onChange={appointmentInputChange}
        />
        <InputTextField
          label="Müşteri Telefon"
          name="phone"
          value={newAppointment.phone}
          type="number"
          onChange={appointmentInputChange}
        />
        <button className="addBtn" onClick={handleAdd}>
          Ekle <IconSend />
        </button>
      </div>
    </>
  );
};

export default Appointment;
