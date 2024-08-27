import "./styles.scss"

import List from "./components/List";
import {useEffect} from "react";
import {useRequest} from "../../hooks/useRequest.hooks";
import {GetRepositoriesList, getRepositoriesList} from "../../api/endpoints/repositories";
import {Repository} from "../../types/repository";
import Loader from "../../core_components/Loader";

export default function IndexPage() {

  const {state, fetch} = useRequest<{items: Repository.ItemModel_DTO[]}, GetRepositoriesList>(getRepositoriesList, {data: {items: []}})

  useEffect(() => {
    fetch({
      sort: "stars",
      order: "desc"
    })
  }, [fetch])

  return (
    <div className="p-Index">
      <List list={state.data.items} />
      {state.isFetching && (
        <Loader />
      )}
    </div>
  );
}
