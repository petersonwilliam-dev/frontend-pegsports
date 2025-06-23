import { CardElement } from "@stripe/react-stripe-js"

function ModalCard() {

    return (
        <div className="modal fade" id="modalCard" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Adicionar cartão</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <CardElement />
                </div>
                </div>
            </div>
        </div>
    )
}

export default ModalCard