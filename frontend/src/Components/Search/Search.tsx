import React, { ChangeEvent, useState, SyntheticEvent, JSX, FormEvent } from "react";

//as props repassam os dados, elas são o canal q comunica as info
interface Props {
  onSearchSubmit: (e: SyntheticEvent) => void;
  search: string /*| undefined */;
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const Search: React.FC<Props> = ({
  onSearchSubmit,
  search,
  handleSearchChange,
}: Props): JSX.Element => {
  return (
    <div>
      <form onSubmit={onSearchSubmit}>
        <input value={search} onChange={handleSearchChange}></input>
      </form>
    </div>
  );
};

export default Search;