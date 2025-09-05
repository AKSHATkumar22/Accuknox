import React from "react";
import { useDispatch } from "react-redux";
import { removeWidgetFromCategory } from "../features/dashboardSlice";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

export default function WidgetCard({ widget, categoryId }) {
  const dispatch = useDispatch();

  function handleRemove() {
    if (window.confirm(`Remove widget "${widget.title}"?`)) {
      dispatch(removeWidgetFromCategory({ categoryId, widgetId: widget.id }));
    }
  }

  // Dummy pie chart data
  const pieData = [
    { name: "Passed", value: 70 },
    { name: "Failed", value: 30 },
  ];

  const COLORS = ["#00C49F", "#FF8042"];

  return (
    <div className="card h-100 shadow-sm position-relative">
      <button
        className="btn btn-sm btn-light position-absolute"
        style={{ top: "8px", right: "8px" }}
        onClick={handleRemove}
      >
        ×
      </button>

      <div className="card-body text-center">
        <h6 className="fw-bold mb-3">{widget.title}</h6>

        {widget.chartType === "pie" ? (
          <div style={{ width: "100%", height: 200 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-muted">{widget.text}</p>
        )}
      </div>
    </div>
  );
}
