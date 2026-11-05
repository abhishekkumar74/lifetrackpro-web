'use client';
import AiStudyPlanner from './AiStudyPlanner';

/**
 * Drop-in wrapper for backwards compatibility across existing routes.
 * Re-exports the upgraded AI Study Planner experience.
 */
export default function StudyTimetableGenerator() {
  return <AiStudyPlanner />;
}
