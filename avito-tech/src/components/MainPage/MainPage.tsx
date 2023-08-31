import React, { useEffect, useState } from 'react';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import './MainPage.scss';
import { Spin, Space, Select } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import GamesList from '../Games/GamesList';
import Error from '../../features/Error/Error';
import { sorts } from '../../consts/sort';
import { filters } from '../../consts/filter';
import { platform } from '../../consts/category';
import { Game } from '../Games/types/types';
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function MainPage({
  platforms,
  sorting,
  setPlatforms,
  setSorting,
  categories,
  setCategories,
}: {
  platforms: string;
  sorting: string;
  setPlatforms: React.Dispatch<React.SetStateAction<string>>;
  setSorting: React.Dispatch<React.SetStateAction<string>>;
  categories: string;
  setCategories: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element {
  const { gamesArr, error } = useSelector((store: RootState) => store.game);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // Constants for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const onChange: PaginationProps['onChange'] = (page: number) => {
    setCurrentPage(page);
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = gamesArr.slice(startIndex, endIndex);
  //

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const filteredOptions = filters.filter(
    (elem: string) => !selectedItems.includes(elem),
  );

  if (error || (!isLoading && gamesArr.length === 0)) {
    return <Error />;
  }
  return (
    <div className="main-page">
      <div className="free-games-logo">
        <img
          src="https://cdn.bagogames.com/wp-content/uploads/2020/10/26144328/free-to-play-super-popular-featured-image-bg.jpeg?strip=all&lossy=1&ssl=1"
          alt="logo"
        />
      </div>
      <div className="dropdown">
        <Space direction="vertical">
          <Space wrap>
            <Select
              mode="multiple"
              placeholder="Отфильтровать по категориям"
              value={selectedItems}
              onChange={setSelectedItems}
              style={{ width: '100%' }}
              options={filteredOptions.map((item) => ({
                value: item,
                label: item,
              }))}
            />
            <div className="sort-selects">
              <Select
                placeholder="Выберите платформу"
                value={platforms}
                options={platform}
                onChange={(value: string): void => setPlatforms(value)}
              />
            </div>
            <div className="sort-selects">
              <Select
                placeholder="Отсортировать по"
                value={sorting}
                options={sorts}
                onChange={(value: string): void => setSorting(value)}
              />
            </div>
            <div className="sort-selects">
              <Select
                placeholder="По одной категории"
                value={categories}
                options={filters.map((item : string) => ({value: item, label: item}))}
                onChange={(value: string): void => setCategories(value)}
              />
            </div>
          </Space>
        </Space>
      </div>
      {gamesArr.length === 0 || isLoading ? (
        <div className="spin">
          <Spin indicator={antIcon} size="large" />
        </div>
      ) : (
        <div className="card-list">
          {paginatedData.map((game) => (
            <GamesList game={game} key={game.id} />
          ))}
        </div>
      )}
      <div className="pagination">
        <Pagination
          current={currentPage}
          total={gamesArr.length}
          showSizeChanger={false}
          pageSize={itemsPerPage}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default MainPage;
