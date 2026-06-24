import { useState } from "react";
import { FaPlus, FaSearch, FaEdit, FaTrash, FaEye } from "react-icons/fa";

export default function Colleges() {
const [search, setSearch] = useState("");
const [showForm, setShowForm] = useState(false);
const [editingCollege, setEditingCollege] = useState(null);

const [editData, setEditData] = useState({
  name: "",
  location: "",
  admin: "",
  professors: "",
  status: "Pending",
});

const [newCollege, setNewCollege] = useState({
  name: "",
  location: "",
  admin: "",
  professors: "",
  status: "pending",
});

const [colleges,setColleges] = useState([
{
id: 1,
name: "PSG College of Technology",
location: "Coimbatore",
admin: "Shrija",
professors: 50,
status: "Active",
},
{
id: 2,
name: "KGISL Institute of Technology",
location: "Coimbatore",
admin: "Janaki",
professors: 60,
status: "Active",
},
{
id: 3,
name: "Kumaraguru College of Technology",
location: "Coimbatore",
admin: "Karthik",
professors: 45,
status: "Pending",
},
]);;

const filteredColleges = colleges.filter((college) =>
college.name.toLowerCase().includes(search.toLowerCase())
);
const handleAddCollege = () => {
  const college = {
    id: Date.now(),
    name: newCollege.name,
    location: newCollege.location,
    admin: newCollege.admin,
    professors: newCollege.professors || 0,
    status: "Pending",
  };

  setColleges([...colleges, college]);

  setNewCollege({
    name: "",
    location: "",
    admin: "",
    professors: "",
    status: "Pending",
  });

  setShowForm(false);
};

const handleDelete = (id) => {
  setColleges(
    colleges.filter((college) => college.id !== id)
  );
};

const handleToggleStatus = (id) => {
  setColleges(
    colleges.map((college) => {
      if (college.id !== id) return college;

      let nextStatus;

      switch (college.status) {
        case "Pending":
          nextStatus = "Active";
          break;

        case "Active":
          nextStatus = "Disabled";
          break;

        case "Disabled":
          nextStatus = "Pending";
          break;

        default:
          nextStatus = "Pending";
      }

      return {
        ...college,
        status: nextStatus,
      };
    })
  );
};

const handleView = (college) => {
  alert(
    `College: ${college.name}\nLocation: ${college.location}\nAdmin: ${college.admin}\nProfessors: ${college.professors}\nStatus: ${college.status}`
  );
};

const handleEdit = (college) => {
  setEditingCollege(college.id);

  setEditData({
    name: college.name,
    location: college.location,
    admin: college.admin,
    professors: college.professors,
    status: college.status,
  });
};
const handleSaveEdit = () => {
  setColleges(
    colleges.map((college) =>
      college.id === editingCollege
        ? {
            ...college,
            ...editData,
          }
        : college
    )
  );

  setEditingCollege(null);
};

const handleCancelEdit = () => {
  setEditingCollege(null);
};


return ( <div className="min-h-screen bg-gray-100 p-6">


  <div className="flex justify-between items-center mb-6">

    <div>
      <h1 className="text-3xl font-bold text-gray-800">
        Colleges Management
      </h1>

      <p className="text-gray-500">
        Manage all registered colleges.
      </p>
    </div>

    <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
      <FaPlus />
      Add College
    </button>

  </div>

  {showForm && (
    <div className="bg-white rounded-xl shadow p-4 mb-6">

      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Add New College
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
          <label className="block text-gray-700 mb-2">College Name</label>
          <input
            type="text"
            placeholder="Enter college name"
            value={newCollege.name}
            onChange={(e) => setNewCollege({...newCollege, name: e.target.value})}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Location</label>
          <input
            type="text"
            placeholder="Enter location"
            value={newCollege.location}
            onChange={(e) => setNewCollege({...newCollege, location: e.target.value})}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Admin</label>
          <input
            type="text"
            placeholder="Enter admin name"
            value={newCollege.admin}
            onChange={(e) => setNewCollege({...newCollege, admin: e.target.value})}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>
        <div>
  <label className="block text-gray-700 mb-2">
    Professors
  </label>

  <input
    type="number"
    placeholder="Enter number of professors"
    value={newCollege.professors}
    onChange={(e) =>
      setNewCollege({
        ...newCollege,
        professors: e.target.value,
      })
    }
    className="w-full border rounded-lg px-4 py-2"
  />
</div>

      </div>

      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={() => setShowForm(false)}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          onClick={handleAddCollege}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add College
        </button>
      </div>

    </div>
  )}


  <div className="bg-white rounded-xl shadow p-4 mb-6">

    <div className="relative">

      <FaSearch className="absolute left-3 top-4 text-gray-400" />

      <input
        type="text"
        placeholder="Search College..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-lg pl-10 pr-4 py-3"
      />

    </div>

  </div>
  {editingCollege && (
  <div className="bg-white rounded-xl shadow p-6 mb-6">

    <h2 className="text-xl font-bold mb-4">
      Edit College
    </h2>

    <div className="grid md:grid-cols-2 gap-4">

      <input
        type="text"
        placeholder="College Name"
        value={editData.name}
        onChange={(e) =>
          setEditData({
            ...editData,
            name: e.target.value,
          })
        }
        className="border p-3 rounded"
      />

      <input
        type="text"
        placeholder="Location"
        value={editData.location}
        onChange={(e) =>
          setEditData({
            ...editData,
            location: e.target.value,
          })
        }
        className="border p-3 rounded"
      />

      <input
        type="text"
        placeholder="Admin"
        value={editData.admin}
        onChange={(e) =>
          setEditData({
            ...editData,
            admin: e.target.value,
          })
        }
        className="border p-3 rounded"
      />

      <input
        type="number"
        placeholder="Professors"
        value={editData.professors}
        onChange={(e) =>
          setEditData({
            ...editData,
            professors: e.target.value,
          })
        }
        className="border p-3 rounded"
      />

      <select
        value={editData.status}
        onChange={(e) =>
          setEditData({
            ...editData,
            status: e.target.value,
          })
        }
        className="border p-3 rounded"
      >
        <option>Pending</option>
        <option>Active</option>
        <option>Disabled</option>
      </select>

    </div>

    <div className="flex justify-end gap-3 mt-4">

      <button
        onClick={() => setEditingCollege(null)}
        className="bg-gray-500 text-white px-4 py-2 rounded"
      >
        Cancel
      </button>

      <button
        onClick={handleSaveEdit}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>

    </div>

  </div>
)}

  <div className="bg-white rounded-xl shadow overflow-hidden">

    <table className="w-full">

      <thead className="bg-gray-200">
        <tr>
          <th className="text-left p-4">College Name</th>
          <th className="text-left p-4">Location</th>
          <th className="text-left p-4">Admin</th>
          <th className="text-left p-4">Professors</th>
          <th className="text-left p-4">Status</th>
          <th className="text-left p-4">Actions</th>
        </tr>
      </thead>

      <tbody>

        {filteredColleges.map((college) => (
          <tr
            key={college.id}
            className="border-t hover:bg-gray-50"
          >
            <td className="p-4">{college.name}</td>

            <td className="p-4">{college.location}</td>

            <td className="p-4">{college.admin}</td>

            <td className="p-4">{college.professors}</td>

            <td className="p-4">

<span
  className={`px-3 py-1 rounded-full text-white text-sm ${
    college.status === "Active"
      ? "bg-green-500"
      : college.status === "Pending"
      ? "bg-yellow-500"
      : "bg-red-500"
  }`}
>
  {college.status}
</span>
           
</td>
            <td className="p-4">

  <div className="flex gap-4 items-center">

    <button
      onClick={() => handleView(college)}
      className="text-blue-600 hover:text-blue-800"
    >
      <FaEye />
    </button>

    <button
      onClick={() => handleEdit(college)}
      className="text-green-600 hover:text-green-800"
    >
      <FaEdit />
    </button>

    <button
      onClick={() => handleToggleStatus(college.id)}
      className="text-yellow-600 hover:text-yellow-800"
    >
      Toggle
    </button>

    <button
      onClick={() => handleDelete(college.id)}
      className="text-red-600 hover:text-red-800"
    >
      <FaTrash />
    </button>

  </div>

</td>
          </tr>
        ))}

      </tbody>

    </table>

  </div>

</div>
);
}
