import { ArrowUpRight } from "lucide-react";
import { flavors } from "./flavors";

export function CopyPanels() {
  return (
    <div className="copy-track">
      {flavors.map((flavor, index) => (
        <article className="copy-panel" key={flavor.name}>
          <div className="copy-card">
            <p className="eyebrow">{flavor.eyebrow}</p>
            {index === 0 ? (
              <h1 id="page-title">Sweet Orbit</h1>
            ) : (
              <h2>{flavor.name}</h2>
            )}
            <p className="note">{flavor.note}</p>
            <p className="metric">{flavor.metric}</p>
          </div>
        </article>
      ))}

      <article className="copy-panel final-panel">
        <div className="copy-card final-card">
          <p className="eyebrow">R3F x GSAP</p>
          <h2>One canvas, four scroll states</h2>
          <p className="note">
            Geometry, material, camera, and DOM state stay synced through a single scrubbed
            timeline.
          </p>
          <a className="cta-link" href="https://docs.pmnd.rs/react-three-fiber" target="_blank">
            R3F Docs
            <ArrowUpRight aria-hidden="true" size={18} strokeWidth={2.2} />
          </a>
        </div>
      </article>
    </div>
  );
}
