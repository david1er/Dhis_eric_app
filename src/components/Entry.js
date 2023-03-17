import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "./Loading";

const Entry = () => {
  const [absentsG, setAbsentsG] = useState("");
  const [absentsF, setAbsentsF] = useState("");
  const [presentsG, setPresentsG] = useState("");
  const [presentsF, setPresentsF] = useState("");
  const [periode, setPeriode] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [reponse, setReponse] = useState(null);

  const dataSend = () => {
    setLoading(true);
    const route = "https://education.hispwca.org/staging/api/dataValueSets";
    const data = {
      dataValues: [
        {
          dataElement: "gE1rRiNnFYM",
          period: periode.replaceAll('-',''),
          orgUnit: "egNwCx1EHKp",
          categoryOptionCombo: "EVujavdcpaL",
          value: absentsG,
          comment: "envoi par post",
        },
        {
          dataElement: "gE1rRiNnFYM",
          period: periode.replaceAll('-',''),
          orgUnit: "egNwCx1EHKp",
          categoryOptionCombo: "zPIS0xpAXXh",
          value: absentsF,
          comment: "envoi par post",
        },
        {
          dataElement: "OPhHR6LMyEa",
          period: periode.replaceAll('-',''),
          orgUnit: "egNwCx1EHKp",
          categoryOptionCombo: "EVujavdcpaL",
          value: presentsG,
          comment: "envoi par post",
        },
        {
          dataElement: "OPhHR6LMyEa",
          period: periode.replaceAll('-',''),
          orgUnit: "egNwCx1EHKp",
          categoryOptionCombo: "zPIS0xpAXXh",
          value: presentsF,
          comment: "envoi par post",
        },
      ],
    };
    
    
    //console.log(data);
    axios
      .post(route, data)
      .then((response) => {
        toast.success("Opération effectuée avec succès !")
        setLoading(false);
        setReponse("Opération effectuée avec succès !");
      })
      .catch((error) => {
        toast.error(error.message)
        setLoading(false);
        setReponse("erreur : ", error.message);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="col-8 offset-2">
          <center>
            <label>Période</label>
            <input
              className="form-control"
              type="date"
              value={periode}
              onChange={(e) => setPeriode(e.target.value)}
            />
            <h3 className="display-block text-secondary m-1">Sexe</h3>
            <table className="table table-bordered">
              <tr>
                <td></td>
                <td>G</td>
                <td>F</td>
              </tr>
              <tr>
                <td>xxx Élèves absents </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    onChange={(e) => setAbsentsG(e.target.value)}
                    value={absentsG}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    onChange={(e) => setAbsentsF(e.target.value)}
                    value={absentsF}
                  />
                </td>
              </tr>
              <tr>
                <td>xxx Élèves présents </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    onChange={(e) => setPresentsG(e.target.value)}
                    value={presentsG}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    onChange={(e) => setPresentsF(e.target.value)}
                    value={presentsF}
                  />
                </td>
              </tr>
            </table>
          </center>
          {isLoading && <Loading />}
          <button className="btn btn-primary btn-sm" onClick={() => dataSend()}>
            Envoyer
          </button>
          {!isLoading && reponse && <div className="text-center alert alert-success m-1">Enregistrement effectué avec success pour la periode {periode}</div>}
          {!periode && isLoading && toast.error("Veuillez selectionner la periode")}

          
        </div>
      </div>
    </div>
  );
};

export default Entry;
