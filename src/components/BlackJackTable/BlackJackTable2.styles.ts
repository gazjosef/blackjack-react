import styled from "styled-components";

export const TableContainer = styled.div`
  width: 60%; /* Adjust for table size */
  height: 100px;
  padding-bottom: 30%; /* Creates the curved effect */
  background-color: green;
  border: 5px solid black;
  border-bottom-left-radius: 100%;
  border-bottom-right-radius: 100%;
  position: absolute;
  left: 50%;
  bottom: 20%;
  transform: translateX(-50%);
`;

// export const Section = styled.div`
//   margin: 20px 0;
//   width: 100%;
//   text-align: center;
// `;

// export const Heading = styled.h2`
//   margin-bottom: 10px;
//   font-size: 24px;
//   text-transform: uppercase;
//   font-weight: bold;
// `;
