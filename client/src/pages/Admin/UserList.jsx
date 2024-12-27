import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserByAdmin,
  getAllUsersByAdmin,
} from "../../features/usersList/usersListApiSlice";
import AlertMessage from "../../../utils/AlertMessage";
import { setMessageEmpty } from "../../features/usersList/usersListSlice";
import MainLoader from "../../../utils/MainLoader";
import MetaData from "../../../utils/MetaData";
import Sidebar from "./Sidebar";
import { MDBDataTable } from "mdbreact";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const UserList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { users, loader, message, error } = useSelector(
    (state) => state.usersList
  );

  useEffect(() => {
    dispatch(getAllUsersByAdmin());
  }, [dispatch]);

  // Edit user by admin
  const handleEditUser = (id) => {
    navigate(`/admin/users/${id}`);
  };

  // Delete user by admin
  const handleDeleteUser = (id) => {
    swal({
      title: "Are you sure?",
      text: "",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteUserByAdmin(id));
      }
    });
  };

  // Can't delete
  const hanldeCantDelete = () => {
    swal({
      title: "You can't delete an Administrator",
      text: "",
      icon: "error",
      dangerMode: true,
    })
  }

  useEffect(() => {
    if (error) {
      AlertMessage({ type: "error", msg: error });
      dispatch(setMessageEmpty());
    }
    if (message) {
      AlertMessage({ type: "success", msg: message });
      dispatch(setMessageEmpty());
    }
  }, [dispatch, error, message]);

  // Table data
  const setUsers = () => {
    const data = {
      columns: [
        {
          label: "User ID",
          field: "id",
        },
        {
          label: "Name",
          field: "name",
        },
        {
          label: "Email",
          field: "email",
        },
        {
          label: "Role",
          field: "role",
        },
        {
          label: "Joined On",
          field: "joined",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    {
      users &&
        users.forEach((user) => {
          data.rows.push({
            id: user._id,
            name: user.name,
            email: user.email,
            joined: String(user.createdAt).substring(0, 10),
            role: user.role,
            actions: (
              <>
                <button
                  onClick={() => handleEditUser(user._id)}
                  className="btn btn-sm btn-warning mr-2"
                >
                  <div className="fas fa-edit"></div>{" "}
                </button>
                {user.role === "admin" ? (
                  <button
                    onClick={hanldeCantDelete}
                    className="btn btn-sm btn-danger disabled"
                  >
                    <div className="fas fa-trash"></div>{" "}
                  </button>
                ) : (
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="btn btn-sm btn-danger"
                  >
                    <div className="fas fa-trash"></div>{" "}
                  </button>
                )}
              </>
            ),
          });
        });
    }

    return data;
  };

  return (
    <>
      <MetaData title={"All User Details"} />

      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <h1 className="my-4">All Users</h1>
          {loader ? (
            <MainLoader />
          ) : (
            <MDBDataTable data={setUsers()} className="px-3" striped bordered />
          )}
        </div>
      </div>
    </>
  );
};

export default UserList;
