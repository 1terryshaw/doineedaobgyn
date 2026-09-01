import Link from "next/link";
import type { ReactNode } from "react";

interface Props {
  vertical: string;
  linkText?: string;
  href?: string;
  accentTextClass?: string;
  subtitle?: string;
  /** Site Surfer day-4 — the populated geo block, rendered inside this section. */
  children?: ReactNode;
}

const SUBTITLE_BY_VERTICAL: Record<string, string> = {
  realestate: "Find a real estate agent in your area",
  plumber: "Find a trusted plumber in your area",
  caterer: "Find a caterer in your area",
  electrician: "Find a licensed electrician in your area",
  hvac: "Find an HVAC technician in your area",
  landscaper: "Find a landscaper in your area",
  roofer: "Find a roofer in your area",
  mechanic: "Find a mechanic in your area",
  florist: "Find a florist in your area",
  photographer: "Find a photographer in your area",
  dentist: "Find a dentist in your area",
  chiropractor: "Find a chiropractor in your area",
  caterer_: "Find a caterer in your area",
};

export default function BrowseByArea({
  vertical,
  linkText = "Browse by area →",
  href = "/directory",
  accentTextClass = "text-blue-600 hover:text-blue-700",
  subtitle,
  children,
}: Props) {
  const sub = subtitle ?? SUBTITLE_BY_VERTICAL[vertical] ?? `Find a ${vertical} in your area`;
  // Site Surfer day-4: when the caller supplies a populated geo block it renders
  // INSIDE this section, so the homepage has exactly ONE "Browse by Area" heading
  // and that heading owns the chips. Before this, the stub rendered its own empty
  // heading + "browse by area" link ABOVE an unlabelled populated block.
  // With no children the section keeps its original standalone form.
  const hasHub = Boolean(children);

  return (
    <section className="py-8 md:py-12 px-4" data-testid="browse-by-area">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Browse by Area</h2>
        <p className="mt-2 text-base text-gray-500">{sub}</p>
        {!hasHub && (
          <div className="mt-6">
            <Link
              href={href}
              className={`inline-block text-lg font-medium hover:underline transition-colors ${accentTextClass}`}
            >
              {linkText}
            </Link>
          </div>
        )}
      </div>
      {hasHub && <div className="max-w-7xl mx-auto mt-8">{children}</div>}
    </section>
  );
}
