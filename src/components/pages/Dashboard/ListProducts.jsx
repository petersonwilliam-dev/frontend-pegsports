import { useState, useEffect, use } from "react"

import styles from './ListProducts.module.css'
import TableProducts from "../../Table/TableProducts"

import useProduct from "../../../hooks/useProduct"
import Pagination from "../../Pagination/Pagination"

function ListProducts() {

    const [name, setName] = useState('')
    const [products, setProducts] = useState([])
    const {getProducts} = useProduct()
    const [page, setPage] = useState(1)
    const [hasNextPage, setHasNextPage] = useState(false)
    const [order, setOrder] = useState(false)

    useEffect(() => {
        const fetchProducts = async () => {
            const limit = 15
            const fp = await getProducts({name, limit, page, sort: order})
            const fetchNext = await getProducts({name, limit, page: page + 1, hasProduct: true})

            setProducts(fp)
            setHasNextPage(fetchNext)
        }

        fetchProducts()
    }, [name, page, order])

    function prev(p) {
        if (p > 0) {
            setPage(p)
        }
    }

    function next(p) {
        setPage(p)
    }


    return (
        <div>
            <h4>Tabela de produtos</h4>
            <div className={styles.container_filter}>
                <input type="text" className="lead" onChange={(e) => setName(e.target.value)} placeholder="Pesquise por nome"/>
                <div className={styles.order}>
                    <button onClick={() => setOrder(true)}><ion-icon name="chevron-up-outline"></ion-icon></button>
                    <button onClick={() => setOrder(false)}><ion-icon name="chevron-down-outline"></ion-icon></button>
                </div>
            </div>
            <TableProducts products={products} />
            <Pagination page={page} prev={prev} next={next} hasNextPage={hasNextPage}/>
        </div>
    )
}

export default ListProducts