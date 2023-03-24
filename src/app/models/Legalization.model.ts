import { AcademicInstitution } from "./AcademicInstitution.model";
import { Career } from "./Career.model";
import { DocumentType } from "./DocumentType.model";
import { User } from "./User.model";

export interface Legalization {
    id:                  string;
    amount:              number;
    creationDate:        Date;
    status:              number;
    academicInstitution: AcademicInstitution;
    documentType:        DocumentType;
    career:              Career;
    user:                User;
    comment:             string;
}