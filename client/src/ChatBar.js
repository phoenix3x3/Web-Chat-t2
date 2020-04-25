import React from "react";
import { Form, Input, Container } from "reactstrap";
export default function BottomBar(props) {
  return (
    <Container style={{ display: "flex", marginTop: "25px" }}>
      <div style={{ overflowX: "auto" }}>
        <Input
          onChange={props.handleName}
          value={props.name}
          placeholder="Name"
          inputProps={{ "aria-label": "name" }}
        />
      </div>
      <div>
        <Form onSubmit={props.handleSubmit}>
          <Input
            onChange={props.handleContent}
            value={props.content}
            placeholder="Type your message..."
            inputProps={{ "aria-label": "content" }}
          />
        </Form>
      </div>
    </Container>
  );
}
