import { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";

function Vote({ _id, title, token, yesCount, noCount, isDone, reRender }) {
  const [loading, setLoad] = useState(false);

  const closeVote = (_id, token) => {
    const password = window.prompt("투표를 종료합니다.\n비밀번호를 입력하세요.");
    fetch("/update/done", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ _id, token, password }),
    })
      .then((res) => res.json())
      .then(({ success, msg }) => (success ? reRender(Symbol()) : window.alert(msg)));
  };

  const deleteVote = (_id, token) => {
    const password = window.prompt("투표를 삭제합니다.\n비밀번호를 입력하세요.");
    fetch("/delete", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ _id, token, password }),
    })
      .then((res) => res.json())
      .then(({ success, msg }) => (success ? reRender(Symbol()) : window.alert(msg)));
  };

  const countUp = (_id, type) => {
    if (!loading) {
      setLoad(true);
      fetch("/update/count_up", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ _id, type }),
      })
        .then((res) => res.json())
        .then(({ success, msg }) => {
          success ? reRender(Symbol()) : window.alert(msg);
        })
        .then(() => setLoad(false));
    }
  };

  return (
    <Col>
      <div className="py-4 shadow rounded-3 text-center">
        <h4>{title}</h4>
        <Row>
          <Col>
            <Button variant="success" onClick={() => countUp(_id, true)} disabled={isDone}>
              YES
            </Button>
            <p className="fs-1 fw-bold">{yesCount}</p>
          </Col>
          <Col>
            <Button variant="danger" onClick={() => countUp(_id, false)} disabled={isDone}>
              NO
            </Button>
            <p className="fs-1 fw-bold">{noCount}</p>
          </Col>
        </Row>
        {isDone ? (
          <Button variant="warning" onClick={() => deleteVote(_id, token)}>
            투표 삭제
          </Button>
        ) : (
          <Button variant="light" onClick={() => closeVote(_id, token)}>
            투표 종료
          </Button>
        )}
      </div>
    </Col>
  );
}

export default Vote;
