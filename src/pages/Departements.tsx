import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { Layout } from "./layouts/Layout";
import { theme } from "../theme/theme";
import { Accordion, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import AccordionItem from "../components/AccordionItem";
import PaginationTable from "../components/PaginationTable";
import AddForm from "../feat-departements/AddForm";
import TheseFiltre from "../components/TheseFiltre";
import DepartementFiltre from "../components/DepartementFiltre";
import { useGetDepartementsQuery } from "../redux/features/Departements/sliceDepartement";

// const tableData = [
//   {
//     id: 1,
//     nomDepartement: "Departement 1",
//   },
//   {
//     id: 2,
//     nomDepartement: "Departement 2",
//   },
//   {
//     id: 3,
//     nomDepartement: "Departement 3",
//   }
// ];

const tableHeader = [
  "Departement",
  "Modifier",
  "Supprimer",
];
const Departements = () => {
  const [openAddForm, setOpenAddForm] = useState(false);
  const {
    isLoading, 
    isError,
    error,
    data: departements
  } = useGetDepartementsQuery({});

  const accordionItems = [
    {
      icon: <FilterAltOutlinedIcon />,
      title: "Filtre",
      children: <DepartementFiltre />,
      isExpand: false,
    },
    {
      icon: <FolderOutlinedIcon />,
      title: "Departements",
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
          Ajouter Departement
        </Button>
      ),
      children: (
        <PaginationTable
          tableData={departements?.data || []}
          tableHeader={tableHeader}
          isDepartementPagination={true}
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

export default Departements;
