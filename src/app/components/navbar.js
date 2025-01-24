"use client";

import { FaBullseye, FaRegTrashAlt } from "react-icons/fa";
import Link from "next/link";
import { FaHome, FaList, FaChartBar, FaBell } from "react-icons/fa";

export default function Nav() {
  return (
    <div className="sticky bottom-0">
      

      <nav className="bg-gray-100 py-3 border-t flex justify-around items-center">
        <div className="flex flex-col items-center">
          <Link href="/dashboard">
            <FaHome className="text-2xl text-gray-600 cursor-pointer" />
          </Link>
          <div className="text-sm text-gray-600">Dashboard</div>
        </div>
        <div className="flex flex-col items-center">
          <Link href="/category">
            <FaList className="text-2xl text-gray-600 cursor-pointer" />
          </Link>
          <div className="text-sm text-gray-600">Categories</div>
        </div>
        <div className="flex flex-col items-center">
          <Link href="/report">
            <FaChartBar className="text-2xl text-gray-600" />
          </Link>
          <div className="text-sm text-gray-600">Report</div>
        </div>
        <div className="flex flex-col items-center">
          <Link href="/target">
            <FaBullseye className="text-2xl text-gray-600" />
          </Link>
          <div className="text-sm text-gray-600">Targets</div>
        </div>
        <div className="flex flex-col items-center">
          <Link href ="/reminders">
            <FaBell className="text-2xl text-gray-600" />
          </Link>

          <div className="text-sm text-gray-600">Reminders</div>
        </div>
      </nav>
    </div>
  );
}
