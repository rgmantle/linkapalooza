import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";


import { Card, CardBody, CardTitle, Button } from "reactstrap";

import { getTags } from "../api";
const Tags = (props) => {
  const { tags, setTags } = props;
  const history = useHistory();

  useEffect(() => {
    Promise.all([getTags()])
      .then(([tags]) => {
        setTags(tags);
      })
      .catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Tags">
      <h1 className="display-3">Tags</h1>
      <Button
        color="primary"
        onClick={() => {
          history.push("/newtag");
        }}
        style={{ margin: "1rem" }}
      >
        New Tag
      </Button>
      {tags.map((tag) => {
        return (
          <Card style={{ margin: "2rem" }} key={tag.tag}>
            <CardBody>
              <CardTitle>Name: {tag.tag}</CardTitle>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
};

export default Tags;