import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  github: string;
  linkedin: string;
  summary: string;
}

interface WorkExperience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Education {
  school: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Project {
  name: string;
  description: string;
  technologies: string;
  link: string;
}

interface ResumeData {
  personalInfo: PersonalInfo;
  experience: WorkExperience[];
  education: Education[];
  projects: Project[];
  skills: string[];
  certifications: string[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // Mobile Tab toggle
  public activeTab = 'edit';

  // Form Data (Bound to Inputs)
  public formData: ResumeData = {
    personalInfo: {
      fullName: 'Alex Morgan',
      title: 'Senior Software Engineer',
      email: 'alex.morgan@design.io',
      phone: '+1 (555) 019-2834',
      address: 'San Francisco, CA',
      website: 'alexmorgan.dev',
      github: 'github.com/alexmorgan',
      linkedin: 'linkedin.com/in/alexmorgan',
      summary: 'A passionate and results-driven Software Engineer with 6+ years of experience designing, building, and deploying highly scalable web applications. Adept at collaborating in agile environments, designing clean architectural patterns, and creating pixel-perfect, responsive user experiences.'
    },
    experience: [
      {
        company: 'TechCorp',
        position: 'Senior Software Engineer',
        location: 'San Francisco, CA',
        startDate: '2023-06',
        endDate: '',
        current: true,
        description: 'Led the design and development of a next-generation microservices dashboard using Angular and Node.js, increasing client-side rendering performance by 40%.\nMentored 4 junior developers and established codebase guidelines, reducing peer review cycle times by 15%.'
      },
      {
        company: 'InnovateSoft',
        position: 'Software Engineer',
        location: 'Boston, MA',
        startDate: '2020-09',
        endDate: '2023-05',
        current: false,
        description: 'Developed and maintained multiple customer-facing websites, handling over 100k daily active users.\nImplemented automated end-to-end testing, reducing regression bugs in production by 25%.'
      }
    ],
    education: [
      {
        school: 'Stanford University',
        degree: 'B.S. in Computer Science',
        location: 'Stanford, CA',
        startDate: '2016-09',
        endDate: '2020-06',
        current: false,
        description: 'Graduated with Honors. Specialization in Software Systems and Human-Computer Interaction.'
      }
    ],
    projects: [
      {
        name: 'Personal Resume Builder',
        description: 'An elegant, interactive resume builder crafted using Angular standalone components featuring real-time live preview and print styling.',
        technologies: 'Angular 19, TypeScript, CSS Grid, HTML5',
        link: 'github.com/alexmorgan/resume-builder'
      },
      {
        name: 'CloudScale Telemetry',
        description: 'A lightweight real-time telemetry dashboard visualizing server workloads using WebSockets and HTML5 canvas rendering.',
        technologies: 'Node.js, WebSockets, Canvas API, Chart.js',
        link: 'github.com/alexmorgan/cloudscale'
      }
    ],
    skills: [
      'Angular', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Node.js', 'Express', 'PostgreSQL', 'Docker', 'Git', 'Agile Methodologies', 'System Design'
    ],
    certifications: [
      'AWS Certified Solutions Architect',
      'Google Professional Cloud Developer'
    ]
  };

  // Preview Data (Bound to the Resume Sheet - updates only on Save!)
  public previewData: ResumeData = JSON.parse(JSON.stringify(this.formData));

  // Collapsible Sections Expanded State
  public expandedSections = {
    personal: true,
    experience: false,
    education: false,
    projects: false,
    skills: false,
    certifications: false
  };

  // Helper inputs for adding single items
  public newSkill = '';
  public newCertification = '';

  // Toggle dropdown / collapsible section
  public toggleSection(section: keyof typeof App.prototype.expandedSections) {
    this.expandedSections[section] = !this.expandedSections[section];
  }

  // Work Experience Methods (Modifies formData)
  public addExperience() {
    this.formData.experience.push({
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    });
    this.expandedSections.experience = true;
  }

  public removeExperience(index: number) {
    this.formData.experience.splice(index, 1);
  }

  // Education Methods (Modifies formData)
  public addEducation() {
    this.formData.education.push({
      school: '',
      degree: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    });
    this.expandedSections.education = true;
  }

  public removeEducation(index: number) {
    this.formData.education.splice(index, 1);
  }

  // Projects Methods (Modifies formData)
  public addProject() {
    this.formData.projects.push({
      name: '',
      description: '',
      technologies: '',
      link: ''
    });
    this.expandedSections.projects = true;
  }

  public removeProject(index: number) {
    this.formData.projects.splice(index, 1);
  }

  // Skills Methods (Modifies formData)
  public addSkill() {
    if (!this.newSkill.trim()) return;
    this.formData.skills.push(this.newSkill.trim());
    this.newSkill = '';
  }

  public removeSkill(index: number) {
    this.formData.skills.splice(index, 1);
  }

  // Certifications Methods (Modifies formData)
  public addCertification() {
    if (!this.newCertification.trim()) return;
    this.formData.certifications.push(this.newCertification.trim());
    this.newCertification = '';
  }

  public removeCertification(index: number) {
    this.formData.certifications.splice(index, 1);
  }

  // Save changes from Form to Preview
  public saveChanges() {
    this.previewData = JSON.parse(JSON.stringify(this.formData));
  }

  // Reset form and preview to empty state
  public resetForm() {
    const emptyState: ResumeData = {
      personalInfo: {
        fullName: '',
        title: '',
        email: '',
        phone: '',
        address: '',
        website: '',
        github: '',
        linkedin: '',
        summary: ''
      },
      experience: [],
      education: [],
      projects: [],
      skills: [],
      certifications: []
    };
    
    this.formData = JSON.parse(JSON.stringify(emptyState));
    this.previewData = JSON.parse(JSON.stringify(emptyState));
  }

  // Handle Dynamic Summary Description Multi-Line String formatting
  public getParagraphs(text: string): string[] {
    if (!text) return [];
    return text.split('\n').filter(p => p.trim().length > 0);
  }

  // Print/PDF trigger
  public triggerPrint() {
    window.print();
  }

  // Format month input (YYYY-MM) into print-friendly string (e.g. Jun 2023)
  public formatDate(monthStr: string): string {
    if (!monthStr) return '';
    const parts = monthStr.split('-');
    if (parts.length !== 2) return monthStr; // Return as-is if already text formatted or not YYYY-MM
    
    const year = parts[0];
    const month = parseInt(parts[1], 10);
    
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    
    if (month >= 1 && month <= 12) {
      return `${monthNames[month - 1]} ${year}`;
    }
    
    return monthStr;
  }
}
