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

  const menuList = [
    { id: 1, name: "Dashboard", icon: LayoutGrid, path: "/dashboard" },
    { id: 2, name: "Incomes", icon: CircleDollarSign, path: "/dashboard/incomes" },
    { id: 3, name: "Budgets", icon: PiggyBank, path: "/dashboard/budgets" },
    { id: 4, name: "Expenses", icon: ReceiptText, path: "/dashboard/expenses" },
    { id: 5, name: "Upgrade", icon: ShieldCheck, path: "/dashboard/upgrade" },
  ];
  
  const path = usePathname();

  // Load initial theme from localStorage or default to light mode
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle dark mode and update localStorage
  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="h-screen p-5 border shadow-sm">
      <div className="flex flex-row items-center">
        <Image src={"./chart-donut.svg"} alt="logo" width={40} height={25} />
        <span className="text-blue-800 font-bold text-xl">FinanSmart</span>
      </div>
      <div className="mt-5">
        {menuList.map((menu, index) => (
          <Link href={menu.path} key={index}>
            <h2
              className={`flex gap-2 items-center
                text-gray-500 font-medium
                mb-2
                p-4 cursor-pointer rounded-full
                hover:text-primary hover:bg-blue-100
                ${path == menu.path && "text-primary bg-blue-100"}
              `}
            >
              <menu.icon />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
      <div
        className="fixed bottom-10 p-5 flex flex-col gap-4
            items-center w-full"
      >
        <button
          onClick={toggleDarkMode}
          className="w-full px-4 py-2 text-sm font-medium text-center rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <div className="flex items-center gap-2">
          <UserButton />
          <span className="text-gray-500 dark:text-gray-300">Profile</span>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
