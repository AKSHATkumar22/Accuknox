import React, { useState } from "react";
import { Modal, Button, Tabs, Tab, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addWidgetToCategory } from "../features/dashboardSlice";

export default function AddWidgetModal({ show, onHide, categoryId }) {
  const dispatch = useDispatch();

  // Sample widget lists for each tab (you can replace with JSON / API data)
  const widgetOptions = {
    CSPM: [
      { id: "w1", title: "Cloud Accounts", text: "Connected / Not Connected" },
      {
        id: "w2",
        title: "Cloud Account Risk Assessment",
        text: "Risk summary",
      },
    ],
    CWPP: [
      { id: "w3", title: "Top k8s Namespace Alerts", text: "Namespace alerts" },
      { id: "w4", title: "Workload Alerts", text: "Workload alerts" },
    ],
    Image: [
      {
        id: "w5",
        title: "Image Risk Assessment",
        text: "Total vulnerabilities",
      },
      {
        id: "w6",
        title: "Image Security Issues",
        text: "Security issues summary",
      },
    ],
    Ticket: [
      { id: "w7", title: "Open Tickets", text: "Tickets overview" },
      { id: "w8", title: "Closed Tickets", text: "Tickets resolved" },
    ],
  };

  const [activeTab, setActiveTab] = useState("CSPM");
  const [selectedWidgets, setSelectedWidgets] = useState([]);

  function toggleWidget(widgetId) {
    setSelectedWidgets((prev) =>
      prev.includes(widgetId)
        ? prev.filter((id) => id !== widgetId)
        : [...prev, widgetId]
    );
  }

  function handleConfirm() {
    // Add all selected widgets to the chosen category
    widgetOptions[activeTab].forEach((w) => {
      if (selectedWidgets.includes(w.id)) {
        dispatch(addWidgetToCategory(categoryId, w.title, w.text));
      }
    });
    setSelectedWidgets([]);
    onHide();
  }

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header
        style={{ backgroundColor: "#0d1a66", color: "white" }}
        closeButton
      >
        <Modal.Title>Add Widget</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="mb-3">
          Personalize your dashboard by adding the following widget:
        </p>

        {/* Tabs for categories */}
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-3"
        >
          {Object.keys(widgetOptions).map((key) => (
            <Tab eventKey={key} title={key} key={key}>
              {widgetOptions[key].map((w) => (
                <Form.Check
                  key={w.id}
                  type="checkbox"
                  label={w.title}
                  checked={selectedWidgets.includes(w.id)}
                  onChange={() => toggleWidget(w.id)}
                  className="mb-2"
                />
              ))}
            </Tab>
          ))}
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
