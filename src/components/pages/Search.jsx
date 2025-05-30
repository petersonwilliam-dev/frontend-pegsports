import { Formik, Form } from 'formik'
import { useEffect, useState, useCallback} from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import useProducts from '../../hooks/useProduct'
import categorys from '../../assets/consts/categorys'

import styles from './Search.module.css'

import CardProduct from '../Cards/ProductCard'
import InputRadio from '../Form/InputRadio'
import InputSelect from '../Form/InputSelect'
import Pagination from '../Pagination/Pagination'

function Search() {

    const { getProducts } = useProducts()
    const [searchedProducts, setSearchedProducts] = useState([])
    const [hasNextPage, setHasNextPage] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()

    const params = new URLSearchParams(location.search)
    const page = params.get('page') || 1

    const updatePage = useCallback((newPage) => {
        if (newPage < 1) return

        params.set('page', newPage)

        navigate(`${location.pathname}?${params.toString()}`)
        window.scrollTo({top: 0, behavior: 'smooth'})
    }, )

    useEffect(() => {

        const params = new URLSearchParams(location.search)

        const filters = {}

        for (const [key, value] of params.entries()) {
            filters[key] = value
        }
        
        filters.limit = 15

        const fetchProducts = async () => {
            const fetchProducts = await getProducts(filters)
            filters.page = Number(page) + 1
            filters.hasProduct = true
            const hasNextPage = await getProducts(filters)
            setHasNextPage(hasNextPage)
            setSearchedProducts(fetchProducts)
        }

        fetchProducts()
    }, [location.search])

    return (
        <section>
            <div className={styles.search}>
                <div className={styles.container_filters}>
                    <Formik
                    initialValues={{
                        category : params.get('category') || '',
                        price: params.get('price') || '',
                    }}
                    onSubmit={({category, price}) => {
                        const url = `?name=${params.get('name')}&category=${category}&price=${price}&page=1`
                        navigate(`/search${url}`, {replace: true})
                        window.scrollTo({top: 0, behavior: 'smooth'})
                    }}>
                        <Form>
                            <div className={styles.form_section}>
                                <h4>Categorias</h4>
                                <div className="d-flex flex-wrap">
                                    <InputRadio name="category" text="Todos" value="" />
                                    {categorys.map(category => (
                                        <InputRadio name="category" text={category.name} value={category.value} />
                                    ))}
                                </div>
                            </div>
                            <div className={styles.form_section}>
                                <h4>Selecione por preço</h4>
                                <InputSelect name="price" options={[{ value: 500, name: "Menos de R$500" },{ value: 1000, name: "Menos de R$1000" },{ value: 1500, name: "Menos de R$1500" },{ value: 2000, name: "Menos de R$2000" }]}/>
                            </div>
                            <div className="text-center">
                                <button type='submit'><ion-icon name="funnel-outline" style={{marginRight: '5px'}}></ion-icon>Filtrar</button>
                            </div>
                        </Form>
                    </Formik>
                </div>
                <div className={styles.container_products}>
                    <h2 className='my-2'>{params.get('name') ? `Pesquisa por '${params.get('name')}'` : ''}</h2>
                    <div className={styles.container_search}>
                        {searchedProducts.length > 0 ? (
                            <>
                                {searchedProducts.map((product, index) => (
                                    <CardProduct product={product} index={index}/>
                                ))}
                            </>
                        ): (
                            <p className='text-center text-secondary lead w-100 mt-5 fs-3'>Não foi encontrado produtos na sua pesquisa </p>
                        )}
                        
                    </div>
                    <Pagination page={page} next={updatePage} prev={updatePage} hasNextPage={hasNextPage} />
                </div>
            </div>
        </section>
    )
}

export default Search