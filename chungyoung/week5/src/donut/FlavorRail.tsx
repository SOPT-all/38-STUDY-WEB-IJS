import { flavors } from "./flavors";

type FlavorRailProps = {
  activeIndex: number;
};

export function FlavorRail({ activeIndex }: FlavorRailProps) {
  return (
    <nav className="flavor-rail" aria-label="Flavor progress">
      <p className="rail-current">{flavors[activeIndex].eyebrow}</p>
      <div className="progress-track" aria-hidden="true">
        <span className="progress-fill" />
      </div>
      <ol>
        {flavors.map((flavor, index) => (
          <li key={flavor.eyebrow} className={index === activeIndex ? "is-active" : ""}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{flavor.eyebrow}</strong>
          </li>
        ))}
      </ol>
    </nav>
  );
}
