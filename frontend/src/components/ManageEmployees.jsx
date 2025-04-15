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
import { getAll } from '../services/getAllEmployees';
import { saveInAllActions } from '../store/employeesSlice';
import { VscGitPullRequestGoToChanges } from 'react-icons/vsc';
import { MdDeleteOutline } from 'react-icons/md';
import { Box } from '@mui/material';
function ManageEmployees() {
	const dispatch = useDispatch();
	const { allEmployees } = useSelector(
		(state) => state.employeesStore
	);
	useEffect(() => {
		const fetchEmployees = async () => {
			dispatch(showLoaderAction(true));
			const res = await getAll();
			dispatch(showLoaderAction(false));

			if (res.status === 'success') {
				dispatch(saveInAllActions(res.data));
				console.log(res.data, 'res.data');
			}
		};
		fetchEmployees();
	}, [dispatch, allEmployees]);

	return (
		<div className='container mx-auto relative'>
			<div className='mt-52'>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label='simple table'>
						<TableHead>
							<TableRow>
								<TableCell
									style={{ fontWeight: 'bold', fontSize: '20px' }}>
									ID
								</TableCell>
								<TableCell
									align='right'
									style={{ fontWeight: 'bold', fontSize: '20px' }}>
									First Name
								</TableCell>
								<TableCell
									align='right'
									style={{ fontWeight: 'bold', fontSize: '20px' }}>
									Last Name
								</TableCell>
								<TableCell
									align='right'
									style={{ fontWeight: 'bold', fontSize: '20px' }}>
									Position
								</TableCell>
								<TableCell
									align='right'
									style={{ fontWeight: 'bold', fontSize: '20px' }}>
									Salary
								</TableCell>
								<TableCell
									align='right'
									style={{ fontWeight: 'bold', fontSize: '20px' }}>
									Change
								</TableCell>
								<TableCell
									align='right'
									style={{ fontWeight: 'bold', fontSize: '20px' }}>
									Delete
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{allEmployees.map((emm) => (
								<TableRow
									key={emm.id}
									sx={{
										'&:last-child td, &:last-child th': { border: 0 },
									}}>
									<TableCell component='th' scope='row' style={{fontSize: '18px'}}>
										{emm.id}
									</TableCell>
									<TableCell align='right' style={{fontSize: '18px'}}>
										{emm.first_name}
									</TableCell>
									<TableCell align='right' style={{fontSize: '18px'}} >{emm.last_name}</TableCell>
									<TableCell align='right' style={{fontSize: '18px'}}>{emm.position}</TableCell>
									<TableCell align='right' style={{fontSize: '18px'}}>{emm.salary} €</TableCell>
									<TableCell align='right'>
										<Box
											display='flex'
											justifyContent='flex-end'
											alignItems='center'>
											<VscGitPullRequestGoToChanges size={24} style={{ cursor: 'pointer' }}/>
										</Box>
									</TableCell>
									<TableCell align='right'>
										<Box
											display='flex'
											justifyContent='flex-end'
											alignItems='center'>
											<MdDeleteOutline size={24} color='red' style={{ cursor: 'pointer' }} />
										</Box>
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

export default ManageEmployees;
