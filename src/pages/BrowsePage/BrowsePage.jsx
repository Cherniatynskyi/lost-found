import { BrowseNav } from 'components/BrowseNav/BrowseNav'
import { CardsList } from 'components/CardsList/CardsList'
import { Filters } from 'components/Filters/Filters'
import React from 'react'

export const BrowsePage =()=> {

  return (
    <div className='container'>
      <BrowseNav></BrowseNav>
      <Filters></Filters>
      <CardsList></CardsList>
    </div>
  )
}
