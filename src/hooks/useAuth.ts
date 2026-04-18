import { useContext } from "react"
import { GestionContext } from "../context/GestionContext"


export const useAuth = () => {
    const context = useContext(GestionContext)
    if(!context){
        throw new Error('useAuth must be used within AuthProvider in main.tsx')
    }
    return context
}