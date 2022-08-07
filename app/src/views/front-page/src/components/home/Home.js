import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

function Home({ reRender }) {
  const [loading, setLoad] = useState(false);
  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = (data) => {
    if (!loading) {
      setLoad(true);
      fetch("/create", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then(({ success, msg }) => {
          if (success) {
            reRender(Symbol());
            setLoad(false);
          } else {
            window.alert(msg);
          }
        });

      setValue("title", "");
      setValue("password", "");
    }
  };

  return (
    <Container className="p-5 my-4 bg-light rounded shadow">
      <div className="text-center">
        <h1>Yes or No!</h1>
        <p>누구나 투표를 등록할 수 있습니다.</p>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Label>투표 주제</Form.Label>
        <Form.Control
          className="mb-3"
          placeholder="ex) 사랑하는 사람이 있습니까?"
          {...register("title")}
        ></Form.Control>
        <Form.Label>비밀번호</Form.Label>
        <Form.Control
          type="password"
          className="mb-3"
          placeholder="투표 종료 및 삭제 시 비밀번호가 필요합니다."
          {...register("password")}
        ></Form.Control>
        <div className="d-flex justify-content-center">
          <Button type="submit">투표 등록</Button>
        </div>
      </Form>
    </Container>
  );
}

export default Home;
