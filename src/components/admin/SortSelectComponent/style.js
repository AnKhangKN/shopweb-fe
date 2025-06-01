import styled from "styled-components";

export const WrapperSelect = styled.select`
  appearance: none; /* Ẩn mũi tên mặc định (có thể tùy chỉnh icon riêng nếu muốn) */
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background-color: #f9fafb;
  color: #111827;
  outline: none;
  transition: all 0.3s ease;
  cursor: pointer;

  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 12px;

  &:hover {
    border-color: #9ca3af;
    background-color: #f3f4f6;
  }

  &:focus {
    border-color: rgb(50, 51, 52);
    box-shadow: 0 0 0 3px rgba(80, 89, 103, 0.3);
    background-color: #fff;
  }

  option {
    font-weight: 400;
    background-color: #fff;
    color: #111827;
  }
`;
