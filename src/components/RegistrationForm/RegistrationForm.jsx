import {
  useFieldArray,
  useForm,
  useWatch,
  FormProvider,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema } from "../../schemas/schemas";
import { Input } from "../Input/Input";
import { Checkbox } from "../Checkbox/Checkbox";
import { Radio } from "../Radio/Radio";
import { FileUpload } from "../FileUpload/FileUpload";
import { CheckboxGroup } from "../CheckboxGroup/CheckboxGroup";
import { ExperienceRow } from "../ExperienceRow/ExperienceRow";

import styles from "./RegistrationForm.module.css";

export const RegistrationForm = () => {
  const methods = useForm({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      phone: "",
      name: "",
      lastName: "",
      email: "",
      studyForm: "online",
      technologies: [],
      fileUpload: null,
      hasExperience: false,
      experienceList: [],
    },
  });

  const { control, handleSubmit } = methods;

  const hasExperience = useWatch({ control, name: "hasExperience" });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experienceList",
  });

  const onSubmit = (data) => console.log("Dane:", data);

  return (
    <FormProvider {...methods}>
      <div className={styles.formWrapper}>
        <form
          className={styles.formContainer}
          onSubmit={handleSubmit(onSubmit)}
        >
          <section className={`${styles.section} ${styles.personalData}`}>
            <h2 className={styles.sectionTitle}>Dane osobowe</h2>
            <div className={styles.personalDataInputsContainer}>
              <Input name="name" label="Imię" placeholder="Imię" />
              <Input name="lastName" label="Nazwisko" placeholder="Nazwisko" />
              <Input
                name="email"
                label="Email"
                type="email"
                placeholder="Email"
              />
              <Input name="phone" label="Telefon" placeholder="Telefon" />
            </div>
          </section>

          <section className={`${styles.section} ${styles.preferences}`}>
            <h2 className={styles.sectionTitle}>Preferencje kursu</h2>
            <Radio
              name="studyForm"
              label="Wybierz formę nauki"
              options={[
                { value: "Stacjonarna", label: "Stacjonarna" },
                { value: "Online", label: "Online" },
              ]}
            />
            <CheckboxGroup
              name="technologies"
              label="Technologie"
              options={["React", "Node.js", "HTML", "CSS", "Next.js"]}
            />
          </section>

          <section className={`${styles.section} ${styles.fileUpload}`}>
            <h2 className={styles.sectionTitle}>Twoje CV</h2>
            <FileUpload name="fileUpload" label="Załącz CV" />
          </section>

          <section className={`${styles.section} ${styles.experience}`}>
            <h2 className={styles.sectionTitle}>Doświadczenie</h2>
            <Checkbox
              name="hasExperience"
              label="Czy masz doświadczenie zawodowe?"
            />

            {hasExperience && (
              <div className={styles.experienceContainer}>
                <button
                  type="button"
                  className={styles.btnAdd}
                  onClick={() => append({ technology: "", level: 1 })}
                >
                  + Dodaj technologię
                </button>

                {fields.map((field, index) => (
                  <ExperienceRow key={field.id} index={index} remove={remove} />
                ))}
              </div>
            )}
          </section>

          <button type="submit" className={styles.btnSubmit}>
            Wyślij zgłoszenie
          </button>
        </form>
      </div>
    </FormProvider>
  );
};
