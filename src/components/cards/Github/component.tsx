import "./styles.scss"

import {Repository} from "../../../types/repository";
import {getFormattedDateValue} from "../../../utils/intl.utils";

export default function GithubCard(props: Repository.ItemModel_DTO) {
  return (
    <article className="Github-card">
      <header>
        <h3 className="Github-card__title">
          <a href={props.url} target="_blank" rel="noreferrer">
            {props.name}
          </a>
        </h3>
      </header>
      <p className="Github-card__description">
        {props.description}
      </p>
      <div>
        {props.topics && props.topics.length > 0 && (
          <ul className="Github-card__topicList">
            {props.topics.map(topic => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        )}
      </div>
      <footer className="Github-card__footer">
        {props.language && <span className="Github-card__footer-language">{props.language}</span>}{" "}
        <span
          title={props.watchers_count.toString()}
          className="Github-card__footer-star"
        >
          {Math.round(props.watchers_count / 1_000)}k
        </span>
        {" "}
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
