import styled from "styled-components";

export const Wrapper = styled.div`
  border-radius: 12px;
  background-color: #fff;
  padding: 24px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  overflow-x: auto;

  .ant-table-thead > tr > th {
    background-color: #f0f2f5;
    font-weight: 600;
    color: #333;
  }

  .ant-table-tbody > tr > td {
    border-bottom: 1px solid #f0f0f0;
  }

  .ant-table-tbody > tr:hover > td {
    background-color: #fafafa;
  }
`;
