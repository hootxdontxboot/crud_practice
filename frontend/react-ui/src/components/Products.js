import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box'

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  

export default function Products() {

    const [products, setProducts] = useState(null)

    useEffect(() => {
        axios.get('http://localhost:8080/products').then(response => {
            setProducts(response.data)
            console.log(response.data)
        })
    }, []);

  return (
    <Box
    display ='flex'
    justifyContent ='center'
    alignItems = 'center'
    height ='75'>
    <TableContainer component={Paper} style ={{width:'70%'}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Brand</TableCell>
            <TableCell align="right">Acquistion Date</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
                <TableBody>
            {products !== null ? products.map((product, index) => (
                <TableRow
                    key={product.id}
                >
                    <TableCell align="right">{product.id}</TableCell>
                    <TableCell align="right">{product.name}</TableCell>
                    <TableCell align="right">{product.description}</TableCell>
                    <TableCell align="right">{product.brand}</TableCell>
                    <TableCell align="right">{product.acquisitionDate}</TableCell>
                    <TableCell align="right">{product.price}</TableCell>
                </TableRow>
                ))
             : (
                <TableRow>
                <TableCell colSpan={5} align="center">
                    Loading...
                </TableCell>
                </TableRow>
            )}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  )
}
