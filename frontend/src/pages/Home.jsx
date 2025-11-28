import React from 'react'
import LatestCollection from "../components/LatestCollection.jsx";

import Hero from '../components/Hero'
import BestSeller from '../components/BestSeller.jsx';
import OurPolicy from '../components/OurPolicy.jsx';
import NewsletterBox from '../components/NewsletterBox.jsx';  
const home = () => {
  return (
	<div>
    <Hero/>
    <LatestCollection/>
    <BestSeller/>
    <OurPolicy/>
    <NewsletterBox/>
  </div>
  )
}

export default home