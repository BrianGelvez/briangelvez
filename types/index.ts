export type ExperienceItem = {
  id: string;
  type: "military" | "work" | "learning";
  company: string;
  role: string;
  location: string;
  period: string;
  description: string;
  achievements?: string[];
  stack?: string[];
  skills?: string[];
  highlight?: string;
};

export type StoryPhoto = {
  src: string;
  alt: string;
  caption?: string;
};

export type StoryStage = {
  id: string;
  title: string;
  description: string;
  photos: StoryPhoto[];
};

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  description: string;
  stack: string[];
  metrics: string[];
  status: "production" | "client";
  liveUrl?: string;
  githubUrl?: string;
};
