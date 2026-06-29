import { useState } from "react";
import { FaUniversity, FaEnvelope, FaUserTie, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function InviteCollege() {
  const [formData, setFormData] = useState({
    collegeName: "",
    collegeCode: "",
    collegeEmail: "",
    adminName: "",
    adminEmail: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    alert("Invitation Sent Successfully!");

    setFormData({
      collegeName: "",
      collegeCode: "",
      collegeEmail: "",
      adminName: "",
      adminEmail: "",
      phone: "",
      address: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-blue-700 mb-2">
          Invite College
        </h1>

        <p className="text-gray-500 mb-8">
          Send an invitation to a college administrator to join the Smart Teaching Assistant platform.
        </p>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="font-semibold">College Name</label>

            <div className="flex items-center border rounded-lg mt-2 px-3">
              <FaUniversity className="text-gray-400" />
              <input
                type="text"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                placeholder="Enter College Name"
                className="w-full p-3 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="font-semibold">College Code</label>

            <input
              type="text"
              name="collegeCode"
              value={formData.collegeCode}
              onChange={handleChange}
              placeholder="College Code"
              className="w-full border rounded-lg p-3 mt-2"
              required
            />
          </div>

          <div>
            <label className="font-semibold">College Email</label>

            <div className="flex items-center border rounded-lg mt-2 px-3">
              <FaEnvelope className="text-gray-400" />
              <input
                type="email"
                name="collegeEmail"
                value={formData.collegeEmail}
                onChange={handleChange}
                placeholder="college@email.com"
                className="w-full p-3 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="font-semibold">Admin Name</label>

            <div className="flex items-center border rounded-lg mt-2 px-3">
              <FaUserTie className="text-gray-400" />
              <input
                type="text"
                name="adminName"
                value={formData.adminName}
                onChange={handleChange}
                placeholder="College Admin Name"
                className="w-full p-3 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="font-semibold">Admin Email</label>

            <input
              type="email"
              name="adminEmail"
              value={formData.adminEmail}
              onChange={handleChange}
              placeholder="admin@email.com"
              className="w-full border rounded-lg p-3 mt-2"
              required
            />
          </div>

          <div>
            <label className="font-semibold">Contact Number</label>

            <div className="flex items-center border rounded-lg mt-2 px-3">
              <FaPhone className="text-gray-400" />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="9876543210"
                className="w-full p-3 outline-none"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="font-semibold">College Address</label>

            <div className="flex items-start border rounded-lg mt-2 px-3">
              <FaMapMarkerAlt className="text-gray-400 mt-4" />
              <textarea
                rows="4"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter College Address"
                className="w-full p-3 outline-none resize-none"
              />
            </div>
          </div>

          <div className="md:col-span-2">

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Send Invitation
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}