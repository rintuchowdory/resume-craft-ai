import { localClient } from '@/api/localBackend';
import { User } from './User';

export const Resume = localClient.entities.Resume;
export const Job = localClient.entities.Job;
export const JobApplication = localClient.entities.JobApplication;
export const StudentEvent = localClient.entities.StudentEvent;
export { User };
export default { Resume, Job, JobApplication, StudentEvent, User };
