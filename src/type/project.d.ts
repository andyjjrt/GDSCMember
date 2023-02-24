interface Project {
  description: string;
  id: string;
  leader: Member;
  link: string;
  members: Member[];
  name: string;
}

interface Member {
  id: string;
  name: string;
}
