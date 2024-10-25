import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/frame/Header'
import Footer from '../components/frame/Footer'
const layout = () => {
  return (
    <>
     <Header/>
     <main>
            <Outlet/>
     </main>
     <Footer/>
    </>
      
    
  )
}

export default layout
