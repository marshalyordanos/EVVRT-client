import api from "../../api/api";

class RegionsService {
  createRegion(data) {
    return api.post("/regions", data).then((response) => {
      return response.data.data;
    });
  }

  updateRegion(data, id) {
    return api.patch("/regions/" + id, data).then((response) => {
      return response.data.data;
    });
  }

  searchRegion({ page, limit, searchText = null, sort = null, order, type }) {
    let url = `/regions?page=${page}&limit=${type ? 100000 : limit}`;
    if (sort) {
      const sortValue =
        order == "ascend" ? sort : order == "descend" ? "-" + sort : "";
      url = url + `&sort=${sortValue}`;
    }

    if (searchText) {
      url = url + `&searchText=${searchText}`;
    }

    return api.get(url).then((response) => {
      return { data: response.data.data, total: response.data.total };
    });
  }

  getRegion(id) {
    return api.get("/regions/" + id).then((response) => {
      return response.data.data;
    });
  }

  deleteRegion(id) {
    return api.delete("/regions/" + id).then((response) => {
      return response.data.data;
    });
  }

  regionsDo({ method, payload }) {
    return api.post("/regions/do", { method, payload }).then((response) => {
      return response.data.data;
    });
  }

  regionDo({ method, payload, id }) {
    return api
      .post("/regions/do/" + id, { method, payload })
      .then((response) => {
        return response.data.data;
      });
  }
}

export default new RegionsService();
