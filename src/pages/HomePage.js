import { useState, useEffect } from "react";
import api from "../service/api";

const HomePage = () => {
  let token = localStorage.getItem("token");
  console.log(token);

  const Signout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  const [loading, setLoading] = useState(false);
  const [clientes, setClientes] = useState([]);
  const qnt = clientes?.length;

  const getClients = () => {
    api
      .get("/client", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setClientes(res.data.clients);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getClients();
  }, []);

  const deleteClient = (id) => {
    api
      .delete(`/client/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        getClients();
      });
  };

  return (
    <div className="h-screen overflow-hidden">
      <div className="flex bg-[#5465af] w-full items-end justify-end py-1">
        <div className="w-[60%] md:w-[50%] flex justify-between mr-6">
          <span className="text-white font-bold text-xl"> Home Page </span>
          <button
            className=" text-white bg-indigo-500 font-medium rounded-lg text-sm px-3 py-2"
            onClick={() => Signout()}
          >
            Sair
          </button>
        </div>
      </div>

      <div className="flex h-[100vh] overflow-hidden lg:overflow-auto flex-col md:items-center bg-white dark:bg-white">
        <div className="flex w-full md:max-w-2xl mt-2 relative h-[70vh] lg:h-[40rem] flex flex-col bg-gray-50 shadow-2xl md:shadow-6xl rounded-lg p-2 gap-4">
          <button
            onClick={() => {
              getClients();
              setLoading(true);
            }}
            className="flex items-center text-xl rounded-md p-4 justify-between font-semibold h-9 py-6 lg:w-full overflow-hidden group bg-[#5465af] relative hover:bg-gradient-to-r text-white transition-all ease-out duration-300"
          >
            <div className="flex items-center text-l justify-between  font-medium text-white bg-inherit rounded-lg focus:ring-4 focus:outline-none focus:ring-gray-300">
              Clientes
              <span className="inline-flex items-center justify-center w-7 h-7 ml-2 text-xs font-semibold text-white- bg-[#5445af] rounded-full">
                {qnt}
              </span>
            </div>
            <span>
              {loading ? (
                <div className="spinner">
                  <svg
                    className="w-7 h-7 flex end animate-spin"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    ></path>
                  </svg>
                </div>
              ) : (
                <div>
                  <svg
                    className="w-7 h-7 flex end "
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    ></path>
                  </svg>
                </div>
              )}
            </span>
          </button>

          <div className="w-full flex flex-wrap items-center rounded-md gap-1 overflow-auto scrollbar-hide  ">
            {clientes.map((clientes, index) => {
              return (
                <div
                  key={index}
                  id={index}
                  className="flex flex-col bg-[#5465af] w-[300px] cursor-pointer text-gray-50 font-semibold justify-center m-2 p-1 rounded-lg  "
                >
                  <div className=" flex flex-col items-start text-md ">
                    <div className=" flex justify-between w-full ">
                      <p> Nome: {clientes.name} </p>
                      <div className="flex" >
                        <a href="editPage" >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                        </a>

                        <button onClick={() => deleteClient(clientes.id)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <p className="">Id: {clientes.id}</p>
                    <p className="">Email: {clientes.email}</p>
                    <p className="">Parentesco: {clientes.parentesco}</p>
                    <p className="">
                      Endereço: {clientes.street} {clientes.number}
                    </p>
                    <p className="">Bairro: {clientes.district}</p>
                    <p className="">Cep: {clientes.zipcode}</p>
                    <p className="">Estado: {clientes.state}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex w-full justify-end  md:max-w-2xl	">
          <button
            onClick={() => (window.location.href = "/register")}
            className=" items-end mt-2 lg:mb-5 text-white bg-[#5465af] hover:bg-[#5445af] font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
          >
            Adicionar Cliente
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
