import { Row } from "react-bootstrap";
import Vote from "./Vote";

function Votes({ votes, reRender }) {
  return (
    <Row className="px-2" xs={1} sm={1} md={2} lg={2} xl={3} xxl={3}>
      {votes.map(({ _id, title, token, yesCount, noCount, isDone }) => (
        <Vote
          key={_id}
          _id={_id}
          title={title}
          token={token}
          yesCount={yesCount}
          noCount={noCount}
          isDone={isDone}
          reRender={reRender}
        />
      ))}
    </Row>
  );
}

export default Votes;
