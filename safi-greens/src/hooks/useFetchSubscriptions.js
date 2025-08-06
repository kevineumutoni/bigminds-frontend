import { useState, useEffect, use } from "react";
import { fetchSubscription } from "../utils/api/fetchSubscription";

export function useFetchSubscriptions(){
    const [subscriptions, setSubscriptions] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(()=>{
        fetchSubscription()
    })
}