function MuseumSelector({ museums, selectedMuseum, onSelect }) {
  return (
    <div>
      {museums.map((museum) => (
        <button key={museum} onClick={() => onSelect(museum)}>
          {museum}
        </button>
      ))}
    </div>
  )
}

export default MuseumSelector
