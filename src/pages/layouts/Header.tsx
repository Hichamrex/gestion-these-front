import styled from "@emotion/styled";
import { theme, screenValues } from "../../theme/theme";
import assets from "../../assets";
import { ChevronRight, ChevronLeft, NotificationsActiveOutlined } from "@mui/icons-material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { forwardRef, useState } from "react";
import { Group, Avatar, Text, Menu, UnstyledButton, Paper, Title, Badge } from "@mantine/core";
import { useNavigate } from "react-router-dom";
// import ChangePasswordWebAdapter from "../../feat-changePassword/ChangePasswordWebAdapter";
import { format, parseISO } from "date-fns";

interface UserButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  name: any;
  status: any;
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ name, status, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      style={{
        padding: "var(--mantine-spacing-md)",
        color: "var(--mantine-color-text)",
        borderRadius: "var(--mantine-radius-sm)",
      }}
      {...others}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <AccountCircleOutlinedIcon
          style={{
            color: theme.whiteColor,
            cursor: "pointer",
          }}
          sx={{ fontSize: 30 }}
        />
        <div>
          <h4 style={{margin:0}}>{name}</h4>
          <Text className="userStatus" size="sm">{status}</Text>
        </div>
      </div>
    </UnstyledButton>
  )
);
interface headerProps {
  isHeaderAuth?: boolean;
  openSideBar?: () => void;
  isSBOpen?: boolean;
}
export const Header = ({
  isHeaderAuth,
  openSideBar,
  isSBOpen,
}: headerProps) => {
  const navigate = useNavigate();
  const [openProfile, setOpenProfile] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [openAddCollaborator, setOpenAddCollaborator] = useState(false);

  const header = (
    <>
    <div className="content">
      <div className="imgDiv">
        {!isHeaderAuth &&
          (isSBOpen ? (
            <ChevronLeft
              onClick={openSideBar}
              style={{
                cursor: "pointer",
                color: theme.whiteColor,
                width: "20%",
              }}
            />
          ) : (
            <ChevronRight
              onClick={openSideBar}
              style={{
                cursor: "pointer",
                color: theme.whiteColor,
                width: "20%",
              }}
            />
          ))}
        <img
          src={assets.LOGO_APP}
          style={{ width: "80%", height: "100%", objectFit: "contain" }}
        ></img>
      </div>
      {isHeaderAuth && (
        <h4
          style={{
            fontFamily: theme.mainFont,
            color: theme.whiteColor,
            width: "50%",
          }}
        >
          Moteur de recherche FSAC
        </h4>
      )}
      <div
        style={{
          width: "40%",
          marginRight: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
        }}
      >
        {!isHeaderAuth && (
          <Profile>
            <Menu withArrow position="bottom-end">
                            
              {/* {
                notificationsMSP?.data?.length > 0 && mappRole(sessionStorage.getItem("roles") || "") === "municipalite_admin"  ?
              <Menu.Dropdown >
              {notificationsMSP?.data?.map((notification: any, index: number) => {
                return (
                  <Menu.Item key={index}>
                  <NotificationContent 
                    notification={{
                      title: `${notification?.sujet}`,
                      content: `${notification?.body}`,
                      date: `${format(parseISO(notification?.notificationDate), "MM/dd/yyyy hh:mm:ss")}`
                    }} />
                  </Menu.Item>
                );
              })
              }
              </Menu.Dropdown>
              :
              <Menu.Dropdown >
                  <Menu.Item>
                  <NotificationContent 
                    notification={{
                      title: ``,
                      content: `Aucune notification`,
                      date: ``
                    }} />
                  </Menu.Item>
              </Menu.Dropdown>
            } */}
            </Menu>

            <Menu offset={0}>
              <Menu.Target>
                <UserButton name={`Ichraq AMINE`} status={`Agent de recherche`} />
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  onClick={() => {
                    setOpenProfile(true);
                  }}
                >Profil</Menu.Item>
                <Menu.Divider />
                <Menu.Item 
                  onClick={() => {
                  setOpenChangePassword(true);
                  }}
                >Changer mot de passe</Menu.Item>
                <Menu.Divider />
                <Menu.Item onClick={() => {
                  navigate("/");
                }}>Déconnexion</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Profile>
        )}
      </div>
    </div>
    {/* <ChangePasswordWebAdapter 
      opened={openChangePassword}
      setOpened={setOpenChangePassword}
    /> */}
    </>
  );
  return <Root>{header}</Root>;
};
const Root = styled.section`
  .content {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 101;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px;
    background-color: ${theme.mainColor};
    height: 60px;
  }
  .imgDiv {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 20%;
    height: 60px;
  }

  @media (max-width: ${screenValues.xl}px) {
    .content {
      padding: 0px 40px 0px 40px;
    }
  }

  @media (max-width: ${screenValues.lg}px) {
    .content {
      padding: 0px 20px 0px 20px;
    }
  }

  @media (max-width: ${screenValues.md}px) {
    .content {
      padding: 0;
      h4 {
        font-size: 11px;
      }
    }
    .imgDiv {
      width: 30%;
    }
  }

  @media (max-width: ${screenValues.sm}px) {
    .content {
      padding: 0;
      h4 {
        display: none;
      }
    }
    .userStatus{
      display:none;
    }
    .imgDiv {
      width: 40%;
    }
  }
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  color: ${theme.whiteColor};
`;
