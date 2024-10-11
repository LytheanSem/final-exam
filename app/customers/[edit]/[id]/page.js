"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EditCustomerPage = ({ params }) => {
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    memberNumber: "",
    interests: "",
  });
  const { id } = params;
  const router = useRouter();

  useEffect(() => {
    const fetchCustomer = async () => {
      const response = await fetch(`/api/customer/${id}`);
      const data = await response.json();
      setFormData({
        name: data.name,
        dateOfBirth: new Date(data.dateOfBirth).toISOString().split("T")[0], // Convert to YYYY-MM-DD
        memberNumber: data.memberNumber,
        interests: data.interests,
      });
    };
    fetchCustomer();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Make sure to send the updated data to the server
    const response = await fetch(`/api/customer/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData), // Send the updated form data
    });

    if (response.ok) {
      // Redirect back to customers list after successful update
      router.push("/customers");
    } else {
      console.error("Failed to update customer");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Edit Customer</h1>
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
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditCustomerPage;
