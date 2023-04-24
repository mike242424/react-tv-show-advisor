import style from "./style.module.css";

const Logo = ({ title, subtitle, img }) => {
  return (
    <div>
      <div className={style.container}>
        <img className={style.image} src={img} alt="Logo" />
        <div className={style.title}>{title}</div>
      </div>
      <div className={style.subtitle}>{subtitle}</div>
    </div>
  );
};

export default Logo;
