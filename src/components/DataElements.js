import React, { useEffect, useState } from "react";
import axios from "axios";

let api =
  "https://education.hispwca.org/staging/api/dataElements.json?fields=id,name,domainType,aggregationType";
const DataElements = () => {
  const [dataElementsList, setDataElementsList] = useState([]);
  //hooks: useEffect,useState
  const getDataElements = () => {
    axios
      .get(api)
      .then((response) => {
        console.log(response.data.dataElements);
        setDataElementsList(response.data.dataElements);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  useEffect(() => {
    getDataElements();
  }, []);

  return (
    <div>
      <h1>Liste des éléments de données</h1>
      <table className="table table-responsive table-hover table-bordered table-sm table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>AggregationType</th>
            <th>DomainType</th>
          </tr>
        </thead>
        <tbody>
          {dataElementsList.map((dataElement) => (
            <tr>
              <td>{dataElement.id}</td>
              <td>{dataElement.name}</td>
              <td>{dataElement.aggregationType}</td>
              <td>{dataElement.domainType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataElements;
