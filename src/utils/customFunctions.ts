export const mappRole = (role: string) => {
const roles: any = {
    "research_agent": "Agent de recherche",
    "admin": "Super Admin",
    "agent_bibliotheque": "Agent de bibliotheque"
}
return roles[role];
}
  
export const formatDate = (date: any) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
  
export const formatDateFromGet = (inputDate: string) => {
    const date = new Date(inputDate);
    
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000000Z`;
  };

  export const formatBodyFile = (data: any) => {
    const formData = new FormData();
    formData.append("these_id", data?.id);

    if (Array.isArray(data?.files)) {
        data.files.forEach((file: any, index: any) => {
            formData.append(`files[${index}]`, file);
        });
    } else {
        formData.append("files", data?.files);
    }

    return formData;
};

//   export const formatBodyFile = (data:any) => {
//     const formData = new FormData();
//     formData.append("these_id", data?.id);
//     formData.append("files", data?.files);
//     formData.append("file1", data?.files);
//     console.log("Form DATA " + JSON.stringify(formData.get("file1")));
//     return formData;
//   };