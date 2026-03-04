import {
  useFieldArray,
  useForm,
  useWatch,
  Form,
  FormProvider,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema } from "../../schemas/schemas";
import { Input } from "../Input/Input";
import { Checkbox } from "../Checkbox/Checkbox";
import { Radio } from "../Radio/Radio";
import { FileUpload } from "../FileUpload/FileUpload";
import { CheckboxGroup } from "../CheckboxGroup/CheckboxGroup";
import { Select } from "../Select/Select";
import { ExperienceRow } from "../ExperienceRow/ExperienceRow";

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

  const hasExperience = useWatch({
    control,
    name: "hasExperience",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experienceList",
  });

  const onSubmit = (data) => {
    console.log("Dane z formularza:", data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="personalData">
          <h2>Dane osobowe</h2>
          <Input name="name" label="Imię" />
          <Input name="lastName" label="Nazwisko"></Input>
          <Input name="email" label="Email" type="email"></Input>
          <Input name="phone" label="Telefon"></Input>
        </section>
        <section className="preferences">
          <h2>Preferencej kursu</h2>
          <Radio
            name="studyForm"
            label="Wybierz formę nauki:"
            options={[
              { value: "Stacjonarna", label: "Stacjonarna" },
              { value: "Online", label: "Online" },
            ]}
          />
          <CheckboxGroup
            name="technologies"
            label=""
            options={["React", "Node.js", "HTML", "CSS", "Next.js"]}
          />
        </section>
        <section className="fileUpload">
          <h2>Dodaj swoje CV</h2>

          <FileUpload name="fileUpload" label="Załącz CV" />
        </section>
        <section className="experience">
          <h2>Doświadczenie w programowaniu</h2>
          <Checkbox
            name="hasExperience"
            label="Czy masz doświadczenie zawodowe?"
          />
          {hasExperience && (
            <div className="experience-container">
              {/* Przycisk dodawania na górze - tak jak na screenie! */}
              <button
                type="button"
                className="btn-add"
                onClick={() => append({ technology: "", level: "" })}
              >
                Dodaj doświadczenie
              </button>

              {fields.map((field, index) => (
                <ExperienceRow key={field.id} index={index} remove={remove} />
              ))}
            </div>
          )}
        </section>

        <button type="submit">Wyślij zgłoszenie</button>
      </form>
    </FormProvider>
  );
};
