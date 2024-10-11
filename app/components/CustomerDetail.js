"use client";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CustomerDetail = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/customer/${id}`)
      .then((response) => response.json())
      .then((data) => setCustomer(data));
  }, [id]);

  if (!customer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Customer Details</h1>
      <p>
        <strong>Name:</strong> {customer.name}
      </p>
      <p>
        <strong>Date of Birth:</strong>{" "}
        {new Date(customer.dateOfBirth).toLocaleDateString()}
      </p>
      <p>
        <strong>Member Number:</strong> {customer.memberNumber}
      </p>
      <p>
        <strong>Interests:</strong> {customer.interests}
      </p>
      <button
        onClick={() => navigate(`/customers/edit/${customer._id}`)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Edit
      </button>
    </div>
  );
};

export default CustomerDetail;
