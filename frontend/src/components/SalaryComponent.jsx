import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showLoaderAction } from '../store/loaderSlice';
import { getSalary } from '../services/salaryService';
import { useState } from 'react';
import { saveSalaryActions } from '../store/salarySlice';
import { Link } from 'react-router-dom';



function SalaryComponent() {
    const dispatch = useDispatch()
	const {data} = useSelector(state => state.salaryStore)
    const [selectMonth, setSelectMonth] = useState(new Date().getMonth() + 1)
	const [active, setActive] = useState({})
	// const currentYear = new Date().getFullYear();


    useEffect(() => {
        const fetchSalary = async () => {
           dispatch(showLoaderAction(true))
           const res = await getSalary()
		   dispatch(saveSalaryActions(res.data))   
           console.log(res, 'res sa fronta salary');
           dispatch(showLoaderAction(false))
           if(res.status === 'success'){
			dispatch(saveSalaryActions(res.data)) 
			const isActive = JSON.parse(localStorage.getItem('active'))
			setActive(isActive)
           }
           
        }
        fetchSalary()
     },[dispatch])

	 const handleSetActive = (key) => {
        const updatedStatus = { ...active, [key]: !active[key]}

		setActive(updatedStatus);
		localStorage.setItem('active', JSON.stringify(updatedStatus))
	 }


	return (
		<div className='container mx-auto relative'>
				<select value={selectMonth} onChange={(e) => setSelectMonth(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 mb-10 mt-20">
				<option value='3'>Mart</option>
				<option value='4'>April</option>
				<option value='5'>Maj</option>
			</select>
			<div>
				<TableContainer component={Paper} className=' mt-8'>
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
									View More
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
						{console.log(data)}
							{data.map((data) => {
								const key = `${data.employee_id}`
								return (
								<TableRow
						            key={key}
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
										<input type='checkbox' checked={!!active[key]}  onChange={() => handleSetActive(key)}/>
									</TableCell>
									<TableCell style={{ fontSize: '18px' }}>
										{data.total_payment}
									</TableCell>
									<TableCell style={{ fontSize: '18px' }}>
										<Link to={`/employee/${data.employee_id}`} >View More</Link>
									</TableCell>
								</TableRow>
							) } )}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</div>
	);
}

export default SalaryComponent;
