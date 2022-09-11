import React from "react";
import { Formik, Field, Form } from "formik";
import api from "../service/api";

const editPage = () => {
  let token = localStorage.getItem("token");


  const onSubmit = (values) => {
    api
      .put("/client", values, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        window.location.href = "/";
      })
      .catch((err) => console.log(err));
  };

  const onBlurCep = (ev, setFieldValue) => {
    const { value } = ev.target;
    const cep = value?.replace(/[^0-9]/g, "");
    if (cep?.length !== 8) {
      return;
    }
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        setFieldValue("street", data.logradouro);
        setFieldValue("district", data.bairro);
        setFieldValue("city", data.localidade);
        setFieldValue("complement", data.complemento);
        setFieldValue("uf", data.uf);
      });
  };


  return (
    <div className="editPage w-full  overflow-auto">
      <Formik
        onSubmit={onSubmit}
        validateOnMount
        initialValues={{}}
        render={({ isValid, setFieldValue }) => (
          <div className="flex items-center h-full justify-center">
            <Form>
              <div className="px-10 w-[350px] items-start py-5 flex flex-col gap-2 border-2 rounded-lg">
                <div className="w-full flex items-center justify-center">
                  <h1 className="font-bold text-indigo-500 text-xl">
                    Edit Client
                  </h1>
                </div>

                <div className="form-control-group w-full">
                  <Field
                    name="id"
                    type="text"
                    placeholder="Id"
                    required
                    className=" flex required w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="form-control-group w-full">
                  <Field
                    name="name"
                    type="text"
                    placeholder="Nome"
                    required
                    className=" flex required w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="form-control-group w-full">
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    className=" flex w-full required appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="form-control-group w-full">
                  <Field
                    name="parentesco"
                    type="text"
                    required
                    placeholder="Parentesco"
                    className=" flex w-full required required appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="form-control-group w-full">
                  <Field
                    name="zipcode"
                    type="text"
                    required
                    placeholder="CEP"
                    className=" flex w-full required appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    onBlur={(ev) => onBlurCep(ev, setFieldValue)}
                  />
                </div>
                <div className="form-control-group w-full">
                  <Field
                    name="street"
                    required
                    placeholder="Logradouro"
                    type="text"
                    className=" flex w-full required appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="form-control-group w-full">
                  <Field
                    name="number"
                    className=" flex w-full required appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    type="text"
                    required
                    placeholder="Número"
                  />
                </div>
                <div className="form-control-group w-full">
                  <Field
                    name="complement"
                    className=" flex w-full required appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Complemento"
                    required
                    type="text"
                  />
                </div>
                <div className="form-control-group w-full">
                  <Field
                    placeholder="Bairro"
                    name="district"
                    required
                    className=" flex w-full required appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    type="text"
                  />
                </div>
                <div className="form-control-group w-full">
                  <Field
                    name="city"
                    className=" flex w-full required appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    type="text"
                    required
                    placeholder="Cidade"
                  />
                </div>
                <div className="form-control-group w-full">
                  <Field
                    name="state"
                    className=" flex w-full required appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    type="text"
                    required
                    placeholder="Estado"
                  />
                </div>
                <div className="w-full flex items-center justify-center">
                  <button
                    type="submit"
                    className="group mt-5 relative flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 "
                    disabled={!isValid}
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </Form>
          </div>
        )}
      />
    </div>
  );
};

export default editPage;
