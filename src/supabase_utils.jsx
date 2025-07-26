import { supabase } from "./client";

export const getCrewmates = async () => {
    const { data, error } = await supabase.from('crewmates').select('*').order('created_at', { ascending: false });
    if (error) {
        console.error(error);
        return null;
    }
    return data;
};

export const getCrewmate = async (crewmateId) => {
    const { data, error } = await supabase.from('crewmates').select('*').eq('id', crewmateId);
    if (error) {
        console.error(error);
        return null;
    }
    return data[0];
};

export const createCrewmate = async (crewmate) => {
    const { data, error } = await supabase.from('crewmates').insert(crewmate);
    if (error) {
        console.error(error);
        return null;
    }
    return data;
};

export const deleteCrewmate = async (crewmateId) => {
    const { data, error } = await supabase.from('crewmates').delete().eq('id', crewmateId);
    if (error) {
        console.error(error);
        return null;
    }
    return data;
};

export const updateCrewmate = async (crewmateId, new_values) => {
    const { data, error } = await supabase.from('crewmates').update(new_values).eq('id', crewmateId);
    if (error) {
        console.error(error);
        return null;
    }
    return data;
};