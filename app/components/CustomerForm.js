"use client";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    memberNumber: "",
    interests: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetch(`/api/customer/${id}`)
        .then((response) => response.json())
        .then((data) =>
          setFormData({
            name: data.name,
            dateOfBirth: new Date(data.dateOfBirth).toISOString().split("T")[0],
            memberNumber: data.memberNumber,
            interests: data.interests,
          })
        );
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = id ? "PUT" : "POST";
    const url = id ? `/api/customer/${id}` : "/api/customer";
    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then(() => navigate("/customers"));
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Edit Customer" : "Add Customer"}
      </h1>
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
          {id ? "Update" : "Add"} Customer
        </button>
      </form>
    </div>
  );
};

export default CustomerForm;
