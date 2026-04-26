import { useState } from "react";
import { Link } from "./Link";
import styles from "../styles/JobCard.module.css";
import { useFavoritesStore } from "../store/favoritesStore";
import { useAuthStore } from "../store/authStore";

function JobCardFavoriteButton({ jobId }) {
  const { isLoggedIn } = useAuthStore();

  //suscribete a TODA la store y extrae TODA la store
  const store = useFavoritesStore();
  const { toggleFavorite, isFavorite } = store;

  return (
    <button
      disabled={!isLoggedIn}
      aria-label={
        isFavorite(jobId) ? "Remove from favorites" : "Add to favorites"
      }
      onClick={() => toggleFavorite(jobId)}
    >
      {isFavorite(jobId) ? "❤️" : "🩶"}
    </button>
  );
}

function JobCardApplyButton({ jobId }) {
  // lógica del botón de aplicar
  const [isApplied, setIsApplied] = useState(false);
  const { isLoggedIn } = useAuthStore();

  const buttonClasses = isApplied
    ? "button-apply-job is-applied"
    : "button-apply-job";
  const buttonText = isApplied ? "Aplicado" : "Aplicar";

  const handleApplyClick = () => {
    setIsApplied(true);
  };

  return (
    <button
      disabled={!isLoggedIn}
      className={buttonClasses}
      onClick={handleApplyClick}
    >
      {buttonText}
    </button>
  );
}

export function JobCard({ job }) {
  const { id, titulo, empresa, ubicacion, descripcion } = job;

  return (
    <article
      key={id}
      className="job-listing-card"
      data-modalidad={job.data.modalidad}
      data-nivel={job.data.nivel}
      data-technology={job.data.technology}
    >
      <div>
        <h3>
          <Link className={styles.title} href={`/jobs/${id}`}>
            {titulo}
          </Link>
        </h3>
        <small>
          {empresa} | {ubicacion}
        </small>
        <p>{descripcion}</p>
      </div>
      <div className={styles.actions}>
        <Link href={`/jobs/${id}`} className={styles.details}>
          Ver detalles
        </Link>
        <JobCardApplyButton jobId={id} />
        <JobCardFavoriteButton jobId={id} />
      </div>
    </article>
  );
}
