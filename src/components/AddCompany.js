import React from "react";
import { useState } from "react";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

export default function AddCompany({ toggle, toggleUpdate }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");

  function handleName(e) {
    setName(e.target.value);
  }
  function handleLocation(e) {
    setLocation(e.target.value);
  }
  function handleEmail(e) {
    setEmail(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      name,
      location,
      email,
    };
    setName("");
    setLocation("");
    setEmail("");
    toggleUpdate();
    toggle();
    await axios.post("/company", data);
  }

  return (
    <div>
      <Form>
        <FormGroup>
          <Label for="name">Company Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            value={name || ""}
            onChange={handleName}
            placeholder="Enter company name"
          />
        </FormGroup>
        <FormGroup>
          <Label for="location">Location</Label>
          <Input
            type="text"
            name="location"
            id="location"
            value={location || ""}
            onChange={handleLocation}
            placeholder="Enter location"
          />
        </FormGroup>
        <FormGroup style={{ marginBottom: "1rem" }}>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            value={email || ""}
            onChange={handleEmail}
            placeholder="Enter email address"
          />
        </FormGroup>
      </Form>
      <Button onClick={handleSubmit} disabled={name ? false : true}>
        Submit
      </Button>
    </div>
  );
}
