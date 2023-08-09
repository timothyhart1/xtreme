import React, { useState } from "react";
import { Button, Modal, ModalFooter } from "reactstrap";
import "../../Styles/styles.css";
import { FaRegTrashAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ModalDeleteEvent(props) {
	const [modal, setModal] = useState(false);
	const API = window.appConfig.API;
	const toggle = () => setModal(!modal);
	const eventId = props.eventId;
	const eventName = props.eventName;
	const deleteId = props.deleteId;

	const deleteHandler = async () => {
		toggle();
		await props.onDelete(deleteId);
		props.updateData();
	};

	const directiontoaster = (toastname) => {
		switch (toastname) {
			case "directionssuccessToast":
				toast.success("Event was successfully deleted!", {
					position: toast.POSITION.TOP_CENTER,
					autoClose: 1500,
				});
				break;
			case "directionsdangerToast":
				toast.error("There was an error deleting the event!", {
					position: toast.POSITION.TOP_CENTER,
					autoClose: 1500,
				});
				break;
		}
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