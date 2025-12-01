import { Link } from 'react-router-dom'
import TagList from './TagList'

export default function DocCard({ doc, basePath, type = 'communication' }) {
  const typeConfig = {
    communication: {
      icon: '📝',
      color: 'blue',
    },
    requirement: {
      icon: '📋',
      color: 'green',
    },
    architecture: {
      icon: '🏗️',
      color: 'purple',
    },
  }

  const config = typeConfig[type] || typeConfig.communication

  return (
    <Link
      to={`${basePath}/${doc.id}`}
      className="block bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md hover:border-gray-300 transition-all"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{config.icon}</span>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600">
              {doc.title}
            </h3>
            {doc.date && (
              <p className="text-sm text-gray-500 mt-1">{doc.date}</p>
            )}
          </div>
        </div>
      </div>

      {doc.summary && (
        <p className="mt-3 text-gray-600 text-sm line-clamp-2">{doc.summary}</p>
      )}

      {doc.tags && doc.tags.length > 0 && (
        <div className="mt-4">
          <TagList tags={doc.tags} size="sm" />
        </div>
      )}
    </Link>
  )
}
