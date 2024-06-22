import styled from "@emotion/styled";
import { Layout } from "./layouts/Layout";
import SearchWebAdapter from "../feat-search-these-personne/SearchWebAdapter";

const Search = () => {
  return (
    <Layout isHeaderAuth={true} isAccueil={true}>
      {/* <FlexBox> */}
      {/* <MenuWebAdapter /> */}
      <SearchWebAdapter />
      {/* </FlexBox> */}
    </Layout>
  );
};

const FlexBox = styled.div`
  display: flex;
`;

export default Search;
