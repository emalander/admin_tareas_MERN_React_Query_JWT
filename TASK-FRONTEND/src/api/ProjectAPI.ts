import api from "@/lib/axios";
import { dashboardProjectSchema, type ProjectFormData } from "../types";
import type { Project } from "@/types/index"
import { isAxiosError } from "axios";

export async function createProject(formData:ProjectFormData) {
    
    try {
        const { data } = await api.post('/projects', formData)
        return data
    } catch (error) {
        
         if(isAxiosError(error) && error.response){
            console.log(error.response.data.error)
            throw new Error(error.response.data.error)
        }
       
        
    } 
}

export async function getProjects() {

    const token = localStorage.getItem('auth_token_tareas')
    console.log(token)
    try {
        const { data } = await api('/projects')
        const response = dashboardProjectSchema.safeParse(data)
        if(response.success){
            return response.data
        }
    } catch (error) {
        
         if(isAxiosError(error) && error.response){
            console.log(error.response.data.error)
            throw new Error(error.response.data.error)
        }
       
        
    } 
}

export async function getProjectsById(id:Project['_id']) {
    
    try {
        const { data } = await api(`/projects/${id}`)
        console.log(data)
        return data
    } catch (error) {
        
         if(isAxiosError(error) && error.response){
            console.log(error.response.data.error)
            throw new Error(error.response.data.error)
        }
       
        
    } 
}
export async function deleteProject(id:Project['_id']) {
    
    try {
        const { data } = await api.delete<string>(`/projects/${id}`)
        console.log(data)
        return data
    } catch (error) {
        
         if(isAxiosError(error) && error.response){
            console.log(error.response.data.error)
            throw new Error(error.response.data.error)
        }
       
        
    } 
}

type ProjectAPIType = {
    formData:ProjectFormData
    projectId:Project['_id'] 
}

export async function updateProject({formData,projectId}:ProjectAPIType) {
    
    try {
        const { data } = await api.put<string>(`/projects/${projectId}`, formData)
        console.log(data)
        return data
    } catch (error) {
        
         if(isAxiosError(error) && error.response){
            console.log(error.response.data.error)
            throw new Error(error.response.data.error)
        }
       
        
    } 
}