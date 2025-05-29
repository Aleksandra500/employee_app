import React, { useEffect, useState } from 'react';
import { getSalary } from '../services/salaryService';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

function Statistic() {
	const [data, setData] = useState([]);
	const [month, setMonth] = useState(String(new Date().getMonth() + 1).padStart(2, '0'));

	useEffect(() => {
		const fetchData = async () => {
			const res = await getSalary();
			if (res.status === 'success') {
				setData(res.data);
			}
		};
		fetchData();
	}, []);

	const filtered = data.filter(item => {
		const recordMonth = item.month?.split('-')[1]; // "2024-04" => "04"
		return recordMonth === month;
	});

	const totalHours = filtered.reduce((sum, item) => sum + Number(item.total_hours), 0);
	const totalPayments = filtered.reduce((sum, item) => sum + Number(item.total_payment), 0);

	return (
		<div className="container mx-auto mt-10">
			<h1 className="text-3xl font-bold mb-4">Statistics</h1>

			<select
				value={month}
				onChange={(e) => setMonth(e.target.value)}
				className="px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 mb-10"
			>
				<option value="03">Mart</option>
				<option value="04">April</option>
				<option value="05">Maj</option>
			</select>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
				<div className="bg-white p-6 rounded-xl shadow-md text-center">
					<h2 className="text-xl font-semibold">Total Hours Worked</h2>
					<p className="text-2xl mt-2 text-blue-600 font-bold">{totalHours}</p>
				</div>
				<div className="bg-white p-6 rounded-xl shadow-md text-center">
					<h2 className="text-xl font-semibold">Total Payments</h2>
					<p className="text-2xl mt-2 text-green-600 font-bold">{totalPayments} €</p>
				</div>
			</div>

			<div className="bg-white p-6 rounded-xl shadow-md">
				<h2 className="text-xl font-semibold mb-4">Payments per Employee</h2>
				<ResponsiveContainer width="100%" height={300}>
					<BarChart data={filtered}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="first_name" />
						<YAxis />
						<Tooltip />
						<Bar dataKey="total_payment" fill="#8884d8" />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}

export default Statistic;
