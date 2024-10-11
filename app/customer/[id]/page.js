"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CustomerDetailPage = ({ params }) => {
  const [customer, setCustomer] = useState(null);
  const router = useRouter();
  const { id } = params; // Extract ID from params

  useEffect(() => {
    const fetchCustomer = async () => {
      const response = await fetch(`/api/customer/${id}`);
      const data = await response.json();
      setCustomer(data);
    };
    fetchCustomer();
  }, [id]);

  if (!customer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Customer Details</h1>
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
        onClick={() => router.push(`/customers/edit/${customer._id}`)}
        className="bg-yellow-500 text-white px-4 py-2 rounded mt-4"
      >
        Edit Customer
      </button>
    </div>
  );
};

export default CustomerDetailPage;
