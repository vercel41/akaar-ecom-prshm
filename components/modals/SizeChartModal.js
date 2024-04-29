"use client";
import React from "react";
import Modal from "../elements/Modal";
// import ViewHTML from "../elements/ViewHTML";
import Image from "next/image";

const SizeChartModal = ({ showModal, setShowModal, sizeChart }) => {
	return (
		<Modal
			showModal={showModal}
			setShowModal={setShowModal}
			title={"Size Chart"}
		>
			<div className="lg:min-w-[27rem] text-slate-600">
				{/* <ViewHTML htmlText={sizeChart} /> */}
				<Image
					src={sizeChart?.image}
					alt="size-chart"
					width={200}
					height={300}
					className="w-full md:w-[700px] h-auto object-contain rounded"
				/>
			</div>
		</Modal>
	);
};

export default SizeChartModal;
