import React from 'react'
import Header from '../components/Header'
import SpecialityOptions from '../components/SpecialityOptions'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div>
      <Header />
      <SpecialityOptions />
      <TopDoctors />
      <Banner />
    </div>
  )
}

export default Home
