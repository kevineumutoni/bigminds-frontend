import './style.css'

const GaugeCard = ({ value, total, description, title }) => {
  return (
    <div className="gauge-card">
      <div className="gauge-display">
        <div className="gauge-arc">
        </div>
        <div className="gauge-value">
          <span className="value-numerator">{value}</span>
        </div>
      </div>
      <p className="gauge-description">{description}</p>
    </div>
  );
};

export default GaugeCard;