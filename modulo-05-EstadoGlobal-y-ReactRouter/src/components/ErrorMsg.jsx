import errorStyles from "../styles/ErrorMsg.module.css";

export function ErrorMsg({ mensajeDeError }) {
  const handleRefreshPage = () => {
    window.location.reload();
  };

  return (
    <div className={errorStyles.errorMsgContainer}>
      <div
        className={`${errorStyles.errorMsg_wrapper} ${errorStyles.errorMsg_red}`}
      >
        <div className={errorStyles.errorMsg_headerWrapper}>
          <div className={errorStyles.errorMsg_header}>
            <div className={errorStyles.errorMsg_sign}>
              <span></span>
            </div>
          </div>
        </div>
        <h1 className={errorStyles.errorMsg_title}>Whooops</h1>
        <p className={errorStyles.errorMsg_text}>{mensajeDeError}</p>

        {/*<button className={errorStyles.errorMsg_button}>Dismiss</button> */}
      </div>

      <button
        type="button"
        className={errorStyles.tryAgain_btn}
        onClick={handleRefreshPage}
      >
        Volver a intentar
      </button>
    </div>
  );
}
