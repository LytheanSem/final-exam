"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CustomerPage = () => {
  const [customers, setCustomers] = useState([]);
  const router = useRouter();

  // Fetch customers from the API when the component mounts
  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await fetch("/api/customer");
      const data = await response.json();
      setCustomers(data);
    };
    fetchCustomers();
  }, []);

  // Function to handle customer deletion
  const handleDelete = async (id) => {
    const confirmed = confirm("Are you sure you want to delete this customer?");
    if (confirmed) {
      await fetch(`/api/customer/${id}`, {
        method: "DELETE",
      });
      // Refresh the list after deleting
      setCustomers(customers.filter((customer) => customer._id !== id));
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Customer List</h1>
        {/* Add Customer button */}
        <Link href="/customers/add" passHref>
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            Add Customer
          </button>
        </Link>
      </div>

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
                <Link href={`/customer/${customer._id}`} passHref>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    View
                  </button>
                </Link>
                <Link href={`/customers/edit/${customer._id}`} passHref>
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded ml-2">
                    Edit
                  </button>
                </Link>
                {/* Delete Button */}
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

export default CustomerPage;
