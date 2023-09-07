import { Collapse } from "react-collapse";

// ** Imoprt icons
import { HiOutlinePlusSm, HiOutlineMinusSm } from "react-icons/hi";
import ViewHTML from "./ViewHTML";

const QAItem = ({ item, open, toggleOpen }) => {
  return (
    <>
      <div
        className={`single-qna border ${
          open ? "border-primary" : "border-slate-200"
        }  rounded-xl p-3 mb-4`}
      >
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleOpen(item.index)}
        >
          <h6 className="text-base/[16px] font-semibold font-title text-slate-600">
            {item.question}
          </h6>
          {open ? (
            <HiOutlineMinusSm size={24} className="text-primary" />
          ) : (
            <HiOutlinePlusSm size={24} className="text-primary" />
          )}
        </div>
        <Collapse isOpened={open}>
          <div className="mt-4">
            <ViewHTML htmlText={item.answer} />
          </div>
        </Collapse>
      </div>
    </>
  );
};

export default QAItem;
