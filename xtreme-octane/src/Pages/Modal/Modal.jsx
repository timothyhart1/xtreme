import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Modal, ModalFooter } from "reactstrap";
import "../../Styles/styles.css";

function ModalDeleteEvent(props) {
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);
	const deleteId = props.deleteId;

	const deleteHandler = async () => {
		toggle();
		await props.onDelete(deleteId);
		props.updateData();
	};

	return (
		<div>
			<ToastContainer />
			<button type="button" className="btn btn-danger" id="event-btns">
				<i className="table-icons" onClick={toggle}>
					<FaRegTrashAlt />
				</i>
			</button>

			<Modal isOpen={modal} toggle={toggle}>
				<div className="modal-header">
					<h5 className="modal-title">{props.modalTitle}</h5>
				</div>
				<ModalFooter>
					<Button color="danger" onClick={deleteHandler} id="modal-event-btn">
						Delete
					</Button>
					<Button color="primary" onClick={toggle} id="modal-event-btn">
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
}

export default ModalDeleteEvent;
