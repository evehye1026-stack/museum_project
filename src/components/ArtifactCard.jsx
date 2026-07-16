import { Link } from 'react-router-dom'
import ArtifactVisual from './ArtifactVisual'
import './ArtifactCard.css'

function ArtifactCard({ artifact }) {
  return (
    <Link to={`/artifacts/${artifact.id}`} className="artifact-card">
      <div className="artifact-thumb">
        <ArtifactVisual className="artifact-thumb-visual" />
      </div>
      <div className="artifact-card-body">
        <p className="artifact-card-hall">
          {artifact.hall} · {artifact.room}
        </p>
        <h4 className="artifact-card-name">{artifact.name}</h4>
      </div>
    </Link>
  )
}

export default ArtifactCard
