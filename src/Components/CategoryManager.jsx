import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleWidgetAssignment } from "../features/dashboardSlice";

/*
This component shows all widgets present in the system (collected across categories)
and allows toggling their assignment to each category (checkbox per category).
Unchecking a widget's checkbox under a category removes it from that category.
Checking will add the widget (duplicate check prevented in slice).
*/

export default function CategoryManager() {
  const categories = useSelector((s) => s.dashboard.categories);
  const dispatch = useDispatch();

  // collect unique widgets across categories (by id)
  const widgetsById = {};
  categories.forEach((cat) => {
    cat.widgets.forEach((w) => {
      widgetsById[w.id] = w;
    });
  });

  // since new widgets may only exist inside cats, this shows everything
  const allWidgets = Object.values(widgetsById);

  if (allWidgets.length === 0)
    return (
      <div className="alert alert-light">No widgets available to manage.</div>
    );

  return (
    <div className="card p-3 mb-3">
      <h6>
        Manage widget assignments (uncheck to remove widget from a category)
      </h6>
      <div className="table-responsive mt-2">
        <table className="table table-sm align-middle">
          <thead>
            <tr>
              <th>Widget</th>
              {categories.map((c) => (
                <th key={c.id}>{c.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allWidgets.map((w) => (
              <tr key={w.id}>
                <td>
                  <div>
                    <strong>{w.title}</strong>
                  </div>
                  <div className="text-muted" style={{ fontSize: "0.85rem" }}>
                    {w.text}
                  </div>
                </td>
                {categories.map((cat) => {
                  const assigned = !!cat.widgets.find((x) => x.id === w.id);
                  return (
                    <td key={cat.id}>
                      <input
                        type="checkbox"
                        checked={assigned}
                        onChange={() =>
                          dispatch(
                            toggleWidgetAssignment({
                              categoryId: cat.id,
                              widget: w,
                            })
                          )
                        }
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
