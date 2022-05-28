import styles from "../styles/Profile.module.css";

const Profile = () => {
  return (
    <div className={styles.profile}>
      <div className={styles.profile_image}>
        <img src="/images/test.jpg"></img>
      </div>
      <div className={styles.table}>
        <div className={styles.tbody}>
          <div>name</div>
          <span>han</span>
        </div>
        <div className={styles.tbody}>
          <div>email</div>
          <span>a@a</span>
        </div>
        <div className={styles.tbody}>
          <div>time</div>
          <span>10:10</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
