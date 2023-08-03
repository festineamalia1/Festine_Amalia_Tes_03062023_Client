import React, { useEffect, useContext, useState } from "react";

import NavBar from "components/NavBar";

import {
  Container,
  Row,
  Col,
  Image,
  Jumbotron,
  Button,
  Form,
  Table,
  Modal,
} from "react-bootstrap";
import { useParams, Link, useHistory, useLocation } from "react-router-dom";
import { API } from "config/api";
import { TaskContext } from "../context/TaskContext";
import { useQuery, useMutation } from "react-query";
import axios from "axios";

export default function Home() {
  const [query, setQuery] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);
  const history = useHistory();
  // const {
  //   isLoading,
  //   error,
  //   data: videos,
  //   refetch,
  // } = useQuery("getdata", () => API.get(`mahasiswa`));
  const handleShow = () => setShow(true);
  const [jadwal, setJadwal] = useState([]);
  const [editData, setEditData] = useState([]);
  const [hadirData, setHadirData] = useState([]);
  const [cadanganData, setCadanganData] = useState([]);
  const [lepasData, setLepasData] = useState([]);
  const [izinData, setIzinData] = useState([]);
  const [idJadwal, setIdJadwal] = useState(0);

  const [idTabel, setIdTabel] = useState(4);

  console.log("idTabel", idTabel);

  const baseURL = "http://localhost/Festine_Amalia_P_Tes_25_7_2023_Server";

  const fetchJadwalData = () => {
    axios.get(`${baseURL}/jadwal`).then((response) => {
      setJadwal(response.data);
    });
  };

  const fetchEditData = () => {
    axios.get(`${baseURL}/grouppiket`).then((response) => {
      setEditData(response.data);
    });
  };

  const fetchDataHadir = () => {
    if (idJadwal == 0) {
      axios.get(`${baseURL}/grouppikethadir`).then((response) => {
        setHadirData(response.data);
      });
    } else {
      axios.get(`${baseURL}/grouppikethadir/${idJadwal}`).then((response) => {
        setHadirData(response.data);
      });
    }
  };

  const fetchDataCadangan = () => {
    
    if (idJadwal == 0) {
    axios.get(`${baseURL}/groupcadangan`).then((response) => {
      setCadanganData(response.data);
    });
    } else {
    axios.get(`${baseURL}/groupcadangan/${idJadwal}`).then((response) => {
      setCadanganData(response.data);
    });
    }
  };

  const fetchDataLepas = () => {
   

     if (idJadwal == 0) {
       axios.get(`${baseURL}/grouplepas`).then((response) => {
         setLepasData(response.data);
       });
     } else {
       axios.get(`${baseURL}/grouplepas/${idJadwal}`).then((response) => {
         setCadanganData(response.data);
       });
     }
  };

  const fetchDataIzin = () => {
    axios.get(`${baseURL}/groupizin`).then((response) => {
      setIzinData(response.data);
    });
  };

  console.log("hadirData", hadirData);
  const handleEditData = (id) => {
    axios
      .post(`${baseURL}/grouppiket/2222`, {
        id_group_piket: 2222,
        id_pekerja: 2,
        id_jabatan: 22,
        id_group: 333,
      })
      .then(function (response) {
        setShow(true);
        console.log(response);
      })
      .catch(function (error) {
        setShow(true);
        console.log(error);
      });
  };

  // console.log("users", users.data);
  useEffect(() => {
    // refetch();
    fetchJadwalData();
    fetchEditData();
    fetchDataHadir();
    fetchDataCadangan();
    fetchDataLepas();
    fetchDataIzin();
  }, []);

  const handleSubmit = () => {
    // refetch();
  };
  const handleClick = (e) => {
    setQuery(e.target.value);
  };

  console.log("setIdJadwal", idJadwal);
  return (
    <>
      {/* isLoading ? (
    <h1>Loading...</h1>
  ) : error ? (
    <h1>error {error.message} </h1>
  ) : ( */}
      <div className="container">
        <div className="row mt-4">
          <div className="col-12">
            <div className="row mt-5">
              <NavBar />
            </div>
            <div>
              <div className="d-flex row mt-5 justify-content-between">
                <div className="col col-auto">Pilih Tanggal :</div>
                <div className="col">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    onChange={(e) => setIdJadwal(e.target.value)}
                  >
                    <option selected>Pilih Tanggal</option>
                    {jadwal.data &&
                      jadwal.data.map((dt, i) => (
                        <option value={dt.id_jadwal}>{dt.jadwal}</option>
                      ))}
                  </select>
                </div>
                <div className="d-flex col justify-content-end">
                  25 Juli 2023
                </div>
              </div>
              <div className=" mt-5">
                <div class="jumbotron jumbotron-fluid">
                  <div class="container">
                    <div className="row">
                      <div className="col">
                        <div className="row">
                          <div className="col col-auto">
                            Total Piket Hadir :
                          </div>
                          <div
                            className="col total-num"
                            onClick={() => setIdTabel(1)}
                          >
                            2
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="row">
                          <div className="col col-auto">
                            Total lepas Piket :
                          </div>
                          <div
                            className="col total-num"
                            onClick={() => setIdTabel(2)}
                          >
                            2
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="row">
                          <div className="col col-auto">
                            Total Cadangan Piket:
                          </div>
                          <div
                            className="col total-num"
                            onClick={() => setIdTabel(3)}
                          >
                            2
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="row">
                          <div className="col col-auto">
                            Total Izin Sakit dll :
                          </div>
                          <div
                            className="col total-num"
                            onClick={() => setIdTabel(4)}
                          >
                            2
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-5">
                {idTabel == "1" ? (
                  <>
                    <div>Total Piket</div>
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Nama</th>
                          <th scope="col">Jabatan</th>
                          <th scope="col">Group Piket</th>
                          <th scope="col">Keterangan Ijin dll</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lepasData.data &&
                          lepasData.data.map((dt, i) => (
                            <tr>
                              <td>{dt.nama}</td>
                              <td>{dt.nama_jabatan}</td>
                              <td>{dt.Nama_group}</td>
                              <td>{dt.Ket ? dt.Ket : "-"}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </>
                ) : idTabel == "2" ? (
                  <>
                    <div>Total Lepas Piket</div>
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Nama</th>
                          <th scope="col">Jabatan</th>
                          <th scope="col">Group Piket</th>
                          <th scope="col">Keterangan Ijin dll</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cadanganData.data &&
                          cadanganData.data.map((dt, i) => (
                            <tr>
                              <td>{dt.nama}</td>
                              <td>{dt.nama_jabatan}</td>
                              <td>{dt.Nama_group}</td>
                              <td>{dt.Ket ? dt.Ket : "-"}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </>
                ) : idTabel == "3" ? (
                  <>
                    <div>Total Cadangan Piket</div>
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Nama</th>
                          <th scope="col">Jabatan</th>
                          <th scope="col">Group Piket</th>
                          <th scope="col">Keterangan Ijin dll</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cadanganData.data &&
                          cadanganData.data.map((dt, i) => (
                            <tr>
                              <td>{dt.nama}</td>
                              <td>{dt.nama_jabatan}</td>
                              <td>{dt.Nama_group}</td>
                              <td>{dt.Ket ? dt.Ket : "-"}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </>
                ) : (
                  <>
                    <div>Total Izin Sakit dll</div>
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Nama</th>
                          <th scope="col">Jabatan</th>
                          <th scope="col">Group Piket</th>
                          <th scope="col">Keterangan Ijin dll</th>
                        </tr>
                      </thead>
                      <tbody>
                        {izinData.data &&
                          izinData.data.map((dt, i) => (
                            <tr>
                              <td>{dt.nama}</td>
                              <td>{dt.nama_jabatan}</td>
                              <td>{dt.Nama_group}</td>
                              <td>{dt.Ket ? dt.Ket : "-"}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
