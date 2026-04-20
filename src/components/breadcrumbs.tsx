import Link from "next/link";

type Crumb = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-[#5f6d66]">
      {items.map((item, index) => (
        <span className="flex items-center gap-2" key={`${item.label}-${index}`}>
          {item.href ? (
            <Link className="transition hover:text-[#0f6c5b]" href={item.href}>
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-[#17352b]">{item.label}</span>
          )}
          {index < items.length - 1 ? <span>/</span> : null}
        </span>
      ))}
    </nav>
  );
}
