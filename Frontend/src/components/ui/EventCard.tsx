import type { ElementType } from "react";
import { useNavigate } from "react-router-dom";

interface Event {
  title: string;
  description: string;
  date: string;
  location: string;
  status: "upcoming" | "ongoing" | "ended";
  icon: ElementType;
  registrationPath: string;
}

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const Icon = event.icon;
  const navigate = useNavigate();

  const statusStyles = {
    upcoming: {
      badge: "bg-green-500/20 text-green-400",
      icon: "bg-cyan-500/10 text-cyan-400",
      border:
        "border-cyan-500/40 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20",
      button: "bg-cyan-500 text-black hover:bg-cyan-400",
      label: "Upcoming",
    },

    ongoing: {
      badge: "bg-yellow-500/20 text-yellow-400",
      icon: "bg-yellow-500/10 text-yellow-400",
      border:
        "border-yellow-500/40 hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-500/20",
      button: "bg-yellow-500 text-black hover:bg-yellow-400",
      label: "Ongoing",
    },

    ended: {
      badge: "bg-gray-500/20 text-gray-400",
      icon: "bg-gray-500/10 text-gray-400",
      border:
        "border-gray-700/50 hover:border-gray-500",
      button:
        "border border-gray-700 text-gray-300 hover:bg-gray-800",
      label: "Ended",
    },
  };

  const style = statusStyles[event.status];

  return (
    <div
      className={`group rounded-2xl border bg-slate-900/70 p-6 transition-all duration-300 hover:-translate-y-2 ${style.border}`}
    >
      {/* Icon + Status */}
      <div className="flex items-center justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${style.icon}`}
        >
          <Icon className="h-6 w-6" />
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${style.badge}`}
        >
          {style.label}
        </span>
      </div>

      {/* Title */}
      <h3 className="mt-5 text-xl font-bold text-white">
        {event.title}
      </h3>

      {/* Description */}
      <p className="mt-2 text-sm leading-6 text-gray-400">
        {event.description}
      </p>

      {/* Details */}
      <div className="mt-5 space-y-2 text-sm text-gray-300">
        <p>📅 {event.date}</p>
        <p>📍 {event.location}</p>
      </div>

      {/* Button */}
      <button
  onClick={() => navigate(event.registrationPath)}
  className={`mt-6 w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition ${style.button}`}
>
  {event.status === "upcoming"
    ? "Register Now"
    : event.status === "ongoing"
    ? "View Event"
    : "View Details"}
</button>
    </div>
  );
};

export default EventCard;