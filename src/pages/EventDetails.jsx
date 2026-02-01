import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getEventById,
  registerForEvent,
  deleteEvent,
  deregisterForEvent,
} from "../services/api";
import toast from "react-hot-toast";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchEvent();
    // eslint-disable-next-line
  }, [id]);

  const fetchEvent = async () => {
    try {
      const res = await getEventById(id);
      setEvent(res.data);
    } catch {
      toast.error("Failed to load event");
    } finally {
      setLoading(false);
    }
  };

  const isCreator = event?.user?._id === userId;
  const isRegistered = event?.registrations?.includes(userId);

  // REGISTER
  const handleRegister = async () => {
    try {
      setProcessing(true);
      await registerForEvent(id);
      toast.success("Registered successfully 🎉");

      setEvent((prev) => ({
        ...prev,
        registrations: [...(prev.registrations || []), userId],
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setProcessing(false);
    }
  };

  // DEREGISTER
  const handleDeregister = async () => {
    try {
      setProcessing(true);
      await deregisterForEvent(id);
      toast.success("Deregistered successfully");

      setEvent((prev) => ({
        ...prev,
        registrations: prev.registrations.filter(
          (uid) => uid !== userId
        ),
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Deregistration failed");
    } finally {
      setProcessing(false);
    }
  };

  // DELETE
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

  if (loading) return <p className="p-6 text-slate-500">Loading…</p>;
  if (!event) return <p className="p-6">Event not found</p>;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="rounded-2xl bg-white border border-slate-200 p-8">
          <div className="mb-4 inline-block rounded-full bg-indigo-50 px-4 py-1 text-sm font-medium text-indigo-600">
            {new Date(event.date).toDateString()}
          </div>

          <h1 className="text-3xl font-semibold text-slate-900">
            {event.title}
          </h1>

          <p className="mt-4 text-slate-600 leading-relaxed">
            {event.description}
          </p>

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

          <div className="mt-8 flex flex-wrap gap-4">
            {isRegistered ? (
              <button
                onClick={handleDeregister}
                disabled={processing}
                className="rounded-xl border border-red-500 px-6 py-3 text-red-600 hover:bg-red-50 disabled:opacity-50 transition"
              >
                Deregister
              </button>
            ) : (
              <button
                onClick={handleRegister}
                disabled={processing}
                className="rounded-xl bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-700 disabled:opacity-50 transition"
              >
                {processing ? "Processing…" : "Register for Event"}
              </button>
            )}

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
