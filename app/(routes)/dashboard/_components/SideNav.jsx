import React, { useEffect } from "react";
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
  const menuList = [
    { id: 1, name: "Dashboard", icon: LayoutGrid, path: "/dashboard" },
    { id: 2, name: "Incomes", icon: CircleDollarSign, path: "/dashboard/incomes" },
    { id: 3, name: "Budgets", icon: PiggyBank, path: "/dashboard/budgets" },
    { id: 4, name: "Expenses", icon: ReceiptText, path: "/dashboard/expenses" },
    { id: 5, name: "Upgrade", icon: ShieldCheck, path: "/dashboard/upgrade" },
  ];

  const path = usePathname();

  useEffect(() => {
    console.log("Current Path:", path);
  }, [path]);

  return (
    <div className="h-screen p-5 border shadow-sm bg-white">
      <div className="flex flex-row items-center">
        <Image src="/chart-donut.svg" alt="logo" width={40} height={25} />
        <span className="text-blue-800 font-bold text-xl ml-2">FinanSmart</span>
      </div>
      <div className="mt-5">
        {menuList.map((menu) => (
          <Link href={menu.path} key={menu.id}>
            <h2
              className={`flex gap-2 items-center
                    text-gray-500 font-medium
                    mb-2 p-4 cursor-pointer rounded-full
                    hover:text-primary hover:bg-blue-100
                    ${
                      path === menu.path
                        ? "text-primary bg-blue-100"
                        : "hover:bg-gray-100"
                    }`}
              aria-current={path === menu.path ? "page" : undefined}
            >
              <menu.icon className="w-5 h-5" />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
      <div className="fixed bottom-10 p-5 flex gap-2 items-center">
        <UserButton />
        <span className="text-gray-700 font-medium">Profile</span>
      </div>
    </div>
  );
}

export default SideNav;
