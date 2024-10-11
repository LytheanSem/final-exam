import Customer from "@/models/Customer";

// GET method to fetch a customer by ID
export async function GET(request, { params }) {
  const id = params.id;
  const customer = await Customer.findById(id);
  return Response.json(customer);
}

// DELETE method to delete a customer by ID
export async function DELETE(request, { params }) {
  const id = params.id;
  const customer = await Customer.findByIdAndDelete(id);
  return Response.json(customer);
}

// PUT method to update a customer by ID
export async function PUT(request, { params }) {
  const id = params.id;
  const body = await request.json();

  // Find the customer by ID and update with new data
  const customer = await Customer.findByIdAndUpdate(id, body, { new: true });

  return Response.json(customer);
}
