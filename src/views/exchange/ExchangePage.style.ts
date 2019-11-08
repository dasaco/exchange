import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const TopSection = styled.div`
  background-color: #fff;
  flex: 0.4;
  align-items: flex-end;
  display: flex;
  justify-content: center;
  padding-bottom: 80px;
`;

export const BottomSection = styled.div`
  position: relative;
  background-color: #e8e8e8;
  flex: 0.6;
  align-items: center;
  display: flex;
  justify-content: flex-start;
  padding-top: 80px;
  flex-direction: column;
`;

export const Content = styled.div`
  min-width: 600px;
  position: relative;
`;

export const Button = styled.button`
  border-radius: 30px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 17%;
  height: 52px;
  font-weight: bold;
  margin-top: 90px;
  background-color: #f51f90;
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  box-shadow: 2px 10px 30px -17px rgba(245, 31, 144, 1);
  border: none;
  outline: none;
  transition: all 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
  }
`;