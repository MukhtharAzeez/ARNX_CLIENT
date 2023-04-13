import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './NavBar.css'

function NavBar() {
    const location = useLocation()
    const { pathname } = location;
    
    return (
        <div className='w-full h-32 flex'>
            <div className='logo h-[100%] flex justify-center items-center w-2/12 cursor-pointer ml-10'>
                <div className="cube">
                    <div className="top"></div>
                    <div>
                        <span style={{ '--i': '0' } as React.CSSProperties}></span>
                        <span style={{ '--i': '1' } as React.CSSProperties}></span>
                        <span style={{ '--i': '2' } as React.CSSProperties}></span>
                        <span style={{ '--i': '3' } as React.CSSProperties}></span>
                    </div>
                </div>
            </div>
            <div className='titles w-full h-[100%] flex justify-center items-center gap-4 sm:gap-14 flex-wrap pt-10 sm:pt-0'>
                <Link to={'/'} className={`${pathname==='/' ? 'text-gray-400' : 'text-gray-300'} text-3xl font-serif font-extrabold cursor-pointer`}>
                    Dashboard
                </Link>
                <Link to={'/add-product'} className={`${pathname === '/add-product' ? 'text-gray-400' : 'text-gray-300'} text-3xl font-serif font-extrabold cursor-pointer`}>
                    Add Product
                </Link>
            </div>
        </div>
    )
}

export default NavBar
