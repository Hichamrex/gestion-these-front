import { useState } from 'react';
import { Modal, Button, LoadingOverlay, Notification } from '@mantine/core';
import { useDeleteDepartementMutation } from '../redux/features/Departements/sliceDepartement';
import { useDeleteAgentRechercheMutation } from '../redux/features/AgentRecherche/sliceAgentRecherche';
import { useDeleteLaboratoireMutation } from '../redux/features/Laboratoires/sliceLaboratoire';
import { useDeleteUserMutation } from '../redux/features/Users/sliceUser';
import { useDeletethesesMutation } from '../redux/features/Theses/sliceThese';


interface OpenCheckProps {
    openedCheck: boolean,
    setOpenedCheck: React.Dispatch<React.SetStateAction<boolean>>,
    title: string,
    id: number,
    entity: string;
}

const DeleteComponent = ({title, openedCheck, setOpenedCheck, id, entity}: OpenCheckProps) => {
const [showLoading, setShowLoading] = useState(false);
const [deleteDepart, responseDepart] = useDeleteDepartementMutation();
// const [deleteAg, responseAg] = useDeleteAgentRechercheMutation();
const [deleteLab, responseLab] = useDeleteLaboratoireMutation();
const [deleteUser, responseUser] = useDeleteUserMutation();
const [deleteThese, responseThese] = useDeletethesesMutation();


const handleSubmit = async () => {
  try {
    handleDelete();
  } catch (error) {
    console.log("error " + error);
  }
  
};

const handleDelete = async () => {
    let deleteResult = {"status": 201};
    setShowLoading(true);
  switch(entity) {
    case "departement": 
        deleteResult = await deleteDepart(id).unwrap();
    break;
    // case "agentRecherche": 
    //     deleteResult = await deleteAg(id).unwrap();
    // break;
    case "these": 
        deleteResult = await deleteThese(id).unwrap();
    break;
    case "laboratoire":
        deleteResult = await deleteLab(id).unwrap();
        break;
    case "user":
        deleteResult = await deleteUser(id).unwrap();
    break;
  }
  // console.log("DELETE RESULT " + JSON.stringify(deleteResult));
  if(deleteResult?.status === 200) {
    setTimeout(() => {
      setShowLoading(false);
    }, 1400);
    setOpenedCheck(false);
  }
}


const handleCancel = () => {
  setOpenedCheck(false);
};

  return (
    <>
    <form onSubmit={handleSubmit}>
      <Modal
        opened={openedCheck}
        onClose={() => setOpenedCheck(false)}
        title="Confirmation"
        yOffset="10rem"
        sx={{overlayColor: "rgba(0, 0, 0, 0.3)"}}
        size="lg"
        // overlayColor="rgba(0, 0, 0, 0.8)" // Adjust the alpha value to control the darkness of the shadow
        trapFocus  
      >
        <div>{title}</div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
          <Button onClick={handleCancel} style={{ marginRight: '0.5rem' }}>
            NON
          </Button>
          <Button onClick={handleDelete} color="red">
            OUI
          </Button>
        </div>
      </Modal>
    </form>
      
      <LoadingOverlay visible={showLoading} />
    </>
  );
}

export default DeleteComponent;
