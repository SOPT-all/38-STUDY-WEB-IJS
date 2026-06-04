interface IContentProps {
  eyebrow?: string;
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export const Content = ({ eyebrow, title, description, buttonText, onButtonClick }: IContentProps) => (
  <div className="content fade-target">
    {eyebrow && <span className="content__eyebrow">{eyebrow}</span>}
    <h2 className="content__title">{title}</h2>
    <p className="content__desc">{description}</p>
    {buttonText && (
      <button type="button" className="content__btn" onClick={onButtonClick}>
        {buttonText}
      </button>
    )}
  </div>
);
