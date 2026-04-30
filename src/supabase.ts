import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qdbalctlqrrtmxhftufx.supabase.co'
const supabaseKey = 'sb_publishable_iLGFTdzjamiTRew31fzvgg_8L-bgAsF'
                     
export const supabase = createClient(supabaseUrl, supabaseKey)

// traer los usuarios de la bd
export const getUsers = async () => {
  const { data, error } = await supabase.from('users').select('*')
  if (error) {
    console.error('Error fetching users:', error)
    return []
  }
  return data
}

// traer asignments
export const getAssignments = async () => {
    const { data, error } = await supabase.from('assignments').select('*')
    if (error) {
        console.error('Error fetching assignments:', error)
        return []
    }
    return data
}

// traer clients
export const getClients = async () => {
    const { data, error } = await supabase.from('clients').select('*')
    if (error) {
        console.error('Error fetching assignments:', error)
        return []
    }
    return data
}

// traer supplies
export const getSupplies = async () => {
    const { data, error } = await supabase.from('supplies').select('*')
    if (error) {
        console.error('Error fetching assignments:', error)
        return []
    }
    return data
}