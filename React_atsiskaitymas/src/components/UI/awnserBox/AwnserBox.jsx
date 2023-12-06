const AwnserBox = ({ data }) => {
    return ( 
        <div>
            <p>{data.awnser}</p>
            <div>
                <span>{data.creatorUserName}</span>
                {
                    data.edited ? <span>Edited: {data.modified}</span> : <span style={{width: "75px"}}></span>
                }
            </div>
        </div>
     );
}
 
export default AwnserBox;