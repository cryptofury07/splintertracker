
const DetailCard = (props) => {
  return (
    <div className="clsCard flex flex-col min-w-[100px] h-28 p-4 m-4 rounded-xl items-center justify-center">
     <div className="h3 flex">{props.name}
     </div>
     <div className="s1 flex">{props.value}
     </div>
    </div>
  );
};

export default DetailCard;
