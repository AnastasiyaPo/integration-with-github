import {Repository} from "../../../types/repository";
import {getFormattedDateValue} from "../../../utils/intl.utils";

export default function GithubCard(props: Repository.ItemModel_DTO) {
  return (
    <article className="Github-card">
      <header>
        <a href={props.url} target="_blank" rel="noreferrer">
          {props.name}
        </a>
      </header>
      <p>
        {props.description}
      </p>
      {props.topics && props.topics.length > 0 && (
        <ul>
          {props.topics.map(topic => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
      )}
      <footer>
        {props.language && <span>{props.language}</span>}{" "}
        <span title={props.watchers_count.toString()}>{Math.round(props.watchers_count / 1_000)}k</span>{" "}
        <span>
          Updated{" "}
          <time dateTime={props.updated_at}>
            {getFormattedDateValue(props.updated_at, ["en"], "medium")}
          </time>
        </span>
      </footer>
    </article>
  );
}
