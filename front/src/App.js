import React, { useState, useEffect } from 'react';
import { Container, Jumbotron, Row, Col, Alert, Button } from 'reactstrap';
import axios from 'axios';
import Post from './Post'

import './App.css';

import config from './config';

function App() {
  const [alertStyle] = useState('info');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertDismissable] = useState(false);
  const [idToken, setIdToken] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getIdToken();
    if (idToken.length > 0) {
      getAllPosts();
      const interval = setInterval(() => {
        getAllPosts();
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [idToken]);

  axios.interceptors.response.use(response => {
    console.log('Response was received');
    return response;
  }, error => {
    window.location.href = config.redirect_url;
    return Promise.reject(error);
  });

  function onDismiss() {
    setAlertVisible(false);
  }

  const clearCredentials = () => {
    window.location.href = config.redirect_url;
  }

  const getIdToken = () => {
    const hash = window.location.hash.substr(1);
    const objects = hash.split("&");
    objects.forEach(object => {
      const keyVal = object.split("=");
      if (keyVal[0] === "id_token") {
        setIdToken(keyVal[1]);
      }
    });
  };

  const getAllPosts = async () => {
    const result = await axios({
      url: `${config.api_base_url}/post/`,
      headers: {
        Authorization: idToken
      }
    }).catch(error => {
      console.log(error);
    });

    if (result && result.status === 401) {
      clearCredentials();
    } else if (result && result.status === 200) {
      console.log(result.data.Items);
      setPosts(result.data.Items);
    }
  };

  const addPosts = async (_) => {
    const newPostInput = document.getElementById('newPost');
    const item = newPostInput.value;
    console.log(item);
    if (!item || item === '') return;

    const newPost = {
      content: item,
    };

    const result = await axios({
      method: 'POST',
      url: `${config.api_base_url}/post/`,
      headers: {
        Authorization: idToken
      },
      data: newPost
    });

    if (result && result.status === 401) {
      clearCredentials();
    } else if (result && result.status === 201) {
      getAllPosts();
      newPostInput.value = '';
    }
  }

  return (
      <div className="App">
        <Container>
          <Alert color={alertStyle} isOpen={alertVisible} toggle={alertDismissable ? onDismiss : null}>
          </Alert>
          <Jumbotron>
            <Row>
              <Col md="6">
                {idToken.length > 0 ?
                    (
                        <Post posts={posts} addPosts={addPosts}/>
                    ) : (
                        <Button
                            href={`https://${config.cognito_hosted_domain}/login?response_type=token&client_id=${config.aws_user_pools_web_client_id}&redirect_uri=${config.redirect_url}`}
                            color="primary"
                            className="mt-5 float-center"
                        >
                          Log In
                        </Button>
                    )
                }
              </Col>
            </Row>
          </Jumbotron>
        </Container>
      </div >
  );
}

export default App;