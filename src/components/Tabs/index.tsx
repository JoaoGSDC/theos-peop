import TabsMUI from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { TabsHeaderContainer } from './styles';

interface IProps {
  tabs: string[];
  value: number;
  setValue: any;
}

function Tabs({ tabs, value, setValue }: IProps) {
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <>
      <TabsHeaderContainer>
        <TabsMUI value={value} onChange={handleChange} aria-label="tabs">
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab} {...a11yProps(index)} />
          ))}
        </TabsMUI>
      </TabsHeaderContainer>
    </>
  );
}

export default Tabs;
