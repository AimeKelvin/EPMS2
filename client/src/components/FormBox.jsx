export default function FormBox({ title, children }) {
  return (
    <section className="mb-5 rounded-lg border border-slate-200 bg-white p-4">
      <h2 className="mb-4 text-base font-semibold text-slate-950">{title}</h2>
      {children}
    </section>
  );
}
