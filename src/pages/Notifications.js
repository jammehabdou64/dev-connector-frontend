import Layout from "../components/Layout";
import Notification from "../components/Notification";
import Spinner from "../components/Spinner";
import { useEffect, useState } from "react";
import { getApi } from "../Api";
const Notifications = () => {
  const [isLoading, setLoading] = useState(true);
  const [notifications, setNotification] = useState({});
  useEffect(() => {
    try {
      const getNotification = async () => {
        const { data } = await getApi("/notifications");
        if (data.success) {
          setNotification(data.message);
          setLoading(false);
        }
      };
      getNotification();
    } catch (error) {
      setLoading(false);
    }
  }, []);
  return isLoading ? (
    <Spinner />
  ) : (
    <Layout>
      <div className="notifications px-[6.5px] xs:px-4 sm:px-8 md:px-0  lg:w-full flex-1 ">
        {notifications.map((notification, index) => (
          <Notification
            key={index}
            from={notification.from}
            seen={notification.seen}
            type={notification.type}
            createdAt={notification.createdAt}
            id={notification._id}
            post={notification.post}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Notifications;
