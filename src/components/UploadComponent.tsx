import { Modal, Button, useMantineTheme, Textarea,
    Skeleton,
    LoadingOverlay,
    Box} from "@mantine/core";
// import '../Designs/style.css';
import { Link, useFormAction, useParams } from "react-router-dom";
import { createStyles, Table, ScrollArea, rem } from '@mantine/core';
import { useState } from "react";
import { IconTrash, IconDownload, IconTable, IconUpload, IconSend } from "@tabler/icons-react";
import { useAddNewFileMutation, useDeleteFileMutation, useGetFilesQuery } from "../redux/features/ThesesFiles/sliceTheseFile";
import './Design/style.css';
import { useFormik } from "formik";

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

const  UploadComponent = ({opened, setOpened, these_id}: InvoiceOpenProps) => {
const themes = useMantineTheme();
const { id_folder } = useParams();
const { classes, cx } = useStyles();
const [scrolled, setScrolled] = useState(false);
const [showLoading, setShowLoading] = useState(false);
const [files, setFiles] = useState<File[]>([]);


const [addDFile, {isLoading : isLoadingFileFacture }] = useAddNewFileMutation();
// const {
//     isLoading, 
//     isError,
//     error,
//     data: files
//   } = useGetFilesQuery(these_id);

const theseFormik = useFormik({
    initialValues: {
        prenom: "", 
        nom: "",
        email: "",
        role: "",
    },
    // enableReinitialize: true,.
    // validationSchema: theseSchema,
    onSubmit: (values: any) => {
      // Handle form submission logic here
      console.log(values);
      handleSubmit(values);
    },
  });

const handleFileDelete = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };
  

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []);
    setFiles([...files, ...selectedFiles]);
  };

  const handleSubmit = async (values: any) => {
    setShowLoading(true);
    try {
      await addDFile({
        id: these_id,
        files: files,
        // email: values?.email,
        // role: values?.role,
        // password: "12345678",
        // super_admin_id: 1,
      }).unwrap().then((result: any) => {
        setShowLoading(false);
        setOpened(false);
        // handleClose();
      }).catch((error: any) => {
        setOpened(false);
        // handleClose();      
      });
    } catch (error) {
      console.log("Error Add These " + error);
    }
  };

  
// const handleDownload = async(fileName: string) => {
//   const result = await downloadDocument(fileName).unwrap();
//   if(result?.status == 200) {
//     setTimeout(() => {
//       setShowLoading(false);
//     }, 1000);
//   }
// }

// const handleDelete = async(id: string) => {
//  const result = await deleteDocument(id).unwrap();
//  console.log("data documents : " + JSON.stringify(result));
//  if(result?.status === 200) {
//    console.log("GOOD documents was deleted");      
//    setTimeout(() => {
//      setShowLoading(false);
//    }, 1000);
//  }
// }

// const rows = files?.data ? files?.data?.map((row: any) => (
//  <tr key={row.id || 0}>
//    <td>{row.originalName || ""}</td>
//    <td>{row.contentType}</td>
//    {/* <td>{row.created_at.split("T")[0] || ""}</td> */}
//    <td>
//    {/* {<Button 
//        color='red' 
//        sx={{width:"4rem"}}
//        onClick={() => {
//          setShowLoading(true);
//          handleDownload(row.originalName);
//        }}
//      >
//          <IconTrash size={rem('17')}/>
//      </Button> || <></>} */}
//      {
//         <a
//         href={`http://localhost:8000/api/download/files/${row.id}`}
//         className="download-button"
//         target="_blank"
//         >
//             Download
//         </a>
//      }
//    </td>
//    <td>
//    {<Button 
//        color='red' 
//        sx={{width:"4rem"}}
//        onClick={() => {
//          setShowLoading(true);
//          handleDelete(row.id);
//        }}
//      >
//          <IconTrash size={rem('17')}/>
//      </Button> || <></>}  
//    </td>
//  </tr>
// )) : [];


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
    <form onSubmit={theseFormik.handleSubmit}>
     <ScrollArea h={300}>
         <Table  miw={500} className="file-table">
            <thead>
                <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Size</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody >
          {files.map((file, index) => (
            <tr key={file.name}>
              <td>{file.name}</td>
              <td>{file.type}</td>
              <td>{file.size}</td>
              <td>
                <Button
                   variant="filled"
                  size="xs"
                  color="red"
                  compact
                  radius="md"
                  uppercase
                  onClick={() => handleFileDelete(index)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
         </Table>
     </ScrollArea>
     <Box sx={{marginLeft: "20rem", marginTop: "2rem"}}>
     <input
        // style={"marginLeft"}
        type="file"
        id="files"
        multiple
    onChange={handleFileChange}
    // disabled={true}
    />
    <label htmlFor="files" className="upload-button">
        <span style={{marginRight: "6px"}}>Ajouter File</span>
        <IconUpload size={rem(17)} />
    </label>
    <Button 
              rightIcon={<IconSend size={rem(17)} />}
              variant='light' 
              color='blue'
              type="submit"
              sx={{marginLeft: "7px"}}
              // disabled={true}
            >
              Enregistrer
            </Button>
            </Box>
            </form>
            </Modal>
   <LoadingOverlay visible={showLoading} />
 </>
);
}



export default UploadComponent;


