import FormProduct from '../../Form/FormProduct'
import useProduct from '../../../hooks/useProduct'

function AddProduct() {

    const {createProduct} = useProduct()

    return (
        <div>
            <h4>Adicionar produto</h4>
            <FormProduct handleSubmit={createProduct} btnText="Cadastrar produto" />
        </div>
    )
}

export default AddProduct