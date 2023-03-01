interface Project {
  description: string;
  id: string;
  leader: Member;
  link: string;
  members: Member[];
  name: string;
  mentorType: string;
  mentorName: string;
}

interface Member {
  id: string;
  name: string;
}
