import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer'>
      <h4 className='copy text-center text-md'>All Right Reserved &copy; MarketEase</h4>
      <p className='text-center mt-3'>
        <Link to='/contact'>Contact Us</Link>|
        <Link to='/policy'>Privacy Policy</Link>
      </p>
    </div>
  )
}

export default Footer
