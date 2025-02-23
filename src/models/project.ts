export default interface Project {
  name: string;
  images: Image[];
  tags: string[];
}

export interface Image {
  url: string;
  title: string;
}
