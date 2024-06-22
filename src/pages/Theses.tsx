import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { Layout } from "./layouts/Layout";
import { theme } from "../theme/theme";
import { Accordion, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import AccordionItem from "../components/AccordionItem";
import PaginationTable from "../components/PaginationTable";
import AddForm from "../feat-theses/AddForm";
import TheseFiltre from "../components/TheseFiltre";
import { useGetThesesQuery } from "../redux/features/Theses/sliceThese";
import { useGetUsersQuery } from "../redux/features/Users/sliceUser";
import { useGetLaboratoiresQuery } from "../redux/features/Laboratoires/sliceLaboratoire";
import { mappRole } from "../utils/customFunctions";

// const tableData = [
//   {
//     id: 1,
//     Col1: "Test Data",
//     Col2: "Test Data",
//     sujet: "Sujet Test",
//     Col3: "Test Data",
//     Col4: "Test Data",
//     date: "10/03/2024",
//   },
//   {
//     id: 1,
//     Col1: "Test Data",
//     Col2: "Test Data",
//     sujet: "Sujet Test",
//     Col3: "Test Data",
//     Col4: "Test Data",
//     date: "10/03/2024",
//   },
//   {
//     id: 1,
//     Col1: "Test Data",
//     Col2: "Test Data",
//     sujet: "Sujet Test",
//     Col3: "Test Data",
//     Col4: "Test Data",
//     date: "10/03/2024",
//   },
//   {
//     id: 1,
//     Col1: "Test Data",
//     Col2: "Test Data",
//     sujet: "Sujet Test",
//     Col3: "Test Data",
//     Col4: "Test Data",
//     date: "10/03/2024",
//   },
//   {
//     id: 1,
//     Col1: "Test Data",
//     Col2: "Test Data",
//     sujet: "Sujet Test",
//     Col3: "Test Data",
//     Col4: "Test Data",
//     date: "10/03/2024",
//   },
//   {
//     id: 1,
//     Col1: "Test Data",
//     Col2: "Test Data",
//     sujet: "Sujet Test",
//     Col3: "Test Data",
//     Col4: "Test Data",
//     date: "10/03/2024",
//   },
// ];



const tableHeader = [
  "Doctorant",
  "Titre",
  "Sujet",
  "Durée",
  "Date Publication",
  "Date Soutenance",
  "Directeur",
  "Rapport",
  "Upload",
  "Modifier",
  "Supprimer",
];
const Theses = () => {
  const [openAddForm, setOpenAddForm] = useState(false);

  const {
    isLoading, 
    isError,
    error,
    data: theses
  } = useGetThesesQuery({});
  const {
    isLoading: isLoadingU, 
    isError: isErrorU,
    error: ErrorU,
    data: users
  } = useGetUsersQuery({});
  
  const {
    isLoading: isLoadingL, 
    isError: isErrorL,
    error: ErrorL,
    data: laboratoires
  } = useGetLaboratoiresQuery({});

  const newData = theses?.data?.map((t: any) => ({
    "id":t.id,
    "titre": t.titre,
    "sujet": t.sujet,
    "duree": t.duree, 
    "date_publication": t.date_publication,
    "date_soutenance": t.date_soutenance,
    "agent_recherche": users?.data?.filter((u: any) => u.role === "" && u.id === t.agent_recherche_id).map((u: any) => `${u.first_name} ${u.last_name}`)[0],
    "laboratoire": laboratoires?.data?.filter((u: any) => t.id === t.laboratoire_id).map((u: any) => u.name)[0],
    "directeur": users?.data?.filter((u: any) => u.role === "Directeur de these" && u.id === t.directeur_these_id).map((u: any) => `${u.first_name} ${u.last_name}`)[0],
    "doctorant": users?.data?.filter((u: any) => u.role === "Doctorant" && u.id === t.doctorant_id).map((u: any) => `${u.first_name} ${u.last_name}`)[0],
  }))

  const accordionItems = [
    {
      icon: <FilterAltOutlinedIcon />,
      title: "Filtre",
      children: <TheseFiltre />,
      isExpand: false,
    },
    {
      icon: <FolderOutlinedIcon />,
      title: "Theses",
      action: (
        <Button
          sx={{
            marginRight: "15px",
          }}
          leftIcon={<IconPlus size={14} />}
          color={theme.mainColor}
          variant="light"
          onClick={() => {
            setOpenAddForm(true);
          }}
          disabled={mappRole(sessionStorage.getItem("roles") || "") === "Agent de bibliotheque" ? true : false}
        >
          Ajouter Theses
        </Button>
      ),
      children: (
        <PaginationTable
          tableData={newData || []}
          tableHeader={tableHeader}
          isThesesPagination={true}
          color={"#00B112"}
          bgColor={"#ECFFEE"}
        />
      ),
      isExpand: true,
    },
  ];
  return (
    <>
      <Layout isHeaderAuth={false} hasSideBar={true}>
        <Accordion>
          {accordionItems.map((accordion, index) => {
            return (
              <AccordionItem
                icon={accordion.icon}
                title={accordion.title}
                action={accordion.action}
                isExpand={accordion.isExpand}
              >
                {accordion.children}
              </AccordionItem>
            );
          })}
        </Accordion>
      </Layout>
      <AddForm opened={openAddForm} setOpened={setOpenAddForm} />
    </>
  );
};

export default Theses;
