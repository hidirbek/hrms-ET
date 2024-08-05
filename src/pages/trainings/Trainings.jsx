import React from "react";
import { Layout } from "../../components";
import TrainingList from "../../components/trainingList/TrainingList";
import "./Training.css";

const Trainings = () => {
  return (
    <Layout>
      <div className="training_page-wrapper">
        <h1 className="training-title">Trainings</h1>
        <TrainingList />
      </div>
    </Layout>
  );
};

export default Trainings;
