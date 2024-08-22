
    
import api from '../../api/api';

class SitesService {
    createSite(data) {
        return api
            .post("/sites", data)
            .then(response => {
                return response.data.data;
            });
    }

    updateSite(data, id) {
        return api
            .patch("/sites/" + id, data)
            .then(response => {
                return response.data.data;
            });
    }

    searchSite({page, limit,searchText=null,sort=null,order}) {
        let url = `/sites?page=${page}&limit=${limit}`
        if(sort){
    const sortValue = order == 'ascend' ? sort : order == 'descend' ? '-'+sort:'';
            url = url + `&sort=${sortValue}`
        }

        if(searchText){
           
            url = url + `&searchText=${searchText}`
        }

        return api
            .get(url)
            .then(response => {
                return {data:response.data.data,total:response.data.total};
            });
    }

    getSite(id) {
        return api
            .get("/sites/" + id)
            .then(response => {
                return response.data.data;
            });
    }


    deleteSite( id) {
        return api
            .delete("/sites/" + id)
            .then(response => {
                return response.data.data;
            });
    }

    sitesDo({method,payload}){
        return api
            .post("/sites/do",{method,payload})
            .then(response => {
                return response.data.data;
            });
    }

    siteDo({method,payload,id}){
        return api
            .post("/sites/do/"+id,{method,payload})
            .then(response => {
                return response.data.data;
            });
    }
}

export default new SitesService();

    