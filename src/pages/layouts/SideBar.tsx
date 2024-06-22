import { useState, useRef, useEffect } from "react";
import {
  Navbar,
  createStyles,
  Stack,
  rem,
  Button,
} from "@mantine/core";
import {
  IconBuildingArch,
  IconBuildingSkyscraper,
  IconFolder,
  IconMicroscope,
  IconPlaneDeparture,
  IconUser,
  IconUserSearch,
  IconUsers,
} from "@tabler/icons-react";
import { Box } from "@mui/material";
import { theme } from "../../theme/theme";
import { useNavigate } from "react-router-dom";
import { mappRole } from "../../utils/customFunctions";

const useStyles = createStyles((themeMui) => ({
  link: {
    backgroundColor: "transparent",
    width: "fit-content",
    height: rem(50),
    padding: 7,
    borderRadius: themeMui.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.mainColor,

    "&:hover": {
      backgroundColor: "transparent",
    },
  },

  active: {
    "&, &:hover": {
      backgroundColor: "transparent",
      color: theme.mainColorOpacity,
    },
  },
}));

interface NavbarLinkProps {
  icon: React.FC<any>;
  label: string;
  active?: boolean;
  path: string;
  onClick?(): void;
  isSBOpen?: boolean;
}

function NavbarLink({
  icon: Icon,
  label,
  active,
  onClick,
  isSBOpen,
  path,
}: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Button
      onClick={onClick}
      className={cx(classes.link, { [classes.active]: active })}
      tabIndex={active ? 0 : -1} // Set tabIndex for focus management
    >
      <Icon style={{ marginRight: 7 }} />
      {isSBOpen && label}
    </Button>
  );
}

const mockdata = [
  { icon: IconFolder, label: "Theses", path: "/theses", role: ["Agent de recherche", "Agent de bibliotheque"] },
  { icon: IconUsers , label: "Users", path: "/users", role: ["Super Admin"] },
  // { icon: IconUserSearch, label: "Agent Recherche", path: "/agent-recherches", role: ["Super Admin"] },
  { icon: IconBuildingSkyscraper, label: "Departements", path: "/departements", role: ["Super Admin"] },
  { icon: IconMicroscope, label: "Laboratoires", path: "/laboratoires", role: ["Super Admin"] },
];

interface SideBarProps {
  isSBOpen: boolean;
}


const SideBar = ({isSBOpen}: SideBarProps) => { 
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const role = sessionStorage.getItem("roles");
  const filteredMockData = mockdata.filter((link) => {
    if(link.role?.includes(mappRole(role || "")))
      return link;
  });

  const links = filteredMockData.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => {
        setActive(index)
        navigate(link.path);
      }
      }
      isSBOpen={isSBOpen}
    />
  ));

  return (
    <Box
      style={{ position: "fixed", top: "130px" }}
      sx={{ marginTop: "-7.5rem" }}
    >
      <Navbar height='100vh' p="md" style={{backgroundColor:'rgba(90, 186, 255, 0.2)'}}>
        <Navbar.Section grow mt={50}>
          <Stack justify="center" spacing={0}>
            {links}
          </Stack>
        </Navbar.Section>
      </Navbar>
    </Box>
  );
};

export default SideBar;