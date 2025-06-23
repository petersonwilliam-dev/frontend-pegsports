import i18next from "i18next";

i18next.init({
    lng: 'pt',
    resources: {
        pt: {
            translation: {
                'pending': 'Pendente',
                'processing': 'Em processo',
                'shipped': 'Enviado',
                'delivered': 'Entregue',
                'completed': 'Concluído',
                'canceled': 'Cancelado',
                'paid': 'Pago',
                'failed': 'Falhou',
                'card': 'Cartão',
                'boleto': 'Boleto',
                'pix': 'PIX'
            }
        },
        en: {
            translation: {
                'pending': 'Pending',
                'processing': 'Processing',
                'shipped': 'Shipped',
                'delivered': 'Delivered',
                'completed': 'Completed',
                'canceled': 'Canceled',
                'paid': 'Paid',
                'failed': 'Failed',
                'card': 'Card',
                'boleto': 'Boleto',
                'pix': 'PIX'
            }
        }
    }
})

const translate = (status) => i18next.t(status)

export default translate