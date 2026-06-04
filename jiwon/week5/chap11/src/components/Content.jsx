export const Content = ({ title, description, buttonText, onButtonClick }) => (
  <section className="content js-fadeIn">
    <h2 className="title">{title}</h2>
    <p className="description">{description}</p>
    {buttonText && (
      <button onClick={onButtonClick} className="btn">
        {buttonText}
      </button>
    )}
  </section>
);
