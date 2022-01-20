import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Icon } from "@iconify/react";
import axios from "axios";
import { api, nacionalidad } from "../helpers/url";
import TablaUsaurios from "./TablaUsaurios";
import { Formik } from "formik";
import Swal from "sweetalert2";

const createdBy = "mimarumo";

const Formularioregistro = () => {
  const [dato, setDato] = useState([]);
  const [registro, setRegistro] = useState(false);
  
  useEffect(() => {
    obtenerNacionalidad();
  }, []);
  const obtenerNacionalidad = async () => {
    await axios
      .get(nacionalidad)
      .then((resp) => {
        setDato(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
      setRegistro(false)
  };
  return (
    <div>
      <div className="targeta">
        <Card style={{ width: "56rem" }} className="mt-5">
          <Card.Body>
            <Card.Title>Registro de Usuarios</Card.Title>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                sicCode: "",
                sicCodeType: "",
                mobilePhone: "",
                nationality: "",
                createdBy: createdBy,
              }
            }
              validate={(valores) => {
                let errores = {};
                if (!valores.firstName) {
                  errores.firstName = "Por favor Ingresa un nombre completo";
                }
                if (!valores.lastName) {
                  errores.lastName = "Por favor Ingresa un nombre completo";
                }
                if (!valores.email) {
                  errores.email = "Por favor Ingresa un Correo Electronico";
                } else if (
                  !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
                    valores.email
                  )
                ) {
                  errores.email =
                    "Por favor Ingresa un Correo Electronico Valido";
                }
                if (!valores.mobilePhone) {
                  errores.mobilePhone =
                    "Por favor Ingresa su numero de celular";
                }
                if (!valores.sicCode) {
                  errores.sicCode = "Ingrese su Identificación";
                }
                if (valores.nationality === "") {
                  errores.nationality = "Por favor Ingrese su nacionalidad";
                }
                if (valores.sicCodeType === "") {
                  errores.sicCodeType =
                    "Por favor Ingrese tipo de Identificación";
                }

                return errores;
              }}
              onSubmit={(valores, { resetForm }) => {
                console.log(valores);
                axios
                  .post(api, {
                    firstName:valores.firstName,
                    lastName:valores.lastName,
                    email:valores.email,
                    sicCode:valores.sicCode,
                    sicCodeType:valores.sicCodeType,
                    mobilePhone:valores.mobilePhone,
                    nationality: valores.nationality,
                    createdBy:valores.createdBy,
                  })
                  .then(function (response) {
                    console.log(response);
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Datos Guardados Exitosamente',
                        showConfirmButton: false,
                        timer: 1500
                      })
                    setRegistro(true);
                  })
                  .catch(function (error) {

                    console.log(error);
                    Swal.fire({
                        title: 'Error!',
                        text: 'Error Al guardar los Datos',
                        icon: 'error',
                        confirmButtonText: 'Cool'
                      })
                  });
                resetForm();
              }}
            >
              {({
                values,
                errors,
                touched,
                handleSubmit,
                handleChange,
                handleBlur,
              }) => (
                <form className="row g-2 " onSubmit={handleSubmit}>
                  <div className="col-md-6">
                    <label htmlFor="sicCodeType">
                      <b>Tipo de documento: </b>
                    </label>
                    <select
                      className="form-select"
                      name="sicCodeType"
                      onChange={handleChange}
                      value={values.sicCodeType}
                      onBlur={handleBlur}
                      defaultValue={""}
                    >
                      <option value={""}>Seleccione una Opción</option>
                      <option value={"Pasaporte"}>Pasaporte</option>
                      <option value={"Cédula de ciudadanía"}>
                        Cédula de ciudadanía
                      </option>
                      <option value={"Cédula de extranjería"}>
                        Cédula de extranjería
                      </option>
                    </select>
                    {touched.sicCodeType && errors.sicCodeType && (
                      <div className="danger">{errors.sicCodeType}</div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="sicCode">
                      <b>Identificación: </b>
                    </label>
                    <input
                      type="text"
                      name="sicCode"
                      className="form-control"
                      placeholder="Identificación"
                      onChange={handleChange}
                      value={values.sicCode}
                      onBlur={handleBlur}
                    />
                    {touched.sicCode && errors.sicCode && (
                      <div className="danger">{errors.sicCode}</div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="firstName">
                      <b>Nombre(s): </b>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      className="form-control"
                      placeholder="Nombre(s)"
                      onChange={handleChange}
                      value={values.firstName}
                      onBlur={handleBlur}
                    />
                    {touched.firstName && errors.firstName && (
                      <div className="danger">{errors.firstName}</div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="lastName">
                      <b>Apellidos:</b>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      className="form-control"
                      placeholder="Apellidos"
                      onChange={handleChange}
                      value={values.lastName}
                      onBlur={handleBlur}
                    />
                    {touched.lastName && errors.lastName && (
                      <div className="danger">{errors.lastName}</div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="nationality">
                      <b>Nacionalidad:</b>
                    </label>
                    <select
                      className="form-select"
                      name="nationality"
                      onChange={handleChange}
                      value={values.nationality}
                      onBlur={handleBlur}
                      defaultValue={""}
                    >
                      <option value={""}>Seleccione una Opción</option>
                      {dato.map((n, i) => (
                        <option value={n.name} key={i}>
                          {n.name}
                        </option>
                      ))}
                    </select>
                    {touched.nationality && errors.nationality && (
                      <div className="danger">{errors.nationality}</div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="mobilePhone">
                      <b>Celular:</b>
                    </label>
                    <input
                      type="number"
                      name="mobilePhone"
                      className="form-control"
                      placeholder="Celular"
                      onChange={handleChange}
                      value={values.mobilePhone}
                      onBlur={handleBlur}
                    />
                    {touched.mobilePhone && errors.mobilePhone && (
                      <div className="danger">{errors.mobilePhone}</div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="email">
                      <b>Email:</b>
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Email"
                      onChange={handleChange}
                      value={values.email}
                      onBlur={handleBlur}
                    />
                    {touched.email && errors.email && (
                      <div className="danger">{errors.email}</div>
                    )}
                  </div>

                  <div className="d-grid col-md-6 ">
                    <button className="btn btn-secondary" type="submit">
                      <Icon icon="carbon:add" width="30" />
                      Agregar
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </Card.Body>
          <div className="mt-2">
            <hr />
            <TablaUsaurios reg={registro}/>
           
          </div>
        </Card>
      </div>
      
    </div>
  );
 
};

export default Formularioregistro;
