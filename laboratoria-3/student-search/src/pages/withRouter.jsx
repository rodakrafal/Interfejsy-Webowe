import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import GroupAdd from './add-group';


function WithRouter(props)  {
  
    const navigate = useNavigate();

    return (
      <GroupAdd
        navigate={navigate}
        groups={props.groups}
        />
    );
  
};


export default WithRouter;