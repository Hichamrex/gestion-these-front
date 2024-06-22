import {
  ActionIcon,
  Alert,
  Button,
  LoadingOverlay,
  Pagination,
  Skeleton,
  Table,
  rem,
} from "@mantine/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { IconFileTypePdf, IconPdf, IconPencil, IconPhotoFilled, IconTrash, IconUpload } from "@tabler/icons-react";
import UpdateForm from "../feat-theses/UpdateForm";
import {default as UpdateFormUser} from "../feat-users/UpdateForm";
import {default as UpdateFormAg} from "../feat-agent-recherche/UpdateForm";
import {default as UpdateFormDepartement} from "../feat-departements/UpdateForm";
import {default as UpdateFormLaboratoire} from "../feat-laboratoires/UpdateForm";
import DeleteComponent from "./DeleteComponent";
import { mappRole } from "../utils/customFunctions";
import DocumentTable from "./DocumentTable";
import UploadComponent from "./UploadComponent";

function chunk<T>(array: T[], size: number): T[][] {
  if (!array.length) {
    return [];
  }
  const head = array.slice(0, size);
  const tail = array.slice(size);
  return [head, ...chunk(tail, size)];
}

const getColor = (role: any) => {
  switch(role) {
    case "Agent de bibliotheque": return "";
    case "Agent de service recherche": return "";
    case "Equipe de recherche": return "";
    case "Doctorant": return "";
    case "Directeur de these": return "";
  }
}

const getColorBackGround = (role: any) => {
  switch(role) {
    case "Agent de bibliotheque": return "";
    case "Agent de service recherche": return "";
    case "Equipe de recherche": return "";
    case "Doctorant": return "";
    case "Directeur de these": return "";
  }
}
interface PaginationProps {
  //General
  isLoading?: boolean;
  isInFolder?: boolean;
  isError?: boolean;
  error?: any;
  tableHeader: string[];
  tableData: {
    // Theses Data that will be get from the backend
    id: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    duree?: string;
    date_publication?: string;
    sujet?: string;
    date_soutenance?: string;
    agent_recherche?: string;
    laboratoire?: string;
    directeur?: string;
    doctorant?: string;
    titre?: string;
    nom?: string;
    prenom?: string;
    role?: string;
    name?: string;
    nomLaboratoire?: string;
  }[];
  //it is used to choose wich data should be displayed
  isThesesPagination?: boolean;
  isUsersPagination?: boolean;
  isDepartementPagination?: boolean;
  isLaboratoirePagination?: boolean;
  isAgPagination?: boolean;
  color?: string;
  bgColor?: string;
}
const PaginationTable = ({
  tableHeader,
  tableData,
  isThesesPagination,
  isUsersPagination,
  isDepartementPagination,
  isLaboratoirePagination,
  isAgPagination,
  isLoading,
  isError,
  error,
  color,
  bgColor,
}: PaginationProps) => {
  const navigate = useNavigate();
  const [activePage, setPage] = useState(1);
  const [showLoading, setShowLoading] = useState(false);
  const data = chunk([...tableData], 5);
  const [openThese, setOpenThese] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [openDepartement, setOpenDepartement] = useState(false);
  const [openLaboratoire, setOpenLaboratoire] = useState(false);
  const [openDocument, setOpenDocument] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);
  const [entity, setEntity] = useState("");
  const [msg, setMsg] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [entityId, setEntityId] = useState(0);
  const [departId, setDepartId] = useState(0);
  const [userId, setUserId] = useState(0);
  const [labId, setLabId] = useState(0);
  const [theseId, setTheseId] = useState(0);

  const handleDelete = () => {};

  const rows =
    data?.length > 0
      ? data[activePage - 1].map((element) => (
          <TableRow
            // onClick={() => {
            //   if (isThesesPagination) {
            //     setShowLoading(true);
            //     setTimeout(() => {
            //       alert("COMING SOON");
            //       // handleOpenFolder(element.id);
            //       setShowLoading(false);
            //     }, 800);
            //   }
            // }}
            key={element.id}
          >
            {isUsersPagination && <td>{element.first_name}</td>}
            {isUsersPagination && <td>{element.last_name}</td>}
            {isUsersPagination && <td>{element.email}</td>}
            {isUsersPagination && <td
            style={{
              backgroundColor: getColorBackGround(element?.role),
              color: getColor(element?.role),
              padding: "2px 6px",
              fontWeight: 600,
              borderRadius: "4px",
            }}
            >{element.role || ""}</td>}
            {/* {isAgPagination && <td>{element.first_name}</td>}
            {isAgPagination && <td>{element.last_name}</td>}
            {isAgPagination && <td>{element.email}</td>}
            {isAgPagination && <td>{element.role || ""}</td>} */}
            {isThesesPagination && <td>{element.doctorant}</td>}
            {isThesesPagination && <td>{element.titre}</td>}
            {isThesesPagination && (
              <td>
                  {element.sujet}
              </td>
            )}
            {isThesesPagination && <td>{element?.duree}</td>}
            {isThesesPagination && <td>{element.date_publication}</td>}
            {isThesesPagination && <td>{element.date_soutenance}</td>}
            {isThesesPagination && <td>{element.directeur}</td>}
            
            {/* Departement data */}
            {(isDepartementPagination || isLaboratoirePagination) && <td>{element?.name}</td>}        
            
            {(isThesesPagination) && (
              <td>
                <ActionIcon
                  sx={{ color: "green" }}
                  // style={{ color: "rgb(255, 104, 104)", cursor: "pointer" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    
                    if(isThesesPagination) {
                     setOpenDocument(true);
                     setTheseId(element.id);
                    }
                    // setOpenDelete(true);
                  }}
                  disabled={mappRole(sessionStorage.getItem("roles") || "") === "Agent de bibliotheque" ? false : true} 
                >

                  <IconFileTypePdf  style={{ width: rem(22), height: rem(22) }} />
                </ActionIcon>
              </td>
            )}

          {(isThesesPagination)  && (
              <td>
                <ActionIcon
                  sx={{ color: "blue" }}
                  disabled={mappRole(sessionStorage.getItem("roles") || "") !== "Agent de bibliotheque" ? true : false} 
                  // style={{ color: "rgb(255, 104, 104)", cursor: "pointer" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if(isThesesPagination) {
                      setOpenUpload(true);
                      setTheseId(element.id);
                     }
                  }}
                >
                  <IconUpload style={{ width: rem(22), height: rem(22) }} />
                </ActionIcon>
              </td>
            )}

            {(isThesesPagination || isUsersPagination || 
              isDepartementPagination || isLaboratoirePagination || isAgPagination
            )  && (
              <td>
                <ActionIcon
                  sx={{ color: "blue" }}
                  disabled={mappRole(sessionStorage.getItem("roles") || "") === "Agent de bibliotheque" ? true : false} 
                  // style={{ color: "rgb(255, 104, 104)", cursor: "pointer" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isThesesPagination) {
                      setShowLoading(true);
                      setTheseId(element.id);
                      setTimeout(() => {
                        setShowLoading(false);
                        setOpenThese(true);
                      }, 200);
                    }
                    
                    // if (isAgPagination) {
                    //   setShowLoading(true);
                    //   setAgId(element.id);
                    //   setTimeout(() => {
                    //     setShowLoading(false);
                    //     setOpenUser(true);
                    //   }, 200);
                    // }
                    if (isUsersPagination) {
                      setShowLoading(true);
                      setUserId(element.id);
                      setTimeout(() => {
                        setShowLoading(false);
                        setOpenUser(true);
                      }, 200);
                    }
                    if (isDepartementPagination) {
                      setShowLoading(true);
                      setDepartId(element.id);
                      setTimeout(() => {
                        setShowLoading(false);
                        setOpenDepartement(true);
                      }, 200);
                    }
                    if (isLaboratoirePagination) {
                      setShowLoading(true);
                      setLabId(element.id);
                      setTimeout(() => {
                        setShowLoading(false);
                        setOpenLaboratoire(true);
                      }, 200);
                    }
                  }}
                >
                  <IconPencil style={{ width: rem(22), height: rem(22) }} />
                </ActionIcon>
              </td>
            )}
            
            {(isThesesPagination || isUsersPagination || 
              isDepartementPagination || isLaboratoirePagination || isAgPagination
            ) && (
              <td>
                <ActionIcon
                  sx={{ color: "red" }}
                  // style={{ color: "rgb(255, 104, 104)", cursor: "pointer" }}
                  disabled={mappRole(sessionStorage.getItem("roles") || "") === "Agent de bibliotheque" ? true : false} 
                  onClick={(e) => {
                    e.stopPropagation();
                    if(isDepartementPagination) {              
                      setMsg("Voulez-Vous vraiment supprimer ce Departement ?")
                      setEntity("departement");
                      setEntityId(element.id);
                    }
                    if(isLaboratoirePagination) {
                      setMsg("Vous-vous vraiment supprimer ce Laboratoire ?")
                      setEntity("laboratoire");
                      setEntityId(element.id);
                    }
                    if(isThesesPagination) {
                      setMsg("Vous-vous vraiment supprimer cette these ?")
                      setEntity("these");
                      setEntityId(element.id);
                    }
                    if(isUsersPagination) {
                      setMsg("Vous-vous vraiment supprimer cet utilisateur ?")
                      setEntity("user");
                      setEntityId(element.id);
                    }
                    if(isAgPagination) {
                      setMsg("Vous-vous vraiment supprimer cet utilisateur ?")
                      setEntity("agentRecherche");
                      setEntityId(element.id);
                    }
                    setOpenDelete(true);
                  }}
                >
                  <IconTrash style={{ width: rem(22), height: rem(22) }} />
                </ActionIcon>
              </td>
            )}
            
          </TableRow>
        ))
      : [];

  const folderTable = (
    <Table>
      <thead>
        <tr>
          {tableHeader.map((e: string) => (
            <th>{e}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          // Render skeleton loading here
          <>
            <tr>
              <td colSpan={tableHeader.length}>
                <Skeleton height={30} />
              </td>
            </tr>
            <tr>
              <td colSpan={tableHeader.length}>
                <Skeleton height={30} />
              </td>
            </tr>
            <tr>
              <td colSpan={tableHeader.length}>
                <Skeleton height={30} />
              </td>
            </tr>
            <tr>
              <td colSpan={tableHeader.length}>
                <Skeleton height={30} />
              </td>
            </tr>
            <tr>
              <td colSpan={tableHeader.length}>
                <Skeleton height={30} />
              </td>
            </tr>
          </>
        ) : isError ? (
          // Render error message here
          <tr>
            <td colSpan={tableHeader.length}>Error: {"ERROR"}</td>
          </tr>
        ) : // Render rows with data
        rows?.length > 0 ? (
          rows
        ) : (
          <tr>
            <td colSpan={tableHeader.length}>{"NO DATA FOUND"}</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
  return (
    <>
      <div style={{ textAlign: "center" }}>
        {folderTable}
        <Pagination
          color="#095797"
          total={data.length}
          value={activePage}
          onChange={setPage}
          mt="sm"
          style={{ display: "inline-flex" }}
        />
      </div>
      <LoadingOverlay visible={showLoading} />
      <UpdateForm opened={openThese} setOpened={setOpenThese} these_id={theseId} />
      <UpdateFormUser opened={openUser} setOpened={setOpenUser} user_id={userId} />
      {/* <UpdateFormAg opened={openUser} setOpened={setOpenUser} ag_id={agId} /> */}
      <UpdateFormDepartement opened={openDepartement} setOpened={setOpenDepartement} depart_id={departId} />
      <UpdateFormLaboratoire opened={openLaboratoire} setOpened={setOpenLaboratoire} lab_id={labId}/>
      <DeleteComponent 
        title={msg}
        openedCheck={openDelete}
        setOpenedCheck={setOpenDelete}
        id={entityId}
        entity={entity}
      />
      <DocumentTable
        opened={openDocument}
        setOpened={setOpenDocument}
        these_id={theseId}
      />
      <UploadComponent
        opened={openUpload}
        setOpened={setOpenUpload}
        these_id={theseId}
      />
    </>
  );
};
export default PaginationTable;

const TableRow = styled.tr`
  // cursor: pointer;
  :hover {
    background-color: rgba(9, 87, 151, 0.02);
    // background-color:rgb(0,0,0,0.02);
  }
`;
