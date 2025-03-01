import styled from "styled-components";

export const Button = styled.button`
  padding: 12px 24px;
  min-width: 10rem;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  transition: transform 0.2s ease, background-color 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    background-color: gray;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
`;
