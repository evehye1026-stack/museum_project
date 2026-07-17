import { Link } from 'react-router-dom'
import ArtifactVisual from './ArtifactVisual'
import { ARTIFACT_PHOTOS } from '../data/artifactPhotos'
import { isChatEnabled } from '../lib/personaBuilder'
import { useArtifactThumb } from '../hooks/useArtifactThumb'
import './ArtifactCard.css'

function ArtifactCard({ artifact }) {
  const manualPhoto = ARTIFACT_PHOTOS[artifact.id]
  const { ref, thumbUrl } = useArtifactThumb(manualPhoto ? null : artifact.name)
  const photo = manualPhoto || thumbUrl

  return (
    <Link to={`/artifacts/${artifact.id}`} className="artifact-card">
      <div className="artifact-thumb" ref={ref}>
        {isChatEnabled(artifact) && (
          <span className="artifact-chat-badge">💬 대화 가능</span>
        )}
        {photo ? (
          <img src={photo} alt={artifact.name} className="artifact-thumb-photo" />
        ) : (
          <ArtifactVisual className="artifact-thumb-visual" />
        )}
      </div>
      <div className="artifact-card-body">
        <p className="artifact-card-hall">
          {artifact.museum} · {artifact.hall} · {artifact.room}
        </p>
        <h4 className="artifact-card-name">{artifact.name}</h4>
      </div>
    </Link>
  )
}

export default ArtifactCard
