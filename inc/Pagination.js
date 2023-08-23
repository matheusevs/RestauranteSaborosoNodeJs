const { query } = require('express');
let conn = require('./db');

class Pagination {

    constructor(
        query,
        params = [],
        itensPerPage = 10
    ){
      
        this.query = query;
        this.params = params;
        this.itensPerPage = itensPerPage;
        this.currentPage = 1;
        
    }

    getPage(page){

        this.currentPage = page - 1;

        this.params.push(
            this.currentPage * this.itensPerPage,
            this.itensPerPage
        )

        return new Promise((resolve, reject) => {

            conn.query([this.query, 'SELECT FOUND_ROWS() AS FOUND_ROWS;'].join(';'), this.params, (err, results) => {
                console.log(this.params);
                if(err){

                    reject(err);

                } else {

                    this.data = results[0];
                    this.total = results[1][0].FOUND_ROWS;
                    this.totalPages = Math.ceil(this.total / this.itensPerPage);
                    this.currentPage++;

                    resolve(this.data);

                }

            });

        });

    }

    getTotal(){
        return this.total();
    }

    getCurrentPage(){
        return this.currentPage;
    }

    getTotalPages(){
        return this.totalPages;
    }

    getNavigation(params){

        let limitPagesNav = 5;
        let links = [];
        let nrStart = 0;
        let nrEnd = 0;

        if(this.getTotalPages() < limitPagesNav){
            limitPagesNav = this.getTotalPages();
        }

        if((this.getCurrentPage() - parseInt(limitPagesNav / 2)) < 1){ //Se estamos nas primeiras páginas

            nrStart = 1;
            nrEnd = limitPagesNav;

        } else if((this.getCurrentPage() + parseInt(limitPagesNav / 1)) > this.getTotalPages()){ //Se estamos chegando nas últimas páginas

            nrStart = this.getTotalPages() - limitPagesNav;
            nrEnd = this.getTotalPages();

        } else { //Se estamos nas páginas do meio

            nrStart = this.getCurrentPage() - parseInt(limitPagesNav / 2);
            nrEnd = this.getCurrentPage() + parseInt(limitPagesNav / 2);

        }

        for(let x = nrStart; x <= nrEnd; x++){

            links.push({
                text: x,
                href: '?' + this.getQueryString(Object.assign({}, params, {page: x})),
                active: (x === this.getCurrentPage())
            });

        }

        return links;

    }

    getQueryString(params){

        let queryString = [];

        for(let name in params){

            queryString.push(`${name}=${params[name]}`);

        }

        return queryString.join('&');

    }

}

module.exports = Pagination;