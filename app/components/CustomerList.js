"use client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/customer")
      .then((response) => response.json())
      .then((data) => setCustomers(data));
  }, []);

  const handleDelete = (id) => {
    fetch(`/api/customer/${id}`, { method: "DELETE" }).then(() =>
      setCustomers(customers.filter((customer) => customer._id !== id))
    );
  };

  const handleViewDetail = (id) => {
    navigate(`/customer/${id}`);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Customer List</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Date of Birth</th>
            <th className="py-2">Member Number</th>
            <th className="py-2">Interests</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id}>
              <td className="border px-4 py-2">{customer.name}</td>
              <td className="border px-4 py-2">
                {new Date(customer.dateOfBirth).toLocaleDateString()}
              </td>
              <td className="border px-4 py-2">{customer.memberNumber}</td>
              <td className="border px-4 py-2">{customer.interests}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleViewDetail(customer._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  View
                </button>
                <button
                  onClick={() => handleDelete(customer._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
