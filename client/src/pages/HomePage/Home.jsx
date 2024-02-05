import { useEffect, useState } from "react";
import AdminAnnouncement from "../../components/HomeCompo/Announcement/AdminAnnouncement";

import Categories from "../../components/HomeCompo/Categories/Categories";
import Products from "../../components/HomeCompo/Products/Products";
import Slider from "../../components/HomeCompo/Slider/Slider";
import { useSelector } from "react-redux";
import { HeadingDiv } from "./home.styled";

const Home = () => {
  const [isOpen, setOpen] = useState(true);
  const isUser = useSelector((state) => state?.user?.isAuthenticated);
  const user = useSelector((state) => state?.user?.currentUser);

  const closeAnnouncements = () => {
    setOpen(false);
  };

  useEffect(() => {
    !isUser && setOpen(true);
  }, [isUser]);

  return (
    <div>
      {!user?.isAdmin && isOpen && (
        <AdminAnnouncement onClose={closeAnnouncements} />
      )}
      <Slider />
      <Categories />
      <HeadingDiv>
        <p>Shop now</p>
        <h1>Our Exclusive Collections</h1>
      </HeadingDiv>
      <Products isWishlist={false} />
    </div>
  );
};

export default Home;
