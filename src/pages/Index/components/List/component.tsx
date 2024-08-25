import GithubCard from "../../../../components/cards/Github";

interface Props {
  list: number[]
}

export default function List(props: Props) {
  return (
    <ul className="Index-list">
      {props.list.map(it => (
        <li key={it}>
          <GithubCard />
        </li>
      ))}
    </ul>
  );
}
