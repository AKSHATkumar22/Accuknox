import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

/*
Initial JSON structure (as required):
- categories: each category has id, name, widgets: [{id, title, text}]
*/

const initialState = {
  categories: [
    {
      id: "cat-1",
      name: "CSPM Executive dashboard",
      widgets: [
        { id: uuidv4(), title: "Widget A", text: "Random text for Widget A" },
        { id: uuidv4(), title: "Widget B", text: "Random text for Widget B" },
      ],
    },
    {
      id: "cat-2",
      name: "Operations",
      widgets: [
        { id: uuidv4(), title: "Ops Widget 1", text: "Ops random text" },
      ],
    },
    {
      id: "cat-3",
      name: "Security",
      widgets: [
        { id: uuidv4(), title: "Sec Widget X", text: "Security random" },
      ],
    },
  ],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    addWidgetToCategory: {
      reducer(state, action) {
        const { categoryId, widget } = action.payload;
        const cat = state.categories.find((c) => c.id === categoryId);
        if (cat) cat.widgets.push(widget);
      },
      prepare(categoryId, title, text) {
        return {
          payload: {
            categoryId,
            widget: {
              id: uuidv4(),
              title,
              text,
            },
          },
        };
      },
    },
    removeWidgetFromCategory(state, action) {
      const { categoryId, widgetId } = action.payload;
      const cat = state.categories.find((c) => c.id === categoryId);
      if (cat) cat.widgets = cat.widgets.filter((w) => w.id !== widgetId);
    },
    removeWidgetFromAllCategories(state, action) {
      const widgetId = action.payload;
      state.categories.forEach((cat) => {
        cat.widgets = cat.widgets.filter((w) => w.id !== widgetId);
      });
    },
    toggleWidgetAssignment(state, action) {
      // assign or unassign widget (by id) to/from a category
      const { categoryId, widget } = action.payload; // if widget exists in cat, remove; else add
      const cat = state.categories.find((c) => c.id === categoryId);
      if (!cat) return;
      const exists = cat.widgets.some((w) => w.id === widget.id);
      if (exists) {
        cat.widgets = cat.widgets.filter((w) => w.id !== widget.id);
      } else {
        cat.widgets.push(widget);
      }
    },
    addCategory(state, action) {
      const name = action.payload;
      state.categories.push({
        id: `cat-${Date.now()}`,
        name,
        widgets: [],
      });
    },
    removeCategory(state, action) {
      const id = action.payload;
      state.categories = state.categories.filter((c) => c.id !== id);
    },
  },
});

export const {
  addWidgetToCategory,
  removeWidgetFromCategory,
  removeWidgetFromAllCategories,
  toggleWidgetAssignment,
  addCategory,
  removeCategory,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
