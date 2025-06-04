import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import useFlashMessage from './useFlashMessage'
import decodeToken from "../utils/decodeToken";

export default function useAddress() {

    const [addresses, setAddresses] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        const user = decodeToken(token)

        if (user) {
            getAddress(user._id)
        }

    }, [])

    const {setFlashMessage} = useFlashMessage()

    async function addAddress(address) {
        let msgType = 'success'

        const data = await api.post("/users/address", address)
        .then(response => {
            return response.data
        })
        .catch(err => {
            msgType = 'error'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)
        navigate(0)

    }

    async function getAddress() {
        api.get(`/users/address`)
        .then(response => {
            setAddresses(response.data.addresses)
        })
        .catch(err => {
            setFlashMessage(err.response.data.message, 'error')
        })
    }

    async function editAddress(address) {

        let msgType = 'success'

        const data = await api.patch(`/users/address/${address._id}`, address)
        .then(response => {
            const updated = addresses.map(i => i._id === address._id ? address : i)
            setAddresses(updated)
            return response.data
        })
        .catch(err => {
            msgType = 'error'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)
        navigate(0)
    }

    async function removeAddress(id) {
        let msgType = 'success'

        const data = await api.delete(`/users/address/${id}`)
        .then(response => {
            setAddresses(prev => prev.filter(address => address._id !== id))
            return response.data
        })
        .catch(err => {
            msgType = 'error'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)
    }

    return {addAddress, editAddress, removeAddress, addresses}
}