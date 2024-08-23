
    
import api from '../../api/api';

class IndicatorsService {
    createIndicator(data) {
        return api
            .post("/indicators", data)
            .then(response => {
                return response.data.data;
            });
    }

    updateIndicator(data, id) {
        return api
            .patch("/indicators/" + id, data)
            .then(response => {
                return response.data.data;
            });
    }

    searchIndicator({page, limit,searchText=null,sort=null,order}) {
        let url = `/indicators?page=${page}&limit=${limit}`
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

    getIndicator(id) {
        return api
            .get("/indicators/" + id)
            .then(response => {
                return response.data.data;
            });
    }


    deleteIndicator( id) {
        return api
            .delete("/indicators/" + id)
            .then(response => {
                return response.data.data;
            });
    }

    indicatorsDo({method,payload}){
        return api
            .post("/indicators/do",{method,payload})
            .then(response => {
                return response.data.data;
            });
    }

    indicatorDo({method,payload,id}){
        return api
            .post("/indicators/do/"+id,{method,payload})
            .then(response => {
                return response.data.data;
            });
    }
}

export default new IndicatorsService();

    