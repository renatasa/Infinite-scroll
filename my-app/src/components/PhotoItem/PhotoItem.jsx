import React from "react";

const photoItem = (props) => {
  const photoSrc = `https://live.staticflickr.com/${props.server}/${props.id}_${props.secret}_w.jpg`;
//   const photo = (
//     <img className='photoItem' src={photoSrc} alt={props.title} width="300" height="200"></img>
//   );
//   return <div className='photoItem'>{photo}</div>;

return <img className='photoItem' src={photoSrc} alt={props.title} width="300" height="200"></img>
};

export default photoItem;
