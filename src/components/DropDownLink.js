import { Link } from "react-router-dom";

const DropDownLink = ({ href, children, ...res }) => {
  return (
    <Link to={href} {...res}>
      {children}
    </Link>
  );
};

export default DropDownLink;
