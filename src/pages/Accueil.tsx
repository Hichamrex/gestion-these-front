import styled from "@emotion/styled";
import { AccueilWebAdapter } from "../feat-accueil/AccueilWebAdapter";
import { Layout } from "./layouts/Layout";

const Accueil = () => {
  return (
    <Layout isHeaderAuth={true} isAccueil={true}>
      {/* <FlexBox> */}
      {/* <MenuWebAdapter /> */}
      <AccueilWebAdapter />
      {/* </FlexBox> */}
    </Layout>
  );
};

const FlexBox = styled.div`
  display: flex;
`;

export default Accueil;
