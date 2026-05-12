export default function Button({ children, variant = "primary", className = "", ...props }) {
  const styles =
    variant === "danger"
      ? "border-red-200 bg-white text-red-700 hover:bg-red-50"
      : variant === "secondary"
        ? "border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
        : "border-slate-900 bg-slate-900 text-white hover:bg-slate-700";

  return (
    <button
      {...props}
      className={`rounded-md border px-3 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-60 ${styles} ${className}`}
    >
      {children}
    </button>
  );
}
