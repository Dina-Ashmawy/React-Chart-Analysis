import classes from './header.module.css';

const Header = (): JSX.Element => {
  return (
    <div className={classes.headerContainer}>
      <h1 className={classes.title}>Analysis Chart</h1>
      <h3 className={classes.subTitle}>Number of lessons</h3>
    </div>
  );
};

export default Header;
