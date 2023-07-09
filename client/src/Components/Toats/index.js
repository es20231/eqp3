import React, { useState, useEffect } from 'react';
import { ToastContainer, Toast,Button } from 'react-bootstrap';

const FloatingMessages = ({ mensagem, cor }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      // Remova a mensagem mais antiga após 3 segundos
      if (messages.length > 0) {
        setMessages((prevMessages) => prevMessages.slice(1));
      }
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, [messages]);

  const showMessage = (message, color) => {
    // Adicione uma nova mensagem à fila
    setMessages((prevMessages) => [...prevMessages, { message, color }]);
  };

  return (
    <div>
      <ToastContainer position="top-end" className="p-3">
        {messages.map((messageObj, index) => (
          <Toast key={index} onClose={() => setMessages((prevMessages) => prevMessages.filter((_, i) => i !== index))}>
            <Toast.Header>
              <strong className="mr-auto">Mensagem</strong>
            </Toast.Header>
            <Toast.Body style={{ backgroundColor: messageObj.color }}>{messageObj.message}</Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
      <Button onClick={() => showMessage(mensagem, cor)}>Mostrar mensagem</Button>
    </div>
  );
};

export default FloatingMessages;


// import React, { useState, useEffect } from 'react';
// import { ToastContainer, Toast ,Button} from 'react-bootstrap';

// const FloatingMessages = () => {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       // Remova a mensagem mais antiga após 3 segundos
//       if (messages.length > 0) {
//         setMessages((prevMessages) => prevMessages.slice(1));
//       }
//     }, 3000);

//     return () => {
//       clearInterval(timer);
//     };
//   }, [messages]);

//   const showMessage = (message) => {
//     // Adicione uma nova mensagem à fila
//     setMessages((prevMessages) => [...prevMessages, message]);
//   };

//   return (
//     <div>
//       <ToastContainer position="top-end" className="p-3">
//         {messages.map((message, index) => (
//           <Toast bg="danger" key={index}  onClose={() => setMessages((prevMessages) => prevMessages.filter((_, i) => i !== index))}>
//             <Toast.Header >
//               <strong className="mr-auto">Mensagem</strong>
//             </Toast.Header>
//             <Toast.Body >{message}</Toast.Body>
//           </Toast>
//         ))}
//       </ToastContainer>
//       <Button  onClick={() => showMessage('Nova mensagem')}>Mostrar a mensagem</Button>
//     </div>
//   );
// };

// export default FloatingMessages;



// import Toast from 'react-bootstrap/Toast';
// import ToastContainer from 'react-bootstrap/ToastContainer';

// function ToatsFlutuante() {
//   return (
//     <div
//       aria-live="polite"
//       aria-atomic="true"
//       className="bg-dark position-relative"
//       style={{ minHeight: '240px' }}
//     >
//       <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1 }}>
//         <Toast>
//           <Toast.Header>
//             <img
//               src="holder.js/20x20?text=%20"
//               className="rounded me-2"
//               alt=""
//             />
//             <strong className="me-auto">Bootstrap</strong>
//             <small className="text-muted">just now</small>
//           </Toast.Header>
//           <Toast.Body>See? Just like this.</Toast.Body>
//         </Toast>
//         <Toast>
//           <Toast.Header>
//             <img
//               src="holder.js/20x20?text=%20"
//               className="rounded me-2"
//               alt=""
//             />
//             <strong className="me-auto">Bootstrap</strong>
//             <small className="text-muted">2 seconds ago</small>
//           </Toast.Header>
//           <Toast.Body>Heads up, toasts will stack automatically</Toast.Body>
//         </Toast>
//       </ToastContainer>
//     </div>
//   );
// }

// export default ToatsFlutuante;

