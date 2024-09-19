import { useTranslation } from "react-i18next";
import ClientHeader from "../../components/ClientHeader";
import styles from "./styles.module.scss";
import Button from "../../components/Button";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import ExperienceCard from "../../components/ExperienceCard";
import EducationCard from "../../components/EducationCard";
import SkillCard from "../../components/SkillCard";
import Carousel from "../../components/Carousel";
import * as data from "../../utils/data";
import ProjectCard from "../../components/ProjectCard";
import ContactForm from "../../components/ContactForm";

const Client = () => {
  const { t } = useTranslation();

  return (
    <>
      <ClientHeader />
      <main>
        <section id="#" className={styles["hero-section"]}>
          <div className="container">
            <div className="row gy-5">
              <div className="col-md-6">
                <h1 className="display-2 text-nowrap">{t("welcome-title")}</h1>
                <h1 className="display-2">{t("welcome-name")}</h1>
                <h4 className="display-6">{t("welcome-position")}</h4>
                <p>
                  {t("welcome-txt-1")} <span>{t("welcome-txt-2")}</span>,{" "}
                  <span>{t("welcome-txt-3")}</span> {t("welcome-txt-4")}{" "}
                  <span>{t("welcome-txt-5")}</span>
                </p>
                <div className="d-flex gap-1">
                  <div style={{ width: "200px" }}>
                    <Button value={"download cv"} />
                  </div>
                  <Button
                    value={<FaLinkedinIn />}
                    shape={"circle"}
                    classBtn="secondary"
                  />
                  <Button
                    value={<FaGithub />}
                    shape={"circle"}
                    classBtn="secondary"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <p>esq</p>
              </div>
            </div>
          </div>
        </section>
        <section id="sobre" className={`${styles["about-section"]} bg-alter`}>
          <div className="container">
            <h1 className="display-2 text-nowrap">{t("about-title")}</h1>
            <h2 className="h3">{t("about-subtitle")}</h2>
            <p>{t("about-paragraph")}</p>

            <div className="row g-5">
              <div className="col-md-6">
                <h2 className="mb-4">{t("experiences-title")}</h2>
                <ExperienceCard
                  position={"Full-stack"}
                  company={"Rolemar"}
                  startDate={"Jun 2022"}
                  endDate={"atual"}
                  resume={
                    "Manutencao e desenvolvimento de novas features na aplicação da empresa, um e-commerce de pecas automotivas com integracão ao erp da empresa. Aplicação web desenvolvida em php e react."
                  }
                />
              </div>
              <div className="col-md-6">
                <h2 className="mb-4">{t("education-title")}</h2>
                <EducationCard
                  courseName={"Desenvolvedor moderno"}
                  startDate={"Set 2022"}
                  endDate={"set 2023"}
                  institution={"devsuperior"}
                  resume={
                    "Na jornada os seguintes cursos foram concluídos: 1. Lógica de programação; 2. Git e Github; 3. HTML e CSS; 4. Programação Moderna; 5. Banco de Dados; 6. Análise de Sistemas; 7. Ambiente de Desenvolvimento; 8. Back End; 9. JavaScript; 10. Front end."
                  }
                  workload={650}
                  i18nIsDynamicList={true}
                  certificateUrl={
                    "https://learn.devsuperior.com/certificados/7774880"
                  }
                />
              </div>
            </div>
          </div>
        </section>
        <section id="habilidades" className={styles["skills-section"]}>
          <div className="container">
            <h1 className="display-2 text-nowrap">{t("skill-title")}</h1>
            <p>{t("skill-paragraph")}</p>
            <div className="row g-5">
              <div className="col-lg-2 col-md-4 col-sm-6 col-6">
                <SkillCard
                  name={"java script"}
                  icon={
                    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg"
                  }
                  level={50}
                  docUrl={"https://docs.oracle.com/en/java/"}
                />
              </div>
              <div className="col-lg-2 col-md-4 col-sm-6 col-6">
                <SkillCard
                  name={"type script"}
                  icon={
                    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-plain.svg"
                  }
                  level={50}
                  docUrl={"https://docs.oracle.com/en/java/"}
                />
              </div>
              <div className="col-lg-2 col-md-4 col-sm-6 col-6">
                <SkillCard
                  name={"kubernetes"}
                  icon={
                    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg"
                  }
                  level={50}
                  docUrl={"https://docs.oracle.com/en/java/"}
                />
              </div>
              <div className="col-lg-2 col-md-4 col-sm-6 col-6">
                <SkillCard
                  name={"python"}
                  icon={
                    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
                  }
                  level={50}
                  docUrl={"https://docs.oracle.com/en/java/"}
                />
              </div>
              <div className="col-lg-2 col-md-4 col-sm-6 col-6">
                <SkillCard
                  name={"java"}
                  icon={
                    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg"
                  }
                  level={50}
                  docUrl={"https://docs.oracle.com/en/java/"}
                />
              </div>
              <div className="col-lg-2 col-md-4 col-sm-6 col-6">
                <SkillCard
                  name={"java"}
                  icon={
                    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg"
                  }
                  level={50}
                  docUrl={"https://docs.oracle.com/en/java/"}
                />
              </div>
              <div className="col-lg-2 col-md-4 col-sm-6 col-6">
                <SkillCard
                  name={"java"}
                  icon={
                    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg"
                  }
                  level={50}
                  docUrl={"https://docs.oracle.com/en/java/"}
                />
              </div>
              <div className="col-lg-2 col-md-4 col-sm-6 col-6">
                <SkillCard
                  name={"java"}
                  icon={
                    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg"
                  }
                  level={50}
                  docUrl={"https://docs.oracle.com/en/java/"}
                />
              </div>
              <div className="col-lg-2 col-md-4 col-sm-6 col-6">
                <SkillCard
                  name={"java"}
                  icon={
                    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg"
                  }
                  level={50}
                  docUrl={"https://docs.oracle.com/en/java/"}
                />
              </div>
            </div>
          </div>
        </section>
        <section
          id="projetos"
          className={`${styles["project-section"]} bg-alter`}
        >
          <div className="container">
            <h1 className="display-2 text-nowrap">{t("projects-title")}</h1>
            <p>{t("projects-paragraph")}</p>
            <div className="row gy-5">
              <div className="col-md-6">
                <Carousel projectName={"projeto 01"} images={data.images} />
              </div>
              <div className="col-md-6 d-flex align-items-center">
                <ProjectCard
                  projectName={data.project.name}
                  description={data.project.description}
                  gitUrl={data.project.gitUrl}
                  liveUrl={data.project.liveUrl}
                  categories={data.project.categories}
                  technologies={data.project.technologies}
                />
              </div>
            </div>
          </div>
        </section>
        <section id="projetos" className={styles["project-section"]}>
          <div className="container">
            <h1 className="display-2 text-nowrap">{t("contact-title")}</h1>
            <p>{t("contact-paragraph")}</p>
            <div className="row">
              <div className="col-md-6">
                <ContactForm />
              </div>
              <div className="col-md-6"></div>
            </div>
          </div>
        </section>
      </main>
      <div>Footer</div>
    </>
  );
};

export default Client;
