import { Link } from "react-router-dom";

type Props = {
  to: string;
  bg: string;
  text: string;
  textColor: string;
  onClick?: () => Promise<void>;
};

const NavigationLink = (props: Props) => {
  return (
    <div>
      <Link
        className="nav-link"
        to={props.to}
        style={{ backgroundColor: props.bg, color: props.textColor }}
      >
        {props.text}
      </Link>
    </div>
  );
};

export default NavigationLink;
