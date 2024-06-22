import { Modal, Button, useMantineTheme, Textarea,
    Skeleton,
    LoadingOverlay} from "@mantine/core";
// import '../Designs/style.css';
import { Link, useParams } from "react-router-dom";
import { createStyles, Table, ScrollArea, rem } from '@mantine/core';
import { useState } from "react";
import { IconTrash, IconDownload, IconTable, IconUpload } from "@tabler/icons-react";
import { useDeleteFileMutation, useGetFilesQuery } from "../redux/features/ThesesFiles/sliceTheseFile";
import './Design/style.css';

interface InvoiceOpenProps {
opened: boolean,
setOpened: React.Dispatch<React.SetStateAction<boolean>>,
these_id: number,
}

const useStyles = createStyles((theme) => ({
 header: {
   position: 'sticky',
   top: 0,
   backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
   transition: 'box-shadow 150ms ease',

   '&::after': {
     content: '""',
     position: 'absolute',
     left: 0,
     right: 0,
     bottom: 0,
     borderBottom: `${rem(1)} solid ${
       theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]
     }`,
   },
 },

 scrolled: {
   boxShadow: theme.shadows.sm,
 },
}));

const  DocumentTable = ({opened, setOpened, these_id}: InvoiceOpenProps) => {
const themes = useMantineTheme();
const { id_folder } = useParams();
const { classes, cx } = useStyles();
const [scrolled, setScrolled] = useState(false);
const [showLoading, setShowLoading] = useState(false);
const [filesData, setFiles] = useState<File[]>([]);


const [deleteDocument, {isLoading : isLoadingFileFacture }] = useDeleteFileMutation();
const {
    isLoading, 
    isError,
    error,
    data: files
  } = useGetFilesQuery(these_id);



const handleDelete = async(id: string) => {
 const result = await deleteDocument(id).unwrap();
 console.log("data documents : " + JSON.stringify(result));
 if(result?.status === 200) {
   console.log("GOOD documents was deleted");      
   setTimeout(() => {
     setShowLoading(false);
   }, 1000);
 }
}

const rows = files?.data ? files?.data?.map((row: any) => (
 <tr key={row.id || 0}>
   <td>{row.original_name || ""}</td>
   {/* <td>{row.contentType}</td> */}
   <td>{row.created_at.split("T")[0] || ""}</td>
   <td>
   {/* {<Button 
       color='red' 
       sx={{width:"4rem"}}
       onClick={() => {
         setShowLoading(true);
         handleDownload(row.originalName);
       }}
     >
         <IconTrash size={rem('17')}/>
     </Button> || <></>} */}
     {
        <a
        href={`http://localhost:8000/api/download/file/${row.id}`}
        className="download-button"
        target="_blank"
        >
            Download
        </a>
     }
   </td>
   <td>
   {<Button 
       color='red' 
       sx={{width:"4rem"}}
       onClick={() => {
         setShowLoading(true);
         handleDelete(row.id);
       }}
     >
         <IconTrash size={rem('17')}/>
     </Button> || <></>}  
   </td>
 </tr>
)) : [];


return (
 <>
   <Modal
     opened={opened}
     onClose={() => setOpened(false)}
     size="60%"
     overlayProps={{
       color: themes.colorScheme === 'dark' ? themes.colors.dark[9] : themes.colors.gray[2],
       opacity: 0.55,
       blur: 3,
     }}
     closeOnClickOutside={false}
   >
     {/* <input
        // style={"marginLeft"}
        type="file"
        id="files"
        multiple
    onChange={handleFileChange}
    // disabled={true}
    />
    <label htmlFor="files" className="upload-button">
        <span style={{marginRight: "6px"}}>Upload</span>
        <IconUpload size={rem(17)} />
    </label> */}
     <ScrollArea h={300}>
         <Table miw={500}>
         <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
             <tr>
             <th>Nom</th>
             <th>Date Creation</th>
             <th>Telecharger</th>
             <th>Supprimer</th>
             </tr>
         </thead>
         {/* {(
         if(isLoading)
             <p>Loading....</p>
         else if(isError)
             <p>Error....</p>
         else */}
             <tbody>{rows}</tbody>
         {/* )} */}
         </Table>
     </ScrollArea>
   </Modal>
   <LoadingOverlay visible={showLoading} />
 </>
);
}



export default DocumentTable;


