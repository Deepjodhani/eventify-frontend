import { useState } from "react";
import { createEvent } from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import TimePicker from "react-time-picker";

import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

export default function CreateEvent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });

  const [time, setTime] = useState(null); // ⏰ time only
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    if (!time) {
      toast.error("Please select event time");
      return;
    }

    try {
      setSubmitting(true);

      await createEvent({
        ...formData,
        time, // already in hh:mm AM/PM
      });

      toast.success("Event created successfully 🎉");
      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create event"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-xl px-6 py-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="mb-6 text-2xl font-semibold text-slate-900">
            Create New Event
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <input
              type="text"
              name="title"
              placeholder="Event title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {/* Description */}
            <textarea
              name="description"
              placeholder="Event description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
              className="w-full rounded-lg border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {/* Date */}
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {/* ⏰ Time (PROPER picker) */}
            <div>
              <TimePicker
                value={time}
                onChange={setTime}
                disableClock
                clearIcon={null}
                format="hh:mm a"
                hourPlaceholder="hh"
                minutePlaceholder="mm"
                className="w-full"
              />
            </div>

            {/* Location */}
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className={`w-full rounded-xl py-3 font-medium text-white transition ${
                submitting
                  ? "cursor-not-allowed bg-indigo-400"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {submitting ? "Creating…" : "Create Event"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
