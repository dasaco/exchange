import styled from "styled-components";

export const Container = styled.div``;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LeftSide = styled.div``;

export const RightSide = styled.div``;

export const BottomLine = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const BalanceText = styled.p<{
  isHighlighed: boolean;
}>`
  color: ${props => (props.isHighlighed ? "#f51f90" : "#292929")};
`;

export const ExceedsBalanceText = styled.p`
  color: #8b8b8b;
`;