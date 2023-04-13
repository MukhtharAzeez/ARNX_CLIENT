import React, { useState } from 'react'
import './Product.css'

interface IProduct {
    _id:string,
    name: string,
    description: string,
    price: number,
    image: string[]
}

function Product({product}:any) {
    const [index, setIndex] = useState(0)

    const slideImage = (type: string) => {
        if(type === 'prev' && index !== 0){
            setIndex(index-1)
        }else if(type === 'next' && index < product.image.length -1){
            setIndex(index + 1)
        }
    }

    return (
        <div className="w-96 h-96 group relative block bg-black rounded-md">
            <img
                alt="Developer"
                src={product.image.length > 0 ? product.image[index]: ''}
                className="absolute rounded-md inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
            />
            <div className="relative p-4 sm:p-6 lg:p-8">
                <p className="text-sm font-medium uppercase tracking-widest text-pink-500">
                    {product.name}
                </p>
                <p className="text-xl font-bold text-white sm:text-2xl">{product.price} {product.currency}</p>
                <div className="mt-32 sm:mt-48 lg:mt-64">
                    <div
                        className="translate-y-8 transform duration-500 opacity-0 transition-all group-hover:-translate-y-14 group-hover:opacity-100"
                    >
                        <p className="text-sm text-white line-clamp-3">
                            {product.description}
                        </p>
                    </div>
                </div>
            </div>
            <div className='bg-black absolute top-4 rounded-md right-4 w-10 h-10 flex justify-center items-center text-white text-xs'>
                {index+1 } / {product.image.length}
            </div>
            {
                index !== 0 && 
                <div onClick={() => slideImage('prev')} className='absolute w-14 h-14 bg-gray-900 bg-opacity-40 rounded-lg cursor-pointer top-[45%] left-0 flex justify-center items-center'>
                    <div className="text-white text-4xl">&#8249;</div>
                </div>
            }
            {
                index !== product.image.length -1 &&
                <div onClick={() => slideImage('next')} className='absolute w-14 h-14 bg-gray-900 bg-opacity-40 rounded-lg cursor-pointer top-[45%] right-0 flex justify-center items-center'>
                    <div className="text-white text-4xl">&#8250;</div>
                </div>
            }
        </div>
    )
}

export default Product
