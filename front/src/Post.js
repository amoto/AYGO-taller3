import React from 'react';
import { Button, Form, FormGroup, Input, Label, Row, Col } from 'reactstrap';

import './Post.css';

function Post({ posts, addPosts}) {

    return (
        <div className="Post">
            <Row>
                <Col xs="12" className="mt-1 mb-1">
                    <Form inline>
                        <FormGroup>
                            <Label for="newPost" hidden>Post</Label>
                            <Input type="text" name="post" id="newPost" placeholder="new item" />
                        </FormGroup>
                        <Button onClick={addPosts} color="primary" className="ml-1">Add</Button>
                    </Form>
                </Col>
                <Col xs="12" className="mt-1 mb-1">
                    <ul className="list-group">
                        {posts.map((item, _) => (
                            <li className="list-group-item" key={item.id}>
                                <Row>
                                    <Col xs="7" sm="8" className={'completed'}>
                                        {item.content}
                                    </Col>
                                </Row>
                            </li>
                        ))}
                    </ul>
                </Col>
            </Row>
        </div >
    );
}

export default Post;