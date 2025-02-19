import { getConfiguration } from "../../lib/configuration.js"
import Project from "../../models/project.js"

let projects: Array<Project> = []

export async function loadProjects() {
  const dataPath = `${getConfiguration("path")["resources"]}/data/images.json`
  const response = await fetch(dataPath)
  projects = await response.json()
}

export function getProjects(): Array<Project> {
  return projects
}

export function getProject(name: string) {
  return projects.find(project => project?.name === name)
}

export function getProjectNames() {
  return projects.map(project => project?.name).filter(obj => null != obj)
}

export function getProjectTags() {
  const tags = new Set<string>()
  projects.forEach(project => project?.tags?.forEach((tag: string) => tags.add(tag)))
  return tags
}

export function getImagesOfProjectAndTag(project: string, tag: string) { }
