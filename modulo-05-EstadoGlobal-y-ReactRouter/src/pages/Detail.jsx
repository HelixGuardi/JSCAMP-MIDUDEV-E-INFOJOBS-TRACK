import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "../components/Link";
import { LoadingSpinner } from "../components/LoadingSpinner";
import snarkdown from "snarkdown";
import styles from "../styles/Detail.module.css";
import { useAuthStore } from "../store/authStore";
import { useFavoritesStore } from "../store/favoritesStore";

function JobSection({ title, content }) {
  const html = snarkdown(content);

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>

      <div
        className={`${styles.sectionContent} prose`}
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </section>
  );
}

function DetailPageBreadCrumb({ job }) {
  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumb}>
        <Link to="/search" className={styles.breadcrumbButton}>
          Empleos
        </Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <span className={styles.breadcrumbCurrent}>{job.titulo}</span>
      </nav>
    </div>
  );
}

function DetailPageHeader({ job }) {
  return (
    <>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>{job.titulo}</h1>
          <p className={styles.meta}>
            {job.empresa} · {job.ubicacion}
          </p>
        </div>
      </header>

      <DetailApplyButton />
      <DetailFavoriteButton jobId={job.id} />
    </>
  );
}

function DetailApplyButton() {
  const { isLoggedIn } = useAuthStore();

  return (
    <button disabled={!isLoggedIn} className={styles.applyButton}>
      {isLoggedIn ? "Aplicar ahora" : "Inicia sesión para aplicar"}
    </button>
  );
}

function DetailFavoriteButton({ jobId }) {
  const { isLoggedIn } = useAuthStore();
  const { isFavorite, toggleFavorite } = useFavoritesStore();

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

export default function JobDetail() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://jscamp-api.vercel.app/api/jobs/${jobId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Job Not Found");
        }

        return res.json();
      })
      .then((json) => {
        setJob(json);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [jobId]);

  if (loading) {
    return (
      <div
        style={{
          height: "85dvh",
          padding: "10px 0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "3px",
        }}
      >
        <LoadingSpinner />
        <p>Cargando oferta...</p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className={styles.notFound}>
        <h1>Oferta no encontrada</h1>
        <p>Puede que esta oferta haya caducado o que la URL no sea correcta.</p>
        <button className={styles.backButton} onClick={() => navigate("/jobs")}>
          Volver a la lista de empleos
        </button>
      </div>
    );
  }

  return (
    <div className={styles.detailsFatherContainer}>
      <DetailPageBreadCrumb job={job} />

      <section className={styles.contentDetailsContainer}>
        <DetailPageHeader job={job} />

        <JobSection
          title="Descripción del puesto"
          content={job.content.description}
        />
        <JobSection
          title="Responsabilidades"
          content={job.content.responsibilities}
        />
        <JobSection title="Requisitos" content={job.content.requirements} />
        <JobSection title="Acerca de la empresa" content={job.content.about} />
      </section>
    </div>
  );
}
