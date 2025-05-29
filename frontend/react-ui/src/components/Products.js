import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from '@mui/material/Table';
import { TextField } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

export default function Products() {

    const [products, setProducts] = useState(null)
    const [deleteID, setDeleteID] = useState(null)
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [newProduct, setNewProduct] = useState({
        id:'',
        name: '',
        description: '',
        brand: '',
        acquisitionDate: '',
        price: ''
    })

    const handleConfirmOpen = (id) => {
        setDeleteID(id)
        setConfirmOpen(true)
        
    }
    const handleConfirmClose = (id) => {
        setDeleteID(null)
        setConfirmOpen(false)
    }
    const handleDelete = async (id) => {
        try{
            await axios.delete(`http://localhost:8080/product/${id}`)
            setProducts(products.filter(product => product.id !== id));
            handleConfirmClose()
        }catch (error) {
            console.log('Error occured during deleting the product : ', error);
            alert('There was an error deleting the product please try again');
        }
    }
    const handleChange = (e) => {
        setNewProduct({...newProduct, [e.target.name]: e.target.value});
    }
    const handleAddProduct = async () => {
        try{
            const response = await axios.post('http://localhost8080/products', {
                ...newProduct, 
                price: parseFloat(newProduct.price)
            });
            setProducts([...products, response.data])
            setNewProduct({
                id:'',
                name: '',
                description: '',
                brand: '',
                acquisitionDate: '',
                price: ''
            });   
        }catch (error){
            console.log('There was an error adding the product!', error)
        }
    }


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
    height ='120vh'>
    <TableContainer component={Paper} style ={{width:'70%'}}>
        <Box display = 'flex' justifyContent='flex-start'>
        <Button variant = 'contained'>
            Add New 
        </Button>
        </Box>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">Brand</TableCell>
            <TableCell align="left">Acquistion Date</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
                <TableBody>
            {products !== null ? products.map((product, index) => (
                <TableRow
                    key={product.id}
                >
                    <TableCell align="left">{product.id}</TableCell>
                    <TableCell align="left">{product.name}</TableCell>
                    <TableCell align="left">{product.description}</TableCell>
                    <TableCell align="left">{product.brand}</TableCell>
                    <TableCell align="left">{product.acquisitionDate}</TableCell>
                    <TableCell align="left">${product.price}</TableCell>
                    <TableCell align="center">
                        <IconButton color = 'secondary' onClick = {() => handleConfirmOpen(product.id)}>
                            <DeleteIcon>

                            </DeleteIcon>
                        </IconButton>
                    </TableCell>
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
        {/* Confirmation Dialog for Deletion */}
        <Dialog open={confirmOpen}
            onClose={handleConfirmClose}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
            Are you sure you want to delete this product?
            </DialogContent>
            <DialogActions>
            <Button onClick={handleConfirmClose} color="primary">
                Cancel
            </Button>
            <Button
                onClick={() => {
                handleDelete(deleteID);
                }}
                color="secondary"
                variant="contained"
            >
                Delete
            </Button>
            </DialogActions>
        </Dialog>
        {/* Modal Dialog for Adding New Product */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <select
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              marginBottom: '15px',
              fontSize: '16px'
            }}
            id="categoryid"
            onChange={handleCategoryChange}
            value={newProduct.categoryid}
          >
            <option>Choose...</option>
            {categories.filter(c => c.title != null).map(category => (
              <option key={category.id} value={category.id} >
                {category.title}
              </option>
            ))}
          </select>
          <select
            id="subcategoryid"
            onChange={handleSubCategoryChange}
            value={newProduct.subcategoryid}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              marginBottom: '15px',
              fontSize: '16px'
            }}
          >
            <option>Choose...</option>
            {filteredSubCategories.map(subCategory => (
              <option
                key={subCategory.id} 
                value={subCategory.id}
              >
                {subCategory.description}
              </option>
            ))}
          </select>
          <TextField
            margin="dense"
            name="title"
            label="Product Title"
            type="text"
            fullWidth
            value={newProduct.title}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="summary"
            label="Summary"
            type="text"
            fullWidth
            value={newProduct.sumary}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="content"
            label="Content"
            type="text"
            fullWidth
            value={newProduct.content}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddProduct} color="primary" variant="contained">
            Add Product
          </Button>
        </DialogActions>
      </Dialog>
    </Box>

  )
}
