import { Table } from "antd";
import React from "react";
import { Wrapper } from "./style";

const TableComponent = ({ columns = [], data = [], onRow }) => {
  return (
    <Wrapper>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        rowKey="key"
        onRow={onRow}
      />
    </Wrapper>
  );
};

export default TableComponent;
