import axios from 'axios';

export class sneakersConnect {

    static async getAll() {
        const response = await axios.get('https://6539acd3e3b530c8d9e893c2.mockapi.io/sneakers')
        return response.data;
    }

    static async getPage(limit, page) {

        const response = await axios.get('https://6539acd3e3b530c8d9e893c2.mockapi.io/sneakers', {
            params: {
                limit: limit,
                page: page
            }
        })
        return response.data;
    }

    static async getCart() {
        const response = await axios.get(`https://6539acd3e3b530c8d9e893c2.mockapi.io/items/1`)
        return response.data.cart;
    }

    static async getFavorites() {
        const response = await axios.get(`https://6539acd3e3b530c8d9e893c2.mockapi.io/items/2`)
        return response.data.favorites;
    }

    static async getPurchases() {
        const response = await axios.get(`https://6539acd3e3b530c8d9e893c2.mockapi.io/items/3`)
        return response.data.purchases;
    }

    ///

    static async putCartItem(prevData, data) {
        const newItem = { cart: [...prevData, data] }
        await axios.put(`https://6539acd3e3b530c8d9e893c2.mockapi.io/items/1`, newItem)
    }

    static async putFavoritesItem(prevData, data) {
        const newItem = { favorites: [...prevData, data] }
        await axios.put(`https://6539acd3e3b530c8d9e893c2.mockapi.io/items/2`, newItem)
    }

    static async putPurchases(prevData, data) {
        const newItem = { purchases: [...prevData, data] }
        await axios.put(`https://6539acd3e3b530c8d9e893c2.mockapi.io/items/3`, newItem)
    }

    ///

    static async removeCartItem(data) {
        const newArray = { cart: [...data] }
        await axios.put(`https://6539acd3e3b530c8d9e893c2.mockapi.io/items/1`, newArray)
    }

    static async removeFavoritesItem(data) {
        const newArray = { favorites: [...data] }
        await axios.put(`https://6539acd3e3b530c8d9e893c2.mockapi.io/items/2`, newArray)
    }
}

