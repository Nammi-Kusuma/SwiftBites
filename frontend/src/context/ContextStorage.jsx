import { createContext, useEffect, useState } from "react";
export const ContextStorage = createContext(null)
import axios from 'axios'

const ContextStorageProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = "https://swiftbites-backend.onrender.com"
    const [token, setToken] = useState("")
    const [food_list, setFoodlist] = useState([])

    const addToCart = async (itemId) => {
        if(!cartItems[itemId]) {
            setCartItems((prev) => ({...prev, [itemId]:1}))
        } else {
            setCartItems((prev) => ({...prev, [itemId]:prev[itemId]+1}))
        }

        if(token) {
            await axios.post(url+"/cart/add", {itemId}, {headers: {token}})
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]:prev[itemId]-1}))

        if(token) {
            await axios.post(url+"/cart/remove", {itemId}, {headers: {token}})
        }
    }

    const cartTotal = () => {
        let total = 0;
        for(const item in cartItems) {
            if(cartItems[item]>0) {
                let itemInfo = food_list.find((prod) => prod._id === item);
                if (itemInfo) {
                    total += itemInfo.price * cartItems[item];
                }
            }
        }

        return total;
    }

    const fetchFoodList = async () => {
        let newUrl = url + "/food/list"
        const response = await axios.get(newUrl)

        // console.log(response)
        setFoodlist(response.data.data)
    }

    const loadCartData = async (token) => {
        // const response = await axios.post(url+"/cart/get", {}, {headers: {token}})
        // // console.log(response)

        // setCartItems(response.data.cartData)
        try {
            const response = await axios.post(url + "/cart/get", {}, { headers: { token } });
            setCartItems(response.data.cartData);
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    }

    useEffect(() => {
        async function loadData () {
            await fetchFoodList();
            if(localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loadData();
    }, [])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        cartTotal,
        url,
        token,
        setToken
    }

    return (
        <ContextStorage.Provider value={contextValue}>
            {props.children}
        </ContextStorage.Provider>
    )
}

export default ContextStorageProvider
