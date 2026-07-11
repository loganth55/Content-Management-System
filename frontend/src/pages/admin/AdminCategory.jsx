import { useEffect, useState } from "react";



import CategoryCards from "../../components/admin/Categories/CategoryCards";
import CategoryFilters from "../../components/admin/Categories/CategoryFilters";
import CategoryTable from "../../components/admin/Categories/CategoryTable";
import Pagination from "../../components/admin/Categories/Pagination";
import CategoryModal from "../../components/admin/Categories/CategoryModal";
import {
  getAllCategory,
  createCategory,
  editCategory,
  deleteCategory,
} from "../../services/categoryApi";
function AdminCategory(){




const [cards, setCards] = useState({
  totalCategories: 0,
  activeCategories: 0,
  blogsAssigned: 0,

  totalCategoryGrowth: 0,
  activeCategoryGrowth: 0,
  blogsAssignedGrowth: 0,
});

const [categories, setCategories] = useState([]);

const [pagination, setPagination] = useState({});

const [loading, setLoading] = useState(true);

const [page, setPage] = useState(1);

const [search, setSearch] = useState("");

const [status, setStatus] = useState("");
const [openModal, setOpenModal] = useState(false);

const [editData, setEditData] = useState(null);

const [formData, setFormData] = useState({
  name: "",
  description: "",
  status: "Active",
});

const [image, setImage] = useState(null);


useEffect(() => {
  fetchCategories();
}, [page, search, status]);

const fetchCategories = async () => {
  try {
    const response = await getAllCategory({
      page,
      search,
      status,
    });

    setCards(response.data.cards);

    setCategories(response.data.categories);

    setPagination(response.data.pagination);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};
const handleCreateCategory = async () => {
  try {
    const data = new FormData();

    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("status", formData.status);
    data.append("img", image);
  console.log(formData);
  console.log(image);
    const response = await createCategory(data);
    console.log(response);
    alert(response.message);

    setOpenModal(false);

    setFormData({
      name: "",
      description: "",
      status: "Active",
    });

    setImage(null);

    fetchCategories();
  } catch (error) {
    console.log(error);

    alert("Failed to create category.");
  }
};

const handleDeleteCategory = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this category?",
  );

  if (!confirmDelete) return;

  try {
    const response = await deleteCategory(id);

    alert(response.message);

    fetchCategories();
  } catch (error) {
    console.log(error);

    alert("Failed to delete category.");
  }
};

const handleUpdateCategory = async () => {
  try {
    const data = new FormData();

    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("status", formData.status);

    if (image) {
      data.append("img", image);
    }

    const response = await editCategory(editData._id, data);

    alert(response.message);

    setOpenModal(false);

    setEditData(null);

    setFormData({
      name: "",
      description: "",
      status: "Active",
    });

    setImage(null);

    fetchCategories();
  } catch (error) {
    console.log(error);

    alert("Failed to update category.");
  }
};

if (loading) {
  return (
    <div className="flex justify-center items-center h-screen">Loading...</div>
  );
}
return (
  <div className="p-4 sm:p-6 space-y-6">
    <div>
      <h1 className="text-3xl font-bold">Categories Management</h1>

      <p className="text-gray-500 mt-1">
        Manage all blog categories from one place.
      </p>
    </div>
    <CategoryCards cards={cards} />
    <CategoryFilters
      search={search}
      setSearch={setSearch}
      status={status}
      setStatus={setStatus}
      setOpenModal={setOpenModal}
    />

    <CategoryTable
      categories={categories}
      onEdit={(category) => {
        setEditData(category);
        setOpenModal(true);
      }}
      onDelete={handleDeleteCategory}
    />
  </div>
);
}
export default AdminCategory