import { FaUser, FaShoppingCart, FaBook } from "react-icons/fa";
import { FaSatelliteDish } from "react-icons/fa6";
const DashBoardItems = () => {
  return (
    <div className="flex lg:flex-row flex-col items-center gap-6">
        <div className="lg:w-1/4 flex items-center bg-white px-5 py-7 gap-4 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
          <div className="flex justify-center items-center h-[66px] w-[66px] rounded-[50%] bg-[#b2f] text-xl text-white ">
            <FaUser />
          </div>
          <div>
            <span className="text-[2.3em] font-semibold leading-[1em]">5000</span>
            <h3 className="text-[1.4rem] font-semibold leading-[1em]">Users</h3>
          </div>
        </div>
        <div className="lg:w-1/4 flex items-center bg-white px-5 py-7 gap-4 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
          <div className="flex justify-center items-center h-[66px] w-[66px] rounded-[50%] bg-[#b2f] text-xl text-white ">
            <FaBook />
          </div>
          <div>
            <span className="text-[2.3em] font-semibold leading-[1em]">4.8k</span>
            <h3 className="text-[1.4rem] font-semibold leading-[1em]">Books</h3>
          </div>
        </div>
        <div className="lg:w-1/4 flex items-center bg-white px-5 py-7 gap-4 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
          <div className="flex justify-center items-center h-[66px] w-[66px] rounded-[50%] bg-[#b2f] text-xl text-white ">
            <FaShoppingCart />
          </div>
          <div>
            <span className="text-[2.3em] font-semibold leading-[1em]">1.2k</span>
            <h3 className="text-[1.4rem] font-semibold leading-[1em]">Sale</h3>
          </div>
        </div>
        <div className="lg:w-1/4 flex items-center bg-white px-5 py-7 gap-4 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
          <div className="flex justify-center items-center h-[66px] w-[66px] rounded-[50%] bg-[#b2f] text-xl text-white ">
            <FaSatelliteDish />
          </div>
          <div>
            <span className="text-[2.3em] font-semibold leading-[1em]">700+</span>
            <h3 className="text-[1.4rem] font-semibold leading-[1em]">Orders</h3>
          </div>
        </div>
      </div>
  )
}

export default DashBoardItems