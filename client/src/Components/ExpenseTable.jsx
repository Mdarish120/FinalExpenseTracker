import { Container, Stack, Typography ,Paper, Box, FormControl, InputLabel,
  Select, MenuItem, TextField, Button,Table, TableBody, TableCell, TableContainer,
   TableHead, TableRow, TablePagination,
  } from '@mui/material'
   import { format } from 'date-fns';
import React, { useState ,useEffect} from 'react';
import axios from "axios";


const ExpenseTable = ({setAmount,setDescription,setCategory,setIsEdit,setId}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [paginatedData, setPaginatedData] = useState([]);


  const fetchData = async (page, rowsPerPage) => {

    const token = JSON.parse(localStorage.getItem('token'));
    const userId = JSON.parse(localStorage.getItem('userId')); // Retrieve the token from localStorage

    const headers = {
      Authorization: `Bearer ${token}`,
    }
    try {
      const response = await axios.get(`http://localhost:5000/expense/${userId}?page=${page+1}&perPage=${rowsPerPage}`,{headers});
   
     

        setTotalItems(response.data.totalCount);
      const formattedDates = response.data.expenses.map(item => {
        const formattedDate = format(new Date(item.createdAt), 'dd, MMMM yyyy');
        return { ...item, date: formattedDate };
      });
  
      // Update the state with the formatted data
     // This header should contain the total count from the server
      setPaginatedData(formattedDates);
      console.log( paginatedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
   fetchData(page, rowsPerPage);
  }, [page, rowsPerPage]);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  
    const handleChangeRowsPerPage = event => {
      const newRowsPerPage = parseInt(event.target.value, 10);
      setRowsPerPage(newRowsPerPage);
      setPage(0);
    };






   const handleEdit=(data)=>{

             setId(data.id);
           setDescription(data.description);
           setAmount(data.amount);
           setCategory(data.category);
           setIsEdit(true);
           fetchData(page, rowsPerPage);
    }


    const handleDelete= async(id)=>{
      const token = JSON.parse(localStorage.getItem('token')); // Retrieve the token from localStorage

      const headers = {
        Authorization: `Bearer ${token}`,
      }
      
      try {
           const res=await axios.delete(`http://localhost:5000/expense/${id}`,{headers});
           console.log(res);
           fetchData(page, rowsPerPage);
      } catch (error) {
         console.log(error);
      }
    }
 
return (
  <Container component="main" maxWidth="lg"  sx={{ mt:7}}>
    <Paper elevation={6}  style={{ backgroundColor: 'lightblue' }}>

  
  <TableContainer>
        <Table >
          <TableHead>
            <TableRow>
              <TableCell><Typography variant='h5'>Date</Typography></TableCell>
              <TableCell><Typography variant='h5'>Category</Typography></TableCell>
              <TableCell><Typography variant='h5'>Description</Typography></TableCell>
              <TableCell><Typography variant='h5'>Amount</Typography></TableCell>
              <TableCell><Typography variant='h5'>Action</Typography></TableCell>
            
            </TableRow>
          </TableHead>
          <TableBody>
          {paginatedData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.amount}</TableCell>
                 <Stack direction="row" spacing={2}>
                  <Button variant='outlined' onClick={(e)=>{handleEdit(item)}}>Edit</Button>
                  <Button variant='outlined' onClick={()=>handleDelete(item.id)}>Delete</Button> 
                  </Stack>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Paper>
      <TablePagination
         rowsPerPageOptions={[5,10,20]}
        component="div"
        count={totalItems}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
  </Container>
)
}

export default ExpenseTable;