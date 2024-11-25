import styled from "styled-components";

export const ControlsContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
`;

export const Button = styled.button`
  background-color: #f0a500;
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d48806;
  }

  &:disabled {
    background-color: #777;
    cursor: not-allowed;
  }
`;
