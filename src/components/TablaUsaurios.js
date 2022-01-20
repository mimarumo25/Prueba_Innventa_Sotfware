import axios from "axios";
import React, { useEffect, useState } from "react";
import { api } from "../helpers/url";

export default function TablaUsaurios({ reg }) {
  const [dato, setDato] = useState([]);
  const createdBy = "mimarumo";
  useEffect(() => {
    obtenerUsuario();
  }, [reg]);
  const obtenerUsuario = async () => {
    await axios
      .get(api)
      .then((resp) => {
        const data = resp.data.data;
        const myData = data.filter((myD) => myD.createdBy === createdBy);
        setDato(myData);
        console.log(myData);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Documento</th>
            <th scope="col">Nombre Completo</th>
            <th scope="col">Nacionalidad</th>
            <th scope="col">Celular</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {dato.map((u, i) => (
            <tr key={i}>
              {u.sicCodeType === "Pasaporte" ? (
                <th>{`PT - ${u.sicCode}`}</th>
              ) : u.sicCodeType === "Cédula de ciudadanía" ? (
                <th>{`CC - ${u.sicCode}`}</th>
              ) : (
                <th>{`CE - ${u.sicCode}`}</th>
              )}
              <td>{u.completeName}</td>
              <td>{u.nationality}</td>
              <td>{u.mobilePhone}</td>
              <td>{u.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
