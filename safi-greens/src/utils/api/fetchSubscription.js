const baseUrl = process.env.REACT_APP_BASE_URL
const token = process.env.REACT_APP_API_TOKEN


export const fetchSubscription = async ()=>{
    try{
        const response = await fetch(`${baseUrl}/subscriptions/`,{
        method: 'GET',
        headers:{
        "content-type": 'application/json',
        "Authentication": ` Bearer ${token}` 
        },
        })

        if(!response){
            throw new Error("failed to fetch subscribed orders")
        }
        const subs= response.json()
        return subs

    }catch(error){
        throw new Error("subscriptions not found")
    }

}