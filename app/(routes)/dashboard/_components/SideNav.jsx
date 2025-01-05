import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  LayoutGrid,
  PiggyBank,
  ReceiptText,
  ShieldCheck,
  CircleDollarSign,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";

function SideNav() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Incomes",
      icon: CircleDollarSign,
      path: "/dashboard/incomes",
    },
    {
      id: 3,
      name: "Budgets",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
    {
      id: 4,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expenses",
    },
    {
      id: 5,
      name: "Upgrade",
      icon: ShieldCheck,
      path: "/dashboard/upgrade",
    },
  ];

  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <div className="h-screen p-5 border shadow-sm bg-gray-50 dark:bg-gray-900 flex flex-col justify-between">
      {/* Top Section: Logo and Menu */}
      <div>
        <div className="flex flex-row items-center mb-6">
          <Image src={"./chart-donut.svg"} alt="logo" width={40} height={25} />
          <span className="text-blue-800 dark:text-blue-400 font-bold text-xl">
            FinanSmart
          </span>
        </div>
        <div>
          {menuList.map((menu, index) => (
            <Link href={menu.path} key={index}>
              <h2
                className={`flex gap-2 items-center
                      text-gray-500 dark:text-gray-300 font-medium
                      mb-2 p-4 cursor-pointer rounded-full
                      hover:text-primary hover:bg-blue-100 dark:hover:bg-blue-800
                      ${
                        path == menu.path &&
                        "text-primary bg-blue-100 dark:bg-blue-800"
                      }`}
              >
                <menu.icon />
                {menu.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Section: Dark Mode and Profile */}
      <div className="space-y-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="w-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>

        {/* Profile Section */}
        <div className="flex items-center gap-2">
          <UserButton />
          <span className="text-gray-500 dark:text-gray-300">Profile</span>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
