import styled from "styled-components";

export const Flex = styled.div<{
  justifyContent?: string;
  alignItems?: string;
  flexDirection?: string;
  gap?: string;
  fullWidth?: boolean;
}>`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent || "flex-start"};
  align-items: ${({ alignItems }) => alignItems || "stretch"};
  flex-direction: ${({ flexDirection }) => flexDirection || "row"};
  gap: ${({ gap }) => gap || "0"};
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
`;
