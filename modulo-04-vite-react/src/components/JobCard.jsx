import { useState } from "react";

export function JobCard({ job }) {
  const { id, titulo, empresa, ubicacion, descripcion } = job;
  const [isApplied, setIsApplied] = useState(false);

  const handleApplyClick = () => {
    setIsApplied(true);
  };

  const buttonClasses = isApplied
    ? "button-apply-job is-applied"
    : "button-apply-job";
  const buttonText = isApplied ? "Aplicado" : "Aplicar";

  return (
    <article
      key={id}
      className="job-listing-card"
      data-modalidad={job.data.modalidad}
      data-nivel={job.data.nivel}
      data-technology={job.data.technology}
    >
      <div>
        <h3>{titulo}</h3>
        <small>
          {empresa} | {ubicacion}
        </small>
        <p>{descripcion}</p>
      </div>
      <button className={buttonClasses} onClick={handleApplyClick}>
        {buttonText}
      </button>
    </article>
  );
}
