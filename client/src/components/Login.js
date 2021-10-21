import React, { useRef } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

export default function Login() {
	const idRef = useRef();

	return (
		<div>
			<Container
				className='align-items-center d-flex'
				style={{ height: '50vh' }}>
				<Form className='w-50'>
					<Form.Group>
						<Form.Label>Enter Your Username</Form.Label>
						<Form.Control type='text' ref={idRef}></Form.Control>
					</Form.Group>
					<Form.Group>
						<Form.Label>Enter Your Password</Form.Label>
						<Form.Control type='text' ref={idRef}></Form.Control>
					</Form.Group>
					<Button type='submit' className="mr-2">Login</Button>
					<Button variant='secondary'>Create new Account</Button>
				</Form>
			</Container>
		</div>
	);
}
