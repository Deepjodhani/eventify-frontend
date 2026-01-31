import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventById, updateEvent } from "../services/api";
import toast from "react-hot-toast";
import TimePicker from "react-time-picker";

import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });

  const [time, setTime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getEventById(id)
      .then((res) => {
        const event = res.data;
        setFormData({
          title: event.title,
          description: event.description,
          date: event.date?.split("T")[0],
          location: event.location,
        });
        setTime(event.time);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load event");
        navigate("/");
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    try {
      setSubmitting(true);

      await updateEvent(id, {
        ...formData,
        time,
      });

      toast.success("Event updated successfully ✨");
      navigate(`/events/${id}`);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Update failed"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p className="p-6 text-slate-500">Loading…</p>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-xl px-6 py-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-8">
          <h1 className="mb-6 text-2xl font-semibold text-slate-900">
            Edit Event
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full rounded-lg border p-3"
            />

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
              className="w-full rounded-lg border p-3"
            />

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full rounded-lg border p-3"
            />

            <TimePicker
              value={time}
              onChange={setTime}
              disableClock
              clearIcon={null}
              format="hh:mm a"
              className="w-full"
            />

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full rounded-lg border p-3"
            />

            <button
              type="submit"
              disabled={submitting}
              className={`w-full rounded-xl py-3 text-white ${
                submitting
                  ? "bg-indigo-400"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {submitting ? "Updating…" : "Update Event"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
