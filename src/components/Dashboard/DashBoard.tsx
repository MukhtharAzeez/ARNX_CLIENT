import React, { useEffect, useState } from 'react'
import Product from '../Product/Product'


interface IProduct {
    _id: string,
    name: string,
    description: string,
    price: number,
    image: string[]
}
interface Products {
    product: IProduct[]
}

function DashBoard() {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch('https://arnxbackend.labonnz.club/get-all-products')
            .then(response => response.json())
            .then(json => setData(json.slice(0, 14)))
    }, [])

    return (
        <div className='w-full flex justify-center gap-6 flex-wrap mt-14' >
            { data.length > 0 ?
                data.map((product: IProduct) => {
                    return (
                        <Product key={product._id} product={product}/>
                    )
                }) : <img src="https://assets.materialup.com/uploads/c83a9663-be0b-4397-b1af-67f520e44ef1/preview.png" alt="" />
            }
        </div>
    )
}

export default DashBoard
