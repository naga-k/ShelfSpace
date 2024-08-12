import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

type AuthTabsProps = {
  onChange: (index: number) => void;
  children: [React.ReactNode, React.ReactNode];
};

const AuthTabs: React.FC<AuthTabsProps> = ({ onChange, children }) => (
  <Tabs variant="enclosed" align="center" onChange={onChange}>
    <TabList mb={4}>
      <Tab>Login</Tab>
      <Tab>Sign Up</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>{children[0]}</TabPanel>
      <TabPanel>{children[1]}</TabPanel>
    </TabPanels>
  </Tabs>
);

export default AuthTabs;