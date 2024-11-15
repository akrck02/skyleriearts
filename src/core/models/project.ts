export default interface Project {
    name : string;
    images : Image[];
}

export interface Image {
    url : string;
    title : string;
    tags : string[];
}