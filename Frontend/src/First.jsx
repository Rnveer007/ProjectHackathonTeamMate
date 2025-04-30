import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './admin/component/Header'
import Footer from './admin/component/Footer'

function First() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default First