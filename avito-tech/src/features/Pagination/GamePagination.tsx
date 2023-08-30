import React, { useState } from 'react';
import { Pagination } from 'antd';
import { useSelector } from 'react-redux';
import type { PaginationProps } from 'antd';
import './pagination.scss'
import { RootState } from '../../store';

function GamePagination() : JSX.Element {
  const { gamesArr } = useSelector((store: RootState) => store.game);
  const [currentPage, setCurrentPage] = useState(1);
  const onChange: PaginationProps['onChange'] = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div><Pagination defaultCurrent={currentPage} total={gamesArr.length} defaultPageSize={10} pageSizeOptions={[10, 20, 50, 100]} onChange={onChange} /></div>
  )
}

export default GamePagination;