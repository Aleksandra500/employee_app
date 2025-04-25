import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { showLoaderAction } from '../../../store/loaderSlice';
import { deleteServices } from '../services/deleteServices';

function DeleteEmployeeModal({ setIsDeleteModal, currentEmployee }) {
	const dispatch = useDispatch();

	const handleDelete = async () => {
		const { id } = currentEmployee;
		try {
			dispatch(showLoaderAction(true));
			const res = await deleteServices(id);
			if (res.status === 'success') {
				toast.success(`Zaposleni ${currentEmployee.first_name} ${currentEmployee.last_name} je uspešno obrisan`);
			} else {
				toast.error('Došlo je do greške prilikom brisanja');
			}
		} catch (err) {
			console.log('Error:', err);
			toast.error('Došlo je do greške');
		} finally {
			dispatch(showLoaderAction(false));
			setIsDeleteModal(false); // Close the modal
		}
	};

	return (
		<Modal
			isOpen={true}
			ariaHideApp={false}
			className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto"
			overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex items-center justify-center"
		>
			<div className="text-center">
				<h2 className="text-2xl font-semibold text-gray-800 mb-4">
					Da li ste sigurni da želite da obrišete zaposlenog {currentEmployee.first_name} {currentEmployee.last_name}?
				</h2>
				<p className="text-lg text-gray-900 mb-6">Ova akcija se ne može poništiti.</p>

				<div className="flex justify-between gap-4">
					<button
						className="px-7 py-3 bg-orange-500 text-gray-800 rounded-md hover:bg-gray-400 transition"
						onClick={() => setIsDeleteModal(false)}
					>
						Cancel
					</button>
					<button
						className="px-7 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
						onClick={handleDelete}
					>
						Delete
					</button>
				</div>
			</div>
		</Modal>
	);
}

export default DeleteEmployeeModal;
