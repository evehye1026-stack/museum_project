import './Skeleton.css'

export function CardSkeletonGrid({ count = 6 }) {
  return (
    <div className="card-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div className="skeleton-card" key={i}>
          <div className="skeleton-block skeleton-thumb" />
          <div className="skeleton-card-body">
            <div className="skeleton-block skeleton-line skeleton-line-sm" />
            <div className="skeleton-block skeleton-line skeleton-line-lg" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function DetailSkeleton() {
  return (
    <div className="skeleton-detail">
      <div className="skeleton-block skeleton-detail-visual" />
      <div className="skeleton-detail-body">
        <div className="skeleton-block skeleton-line skeleton-line-sm" />
        <div className="skeleton-block skeleton-line skeleton-line-xl" />
        <div className="skeleton-block skeleton-line skeleton-line-md" />
        <div className="skeleton-block skeleton-line skeleton-line-full" />
        <div className="skeleton-block skeleton-line skeleton-line-full" />
      </div>
    </div>
  )
}
