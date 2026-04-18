import type { User, Assignment } from "../types"



export type GestionActions =
    { type: 'show-modal-user', payload:{user: User} } |
    { type: 'show-assignments', payload:{userAssignments: Assignment[]}} |
    { type: 'show-modal'} |
    { type: 'close-modal'} |
    { type: 'start-counter'} |
    { type: 'stop-counter'} |
    { type: 'open-supplies'} |
    { type: 'close-supplies'} |
    { type: 'admin-view', payload:{adminView: 'admin'|'employees'|'assignments'|'clients'|'supplies' }}
    

export type GestionState = {
    user : User | null,
    assignments : Assignment[],
    modal : boolean,
    isCounterRunning : boolean,
    isShortageSuppliesOpen : boolean,
    showListEmployee : boolean,
    adminView: 'admin'|'employees'|'assignments'|'clients'|'supplies'
}

export const initialState: GestionState = {
    user: null,
    assignments: [],
    modal: false,
    isCounterRunning: false,
    isShortageSuppliesOpen: false,
    showListEmployee: false,
    adminView: 'admin'    
}

export const gestionReducer = (
    state: GestionState,
    actions: GestionActions
) => {

    if (actions.type == 'show-modal-user') {
        return {
            ...state,
            user: actions.payload.user           
        }        
    }
    if (actions.type == 'show-assignments') {
        
        return {
            ...state,
            assignments: actions.payload.userAssignments
        }        
    }
    if (actions.type == 'show-modal') {
        
        return {
            ...state,
            modal: true
        }        
    }
    if (actions.type == 'close-modal') {
        
        return {
            ...state,
            modal: false
        }        
    }
    if (actions.type == 'start-counter') {
        
        return {
            ...state,
            isrunningCounter: true
        }        
    }
    if (actions.type == 'stop-counter') {
        
        return {
            ...state,
            isCounterRunning: false
        }        
    }
    if (actions.type == 'open-supplies') {
        
        return {
            ...state,
            isShortageSuppliesOpen: true
        }        
    }
    if (actions.type == 'close-supplies') {
        
        return {
            ...state,
            isShortageSuppliesOpen: false
        }        
    }
    if (actions.type == 'admin-view') {
        
        return {
            ...state,
            adminView : actions.payload.adminView
        }        
    }    

    return state
}