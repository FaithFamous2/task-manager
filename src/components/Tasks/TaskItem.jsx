import React from 'react';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  done: 'bg-green-100 text-green-800'
};

const priorityColors = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-indigo-100 text-indigo-800',
  high: 'bg-red-100 text-red-800'
};

const TaskItem = ({ task, onEdit, onDelete }) => {
  const extras = typeof task.extras === 'string'
    ? JSON.parse(task.extras)
    : task.extras || {};

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 border-l-4 border-indigo-500 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg text-gray-800">{task.title}</h3>
          <p className="text-gray-600 mt-1">{task.description}</p>

          <div className="flex flex-wrap gap-2 mt-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
              {task.status.replace('-', ' ')}
            </span>

            {extras.priority && (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[extras.priority]}`}>
                {extras.priority} priority
              </span>
            )}

            {extras.due_date && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Due: {new Date(extras.due_date).toLocaleDateString()}
              </span>
            )}

            {extras.tags && Array.isArray(extras.tags) && extras.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {extras.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="text-indigo-600 hover:text-indigo-800"
            aria-label="Edit task"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>

          <button
            onClick={() => onDelete(task.id)}
            className="text-red-600 hover:text-red-800"
            aria-label="Delete task"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
