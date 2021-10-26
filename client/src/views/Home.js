import React, { useState, useEffect ,useRef} from 'react';
import { Button } from '@mui/material';
import io from 'socket.io-client';
import { TextField } from '@mui/material';
import { useHistory } from 'react-router-dom';



function Home() {
	const [state, setState] = useState({ message: '', name: '' });
	const [chat, setChat] = useState([]);
	let history = useHistory();
	const socketRef = useRef();

  useEffect(() => {
		socketRef.current = io.connect('http://localhost:5000');
		socketRef.current.on('message', ({ name, message }) => {
			setChat([...chat, { name, message }]);
		});
		return () => socketRef.current.disconnect();
	}, [chat]);
  
  const onTextChange = e =>{
    setState({...state, [e.target.name]: e.target.value})
  }

  const onMessageSubmit = (e) => {
		const { name, message } = state;
		socketRef.current.emit('message', { name, message });
		e.preventDefault();
		setState({ message: '', name });
	};

  const renderChat =()=>{
    return chat.map(({name,message}, index)=>(
      <div key={index}>
        <h3>{name}: <span>{message}</span></h3>
      </div>
    ))
  }



	const redirect = () => {
		localStorage.clear();
		history.push('/signup');
		history.go(0);
	};

	return (
		<div className='card' >
			<form onSubmit={onMessageSubmit}>
				<h1>Messanger</h1>
				<div className='name-feild'>
					<TextField
						name='name'
						onChange={(e) => onTextChange(e)}
						value={state.name}
						label='Name'
					/>
				</div>
				<div>
					<TextField
						name='message'
						onChange={(e) => onTextChange(e)}
						value={state.message}
						id='outlined-multiline-static'
						variant='outlined'
						label='Message'
					/>
				</div>
				<button style={{ background: '#E3963E', color: '#fff' }}>
					Send Message
				</button>
			</form>
			<div className='render-chat'>
				<h1>Chat Log</h1>
				{renderChat()}
			</div>

			<div className='centerize-col small-width'>
				<Button
					onClick={redirect}
					variant='contained'
					style={{ background: '#E3963E', color: '#fff' }}>
					Log Out
				</Button>
			</div>
		</div>
	);
}

export default Home;
