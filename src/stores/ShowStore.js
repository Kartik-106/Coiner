import { create } from 'zustand'
import axios from 'axios'

const ShowStore = create((set) => ({
    graphData: [],
    reset:()=>{
        set({graphData:[],dataRes:null})
    },
    fetchData: async(id) =>{

        const [graphRes,dataRes] = await Promise.all([
            axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=300`),
            axios.get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&market_data=true`),
        ])
        
        const graphData = graphRes.data.prices.map((price)=>{
            const [timestamp, pri] = price;
            const date = new Date(timestamp).toLocaleDateString("en-us")
            return{
                Date: date,
                prices: pri,
            }
        })
        set({graphData})
        set({dataRes})
    },
}))

export default ShowStore