//import style
import "../styles/home.css";

//import partials
import Header from "../partials/header";
import Loading from "../partials/loading";
import SideMenu from "../partials/side-menu";

//import utilities
import Axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../partials/table";
import {useLocation} from 'react-router-dom';
function Studentsbygroup() {
  const accountType = window.localStorage.getItem("accountType");
  const [dataTable, setDataTable] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const loggedIn = window.localStorage.getItem("loggedIn");
  const location = useLocation();
   const sesiondata=[
    {sesiondate:location.state.sesiondate,sesiontime:location.state.sesiontime ,class_type:location.state.class_type,teacher_id:location.state.teacher_id,class_name:location.state.class_name}
  ]
  const column = [
    { heading: 'id', value: '_id' },
    { heading: 'first name', value: 'first_name' },
    { heading: 'last name', value: 'last_name' },
    { heading: 'absent',value:'' },
  ]

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    } else {
      setIsLoading(true);
      setTimeout(() => {
        Axios.get("https://class-companion.cyclic.app/studentsbyGroup")
          .then((res) => {
            console.log(res.data);
            setDataTable(res.data)
            setIsLoading(false);
          })
          .catch((err) => {
            setError(err);
            setIsLoading(false);
            console.log(err);
          });
      }, 1000);
    }
  }, []);

  return (
    <div className="home-page">
    <Header />
    
    <div className="home">     
      <SideMenu type={accountType} page="sesions" />
      <div className="main-page" id="students-page">
      <h1>Students List</h1>
      {isLoading && <Loading />}
      {!isLoading && (<Table data={dataTable} column={column} sesiondata={sesiondata} />)}
    </div>
    </div>
    </div>
  );
}

export default Studentsbygroup;