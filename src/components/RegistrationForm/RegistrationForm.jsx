import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema } from "../../schemas/schemas";
import { Input } from "../Input/Input";
import { Radio } from "../Radio/Radio";
import { FileUpload } from "../FileUpload/FileUpload";
import { CheckboxGroup } from "../CheckboxGroup/CheckboxGroup";
import { FormSection } from "../FormSection/FormSection";
import { ExperienceSection } from "../ExperienceSection/ExperienceSection";

import styles from "./RegistrationForm.module.css";

export const RegistrationForm = () => {
  const methods = useForm({
    resolver: zodResolver(UserSchema),
    mode: "onChange",
    defaultValues: {
      phone: "",
      name: "",
      lastName: "",
      email: "",
      studyForm: "Online",
      technologies: [],
      fileUpload: null,
      hasExperience: false,
      experienceList: [],
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data) => {
    console.log("Dane wysłane pomyślnie:", data);
    alert("Formularz wysłany!");
  };

  return (
    <FormProvider {...methods}>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <FormSection title="Dane osobowe">
          <Input name="name" label="Imię" placeholder="Imię" />
          <Input name="lastName" label="Nazwisko" placeholder="Nazwisko" />
          <Input name="email" label="Email" type="email" placeholder="Email" />
          <Input name="phone" label="Telefon" placeholder="Telefon" />
        </FormSection>

        <FormSection title="Preferencje kursu">
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
        </FormSection>

        <FormSection title="Twoje CV">
          <FileUpload
            name="fileUpload"
            label="Załącz CV (PDF, JPG, PNG - max 5MB)"
          />
        </FormSection>

        <ExperienceSection />

        <button
          type="submit"
          className={styles.btnSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Wysyłanie..." : "Wyślij zgłoszenie"}
        </button>
      </form>
    </FormProvider>
  );
};
