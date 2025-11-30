export default function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-12 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
      {subtitle && <p className="text-secondaryText max-w-2xl mx-auto">{subtitle}</p>}
      <div className="w-24 h-1 bg-accent mx-auto mt-4 rounded-full" />
    </div>
  );
}
