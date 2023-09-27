import { create } from 'zustand'
import axios from 'axios'
import debounce from '../helpers/debounce'

const HomeStore = create((set) => ({
    coins: [],
    trending: [],
    query: '',
    search: false,
        setQuery:(e)=>{
            set({query: e.target.value})
            HomeStore.getState().searchCoins()
        },

        searchCoins:debounce( async()=>{
            const {query,trending} = HomeStore.getState()

            if(query.length > 2){
                const res = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`)
            
                const coins = res.data.coins.map(coin=>{
                    return{
                        name: coin.name,
                        image: coin.large,
                        id:coin.id,
                    }
                })

                set({coins,search:true})
            }
            else{
                set({coins:trending,search:false})
            }
        
        },500),

    fetchCoin: async ()=>{

        const [res,btcres] = await Promise.all([
            axios.get('https://api.coingecko.com/api/v3/search/trending'),
            axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`)
        ])
        
        const btcPrice = btcres.data.bitcoin.usd
        
        const coins = res.data.coins.map(coin =>{
            return{
                name:coin.item.name,
                image: coin.item.large,
                id: coin.item.id,
                PriceBtc: (coin.item.price_btc).toFixed(12),
                priceUSD: (coin.item.price_btc * btcPrice).toFixed(12)
            }
        })
        console.log(coins)
        set({coins, trending: coins})
    }
}))

export default HomeStore