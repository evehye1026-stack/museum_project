import './StepTimeline.css'

function StepTimeline({ steps }) {
  return (
    <div className="step-timeline">
      {steps.map((step, i) => (
        <div className="step-wrap" key={step.order}>
          <div className="step">
            <div className="step-badge" style={{ background: step.color }}>
              {step.order}
            </div>
            <div className="step-hall">{step.hall}</div>
            <div className="step-time">{step.time}min · 유물 {step.artifactCount}점</div>
          </div>
          {i < steps.length - 1 && <div className="step-connector" />}
        </div>
      ))}
    </div>
  )
}

export default StepTimeline
