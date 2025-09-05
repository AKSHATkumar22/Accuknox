import React from "react";
import WidgetCard from "./WidgetCard";

export default function Category({ category, onAddWidget }) {
  return (
    <div className="mb-4">
      {/* Category Title */}
      <h6 className="fw-bold mb-2">{category.name}</h6>

      {/* Grid of Widgets */}
      <div className="row g-3">
        {category.widgets.map((widget) => (
          <div className="col-md-4" key={widget.id}>
            <WidgetCard widget={widget} categoryId={category.id} />
          </div>
        ))}

        {/* Empty Add Widget Slot */}
        <div className="col-md-4">
          <div
            className="card h-100 border text-center d-flex align-items-center justify-content-center"
            style={{ borderStyle: "dashed", cursor: "pointer" }}
            onClick={onAddWidget}
          >
            <span className="text-primary fw-bold">+ Add Widget</span>
          </div>
        </div>
      </div>
    </div>
  );
}
