"use client";
import React from "react";
import Modal from "../elements/Modal";
import ViewHTML from "../elements/ViewHTML";

const SizeChartModal = ({ showModal, setShowModal, sizeChart }) => {
  return (
    <Modal
      showModal={showModal}
      setShowModal={setShowModal}
      title={"সাইজ চার্ট"}
    >
      <div className="min-w-[27rem] text-slate-600">
        <ViewHTML htmlText={sizeChart} />
      </div>
    </Modal>
  );
};

export default SizeChartModal;
