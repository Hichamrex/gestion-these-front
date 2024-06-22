import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { Layout } from "./layouts/Layout";
import { theme } from "../theme/theme";
import { Accordion, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import AccordionItem from "../components/AccordionItem";
import PaginationTable from "../components/PaginationTable";
import AddForm from "../feat-laboratoires/AddForm";
import TheseFiltre from "../components/TheseFiltre";
import LaboratoireFiltre from "../components/LaboratoireFiltre";
import { useGetLaboratoiresQuery } from "../redux/features/Laboratoires/sliceLaboratoire";
import { useGetDepartementsQuery } from "../redux/features/Departements/sliceDepartement";

const tableHeader = [
  "Laboratoire",
  "Modifier",
  "Supprimer",
];
const Laboratoires = () => {
  const [openAddForm, setOpenAddForm] = useState(false);

  const {
    isLoading, 
    isError,
    error,
    data: laboratoires
  } = useGetLaboratoiresQuery({});


  const accordionItems = [
    {
      icon: <FilterAltOutlinedIcon />,
      title: "Filtre",
      children: <LaboratoireFiltre />,
      isExpand: false,
    },
    {
      icon: <FolderOutlinedIcon />,
      title: "Laboratoires",
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
          Ajouter Laboratoire
        </Button>
      ),
      children: (
        <PaginationTable
          tableData={laboratoires?.data || []}
          tableHeader={tableHeader}
          isLaboratoirePagination={true}
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

export default Laboratoires;
