"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const AddCustomerPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    memberNumber: "",
    interests: "",
  });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/customer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    router.push("/customers"); // Redirect back to customers list after adding
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Add New Customer</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full px-4 py-2 border"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Member Number</label>
          <input
            type="number"
            name="memberNumber"
            value={formData.memberNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Interests</label>
          <input
            type="text"
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            className="w-full px-4 py-2 border"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Customer
        </button>
      </form>
    </div>
  );
};

export default AddCustomerPage;
