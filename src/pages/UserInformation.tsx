import styled from "@emotion/styled";
import { Layout } from "./layouts/Layout";
import UserInformationWebAdapter from "../feat-user-information/UserInformationWebAdapter";

const UserInformation = () => {
  return (
    <Layout isHeaderAuth={true} isAccueil={true}>
      {/* <FlexBox> */}
      {/* <MenuWebAdapter /> */}
      <UserInformationWebAdapter />
      {/* </FlexBox> */}
    </Layout>
  );
};

const FlexBox = styled.div`
  display: flex;
`;

export default UserInformation;
