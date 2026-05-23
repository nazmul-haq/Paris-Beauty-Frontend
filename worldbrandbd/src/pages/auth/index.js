import Login from '@/components/Auth/Login';
import Register from '@/components/Auth/Register';
import { useStatus } from '@/context/contextStatus';
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

const Auth = () => {

  const {tabIndex,setTabIndex} = useStatus();


  return (
    <div className="min-h-screen bg-gray-100 pb-10 pt-[170px] flex items-center justify-center ">
      <div className=" bg-white w-[450px] xls:w-[400px] xms:w-[350px] xs:w-[300px] mx-auto rounded-md font-jost">
        {tabIndex == 0 ? (
          <div className="py-4 text-2xl text-center tracking-wide  font-bold capitalize  text-tahiti-500 mb-3 pl-3 relative">
            User registration
            <span className="absolute bottom-0 left-[120px] xls:left-[90px] xms:left-[70px] xs:left-[70px] w-[50%] xls:w-[60%] xms:w-[60%] xs:w-[60%] h-1 bg-black"></span>
          </div>
        ) : (
          <div className="py-4 text-2xl text-center tracking-wide font-bold capitalize text-tahiti-500 mb-3 pl-3 relative">
            Login
            <span className="absolute bottom-0 left-[160px] xls:left-[90px] xms:left-[70px] xs:left-[70px] xls:w-[60%] xms:w-[60%] xs:w-[60%] w-[30%] h-1 bg-black"></span>
          </div>
        )}

        <Tabs
          className="w-full"
          selectedIndex={tabIndex}
          onSelect={(index) => setTabIndex(index)}
        >
          <TabList className="py-2 px-10 grid grid-cols-2 w-full">
            <Tab selectedClassName="react-tabs__tab--selected">
              <span className="flex justify-center tracking-wide text-lg cursor-pointer dark:text-black">
                Register
              </span>
            </Tab>
            <Tab selectedClassName="react-tabs__tab--selected">
              <span className="flex justify-center tracking-wide text-lg cursor-pointer dark:text-black">
                Login
              </span>
            </Tab>
          </TabList>
          <div className="px-4">
            <TabPanel>
              <Register />
            </TabPanel>
            <TabPanel>
              <Login />
            </TabPanel>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

export default Auth