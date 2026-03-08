import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema } from "../../schemas/schemas";
import { Input } from "../Input/Input";
import { Radio } from "../Radio/Radio";
import { FileUpload } from "../FileUpload/FileUpload";
import { CheckboxGroup } from "../CheckboxGroup/CheckboxGroup";
import { FormSection } from "../FormSection/FormSection";
import { ExperienceSection } from "../ExperienceSection/ExperienceSection";
import { Button } from "../UI/Button/Button";
import { Modal } from "../UI/Modal/Modal";

import styles from "./RegistrationForm.module.css";

export const RegistrationForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

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
    setSubmittedData(data);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.formTitle}>Formularz Rejestracyjny</h1>

        <FormSection title="Dane osobowe">
          <div className={styles.row}>
            <Input
              name="name"
              label="Imię"
              placeholder="Imię"
              labelSrOnly
              autoComplete="given-name"
            />
            <Input
              name="lastName"
              label="Nazwisko"
              placeholder="Nazwisko"
              labelSrOnly
              autoComplete="family-name"
            />
          </div>
          <div className={styles.row}>
            <Input
              name="email"
              label="Email"
              type="email"
              placeholder="Email"
              labelSrOnly
              autoComplete="email"
            />
            <Input
              name="phone"
              label="Telefon"
              placeholder="Telefon"
              labelSrOnly
              autoComplete="tel"
            />
          </div>
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
            label="Załącz CV (JPG, PNG - max 5MB)"
          />
        </FormSection>

        <ExperienceSection />

        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className={styles.submitButton}
        >
          {isSubmitting ? "Wysyłanie..." : "Wyślij zgłoszenie"}
        </Button>
      </form>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        data={submittedData}
      />
    </FormProvider>
  );
};
