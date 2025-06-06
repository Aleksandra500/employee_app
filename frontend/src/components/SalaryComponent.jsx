import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showLoaderAction } from '../store/loaderSlice';
import { getSalary } from '../services/salaryService';
import { saveSalaryActions } from '../store/salarySlice';
import { Link } from 'react-router-dom';

function SalaryComponent() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.salaryStore);

  const [selectMonth, setSelectMonth] = useState(new Date().getMonth() + 1);
  const [active, setActive] = useState({});

  useEffect(() => {
    const fetchSalary = async () => {
      dispatch(showLoaderAction(true));
      const res = await getSalary();
      dispatch(showLoaderAction(false));

      if (res.status === 'success') {
        dispatch(saveSalaryActions(res.data));
        const isActive = JSON.parse(localStorage.getItem('active'));
        setActive(isActive || {});
      }
    };

    fetchSalary();
  }, [dispatch]);

  const handleSetActive = (key) => {
    const updatedStatus = { ...active, [key]: !active[key] };
    setActive(updatedStatus);
    localStorage.setItem('active', JSON.stringify(updatedStatus));
  };

  const monthNames = [
    'Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun',
    'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'
  ];

  return (
    <div className='container mx-auto relative'>
      <h2 className='text-2xl font-semibold mt-20 mb-6'>
        Plata za: {monthNames[selectMonth - 1]}
      </h2>

      <select
        value={selectMonth}
        onChange={(e) => setSelectMonth(Number(e.target.value))}
        className='px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 mb-10'
      >
        {monthNames.map((name, index) => (
          <option key={index} value={index + 1}>
            {name}
          </option>
        ))}
      </select>

      <TableContainer component={Paper} className='mt-8'>
        <Table sx={{ minWidth: 650 }} aria-label='salary table'>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold', fontSize: '20px' }}>First Name</TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '20px' }}>Last Name</TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '20px' }}>Status</TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '20px' }}>Salary</TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '20px' }}>View More</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data
              .filter((entry) => {
                if (!entry || typeof entry.month !== 'string') return false;
                const parts = entry.month.split('-');
                if (parts.length < 2) return false;
                return Number(parts[1]) === selectMonth;
              })
              .map((entry) => {
                const key = `${entry.employee_id}`;
                return (
                  <TableRow
                    key={key}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell style={{ fontSize: '18px' }}>{entry.first_name}</TableCell>
                    <TableCell style={{ fontSize: '18px' }}>{entry.last_name}</TableCell>
                    <TableCell style={{ fontSize: '18px' }}>
                      <input
                        type='checkbox'
                        checked={!!active[key]}
                        onChange={() => handleSetActive(key)}
                      />
                    </TableCell>
                    <TableCell style={{ fontSize: '18px' }}>
                      {entry.total_payment} €
                    </TableCell>
                    <TableCell style={{ fontSize: '18px' }}>
                      <Link to={`/employee/${entry.employee_id}`}>View More</Link>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default SalaryComponent;
