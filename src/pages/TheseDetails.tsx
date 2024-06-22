import styled from "@emotion/styled";
import { Layout } from "./layouts/Layout";
import TheseDetailsWebAdapter from "../feat-these-details/TheseDetailsWebAdapter";

const TheseDetails = () => {
  return (
    <Layout isHeaderAuth={true} isAccueil={true}>
      {/* <FlexBox> */}
      {/* <MenuWebAdapter /> */}
      <TheseDetailsWebAdapter />
      {/* </FlexBox> */}
    </Layout>
  );
};

const FlexBox = styled.div`
  display: flex;
`;

export default TheseDetails;
