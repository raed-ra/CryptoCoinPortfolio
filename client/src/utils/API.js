import axios from "axios";

// Gets my github repos and returns them as "projects"
let baseURL
process.env.NODE_ENV === 'development' ? baseURL = 'http://localhost:3001' : baseURL = ''

export default {

    hometableCryptoData: async (page, limit) => {
        try {
            const url = baseURL + '/api/cryptocompare/table?page=' + String(page)
            return axios.get(url, { withCredentials: true })
        } catch (err) {
            if (err.response.status === 401) {
            }
        }
    },

    homeSideBarNews: async () => {
        try {
            const url = baseURL + '/api/cryptocompare/news'
            console.log(url);
            return axios.get(url, { withCredentials: true })
        } catch (err) {
            if (err.response.status === 401) {
            }
        }
    },

    loginPost: async (payload) => {
        try {
            const url = baseURL + '/api/login'
            console.log(url);
            return axios.post(url, {
                email: payload.email,
                password: payload.password,
            },
                {
                    withCredentials: true
                })
        } catch (err) {
            if (err.response.status === 401) {
            }
        }
    },

    registerPost: async (payload) => {
        try {
            const url = baseURL + '/api/login'
            console.log(url);
            return axios.post(url, {
                email: payload.email,
                password: payload.password,
            },
                {
                    withCredentials: true
                })
        } catch (err) {
            if (err.response.status === 401) {
            }
        }
    },

    portfolioHoldingOnePrice: async (coin, currency) => {
        try {
            const url = baseURL + '/api/cryptocompare/oneprice?coin=' + String(coin) + '&currency=' + String(currency)
            return axios.get(url, { withCredentials: true })
        } catch (err) {
            if (err.response.status === 401) {
            }
        }
    },

    portfolioHoldingsDatabase: async () => {
        try {
            const url = baseURL + '/api/holding'
            return axios.get(url, { withCredentials: true })
        } catch (err) {
            if (err.response.status === 401) {
            }
        }
    },

    portfolioTransactionsDatabase: async () => {
        try {
            const url = baseURL + '/api/transactions/addcoin'
            return axios.get(url, { withCredentials: true })
        } catch (err) {
            if (err.response.status === 401) {
            }
        }
    },

    componentChart: async (index) => {
        try {
            const url = baseURL + '/api/cryptocompare/chart'
            return axios.post(url, { index }, {
                withCredentials: true,
            })
        } catch (err) {
            if (err.response.status === 401) {
            }
        }
    },

    componentAddModal: async (payload) => {
        try {
            const url = baseURL + '/api/transactions/addcoin'
            return axios.post(url, payload, {
                withCredentials: true,
            })
        } catch (err) {
            if (err.response.status === 401) {
            }
        }
    },

    componentEditModal: async (payload) => {
        try {
            const url = baseURL + '/api/transactions/editcoin'
            return axios.update(url, payload, {
                withCredentials: true,
            })
        } catch (err) {
            if (err.response.status === 401) {
            }
        }
    },

    componentPortfolioChartHolding: async () => {
        try {
            const url = baseURL + '/api/holding'
            return axios.get(url, {
                withCredentials: true,
            })
        } catch (err) {
            if (err.response.status === 401) {
            }
        }
    },


}