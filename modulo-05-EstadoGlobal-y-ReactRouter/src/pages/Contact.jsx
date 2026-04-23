import { useContactForm } from "../hooks/useContactForm";

export default function Contact() {
  const {
    formData,
    showModal,
    progressBar,
    disableSubmitBtn,
    handleFormDataValues,
    handleSubmit,
  } = useContactForm();

  return (
    <>
      <main id="contact-main-container">
        <h1>¿Hablamos?</h1>
        <p>
          Estamos aquí para ayudarte a encontrar tu próximo paso en el mundo
          tech
        </p>

        <form
          onSubmit={handleSubmit}
          id="contact-form"
          className="form-to-reset"
        >
          <fieldset>
            <label id="name-label" htmlFor="firstname-input">
              {" "}
              First Name
              <input
                type="text"
                /* name={idFirstname} */
                id="firstname-input"
                placeholder="your first name here"
                required
                value={formData.firstname}
                onChange={(e) =>
                  handleFormDataValues("firstname", `${e.target.value}`)
                }
              />
            </label>

            <label id="surname-label" htmlFor="surname-input">
              {" "}
              Surname
              <input
                type="text"
                /* name={idSurname} */
                id="surname-input"
                placeholder="your surname here"
                required
                value={formData.surname}
                onChange={(e) =>
                  handleFormDataValues("surname", `${e.target.value}`)
                }
              />
            </label>

            <label id="email-label" htmlFor="email-input">
              {" "}
              Email
              <input
                /* name={idEmail} */
                type="email"
                id="email"
                placeholder="johndoe@email.com"
                required
                value={formData.email}
                onChange={(e) =>
                  handleFormDataValues("email", `${e.target.value}`)
                }
              />
            </label>

            <label id="phone-label" htmlFor="phone-input">
              {" "}
              Telefono
              <input
                type="number"
                /* name={idPhone} */
                id="phone-input"
                placeholder="+44 123 4567 8910"
                value={formData.phone}
                onChange={(e) =>
                  handleFormDataValues("phone", `${e.target.value}`)
                }
              />
            </label>
          </fieldset>

          <fieldset>
            <label id="textarea-label" htmlFor="help-comment">
              ¿Cómo podemos ayudarte?
              <textarea
                /* name={idComment} */
                id="help-comment"
                rows="10"
                cols="50"
                placeholder="Escribe tu comentario aquí..."
                maxLength="750"
                required
                value={formData.comment}
                onChange={(e) =>
                  handleFormDataValues("comment", `${e.target.value}`)
                }
              ></textarea>
            </label>
          </fieldset>
          {disableSubmitBtn ? (
            <button type="submit" disabled>
              ¡Mensaje Enviado!
            </button>
          ) : (
            <button type="submit">¡Enviar Mensaje!</button>
          )}
        </form>
      </main>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <header>
              <h1>¡Mensaje enviado con éxito! 🚀</h1>
              <p>
                No prometemos magia, pero sí leemos cada mensaje. Te
                responderemos lo antes posible.
              </p>
              <small>Aqui tienes las informaciones enviadas:</small>
            </header>
            <section>
              <p>
                <strong>Nombre:</strong> {formData.firstname} {formData.surname}
              </p>
              <p>
                <strong>Email:</strong> {formData.email}
              </p>
              <p>
                <strong>Telefono:</strong> {formData.phone}
              </p>
              <p>
                <strong>Comentario:</strong> {formData.comment}
              </p>
            </section>
            <footer>
              <small>
                Hecho por devs, para devs. Sin humo. Solo oportunidades reales.
              </small>
            </footer>
          </div>
          <div
            className="progress-bar"
            style={{ width: `${progressBar}%` }}
          ></div>
        </div>
      )}
    </>
  );
}
