import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { Layout } from "./layouts/Layout";
import { theme } from "../theme/theme";
import { Accordion, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import AccordionItem from "../components/AccordionItem";
import PaginationTable from "../components/PaginationTable";
import AddForm from "../feat-users/AddForm";
import TheseFiltre from "../components/TheseFiltre";
import UserFiltre from "../components/UserFiltre";
import { useGetUserQuery, useGetUsersQuery } from "../redux/features/Users/sliceUser";

// const tableData = [
//   {
//     id: 1,
//     prenom: "Ichraq",
//     nom: "AMINE",
//     email: "ichraq.amine@fsac.com",
//     role: "Agent service de recherche",
//   },
//   {
//     id: 1,
//     prenom: "Ichraq",
//     nom: "AMINE",
//     email: "ichraq.amine@fsac.com",
//     role: "Agent service de recherche",
//   },
//   {
//     id: 1,
//     prenom: "Ichraq",
//     nom: "AMINE",
//     email: "ichraq.amine@fsac.com",
//     role: "Agent service de recherche",
//   },
//   {
//     id: 1,
//     prenom: "Ichraq",
//     nom: "AMINE",
//     email: "ichraq.amine@fsac.com",
//     role: "Agent service de recherche",
//   },
//   {
//     id: 1,
//     prenom: "Ichraq",
//     nom: "AMINE",
//     email: "ichraq.amine@fsac.com",
//     role: "Agent service de recherche",
//   }
// ];

const tableHeader = [
  "Prenom",
  "Nom",
  "Email",
  "Role",
  "Modifier",
  "Supprimer",
];
const Users = () => {
  const [openAddForm, setOpenAddForm] = useState(false);
  const {
    isLoading, 
    isError,
    error,
    data: users
  } = useGetUsersQuery({});

  const accordionItems = [
    {
      icon: <FilterAltOutlinedIcon />,
      title: "Filtre",
      children: <UserFiltre />,
      isExpand: false,
    },
    {
      icon: <FolderOutlinedIcon />,
      title: "Users",
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
          Ajouter User
        </Button>
      ),
      children: (
        <PaginationTable
          tableData={users?.data || []}
          tableHeader={tableHeader}
          isUsersPagination={true}
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

export default Users;
