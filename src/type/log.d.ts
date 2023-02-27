interface LogUser {
  id: string;
  email: string;
  name: string;
  phone: string;
  dept: string;
  studentId: string;
  inSchool: boolean;
  isCore: boolean;
  isFullYear: boolean;
  isLastSemester: boolean;
  createdProjects: {
    id: string;
    name: string;
    description: string;
    authCode: number;
    link: string;
    members: string[];
  }[];
  joinedProjects: {
    id: string;
    name: string;
    description: string;
    link: string;
  }[];
  paidCount: number;
}
