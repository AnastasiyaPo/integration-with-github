import GithubCard from "../../../../components/cards/Github";
import {Repository} from "../../../../types/repository";

interface Props {
  list: Repository.ItemModel_DTO[]
}

export default function List(props: Props) {
  return (
    <ul className="Index-list">
      {props.list.map((it) => (
        <li key={it.id}>
          <GithubCard {...it} />
        </li>
      ))}
    </ul>
  );
}
