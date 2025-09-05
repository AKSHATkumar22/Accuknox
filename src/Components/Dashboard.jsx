import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Category from "./Category";
import AddWidgetModal from "./AddWidgetModal";
import { addCategory } from "../features/dashboardSlice";

export default function Dashboard() {
  const categories = useSelector((s) => s.dashboard.categories);
  const dispatch = useDispatch();

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategoryForAdd, setSelectedCategoryForAdd] = useState(null);

  function openAddModal(categoryId) {
    setSelectedCategoryForAdd(categoryId);
    setShowAddModal(true);
  }

  function closeModal() {
    setShowAddModal(false);
    setSelectedCategoryForAdd(null);
  }

  return (
    <div>
      {/* ---- Top Bar ---- */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-1">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Dashboard V2
              </li>
            </ol>
          </nav>
          <h5 className="fw-bold">CNAPP Dashboard</h5>
        </div>
        <div className="d-flex gap-2">
          <input
            type="search"
            className="form-control"
            placeholder="Search anything..."
            style={{ width: "250px" }}
          />
          <button className="btn btn-primary">+ Add Widget</button>
          <select className="form-select">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Custom Range</option>
          </select>
        </div>
      </div>

      {/* ---- Categories ---- */}
      {categories.map((cat) => (
        <div key={cat.id} className="mb-4">
          <h6 className="fw-bold mb-2">{cat.name}</h6>
          <div className="row g-3">
            {cat.widgets.map((w) => (
              <div className="col-md-4" key={w.id}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body d-flex flex-column justify-content-center text-center">
                    <h6 className="fw-bold">{w.title}</h6>
                    <p className="text-muted">
                      {w.text || "No Graph data available!"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {/* Empty slot with +Add Widget */}
            <div className="col-md-4">
              <div
                className="card h-100 border border-dashed text-center d-flex align-items-center justify-content-center"
                style={{ cursor: "pointer", borderStyle: "dashed" }}
                onClick={() => openAddModal(cat.id)}
              >
                <span className="text-primary fw-bold">+ Add Widget</span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* ---- Add Widget Modal ---- */}
      <AddWidgetModal
        show={showAddModal}
        onHide={closeModal}
        categoryId={selectedCategoryForAdd}
      />
    </div>
  );
}
