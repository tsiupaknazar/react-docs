import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-bg-primary);
  z-index: 50;
`;

const Content = styled.div`
  text-align: center;
`;

const Loader = ({ type }) => {
  const color = type === "docs" ? "#1A73E8" : type === "sheets" ? "#17c400" : "#000";

  return (
    <Overlay>
      <Content>
        <ThreeDots
          height={80}
          width={80}
          radius={9}
          color={color}
          ariaLabel="three-dots-loading"
          visible={true}
        />
      </Content>
    </Overlay>
  );
};

export default Loader;
