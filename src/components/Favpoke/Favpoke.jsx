import React from 'react'
import Likepoke from '../Likepoke/Likepoke'


const Favpoke = ( { fav } ) => {
  return (
    <div className='grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
      {fav?.map((data,index)=>(
        <div key={index}>
            <h3>{data.name}</h3>
            <img src={data?.sprites?.other.home.front_default} alt="" />
            <Likepoke/>
        </div>
      ))}
    </div>
  )
}

export default Favpoke
