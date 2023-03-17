import React, { useEffect, useState } from "react";
import axios from "axios";

import "bootstrap-icons/font/bootstrap-icons.css";
import Loading from "./Loading";

const OrganisationUnits = () => {
  const [organisationUnitsList, setOrganisationUnitsList] = useState([]);
  const [organisationUnitGroupsList, setOrganisationUnitGroupsList] = useState([]);
  const [selectedOrganisationUnitGroup, setSelectedOrganisationUnitGroup] = useState(null);
  const [isLoading, setLoading] = useState(true);
  //hooks: useEffect,useState
  const getOrganisationUnitGroups = () => {
    const route =
      "https://education.hispwca.org/staging/api/organisationUnitGroups.json?paging=false";
    setLoading(true);
    axios
      .get(route)
      .then((response) => {
        console.log(response.data.organisationUnitGroups);
        setOrganisationUnitGroupsList(response.data.organisationUnitGroups);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  };
  const getOrganisationUnits = () => {
    const route =
      `https://education.hispwca.org/staging/api/organisationUnits.json?fields=id,name,organisationUnitGroups[id,displayName]&filter=organisationUnitGroups.id:in:[${selectedOrganisationUnitGroup}]`;
    setLoading(true);
    axios
      .get(route)
      .then((response) => {
        setOrganisationUnitsList(response.data.organisationUnits);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  /* Pour les boucler indéfiniment
  useEffect(() => {
    getOrganisationUnitGroups();
  }) */

  useEffect(() => {
    getOrganisationUnitGroups();
  }, [])

  useEffect(() => {
    if (selectedOrganisationUnitGroup){
        getOrganisationUnits();
    }
  }, [selectedOrganisationUnitGroup])

  return (
    <div>
      <h1>Liste des unités d'organisation</h1>
      {isLoading && <Loading />}
      <select className="form-control m-1" onChange={e=>setSelectedOrganisationUnitGroup(e.target.value)}>
        <option value={null}> Veuillez selectionner un groupe d'unité d'organisation</option>
        {
            organisationUnitGroupsList.map((organisationUnitGroup)=>(
                <option value={organisationUnitGroup.id}>{organisationUnitGroup.displayName}</option>
            )
            )
        }
      </select>
      {!isLoading && organisationUnitsList.length===0 && selectedOrganisationUnitGroup && <div className="text-center alert alert-warning m-1">Aucune unité d'organisation disponible</div>}
      {!isLoading && organisationUnitsList.length>0 && (
        <table className="table table-responsive table-hover table-bordered table-sm table-striped mt-2">
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th colSpan={2}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {organisationUnitsList.map((organisationUnit) => (
              <tr>
                <td>{organisationUnit.id}</td>
                <td>{organisationUnit.name}</td>
                <td title="details">
                  <i className="bi bi-search"></i>
                </td>
                <td title="update">
                  <i className="bi bi-pencil-square"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrganisationUnits;
