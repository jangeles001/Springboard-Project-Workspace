DROP DATABASE IF EXISTS medical_center;

CREATE DATABASE medical_center;

\c medical_center

CREATE TABLE med_centers
(
    center_id SERIAL PRIMARY KEY,
    center_name VARCHAR(100) NOT NULL,
    construction_date DATE
);

CREATE TABLE doctors
(
    doctor_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    center_id INTEGER REFERENCES med_centers(center_id) ON DELETE SET NULL,
    hire_date DATE
);

CREATE TABLE patients
(
    patient_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    admission_date DATE
);

CREATE TABLE diagnoses (
    diagnosis_id SERIAL PRIMARY KEY,
    diagnosis_name VARCHAR(150) NOT NULL
);

CREATE TABLE patient_doctors (
    patient_id INTEGER REFERENCES patients(patient_id) ON DELETE CASCADE,
    doctor_id INTEGER REFERENCES doctors(doctor_id) ON DELETE CASCADE,
    is_primary BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (patient_id, doctor_id)
);

CREATE TABLE patient_diagnoses (
    patient_id INTEGER REFERENCES patients(patient_id) ON DELETE CASCADE,
    diagnosis_id INTEGER REFERENCES diagnoses(diagnosis_id) ON DELETE CASCADE,
    diagnosis_date DATE,
    PRIMARY KEY (patient_id, diagnosis_id, diagnosis_date)
);