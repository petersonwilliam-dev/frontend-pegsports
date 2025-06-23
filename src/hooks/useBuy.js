import api from '../utils/api'
import useFlashMessage from './useFlashMessage'
import { useNavigate } from 'react-router-dom'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'

export default function useBuy() {

    const navigate = useNavigate()
    const stripe = useStripe()
    const elements = useElements()
    
    const {setFlashMessage} = useFlashMessage()

    async function createBuy(products, address) {

        console.log(products)

        let msgType = 'success'

        const cardElement = elements.getElement(CardElement)

        if (!stripe || !elements) {
            setFlashMessage("Stripe não está carregado corretamente", 'error');
            return;
        }

        if (cardElement._empty) {
            setFlashMessage("Todos os dados do cartão estão vazios", 'error')
            return
        }

        if (!cardElement._complete) {
            setFlashMessage("Preencha todos os dados do cartão", 'error')
            return
        }

        const buy = {
            buyProducts: products,
            address,
            method: 'card',
            shippingCost: 10
        }

        api.post("/buy/createbuy", buy)
        .then(async (response) => {
            const clientSecret = response.data.clientSecret
            const buys = response.data.buys

            

            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement
                }
            })
            
            console.log(buys)
            if (error) {
                msgType = 'error'
                console.log(error)
                setFlashMessage("Houve um erro ao completar o pagamento: " + error.response, msgType)
            } else if (paymentIntent.status === 'succeeded') {
                api.patch("/buy/confirmpayment", {buys})
                .then(response => {
                    setFlashMessage(response.data.message, msgType)
                    navigate("/finishbuy", {state: {
                        buys
                    }})
                })
                .catch(err => {
                    let msgType = 'error'
                    setFlashMessage(err.response.data.message, msgType)
                })
            }
        })
        .catch(err => {
            let msgType = 'error'
            setFlashMessage(err.response.data.message, msgType)
        })

    }

    async function getBuys() {
        
        const data = await api.get("/buy/")
        .then(response => {
            return response.data.buys
        })
        .catch(err => {
            setFlashMessage("Houve um erro ao buscar as suas compras", 'error')
            return
        })

        return data
    }

    return {createBuy, getBuys}
}