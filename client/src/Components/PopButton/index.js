import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import AvatarName from '../AvatarName';

import { PopoverBody, PopoverHeader } from 'react-bootstrap';

// ... (importações e código anterior)

function PopButton(props) {
  return (
    <>
      <OverlayTrigger
        trigger="click"
        key="right"
        placement="right"
        overlay={
          <Popover data-bs-theme="dark" id={`popover-positioned-"right"`}>
            <PopoverHeader style={{ background: '#000' }}  > Users </PopoverHeader>
            <PopoverBody style={{ background: '#222' , color: '#fff',maxHeight:'160px',overflow:"auto" }} >
              
              {props.data.map((likeUsers) => (
                <AvatarName tam={25} tamFont={14} key={likeUsers.id} data={likeUsers} />
              ))}
            </PopoverBody>
          </Popover>
        }
      >
        <Button variant="secondary">{props.data.length}</Button>
      </OverlayTrigger>
    </>
  );
}

export default PopButton;

// function PopButton(props) {

//   /* 
//   List_Like
//   */
//   return (
//     <>

//       <OverlayTrigger
//         trigger="click"
//         key="right"
//         placement="right"
//         overlay={
//           <Popover
//             id={`popover-positioned-"right"`}
//             className="meu-popover">  {/*id do post*/}
//             <PopoverHeader>Título do popover</PopoverHeader>
//             <PopoverBody>

//               <p>Likes</p>
//               {
//                 props.data.map((likeUsers) => {
//                   <AvatarName key={likeUsers.id} data={likeUsers} />
//                 })
//               }</PopoverBody>

//           </Popover>
//         }>
//         <Button variant="secondary" className="PopButton" >{props.data.length}</Button>
//       </OverlayTrigger>

//     </>
//   );
// }

// export default PopButton;