import React, { useEffect, useState } from "react";
import axios from "axios";
import { calculMoyenne } from "../utils";
import { toast } from "react-toastify";
import Loading from "./Loading";

let api =
  "https://education.hispwca.org/staging/api/users.json?paging=false&fields=id,displayName,userCredentials[lastLogin]";
const Users = () => {
  const [usersList, setUsersList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  //hooks: useEffect,useState
  const getUsers = () => {
    setLoading(true);
    axios
      .get(api)
      .then((response) => {
        console.log(response.data.users);
        setUsersList(response.data.users);
        toast.success("Opération effectuée avec succès !");
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <h1>Liste des utilisateurs</h1>
      {isLoading && <Loading />}
      {!isLoading && usersList.length===0 && <div className="text-center alert alert-warning m-1">Aucun utilisateurs disponible</div>}
      {!isLoading && usersList.length>0 && (
      <table className="table table-responsive table-hover table-bordered table-sm table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Last Login</th>
          </tr>
        </thead>
        <tbody>
          {usersList.map((user) => (
            <tr>
              <td>{user.id}</td>
              <td>{user.displayName}</td>
              <td>{user.userCredentials.lastLogin}</td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  );
};

export default Users;
