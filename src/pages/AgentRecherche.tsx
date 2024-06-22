import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { Layout } from "./layouts/Layout";
import { theme } from "../theme/theme";
import { Accordion, Button } from "@mantine/core";
import { IconPlus, IconUserSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import AccordionItem from "../components/AccordionItem";
import PaginationTable from "../components/PaginationTable";
import AddForm from "../feat-agent-recherche/AddForm";
import TheseFiltre from "../components/TheseFiltre";
import UserFiltre from "../components/UserFiltre";
import { useGetAgentRecherchesQuery } from "../redux/features/AgentRecherche/sliceAgentRecherche";

const tableHeader = [
  "Prenom",
  "Nom",
  "Email",
  "Role",
  "Modifier",
  "Supprimer",
];
const AgentRecherche = () => {
  const [openAddForm, setOpenAddForm] = useState(false);
  const {
    isLoading, 
    isError,
    error,
    data: agRecherches
  } = useGetAgentRecherchesQuery({});

  const accordionItems = [
    {
      icon: <FilterAltOutlinedIcon />,
      title: "Filtre",
      children: <UserFiltre />,
      isExpand: false,
    },
    {
      icon: <IconUserSearch />,
      title: "Agent Recherche",
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
        >
          Ajouter Agent Recherche
        </Button>
      ),
      children: (
        <PaginationTable
          tableData={agRecherches?.data || []}
          tableHeader={tableHeader}
          isAgPagination={true}
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

export default AgentRecherche;
