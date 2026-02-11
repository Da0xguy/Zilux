"use client";

import React, { useState, type Dispatch, type SetStateAction } from "react";
import { Upload, Home, Package, Menu, X } from "lucide-react";
import AdminAuthModal from "./AdminAuthModal"; // ✅ ADD THIS

interface NavigationProps {
  currentPage: "home" | "products" | "admin";
  setCurrentPage: Dispatch<SetStateAction<"home" | "products" | "admin">>;
}

export default function Navigation({
  currentPage,
  setCurrentPage,
}: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false); // ✅ ADD THIS

  const navItems = [
    { name: "home", label: "Home", icon: Home },
    { name: "products", label: "Products", icon: Package },
    { name: "admin", label: "Admin", icon: Upload },
  ];

  // ✅ HANDLE NAV CLICKS
  const handleNavClick = (page: "home" | "products" | "admin") => {
    if (page === "admin") {
      setShowAdminModal(true);
    } else {
      setCurrentPage(page);
    }
    setIsOpen(false);
  };

  return (
    <>
      <header className="fixed top-4 inset-x-0 z-[1000] flex justify-center">
        <div className="w-[95%] max-w-6xl rounded-3xl border border-white/10 bg-black/70 backdrop-blur-xl shadow-xl">
          <div className="flex items-center justify-between px-6 md:px-12 py-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                ZILUX
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = currentPage === item.name;

                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.name)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                      active
                        ? "bg-yellow-500 text-black shadow-md"
                        : "text-gray-300 hover:text-yellow-400 hover:bg-white/5"
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden inline-flex items-center justify-center rounded-xl p-2 text-gray-300 hover:bg-white/10"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden mx-4 mb-4 rounded-2xl bg-black/90 border border-white/10 shadow-lg">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = currentPage === item.name;

                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.name)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition ${
                      active
                        ? "bg-yellow-500 text-black"
                        : "text-gray-300 hover:bg-white/5 hover:text-yellow-400"
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </header>

      {/* ✅ ADMIN AUTH MODAL */}
      <AdminAuthModal
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
        onSuccess={() => setCurrentPage("admin")}
      />
    </>
  );
}