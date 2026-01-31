import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getEventById,
  registerForEvent,
  deleteEvent,
} from "../services/api";
import toast from "react-hot-toast";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    getEventById(id)
      .then((res) => {
        setEvent(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleRegister = async () => {
    try {
      setRegistering(true);
      await registerForEvent(id);
      toast.success("You are registered for this event 🎉");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed"
      );
    } finally {
      setRegistering(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteEvent(id);
      toast.success("Event deleted successfully");
      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Not authorized or deletion failed"
      );
    }
  };

  if (loading) {
    return <p className="p-6 text-slate-500">Loading…</p>;
  }

  if (!event) {
    return <p className="p-6">Event not found</p>;
  }

  const isCreator = event.user?._id === userId;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="rounded-2xl bg-white border border-slate-200 p-8">
          {/* Date */}
          <div className="mb-4 inline-block rounded-full bg-indigo-50 px-4 py-1 text-sm font-medium text-indigo-600">
            {new Date(event.date).toDateString()}
          </div>

          {/* Title */}
          <h1 className="text-3xl font-semibold text-slate-900">
            {event.title}
          </h1>

          {/* Description */}
          <p className="mt-4 text-slate-600 leading-relaxed">
            {event.description}
          </p>

          {/* Meta */}
          <div className="mt-6 space-y-2 text-slate-500">
            <p>📍 Location: {event.location}</p>
            <p>⏰ Time: {event.time}</p>
            <p>
              👤 Created by{" "}
              <span className="font-medium text-slate-700">
                {event.user?.name}
              </span>
            </p>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={handleRegister}
              disabled={registering}
              className="rounded-xl bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-700 disabled:opacity-50"
            >
              {registering ? "Registering…" : "Register for Event"}
            </button>

            {/* Creator-only actions */}
            {isCreator && (
              <>
                <button
                  onClick={() => navigate(`/events/${id}/edit`)}
                  className="rounded-xl border border-indigo-500 px-6 py-3 text-indigo-600 hover:bg-indigo-50 transition"
                >
                  Edit Event
                </button>

                <button
                  onClick={handleDelete}
                  className="rounded-xl border border-red-500 px-6 py-3 text-red-600 hover:bg-red-50 transition"
                >
                  Delete Event
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
