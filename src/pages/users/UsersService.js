import api from "../../api/api";

class UsersService {
  createUser(data) {
    return api.post("/users/create", data).then((response) => {
      return response.data.data;
    });
  }

  updateUser(data, id) {
    return api.patch("/users/update/" + id, data).then((response) => {
      return response.data.data;
    });
  }

  searchUser({ page, limit, searchText = null, sort = null, order, type }) {
    let url = `/users?page=${page}&limit=${limit}`;
    if (sort) {
      const sortValue =
        order == "ascend" ? sort : order == "descend" ? "-" + sort : "";
      url = url + `&sort=${sortValue}`;
    }

    if (searchText) {
      url = url + `&searchText=${searchText}`;
    }

    if (type) {
      url = url + `&role=${type}`;
    }
    return api.get(url).then((response) => {
      return { data: response.data.data, total: response.data.total };
    });
  }

  getUser(id) {
    return api.get("/users/" + id).then((response) => {
      return response.data.data;
    });
  }

  deleteUser(id) {
    return api.delete("/users/delete/" + id).then((response) => {
      return response.data.data;
    });
  }

  deleteUser2(id) {
    return api.patch("/users/delete2/" + id).then((response) => {
      return response.data.data;
    });
  }
  usersDo({ method, payload }) {
    return api.post("/users/do", { method, payload }).then((response) => {
      return response.data.data;
    });
  }

  userDo({ method, payload, id }) {
    return api.post("/users/do/" + id, { method, payload }).then((response) => {
      return response.data.data;
    });
  }
}

export default new UsersService();
