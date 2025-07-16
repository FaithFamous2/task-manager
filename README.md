# TaskFlow - Task Management Application

A modern, responsive task management application built with React and Supabase. TaskFlow helps you organize, track, and analyze your tasks with an intuitive interface and powerful insights.

## Features

- **User Authentication**: Secure signup and login with Supabase Auth
- **Task Management**: Create, edit, delete, and organize tasks
- **Task Status Tracking**: Track tasks through pending, in-progress, and done states
- **Rich Task Data**: Add descriptions, due dates, and tags to tasks
- **Insights Dashboard**: View task completion statistics and productivity metrics
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Automatic synchronization across sessions

## Tech Stack

- **Frontend**: React, React Router, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Edge Functions)
- **State Management**: React Hooks (useState, useEffect, useContext)
- **Styling**: Tailwind CSS for responsive design
- **Icons**: Lucide React for consistent iconography

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Supabase account

### 1. Clone the Repository

```bash
git clone <repository-url>
cd task-manager
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Supabase Setup

1. Create a new project in [Supabase](https://supabase.com)
2. Go to Project Settings → API to get your project URL and anon key
3. Run the following SQL in your Supabase SQL editor:

```sql
-- Enable Row Level Security
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Create tasks table
CREATE TABLE tasks (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL CHECK (status IN ('pending', 'in-progress', 'done')),
  extras JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create policies for RLS
CREATE POLICY "Users can manage their own tasks" ON tasks
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Create index for faster queries
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
```

### 4. Environment Configuration

Create a `.env` file in the root directory:

```env
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Start the Development Server

```bash
npm start
# or
yarn start
```

The application will be available at `http://localhost:3000`

## Supabase Schema Description

### Tasks Table

The application uses a single `tasks` table with the following structure:

- **id**: Primary key (BIGSERIAL)
- **user_id**: Foreign key to auth.users (UUID) - ensures task ownership
- **title**: Task title (TEXT, required)
- **description**: Optional task description (TEXT)
- **status**: Task status (TEXT) - constrained to 'pending', 'in-progress', 'done'
- **extras**: Flexible JSONB field for additional metadata (due_date, tags, etc.)
- **created_at**: Timestamp of task creation

### Security

Row Level Security (RLS) is enabled with policies ensuring users can only access their own tasks. The policy `"Users can manage their own tasks"` restricts all operations (SELECT, INSERT, UPDATE, DELETE) to tasks where `user_id` matches the authenticated user's ID.

### Performance

An index on `user_id` (`idx_tasks_user_id`) optimizes task queries for individual users.

## Project Structure

```
src/
├── components/
│   ├── Auth/
│   │   ├── LoginForm.jsx
│   │   └── SignupForm.jsx
│   ├── Layout/
│   │   └── Header.jsx
│   ├── Tasks/
│   │   ├── TaskForm.jsx
│   │   ├── TaskItem.jsx
│   │   └── TaskList.jsx
│   └── Common/
│       └── LoadingSpinner.jsx
├── pages/
│   ├── Dashboard.jsx
│   ├── Insights.jsx
│   ├── Login.jsx
│   └── Signup.jsx
├── services/
│   ├── auth.js
│   ├── tasks.js
│   └── insights.js
├── hooks/
│   └── useAuth.js
├── contexts/
│   └── AuthContext.js
└── utils/
    └── supabase.js
```

## Usage

1. **Sign Up/Login**: Create an account or login with existing credentials
2. **Create Tasks**: Use the task form to add new tasks with titles, descriptions, and metadata
3. **Manage Tasks**: Edit task details, update status, or delete completed tasks
4. **View Insights**: Access the insights page to see task completion statistics and productivity metrics
5. **Mobile Support**: Use the mobile menu to navigate between dashboard and insights

## Development Notes

### What I'd Build Next if I Had More Time

#### 1. Enhanced Task Features
- **Task Priority Levels**: Add high/medium/low priority with visual indicators
- **Subtasks**: Support for breaking down complex tasks into smaller components
- **Task Dependencies**: Link tasks that depend on others
- **Recurring Tasks**: Support for daily/weekly/monthly recurring tasks
- **File Attachments**: Allow users to attach files to tasks

#### 2. Collaboration Features
- **Team Workspaces**: Share tasks and projects with team members
- **Task Assignment**: Assign tasks to specific team members
- **Comments**: Add comments and discussions to tasks
- **Activity Feed**: Real-time notifications for task updates

#### 3. Advanced Analytics
- **Time Tracking**: Track time spent on tasks
- **Productivity Trends**: Weekly/monthly productivity analysis
- **Custom Reports**: Generate reports based on date ranges, status, etc.
- **Goal Setting**: Set and track completion goals

#### 4. User Experience Enhancements
- **Dark Mode**: Toggle between light and dark themes
- **Drag & Drop**: Reorder tasks and change status via drag and drop
- **Keyboard Shortcuts**: Quick actions with keyboard shortcuts
- **Bulk Actions**: Select and modify multiple tasks at once
- **Search & Filters**: Advanced search and filtering capabilities

#### 5. Mobile App
- **React Native App**: Native mobile app for iOS and Android
- **Offline Support**: Work with tasks offline and sync when online
- **Push Notifications**: Task reminders and deadline alerts

#### 6. Integrations
- **Calendar Integration**: Sync with Google Calendar, Outlook
- **Email Integration**: Create tasks from emails
- **Third-party Tools**: Integrate with Slack, Trello, Asana
- **API**: RESTful API for third-party integrations

#### 7. Performance & Scalability
- **Virtual Scrolling**: Handle large task lists efficiently
- **Caching**: Implement intelligent caching strategies
- **Database Optimizations**: Query optimization and indexing
- **CDN**: Content delivery network for static assets

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## Support

For support, please open an issue in the GitHub repository or contact the development team.

---

**TaskFlow** - Streamline your productivity, one task at a time.
