
import { Link } from 'react-router-dom';

import IconBase from './IconBase';
import AddIcon from '@mui/icons-material/Add';

export default function GoToFormButton(
  props: {
    link: string
  }
) {
  return (
    <Link to={props.link}>
      <IconBase>
        <AddIcon />
      </IconBase>
    </Link>
  );
};