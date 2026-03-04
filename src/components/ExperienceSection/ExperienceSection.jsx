import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { FormSection } from "../FormSection/FormSection";
import { Checkbox } from "../Checkbox/Checkbox";
import { ExperienceRow } from "../ExperienceRow/ExperienceRow";
import styles from "./ExperienceSection.module.css";

export const ExperienceSection = () => {
  const { control } = useFormContext();

  const hasExperience = useWatch({ control, name: "hasExperience" });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experienceList",
  });

  return (
    <FormSection title="Doświadczenie">
      <Checkbox name="hasExperience" label="Czy masz doświadczenie zawodowe?" />

      {hasExperience && (
        <div className={styles.experienceContainer}>
          <button
            type="button"
            className={styles.btnAdd}
            onClick={() => append({ technology: "", level: "1" })}
          >
            + Dodaj technologię
          </button>

          {fields.map((field, index) => (
            <ExperienceRow key={field.id} index={index} remove={remove} />
          ))}
        </div>
      )}
    </FormSection>
  );
};
