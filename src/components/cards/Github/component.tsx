import {Repository} from "../../../types/repository";

export default function GithubCard(props: Repository.ItemModel_DTO) {
  return (
    <article className="Github-card">
      {props.name}
    </article>
  );
}
