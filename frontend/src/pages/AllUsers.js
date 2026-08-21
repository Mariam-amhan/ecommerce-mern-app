import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";
import { FaCheckSquare } from "react-icons/fa";
import ChangeUserRole from "../components/ChangeUserRole";
import { MdDeleteForever } from "react-icons/md";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [openUpdateUser, setOpenUpdateUser] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: "",
  });

  const getAllUsers = async () => {
    const dataResponse = await fetch(SummaryApi.allUsers.url, {
      method: SummaryApi.allUsers.method,
      credentials: "include",
    });

    const response = await dataResponse.json();

    if (response.success) {
      setAllUsers(response.data);
    }

    if (response.error) {
      toast.success(response.message);
    }
  };

  const handleDeleteUser = async (id) => {
    const dataResponse = await fetch(SummaryApi.deleteUser.url, {
      method: SummaryApi.deleteUser.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ _id: id }),
    });

    const response = await dataResponse.json();

    if (response.success) {
      toast.success(response.message);
      getAllUsers();
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <>
      <div className="bg-white py-3 px-4 flex justify-between items-center">
        <h2 className=" font-bold text-lg">All Users</h2>
      </div>

      <div className=" bg-white pb-4 mt-3">
        <table className=" w-full userTable">
          <thead>
            <tr className=" bg-black text-white">
              <th>Sr.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>IsVerified</th>
              <th>Create Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {allUsers.map((el, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{el?.name}</td>
                  <td>{el?.email}</td>
                  <td>{el?.role}</td>
                  {el?.isVerified && (
                    <td className=" flex justify-center items-center h-10">
                      <FaCheckSquare className=" bg-white text-green-600 w-6 h-6" />
                    </td>
                  )}
                  <td>{moment(el?.createdAt).format("L")}</td>
                  <td className="">
                    <div className=" flex justify-around items-center ">
                      <button
                        onClick={() => {
                          setOpenUpdateUser(true);
                          setUpdateUserDetails(el);
                        }}
                        className=" bg-green-200 p-2 rounded-full cursor-pointer hover:bg-green-100 hover:text-white"
                      >
                        <MdModeEdit />
                      </button>

                      <button
                        onClick={() => handleDeleteUser(el?._id)}
                        className=" bg-red-200 p-2 rounded-full cursor-pointer hover:bg-red-100 hover:text-white"
                      >
                        <MdDeleteForever />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {openUpdateUser && (
          <ChangeUserRole
            onClose={() => setOpenUpdateUser(false)}
            name={updateUserDetails.name}
            email={updateUserDetails.email}
            role={updateUserDetails.role}
            userId={updateUserDetails._id}
            getAllUsers={() => getAllUsers()}
          />
        )}
      </div>
    </>
  );
};

export default AllUsers;
