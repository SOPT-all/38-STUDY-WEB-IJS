export const Section = ({
  children,
  bgColor,
  textColor = '#ffffff',
  isReverse = false,
}) => (
  <div
    className="section"
    style={{ backgroundColor: bgColor, color: textColor }}
  >
    <div className={`content_wrapper ${isReverse ? 'reverse' : ''}`}>
      {children}
    </div>
  </div>
);
