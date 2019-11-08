import styled from "styled-components";

export const Container = styled.div`
  position: relative;
`;

export const Toggle = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 0;

  &:hover {
    cursor: pointer;
  }
`;

export const CurrencyText = styled.span`
  font-size: 39px;
  text-transform: uppercase;
  color: #292929;
`;

export const CurrencySelector = styled.div`
  position: absolute;
  width: 300px;
  background-color: #fff;
  border-radius: 17px;
  padding: 15px;
  top: 60px;
  display: flex;
  flex-direction: column;
  z-index: 1;
  box-shadow: 0px 3px 29px -17px rgba(0, 0, 0, 0.75);
`;
export const CurrencyItem = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40px;
  align-items: center;
  padding: 0 5px;

  &:hover {
    background-color: #e8e8e8;
    cursor: pointer;
  }
`;
export const CurrencyItemAmount = styled.div``;
export const CurrencyItemName = styled.div``;

export const DownArrow = styled.i`
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  margin-left: 10px;
`;

export const CurrencyImage = styled.div<{ backgroundImage: string }>`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-image: ${props =>
    props.backgroundImage ? `url(${props.backgroundImage})` : ""};
  background-size: 160%;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 8px;
`;

export const CurrencyInfo = styled.div`
  display: flex;
  align-items: center;
`;