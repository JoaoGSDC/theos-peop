import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import PersonIcon from '@mui/icons-material/Person';
import Divider from '@mui/material/Divider';
import { Avatar, ListContainer, ListItem, styles } from './styles';
import { ITopicListItem } from '../../interfaces/ITopicListItem';
import Link from 'next/link';

interface IProps {
  data: ITopicListItem[];
}

function TopicsList({ data }: IProps) {
  return (
    <>
      <ListContainer sx={styles.sx}>
        {data.map((value: ITopicListItem, index: number) => {
          return (
            <>
              <Link href={value.route}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={value.title} secondary={value.subtitle} />
                </ListItem>
              </Link>

              {data.length < index ? <Divider variant="inset" component="li" /> : null}
            </>
          );
        })}
      </ListContainer>
    </>
  );
}

export default TopicsList;
