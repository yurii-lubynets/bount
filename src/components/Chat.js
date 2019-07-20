import React, { useEffect } from 'react';
import useLocalStorage from 'react-use-localstorage';
import useSocket from 'use-socket.io-client';
import { useImmer } from 'use-immer';
import { useOnlineStatus, useWindowSize } from '@withvoid/melting-pot';
import useClippy from 'use-clippy';
import './index.css';


const Messages = props => { 
  const [ clipboard, setClipboard ] = useClippy();

  return props.data.map(m => m[0] !== '' ? 
(<li><strong>{m[0]}</strong> :<a onClick={()=>{setClipboard(`${m[1]}`)}} href="#"><i style={{float:'right',color:'black'}} class=" material-icons">content_copy</i></a> <div className="innermsg">{m[1]}</div></li>) 
: (<li className="update">{m[1]}</li>) ); 
}

const Online = props => props.data.map(m => <li id={m[0]}>{m[1]}</li>)

const Chat = props => {
  const [room, setRoom] = useLocalStorage('room','');
  const [id, setId] = useLocalStorage('id', '');

  const [socket] = useSocket('https://test.com');

  const [messages, setMessages] = useImmer([]);

  const [onlineList, setOnline] = useImmer([]);

  const { online } = useOnlineStatus();
  const { width } = useWindowSize();

  useEffect(()=>{
    socket.connect();

    if(id){
      socket.emit('join',id,room);
    }

    socket.on('message que',(nick,message) => {
      setMessages(draft => {
        draft.push([nick,message])
      })
    });

    socket.on('update',message => setMessages(draft => {
      draft.push(['',message]);
    }))

    socket.on('people-list',people => {
      let newState = [];
      for(let person in people){
        newState.push([people[person].id,people[person].nick]);
      }
      setOnline(draft=>{draft.push(...newState)});
    });

    socket.on('add-person',(nick,id)=>{
      setOnline(draft => {
        draft.push([id,nick])
      })
    })

    socket.on('remove-person',id=>{
      setOnline(draft => draft.filter(m => m[0] !== id))
    })

    socket.on('chat message',(nick,message)=>{
      setMessages(draft => {draft.push([nick,message])})
    })
  },0);

  const handleSubmit = e => {
    e.preventDefault();
    const name = document.querySelector('#name').value.trim();
    const room_value = document.querySelector('#room').value.trim();

    if (!name) {
      return alert("Name can't be empty");
    }
    setId(name);
    setRoom(room_value);
    socket.emit("join", name, room_value);
  };

  const handleSend = e => {
    e.preventDefault();
    const input = document.querySelector('#m');
    if(input.value.trim() !== ''){
      socket.emit('chat message', input.value,room);
      input.value = '';
    }
  }

  const logOut = () => {
    socket.disconnect();
    setOnline(draft=>[]);
    setMessages(draft=>[]);
    setId('');
    socket.connect();
  }

  return id !== '' ? (
    <section className="chatSection" style={{display:'flex',flexDirection:'row'}} >
      <ul id="messages"><Messages data={messages} /></ul>
      <ul id="online"> <a onClick={()=>logOut()} href='#'><div style={{float:'right'}}></div></a> {online  ? 'You are Online' : 'You are Offline'} <hr/><Online data={onlineList} /> </ul>
      <div id="sendform">
        <form className="inputBar" onSubmit={e => handleSend(e)} style={{display: 'flex', paddingTop: '30px'}}>
            <input id="m" />
            {width > 1000 ? <button style={{width:'100px'}} type="submit">Send Message</button> :
          <button style={{width:'50px'}}><i style={{fontSize:'15px'}} class="material-icons">send</i></button>}
        </form>
      </div>
    </section>
  ) : (
    <div style={{ textAlign: 'left', margin: '30vh auto', width: '100%' }}>
        <form onSubmit={event => handleSubmit(event)}>
            <h2>Team chat</h2>
            <input style={{ fontSize: '16px', color: 'black' }} id="name" required placeholder="Your name" /><br />
            <input style={{ fontSize: '16px'}} id="room" placeholder="Room name" /><br />
            <button style={{ marginTop: '1%', fontSize: '16px', color: 'white', backgroundColor: '#0459FF', padding: '9px 20px', textAlign: 'center', textDecoration: 'none' }} type="submit">Start</button>
        </form>
    </div>
  );
};

export default Chat;