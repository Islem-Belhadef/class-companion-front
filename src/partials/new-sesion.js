import "../styles/edit.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const NewSesion = ({ setShowAddSesion }) => {
  useEffect(() => {
    Axios.post("https://class-companion.cyclic.app/modules", {
      id: window.localStorage.getItem("token"),
    }).then((res) => {
      setModulesList(res.data);
      console.log(ModulesList);
    });
  }, []);

  const [ModulesList, setModulesList] = useState([]);
  const [newDate, setNewDate] = useState();
  const [Time, setTime] = useState();
  const [Newmodule, setNewmodule] = useState();

  const [Newtype, setNewtype] = useState();
  const [newGroup, setNewGroup] = useState();

  let navigate = useNavigate();

  const handleCreate = (e) => {
    e.preventDefault();
    Axios.post("https://class-companion.cyclic.app/addsesion", {
      teacher_id: window.localStorage.getItem("token"),
      sesiondate: newDate,
      sesiontime: Time,
      class_type: Newtype,
      module: Newmodule,
      group: newGroup,
    })
      .then((res) => {
        console.log(res);
        console.log("added");
        setTimeout(() => navigate(0), 300);
        navigate("/studentsbygroup", {
          state: {
            teacher_id: window.localStorage.getItem("token"),
            sesiondate: newDate,
            sesiontime: Time,
            class_type: Newtype,
            class_name: Newmodule,
          },
        });
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  };

  return (
    <div className="overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Add new session</h2>
        </div>
        <form>
          <div className="labels">
            <label>Date</label>
          </div>
          <div className="info-inputs">
            <input
              id="date"
              type="date"
              name="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />
          </div>

          <label>Time</label>
          <div className="info-inputs">
            <input
              id="card-number"
              type="time"
              name="sesiontime"
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div className="labels">
            <label>Type</label>
            <label>Module</label>
            <label>Group</label>
          </div>
          <div className="select-inputs">
            <select
              name="class_type"
              id="speciality"
              defaultValue=""
              onChange={(e) => setNewtype(e.target.value)}
            >
              <option disabled value="">
                {""}
              </option>
              <option value="TP">TP</option>
              <option value="TD">TD</option>
            </select>

            <select
              name="module"
              id="speciality"
              defaultValue=""
              onChange={(e) => {
                setNewmodule(e.target.value);

                console.log(Newmodule);
              }}
            >
              <option disabled value="">
                {""}
              </option>

              {ModulesList.map((modul) => (
                <option
                  value={`${modul.name} ${modul.speciality}`}
                  key={`${modul._id}`}
                >{`${modul.name}`}</option>
              ))}
            </select>

            <select
              name="group"
              id="group"
              defaultValue=""
              onChange={(e) => setNewGroup(e.target.value)}
            >
              <option disabled value="">
                {""}
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div className="buttons-container">
            <button
              id="cancel-btn"
              className="btn"
              onClick={() => {
                setShowAddSesion(false);
              }}
            >
              CANCEL
            </button>

            <button
              className="btn"
              type="submit"
              id="submit-btn"
              onClick={handleCreate}
            >
              CREATE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewSesion;
