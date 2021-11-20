import React, { useState } from 'react';
import { Button, ButtonGroup, Form, FormGroup, Input, Label, Row, Col } from 'reactstrap';

import './Post.css';

function Post({ posts, addPosts, deletePost, completePost }) {
    const [filter, setFilter] = useState('all');

    const changeFilter = (newFilter) => {
        setFilter(newFilter);
    };

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
                    <ButtonGroup>
                        <Button onClick={(e) => changeFilter('all')} color={(filter === 'all') ? 'primary' : 'secondary'}>All</Button>
                        <Button onClick={(e) => changeFilter('complete')} color={(filter === 'complete') ? 'primary' : 'secondary'}>Complete</Button>
                        <Button onClick={(e) => changeFilter('incomplete')} color={(filter === 'incomplete') ? 'primary' : 'secondary'}>Incomplete</Button>
                    </ButtonGroup>
                </Col>
                <Col xs="12" className="mt-1 mb-1">
                    <ul className="list-group">
                        {posts.filter(item => ((filter === 'all') || (filter === 'complete' && item.completed) || (filter === 'incomplete' && !item.completed))).map((item, index) => (
                            <li className="list-group-item" key={item.id}>
                                <Row>
                                    <Col xs="7" sm="8" className={item.completed ? 'completed' : ''}>
                                        {item.item}
                                    </Col>
                                    <Col xs="5" sm="4">
                                        <Button data-index={index} data-item-id={item.id} onClick={(e) => deletePost(index, item.id)} color="danger" size="sm" className="float-right postButton" title="Delete Post">
                                            <span className="oi oi-delete"></span>
                                        </Button>
                                        <Button data-index={index} data-item-id={item.id} onClick={(e) => completePost(item.id)} outline={!item.completed} disabled={item.completed} color="success" size="sm" className="float-right postButton" title="Complete Post">
                                            <span className="oi oi-check"></span>
                                        </Button>
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