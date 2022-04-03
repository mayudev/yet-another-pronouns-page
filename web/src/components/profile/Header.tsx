type Props = {
  avatar?: string;
  username: string;
};

function Header(props: Props) {
  return (
    <div className="profile__header">
      <span className="header__username">{props.username}</span>
    </div>
  );
}

export default Header;
