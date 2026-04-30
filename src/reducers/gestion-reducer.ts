import { v4 as uuidv4 } from 'uuid'
import type { User, Assignment, DraftUser, Client, Supplie } from "../types"

export type GestionActions =
    { type: 'show-modal-user', payload: { currentUser: User } } |
    { type: 'show-assignments', payload: { userAssignments: Assignment[] } } |
    { type: 'show-modal' } |
    { type: 'close-modal' } |
    { type: 'start-counter' } |
    { type: 'stop-counter' } |
    { type: 'open-supplies' } |
    { type: 'close-supplies' } |
    { type: 'admin-view', payload: { adminView: 'admin' | 'employees' | 'assignments' | 'clients' | 'supplies' | 'createNewUser' } } |
    { type: 'create-user', payload: { user: DraftUser } } |
    { type: 'set-users', payload: { users: User[] } } |
    { type: 'set-assignments', payload: { assignments: Assignment[] } } |
    { type: 'set-clients', payload: { clients: Client[] } } |
    { type: 'set-supplies', payload: { supplies: Supplie[] } }



export type GestionState = {
    currentUser: User | null,
    users: User[],
    assignments: Assignment[],
    clients: Client[],
    supplies: Supplie[],
    modal: boolean,    
    isCounterRunning: boolean,
    isShortageSuppliesOpen: boolean,
    showListEmployee: boolean,
    adminView: 'admin' | 'employees' | 'assignments' | 'clients' | 'supplies' | 'createNewUser'

}

export const initialState: GestionState = {
    currentUser: null,
    users: [],
    clients: [],
    assignments: [],
    supplies: [],
    modal: false,
    isCounterRunning: false,
    isShortageSuppliesOpen: false,
    showListEmployee: false,
    adminView: 'admin'
}

const createUser = (draftUser: DraftUser): User => {
    return {
        ...draftUser,
        id: uuidv4(),
    }
}

export const gestionReducer = (
    state: GestionState,
    actions: GestionActions
) => {

    if (actions.type == 'show-modal-user') {
        return {
            ...state,
            currentUser: actions.payload.currentUser
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
            adminView: actions.payload.adminView
        }
    }

    if (actions.type == 'create-user') {
        const user = createUser(actions.payload.user);
        return {
            ...state,
            users: [...state.users, user]
        }
    }

    if (actions.type === 'set-users') {
        return { ...state, users: actions.payload.users }
    }

    if (actions.type === 'set-assignments') {
        return { ...state, assignments: actions.payload.assignments }
    }
    if (actions.type === 'set-clients') {
        return { ...state, clients: actions.payload.clients }
    }
    if (actions.type === 'set-supplies') {
        return { ...state, supplies: actions.payload.supplies }
    }


    return state
}