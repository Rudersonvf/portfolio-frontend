import { useEffect, useState } from "react";
import React from "react";

import { useTranslation } from "react-i18next";
import {
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaLocationDot,
  FaPhone,
  FaWhatsapp,
} from "react-icons/fa6";

import rudeImg from "../../assets/ruderson.webp";
import Button from "../../components/Button";
import Carousel from "../../components/Carousel";
import ClientFooter from "../../components/ClientFooter";
import ClientHeader from "../../components/ClientHeader";
import ContactCard from "../../components/ContactCard";
import ContactForm from "../../components/ContactForm";
import EducationCard from "../../components/EducationCard";
import ExperienceCard from "../../components/ExperienceCard";
import ProjectCard from "../../components/ProjectCard";
import SkillCard from "../../components/SkillCard";
import * as educationService from "../../services/education-service";
import * as experienceService from "../../services/experience-service";
import * as projectService from "../../services/projectService";
import * as skillService from "../../services/skill-service";
import { formatDate } from "../../utils/dateFormat";

import styles from "./styles.module.scss";

const Client = () => {
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);

  const { t } = useTranslation();

  useEffect(() => {
    async function fetchData() {
      try {
        const experienceData = await experienceService.findAllRequest();
        setExperiences(experienceData.data);

        const educationData = await educationService.findAllRequest();
        setEducations(educationData.data);

        const skillData = await skillService.findAllRequest();
        setSkills(skillData.data);
      } catch (error) {
        console.error("Erro ao buscar dados ", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchProjects() {
      if (skills.length > 1) {
        try {
          const projectData = await projectService.findAllRequest();
          setProjects(projectData.data);
        } catch (error) {
          console.error("Erro ao buscar projetos ", error);
        }
      }
    }

    fetchProjects();
  }, [skills]);

  return (
    <>
      <ClientHeader />
      <main>
        <section id="#" className={styles["hero-section"]}>
          <div className="container">
            <div className="row gy-5">
              <div
                className={`${styles["col-text"]} col-md-6 d-flex flex-column justify-content-center`}
              >
                <h1 className="display-2 text-nowrap">{t("welcome-title")}</h1>
                <h1 className="display-2">{t("welcome-name")}</h1>
                <h4 className="display-6">{t("welcome-position")}</h4>
                <p className="mb-4">
                  {t("welcome-txt-1")} <span>{t("welcome-txt-2")}</span>,{" "}
                  <span>{t("welcome-txt-3")}</span> {t("welcome-txt-4")}{" "}
                  <span>{t("welcome-txt-5")}</span>
                </p>
                <div className="d-flex gap-3">
                  <div style={{ width: "180px" }}>
                    <Button
                      value={"download cv"}
                      type="link"
                      link={"/rudersonCv.pdf"}
                    />
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
              <div className="col-md-6 d-flex align-items-center justify-content-center">
                <figure>
                  <img
                    src={rudeImg}
                    alt="Ruderson Florentino"
                    className="figure-img img-fluid rounded"
                  />
                </figure>
              </div>
            </div>
          </div>
        </section>
        <section id="sobre" className={`${styles["about-section"]} bg-alter`}>
          <div className="container">
            <h1 className="display-2 text-nowrap mb-1">{t("about-title")}</h1>
            <h2 className="h3 mb-2">{t("about-subtitle")}</h2>
            <p className="mb-5">{t("about-paragraph")}</p>
            <div className="row g-5">
              <div className="col-md-6">
                <h2 className="mb-4">{t("experiences-title")}</h2>
                {experiences.map((experience) => (
                  <ExperienceCard
                    key={experience.id}
                    company={experience.company}
                    position={experience.position}
                    resume={experience.description}
                    startDate={formatDate(experience.startDate)}
                    endDate={formatDate(experience.endDate)}
                  />
                ))}
              </div>
              <div className="col-md-6">
                <h2 className="mb-4">{t("education-title")}</h2>
                {educations.map((education) => (
                  <EducationCard
                    key={education.id}
                    courseName={education.courseName}
                    institution={education.institution}
                    resume={education.description}
                    workload={education.workload}
                    certificateUrl={education.certificateUrl}
                    startDate={formatDate(education.startDate)}
                    endDate={formatDate(education.endDate)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
        <section id="habilidades" className={styles["skills-section"]}>
          <div className="container">
            <h1 className="display-2 text-nowrap mb-1">{t("skill-title")}</h1>
            <p className="mb-5">{t("skill-paragraph")}</p>
            <div className="row g-5">
              {skills.map(
                (skill) =>
                  skill.showAsAbility === true && (
                    <div
                      key={skill.id}
                      className="col-lg-2 col-md-4 col-sm-6 col-6"
                    >
                      <SkillCard
                        icon={skill.iconUrl}
                        name={skill.name}
                        level={skill.level}
                        docUrl={skill.docUrl}
                      />
                    </div>
                  )
              )}
            </div>
          </div>
        </section>
        <section
          id="projetos"
          className={`${styles["project-section"]} bg-alter`}
        >
          <div className="container">
            <h1 className="display-2 text-nowrap mb-1">
              {t("projects-title")}
            </h1>
            <p className="mb-5">{t("projects-paragraph")}</p>
            <div className="row gy-5">
              {projects.map((project) => (
                <React.Fragment key={project.id}>
                  <div className="col-md-6">
                    <Carousel
                      projectName={project.title}
                      images={project.images}
                      id={project.id}
                    />
                  </div>
                  <div className="col-md-6 d-flex align-items-center mb-last">
                    <ProjectCard
                      projectName={project.title}
                      description={project.description}
                      gitUrl={project.repositoryUrl}
                      liveUrl={project.liveUrl}
                      categories={project.categories}
                      technologies={project.skills}
                    />
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>
        <section id="contato" className={styles["project-section"]}>
          <div className="container">
            <h1 className="display-2 text-nowrap mb-1">{t("contact-title")}</h1>
            <p className="mb-5">{t("contact-paragraph")}</p>
            <div className="row g-5">
              <div className="col-md-6">
                <ContactForm />
              </div>
              <div className="col-md-6">
                <div className="d-flex flex-column gap-4">
                  <h3>Ruderson Vinicius Florentino</h3>
                  <ContactCard
                    type={"extLink"}
                    logo={<FaLocationDot />}
                    title="Endereço"
                    content={
                      <>
                        R. Prof. Samuel Moura, 450 - Judith, <br /> Londrina -
                        PR, 86061-060.
                      </>
                    }
                    link="https://www.google.com/maps?q=-23.30782, -51.17947"
                  />
                  <ContactCard
                    type={"tel"}
                    logo={<FaPhone />}
                    title="Tel"
                    content={"(44) 99105-7251"}
                    link={"5544991057251"}
                  />
                  <ContactCard
                    type={"mail"}
                    logo={<FaEnvelope />}
                    title="Email"
                    content={"contato@ruderson.com.br"}
                    link={"contato@ruderson.com.br"}
                  />
                </div>
                <div className="mt-3">
                  <span className="follow">
                    Baixe meu currículo e me siga nas redes socias!
                  </span>
                  <div className="d-flex gap-4 mt-2 flex-wrap">
                    <div style={{ width: "200px" }}>
                      <Button
                        value={"download cv"}
                        type="link"
                        link={"/rudersonCv.pdf"}
                      />
                    </div>
                    <Button
                      value={<FaLinkedinIn />}
                      shape={"circle"}
                      classBtn="secondary"
                      type="link"
                      link={"https://www.linkedin.com/in/rudersonvf"}
                    />
                    <Button
                      value={<FaGithub />}
                      shape={"circle"}
                      classBtn="secondary"
                      type="link"
                      link={"https://github.com/Rudersonvf"}
                    />
                    <Button
                      value={<FaInstagram />}
                      shape={"circle"}
                      classBtn="secondary"
                      type="link"
                      link={"https://www.instagram.com/rudersonvf"}
                    />
                    <Button
                      value={<FaWhatsapp />}
                      shape={"circle"}
                      classBtn="secondary"
                      type="link"
                      link={
                        "https://api.whatsapp.com/send?phone=5544991057251&text=Ol%C3%A1%2C%20vamos%20marcar%20uma%20call%20%3F"
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ClientFooter />
    </>
  );
};

export default Client;
