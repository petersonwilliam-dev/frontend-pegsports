import styles from './FormProduct.module.css'
import categorys from '../../assets/consts/categorys'

import { Formik, Form } from 'formik'
import { useEffect, useState } from 'react'

import Input from './Input'
import Textarea from './Textarea'
import InputSelect from './InputSelect'
import InputObject from './InputObject'
import InputFile from './InputFile'

function FormProduct({productData ,handleSubmit, btnText}) {

    const [product, setProduct] = useState(productData || {})
    const [informations, setInformations] = useState(product.informations || [])
    const [amountInformations, setAmountInformations] = useState(informations.length)
    const [sizes, setSizes] = useState(product.available || [])
    const [amountSizes, setAmountSizes] = useState(sizes.length)

    const [previews, setPreviews] = useState([])

    console.log(informations, sizes)

    return (
        <div className={styles.container_form}>
            <Formik
            initialValues={{
                name: product.name || '',
                price: product.price || '',
                description: product.description || '',
                category: product.category || '',
                images: null
            }}
            onSubmit={(values) => {
                if (productData) values._id = productData._id
                handleSubmit(values, informations, sizes)
            }}>
                {({setFieldValue}) => (
                    <Form>
                        <Input name="name" type="text"  placeholder="Digite o nome do produto" label="Nome"/>
                        <Input type="number" name="price" placeholder="Digite o preço do produto" label="Preço" />
                        <Textarea name="description" rows="4" cols="5" label="Descrição" />
                        <InputSelect name="category"  options={categorys} label="Categoria" />
                        <div className={styles.container_sizes}>
                            <h4 className='display-6'>Tamanhos disponíveis</h4>
                            {[...Array(amountSizes)].map((_, index) => (
                                    <InputObject key={sizes[index] ? sizes[index]._id : index} index={index} id={sizes[index] ? sizes[index]._id : index} setList={setSizes} list={sizes} amount={amountSizes} setAmount={setAmountSizes} keyObject="size" valueObject="quantity" textTitle="Tamanho" textValue="Quantidade" object={sizes[index] ? sizes[index] : null}/>
                            ))}
                            <div className='d-flex'>
                                <button type='button' className={styles.add} onClick={() => setAmountSizes(prev => prev + 1)}>+</button>
                                <p className='lead fs-6 m-0 mx-2'>Adicionar tamanho</p>
                            </div>
                        </div>
                        <div className={styles.container_informations}>
                            <h4 className='display-6'>Informações</h4>
                            {[...Array(amountInformations)].map((_, index) => (
                                <InputObject key={informations[index] ? informations[index]._id : index} index={index} id={informations[index] ? informations[index]._id : index} setList={setInformations} list={informations} amount={amountInformations} setAmount={setAmountInformations} keyObject="title" valueObject="value" textTitle="Titúlo" textValue="Valor" object={informations[index] ? informations[index] : null}/>
                            ))}  
                            <div className='d-flex'>
                                <button type='button' className={styles.add} onClick={() => setAmountInformations(prev => prev + 1)}>+</button>
                                <p className='lead fs-6 m-0 mx-2'>Adicionar informação</p>
                            </div>
                        </div>
                        <div className={styles.images}>
                            <div className={styles.preview_images}>
                                {(previews.length > 0 || productData) && (
                                    <>
                                        {previews.length > 0 ? (
                                            <>
                                                {previews.map((image, index) => (
                                                    <img src={URL.createObjectURL(image)} key={index} alt={`foto${index}`} />
                                                ))}
                                            </>
                                        ) : (
                                            <>
                                                {productData.images.map((image, index) => (
                                                    <img src={`${import.meta.env.VITE_API}products/img/${image}`} key={index} alt={`foto${index}`} />
                                                ))}
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                            <InputFile name="images" multiple={true} label="Imagens" setPreviews={setPreviews} setField={setFieldValue}/>
                        </div>
                        <button className={styles.button_submit}>{btnText}</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default FormProduct