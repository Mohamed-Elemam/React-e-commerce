// eslint-disable-next-line no-unused-vars
import React from 'react'
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer.jsx';

export default function Layout() {
  return (
    <>
    <Navbar/>   
   
    <Outlet/>
    <Footer/>
    </>
  )
}
