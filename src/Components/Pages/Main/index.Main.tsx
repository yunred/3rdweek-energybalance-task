import React, { useEffect, useState } from "react";
import Nav from "Templates/Nav/index.Nav";
import SearchBar from "Templates/SearchBar/index.SearchBar";
import styled from "styled-components";
import { GlobalStyle } from "Style/style";
import * as T from "Types/index";
import SortTab from "Organisms/SortTab/index.SortTab";
import CategoryTab from "Organisms/CategoryTab/index.CategoryTab";
import SearchResult from "Components/Templates/SearchResult/index.SearchResult";

const Main = () => {
  const [JsonData, setJsonData] = useState<T.JsonDataType[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [selectedSort, setSelectedSort] = useState<string>("인기순");
  const [filteredData, setFilteredData] = useState<T.JsonDataType[]>([]);
  useEffect(() => {
    (async () => {
      await fetch("http://localhost:4000/results")
        .then((res) => res.json())
        .then((res) => setJsonData(res));
    })();
  }, []);

  useEffect(() => {
    selectedCategory === "전체"
      ? setFilteredData(JsonData)
      : setFilteredData([
          ...JsonData.filter((el) => el.ingredient === selectedCategory),
        ]);
  }, [selectedCategory, JsonData]);

  useEffect(() => {
    selectedSort === "인기순"
      ? filteredData.sort((a, b) => b.searchAmount - a.searchAmount)
      : "높은 가격순"
      ? filteredData.sort((a, b) => b.price - a.price)
      : filteredData.sort((a, b) => a.price - b.price);
  }, [selectedSort]);

  return (
    <Container>
      <GlobalStyle />
      <Nav />
      <SearchBar
        JsonData={JsonData}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      <CategoryTab
        JsonData={JsonData}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <SortTab
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <SearchResult JsonData={JsonData} />
    </Container>
  );
};

const Container = styled.div`
  width: 60vw;
  margin: auto;

  @media all and (max-width: 768px) {
    width: 100vw;
    margin: auto;
  }
`;

export default Main;