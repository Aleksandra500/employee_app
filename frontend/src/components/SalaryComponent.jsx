import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { showLoaderAction } from '../store/loaderSlice';
import { getSalary } from '../services/salaryService';
import { useState } from 'react';



function SalaryComponent() {
    const dispatch = useDispatch()
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchSalary = async () => {
           dispatch(showLoaderAction(true))
           const res = await getSalary()
           console.log(res, 'res sa fronta salary');
           dispatch(showLoaderAction(false))
           if(res.status === 'success'){
              setData(res.data)
              
           }
           
        }
        fetchSalary()
     },[dispatch])

	return (
		<div className='container mx-auto relative'>
			<div className='mt-52'>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label='simple table'>
						<TableHead>
							<TableRow>
								<TableCell
									style={{ fontWeight: 'bold', fontSize: '20px' }}
									l>
									First Name
								</TableCell>
								<TableCell
									style={{ fontWeight: 'bold', fontSize: '20px' }}>
									Last Name
								</TableCell>
								<TableCell
									style={{ fontWeight: 'bold', fontSize: '20px' }}>
									Status
								</TableCell>
								<TableCell
									style={{ fontWeight: 'bold', fontSize: '20px' }}>
									Salary
								</TableCell>
								<TableCell
									style={{ fontWeight: 'bold', fontSize: '20px' }}>
									PDF
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data.map((data) => (
								<TableRow
									key={data.id}
									sx={{
										'&:last-child td, &:last-child th': { border: 0 },
									}}>
									<TableCell style={{ fontSize: '18px' }}>
										{data.first_name}
									</TableCell>

									<TableCell style={{ fontSize: '18px' }}>
										{data.last_name}
									</TableCell>
									<TableCell style={{ fontSize: '18px' }}>
										{}
									</TableCell>
									<TableCell style={{ fontSize: '18px' }}>
										{data.total_payment}
									</TableCell>
									<TableCell style={{ fontSize: '18px' }}>
										{}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</div>
	);
}

export default SalaryComponent;
