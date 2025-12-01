export default function TagList({ tags, selectedTags = [], onTagClick, size = 'md' }) {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const isSelected = selectedTags.includes(tag)
        return (
          <button
            key={tag}
            onClick={() => onTagClick?.(tag)}
            className={`${sizeClasses[size]} rounded-full font-medium transition-colors ${
              isSelected
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            } ${onTagClick ? 'cursor-pointer' : 'cursor-default'}`}
          >
            {tag}
          </button>
        )
      })}
    </div>
  )
}
