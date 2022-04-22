const MonsterCards = (props) => {
    return (
        <div className="flex flex-wrap items-center justify-center self-center max-w-[78%]">
            {props.arrMonsterCards.map(element => (
                <div className="clsMonsterCard flex flex-col p-4 m-4 rounded-xl items-center justify-center gap-4">
                    <img className="flex" src={element.url} />
                    <div className="n1 flex">{element.value}</div>
                </div>
            ))}
        </div>
    );
};

export default MonsterCards;
