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
import AbsenceCard from "../partials/absence-card";

function Absences() {
  const navigate = useNavigate();

  const loggedIn = window.localStorage.getItem("loggedIn");
  const accountType = window.localStorage.getItem("accountType");

  const [absencesList, setAbsencesList] = useState([]);
  const [studentsList, setStudentsList] = useState([]);
  const [teachersList, setTeachersList] = useState([]);
  const [sesions, setSesions] = useState([]);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    } else {
      setIsLoading(true);
      Axios.get("http://localhost:3001/students")
        .then((res) => {
          console.log(res.data);
          setStudentsList(res.data);
       
          Axios.get("http://localhost:3001/teachers")
            .then((res) => {
              console.log(res.data);
              setTeachersList(res.data);
              setTimeout(() => {
                Axios.get("http://localhost:3001/absences")
                  .then((res) => {
                    console.log(res.data);
                    setAbsencesList(res.data);
                    setIsLoading(false);
                    
                  })
                  .catch((err) => {
                    setError(err);
                    console.log(err);
                    setIsLoading(false);
                  });
              }, 1000);
            })
            .catch((err) => {
              setError(err);
              console.log(err);
              setIsLoading(false);
            });
        })
        .catch((err) => {
          setError(err);
          console.log(err);
          setIsLoading(false);
        });
        

    }
  }, []);

  return (
    <div className="home-page">
      <Header />

      <div className="home">
        <SideMenu type={accountType} page="absences" />

        <div className="main-page">
          <div className="settings">
            <h1>Absences List</h1>
          </div>
          {error && <h1>{error}</h1>}
          {isLoading && <Loading />}
          {!isLoading && !error && (
              <div className="cards">
                {absencesList.map((absence) => (
                  <AbsenceCard
                    key={absence._id}
                    
                    absence={absence}
                    studentsList={studentsList}
                    teachersList={teachersList}
                  />
                ))}
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default Absences;
