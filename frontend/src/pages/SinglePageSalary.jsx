import React, { useRef } from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import html2pdf from 'html2pdf.js';

function SinglePageSalary() {
  const { employeeId } = useParams();
  const { data } = useSelector((state) => state.salaryStore);
  const employee = data.find((emp) => emp.employee_id === parseInt(employeeId));
  const pdfRef = useRef();

  const handleDownload = () => {
    const element = pdfRef.current;
    const opt = {
      margin: 0.5,
      filename: `${employee.first_name}_${employee.last_name}_Salary.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
  };

  const currentDate = new Date().toLocaleDateString("sr-RS");

  if (!employee) return <div className="text-center text-red-500 mt-10">Zaposleni nije pronađen.</div>;

  return (
    <div className="flex flex-col items-center mt-24">
      <div ref={pdfRef} className="bg-white shadow-xl rounded-xl p-8 w-full max-w-2xl border border-gray-200">


        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Obračun zarade
        </h2>

        <div className="space-y-4 text-lg text-gray-700">
          <p><strong>Ime:</strong> {employee.first_name}</p>
          <p><strong>Prezime:</strong> {employee.last_name}</p>
          <p><strong>Ukupna plata:</strong> {employee.total_payment} € </p>
          <p><strong>Ukupno sati:</strong> {employee.total_hours}</p>
          <p><strong>Plata po satu:</strong> {employee.salary} € </p>
        </div>

        {/* Datum */}
        <p className="mt-8 text-right text-sm text-gray-500">
          Datum: {currentDate}
        </p>

        {/* Potpis */}
        <div className="mt-12 flex justify-between items-center">
          <div className="text-sm text-gray-500">Računovodstvo</div>
          <div className="border-t border-gray-400 w-40 text-center text-sm text-gray-600 pt-2">
            Potpis nadređenog
          </div>
        </div>
      </div>

      <button 
        onClick={handleDownload}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Preuzmi PDF
      </button>
    </div>
  );
}

export default SinglePageSalary;
