import { Button } from "../Button/Button";
import styles from "./Modal.module.css";

export const Modal = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>Zgłoszenie przyjęte!</h2>

        <div className={styles.content}>
          <p>
            <strong>Imię i nazwisko:</strong> {data.name} {data.lastName}
          </p>
          <p>
            <strong>Email:</strong> {data.email}
          </p>
          <p>
            <strong>Telefon:</strong> {data.phone}
          </p>
          <p>
            <strong>Forma nauki:</strong> {data.studyForm}
          </p>
          <p>
            <strong>Technologie:</strong> {data.technologies.join(", ")}
          </p>
          <p>
            <strong>Plik CV:</strong> {data.fileUpload?.name}
          </p>

          {data.hasExperience && data.experienceList?.length > 0 && (
            <>
              <p>
                <strong>Doświadczenie:</strong>
              </p>
              <ul>
                {data.experienceList.map((exp, index) => (
                  <li key={index}>
                    {exp.technology} (Poziom: {exp.level})
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <Button onClick={onClose} variant="primary">
          Zamknij
        </Button>
      </div>
    </div>
  );
};
