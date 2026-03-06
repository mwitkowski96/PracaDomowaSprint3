import { useWatch, useFormContext } from "react-hook-form";
import { Select } from "../Select/Select";
import { Input } from "../Input/Input";

import styles from "./ExperienceRow.module.css";

export const ExperienceRow = ({ index, remove }) => {
  const { control } = useFormContext();

  const selectedTech = useWatch({
    control,
    name: `experienceList.${index}.technology`,
  });

  return (
    <div className={styles.experienceRow}>
      <Select
        name={`experienceList.${index}.technology`}
        label="Technologia"
        options={["React", "Node.js", "HTML", "CSS", "Next.js", "Inne"]}
      />

      {selectedTech === "Inne" && (
        <Input
          name={`experienceList.${index}.otherTechnology`}
          label="Inna technologia"
          placeholder="Wpisz nazwę"
        />
      )}

      <Select
        name={`experienceList.${index}.level`}
        label="Lata doświadczenia"
        options={["1", "2", "3", "4", "5+"]}
      />

      <button type="button" onClick={() => remove(index)}>
        Usuń
      </button>
    </div>
  );
};
