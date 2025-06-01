import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showLoaderAction } from '../store/loaderSlice';
import axios from 'axios';
import { addWorkHours } from '../services/addWorkHoursServices';
import { toast } from 'react-toastify'; // Za notifikacije

const AddWorkHours = () => {
	const dispatch = useDispatch();
	const [employeeId, setEmployeeId] = useState('');
	const [date, setDate] = useState('');
	const [hoursWorked, setHoursWorked] = useState(8);
	const [employeeData, setEmployeeData] = useState({
		firstName: '',
		lastName: '',
		position: '',
	});
	const [errorMessage, setErrorMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleEmployeeIdChange = async (e) => {
		const id = e.target.value;
		setEmployeeId(id);

		if (!id) {
			setEmployeeData({ firstName: '', lastName: '', position: '' });
			setErrorMessage('');
			return;
		}

		setIsLoading(true);
		try {
			const response = await axios.get(
				`http://localhost:8800/api/employees/${id}`
			);
			if (response.status === 200) {
				setEmployeeData({
					firstName: response.data.first_name,
					lastName: response.data.last_name,
					position: response.data.position,
				});
				setErrorMessage('');
			}
			
		} catch (error) {
			console.error(
				'Greška pri dobijanju podataka o zaposlenom:',
				error
			);
			setEmployeeData({ firstName: '', lastName: '', position: '' });
			setErrorMessage('❌ Zaposleni sa ovim ID-em nije pronađen!');
		} finally {
			setIsLoading(false);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const workHoursData = {
			employeeId,
			date,
			hoursWorked,
		};

		dispatch(showLoaderAction(true));
		const res = await addWorkHours(workHoursData);
		dispatch(showLoaderAction(false));

		if (res.status === 'success') {
			toast.success(res.message);
			
		} else {
			toast.error(res.message);
			
		}
	};

	return (
		<div
			className='min-h-screen flex items-center justify-center'
			style={{ backgroundImage: "url('/path/to/your/image.jpg')" }}>
			<div className='bg-black bg-opacity-50 p-8 rounded-lg w-4/12'>
				<h2 className='text-3xl font-semibold text-center text-white mb-6'>
					Dodaj radne sate
				</h2>

				{/* Prikaz podataka o zaposlenom */}
				{employeeData.firstName && (
					<div className='text-white mb-4 text-center'>
						<p className='text-lg font-medium'>
							➤ Dodaješ sate za:{' '}
							<span className='text-green-400 font-semibold'>
								{employeeData.firstName} {employeeData.lastName}
							</span>{' '}
							({employeeData.position})
						</p>
					</div>
				)}

				{isLoading && (
					<div className='text-white text-sm italic mb-4 text-center'>
						Učitavanje podataka o zaposlenom...
					</div>
				)}

				{errorMessage && (
					<div className='mb-4 text-red-500 text-sm text-center'>
						{errorMessage}
					</div>
				)}

				<form onSubmit={handleSubmit}>
					<div className='mb-4'>
						<label
							htmlFor='employeeId'
							className='block text-sm font-medium text-white'>
							ID Zaposlenog:
						</label>
						<input
							type='number'
							id='employeeId'
							value={employeeId}
							onChange={handleEmployeeIdChange}
							required
							className='mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
						/>
					</div>

					{/* Prikaz samo ako postoje podaci */}
					{employeeData.firstName && (
						<>
							<div className='mb-4'>
								<label className='block text-sm font-medium text-white'>
									Ime:
								</label>
								<input
									type='text'
									value={employeeData.firstName}
									readOnly
									className='mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-black'
								/>
							</div>
							<div className='mb-4'>
								<label className='block text-sm font-medium text-white'>
									Prezime:
								</label>
								<input
									type='text'
									value={employeeData.lastName}
									readOnly
									className='mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-black'
								/>
							</div>
							<div className='mb-4'>
								<label className='block text-sm font-medium text-white'>
									Pozicija:
								</label>
								<input
									type='text'
									value={employeeData.position}
									readOnly
									className='mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-black'
								/>
							</div>
						</>
					)}

					<div className='mb-4'>
						<label
							htmlFor='date'
							className='block text-sm font-medium text-white'>
							Datum:
						</label>
						<input
							type='date'
							id='date'
							value={date}
							onChange={(e) => setDate(e.target.value)}
							required
							className='mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
						/>
					</div>

					<div className='mb-6'>
						<label
							htmlFor='hoursWorked'
							className='block text-sm font-medium text-white'>
							Radni sati:
						</label>
						<input
							type='number'
							id='hoursWorked'
							value={hoursWorked}
							onChange={(e) => setHoursWorked(e.target.value)}
							min='0'
							max='24'
							className='mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
						/>
					</div>

					<button
						type='submit'
						className='w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50'>
						Dodaj
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddWorkHours;
