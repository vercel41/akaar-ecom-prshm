import React from "react";
import { RiCloseCircleFill } from "react-icons/ri";

export default function Modal({ showModal, setShowModal, title, children }) {
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-4xl">
              {/*content*/}
              <div className="border-0 rounded-2xl shadow-md relative flex flex-col w-full bg-white outline-none focus:outline-none overflow-hidden">
                {/*header*/}
                <div className="flex items-center justify-between px-5 py-1">
                  <h3 className="text-xl font-title font-semibold text-slate-900">
                    {title ? title : null}
                  </h3>
                  <button
                    className="icon-btn text-4xl text-slate-500"
                    onClick={() => setShowModal(false)}
                  >
                    <RiCloseCircleFill />
                  </button>
                </div>
                {/*body*/}
                <div
                  className="relative px-6 pb-6 overflow-y-auto max-h-[80vh] after:content-[attr(data-spacer)] after:block after:h-6"
                  data-spacer=""
                >
                  {children ? (
                    children
                  ) : (
                    <p className="text-slate-500 text-lg leading-relaxed">
                      This is a regular Modal, Pass Modal children to replace it
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-40 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
