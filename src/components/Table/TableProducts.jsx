import styles from './TableProducts.module.css'

import { getRatingMean } from '../../utils/calcRating'

import { Link } from 'react-router-dom'

function TableProducts({products}) {
    return (
        <table className={styles.table_products}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>Categoria</th>
                    <th>Média de avaliação</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {products.map(product => (
                    <tr>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>{getRatingMean(product.ratings).toFixed(2)}</td>
                        <td className={styles.action}>
                            <Link to={`/dashboard/product/edit/${product._id}`} className={styles.edit}><ion-icon name="pencil-outline"></ion-icon></Link>
                            <Link className={styles.delete}><ion-icon name="trash-bin-outline"></ion-icon></Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TableProducts