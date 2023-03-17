import React, { useEffect, useState } from "react";
import axios from "axios";

let api =
  "https://education.hispwca.org/staging/api/programs.json?paging=false&fields=id,name,categoryCombo[id,name]";
const Programs = () => {
  const [programsList, setProgramsList] = useState([]);
  //hooks: useEffect,useState
  const getPrograms = () => {
    axios
      .get(api)
      .then((response) => {
        console.log(response.data.programs);
        setProgramsList(response.data.programs);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  useEffect(() => {
    getPrograms();
  }, []);

  return (
    <div>
      <h1>Liste des programmes</h1>
      <table className="table table-responsive table-hover table-bordered table-sm table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th colSpan={2}>Category Combo</th>
          </tr>
        </thead>
        <tbody>
          {programsList.map((program) => (
            <tr>
              <td>{program.id}</td>
              <td>{program.name}</td>
              <td>{program.categoryCombo.id}</td>
              <td>{program.categoryCombo.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Programs;
