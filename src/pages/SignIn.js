import React, { useCallback, useContext, useState } from 'react';
import Form from '../components/Form';
import app from '../firebase';
import { AuthContext } from '../Auth';
import { ScaleFade } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/toast';
import { Redirect, withRouter } from 'react-router-dom';
import { handleValidation } from '../components/Validate';
import Loading from '../components/Loading';

function Signin({ history }) {
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const content = {
        title: 'Sign in',
        subtit: 'Share your files with an ease ✌️',
        button: 'Sign in',
        linkContent: 'Dont have an',
        link: 'account',
        to: '/signup',
    };

    const onSubmitHandler = useCallback(
        async value => {
            if (handleValidation(value) !== true) {
                let error = handleValidation(value);
                toast({
                    title: error.error,
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                });
            } else {
                setLoading(true);
                await app
                    .auth()
                    .signInWithEmailAndPassword(value.email, value.password)
                    .then(() => {
                        setLoading(false);
                        history.push('/');
                        toast({
                            title: 'You are logged in!',
                            status: 'success',
                            duration: 2000,
                            isClosable: true,
                        });
                    })
                    .catch(err => {
                        setLoading(false);
                        toast({
                            title: err.message,
                            status: 'error',
                            duration: 2000,
                            isClosable: true,
                        });
                        value = null;
                    });
            }
        },
        [history, toast]
    );

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/" />;
    }
    if (loading) {
        return <Loading />;
    }
    return (
        <ScaleFade initialScale={0.6} in={true}>
            <Form content={content} onSubmitHandler={onSubmitHandler} />
        </ScaleFade>
    );
}
export default withRouter(Signin);
