import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { TableContainer } from '@mui/material';
import {Paper} from '@mui/material'

export default function Products() {

    const [products, setProducts] = useState(null)

    useEffect(() => {
        axios.get('http://localhost:8080/products').then(response => {
            setProducts(response.data)
            console.log(response.data)
        })
    }, []);

  return (
    <TableContainer component = {Paper} style = {{width:'70%'}}>

    </TableContainer>
  )
}
